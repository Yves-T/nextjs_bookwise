"use server";
import prisma from "@/database/client";
import { borrow_status } from "@prisma/client";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.availableCopies <= 0) {
      return { success: false, error: "Book is not available for borrowing" };
    }

    const dueDate = dayjs().add(7, "day").toDate().toISOString();

    const record = await prisma.borrow.create({
      data: {
        userId: parseInt(userId),
        bookId,
        dueDate,
        status: borrow_status.BORROWED,
      },
    });

    await prisma.book.update({
      where: { id: bookId },
      data: { availableCopies: book.availableCopies - 1 },
    });

    return { success: true, data: record };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};
