"use server";
import prisma from "@/database/client";

export const createBook = async (params: BookParams) => {
  console.log("return date", params);
  try {
    const newBook = await prisma.book.create({
      data: { ...params, availableCopies: params.totalCopies },
    });

    return { success: true, data: newBook };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book ",
    };
  }
};
