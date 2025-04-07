import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import prisma from "@/database/client";

const Home = async () => {
  const session = await auth();
  const latestBooks = (await prisma.book.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  })) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
