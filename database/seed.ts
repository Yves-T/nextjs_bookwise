import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import ImageKit from "imagekit";
import dummyBooks from "../dummybooks.json";
const prisma = new PrismaClient();

config({ path: ".env.local " });

const imageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string
) => {
  try {
    const response = await imageKit.upload({ file: url, fileName, folder });
    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to Imagekit", error);
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      );

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      );

      await prisma.book.upsert({
        where: { id: book.id },
        create: { ...book, coverUrl: coverUrl ?? "", videoUrl: videoUrl ?? "" },
        update: {},
      });
    }
    console.log("Data seeded successfully");
  } catch (error) {
    console.log("Error seeding data:", error);
  }
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
