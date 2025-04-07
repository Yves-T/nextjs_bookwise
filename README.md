# University Library BookWise

Built with Next.js, TypeScript, and Postgres, the University Library Management System is a production-grade platform featuring a public-facing app and an admin interface. It offers advanced functionalities like seamless book borrowing with reminders and receipts, robust user management, automated workflows, and a modern, optimized tech stack for real-world scalability.

[Demo](https://nextjs-bookwise.vercel.app/)

## Technology stack used

- [Next.js](https://nextjs.org)
- PostgreSQL
- [Upstash](https://upstash.com)
- [ImageKit](https://imagekit.io)
- TypeScript
- [Resend](https://resend.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma ORM](https://www.prisma.io)

## Features

- Open source Authentication: Authentication is handled with AuthJs.
- OnBoarding flow: When a new user creates an account an onboarding worklow is triggered. The worklow is managed wit upstash and a welcome email is send with Resend.
- SignIn and SignUp forms are protected with rate limitting ( Redis & Upstash)
- User roles: Admins get access to a dashboard page where new books with cover and promo video can be added.
- Database Management: Postgres with Neon for scalable and collaborative database handling.
- Database ORM: Prisma ORM for simplified and efficient database interactions.
- Media is managed with ImageKit
- Users can borrow books and view book details
