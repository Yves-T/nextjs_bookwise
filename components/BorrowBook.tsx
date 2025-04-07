"use client";
import { borrowBook } from "@/lib/actions/book";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: { isEligible: boolean; message: string };
}

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrow = async () => {
    if (!isEligible) {
      toast.warning("Error", {
        description: message
          ? "You have successfully signed in"
          : "You have successfully signed up",
        classNames: {
          description: "!text-dark-600",
        },
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });
      if (result.success) {
        toast("Success", {
          description: "Book borrowed successfully",
          classNames: {
            description: "!text-dark-600",
          },
        });
        router.push("/");
      } else {
        toast.error("Error", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An error occurred while borrowing the book",
        classNames: {
          description: "!text-dark-600",
        },
      });
    } finally {
      setBorrowing(false);
    }
  };
  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrow}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="star" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
