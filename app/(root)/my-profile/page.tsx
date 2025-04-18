import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/contstants";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mb-10"
      >
        <Button className="text-dark-100">Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};

export default Page;
