import prisma from "@/database/client";
import { status } from "@prisma/client";
import Image from "next/image";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  userId,
  id,
}: Props) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user?.status === status.APPROVED,
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1 className="book-overview-h1">{title}</h1>
        <div className="book-info">
          <p className="text-2xl">
            By <span className="font-semibold text-light-200">{author}</span>
          </p>

          <p className="text-2xl">
            Category:{" "}
            <span className="font-semibold text-light-200">{genre}</span>
          </p>

          <div className="flex flex-row gap-1 items-center">
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="book-copies">
          <p className="text-xl text-light-100">
            Total Books{" "}
            <span className=" ml-2 font-semibold text-primary-100">
              {totalCopies}
            </span>
          </p>

          <p className="text-xl text-light-100">
            Available Books{" "}
            <span className=" ml-2 font-semibold text-primary-100">
              {availableCopies}
            </span>
          </p>
        </div>

        <p className="book-description">{description}</p>

        {user && (
          <BorrowBook
            bookId={id}
            userId={userId}
            borrowingEligibility={borrowingEligibility}
          />
        )}
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
