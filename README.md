This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

✅👉 Nitin Kushwaha

Project Name - AI Powered Medical Voice Agent App 
Tech Stack - NextJS, ReactJS and AI
Create a virtual medical Assistant that talk with users, understand their syptoms and provide a AI Driven Response in a real time. 
Tech-Stack - Clerk authentication and their subscription model
             for speech to text - use aseemblyAI
             fpr databse - use neon postgresql database with the help of dzizzle orm
             to bring all these ai model together(to build ai agent), use VAPI AI
             Deploy on vercel by using github 

Step 1) - Project Setup


NextJS Documnetation - https://nextjs.org/docs
Create folder and go inside folder and run command - npx create-next-app@latest
👇
project name -- ai-medical-assistant
👇
typescript - yes
👇
ESLint - No
👇
Tailwind CSS - Yes
👇
inside src directory - yes/no
👇
APP Router - yes
👇
Turbopack - No
👇
No again
👇
Done

Step 2) -

Install talwind css based UI Component Library called Shadecn using below command (document for installation👉https://ui.shadcn.com/docs/installation/next)

-npx shadcn@latest init

---
Add Components

You can now start adding components to your project using this below command
-npx shadcn@latest add button

After running above command, a couple of file and folder are created  - 
first - components.json - which contain shadecntype configuration
second - lib/utils.js -  related to shadecn
third - components/ui/button.tsx 
in globals.css - all colours code is added(we don't have talwind.config.js which ever in version 3 or older, now in version 4 everything is moved to globals.css file which contain all styling).

The above command will add the Button component to your project. You can then import it like this:

app/page.tsx

import { Button } from "@/components/ui/button"
 
export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
---

Use Shadcn based Aceternity UI for different animated component-
(Docs - https://ui.aceternity.com/components)
(For hero section - https://ui.aceternity.com/components/hero-sections)
(for FeatureBentoGrid - https://ui.aceternity.com/components/bento-grid)
       npx shadcn@latest add https://ui.aceternity.com/registry/bento-grid.json

---
install motion from https://motion.dev/docs/react using this command 

-npm install motion

---

Step 3) -
### Database Setup

Use Neon PostgreSQl database (https://neon.com/)
Work With Stack - Drizzle orm 

1. Open 👉(https://orm.drizzle.team/docs/get-started) goto Neon Section and run below command

 npm i drizzle-orm @neondatabase/serverless dotenv
 npm i -D drizzle-kit tsx


2. Add DATABASE_URL in .env file

 DATABASE_URL = 


3. Connect Drizzle ORM to the database

 Create a index.ts(or db.ts in config folder) file in the src directory and initialize the connection:

 import { drizzle } from 'drizzle-orm/neon-http';
 const db = drizzle(process.env.DATABASE_URL);  // Note for typescript add ! 👉 const db = drizzle(process.env.DATABASE_URL!);

 "or"

 If you need a synchronous connection, you can use our additional connection API, where you specify a driver connection and pass it to the Drizzle instance.

  import { neon } from '@neondatabase/serverless';
  import { drizzle } from 'drizzle-orm/neon-http';
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle({ client: sql });


4. Create a table

 Create a schema.ts file in the src/db directory and declare your table:

 src/db/schema.ts (or projectfolder/config/schema.ts )

 import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
 export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: Integer()
 });


5. Setup Drizzle config file

 Drizzle config - a configuration file that is used by Drizzle Kit and contains all the information about your database connection, migration folder and schema files.

 Create a drizzle.config.ts file in the root of your project and add the following content:

 drizzle.config.ts

 import 'dotenv/config';
 import { defineConfig } from 'drizzle-kit';
 export default defineConfig({
  out: './drizzle',                             // Remove this line
  schema: './src/db/schema.ts',                // schema: './config/schema.ts'
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
 });


6. Applying changes to the database

 You can directly apply changes to your database using the drizzle-kit push command. This is a convenient method for quickly testing new schema designs or modifications in a local development environment, allowing for rapid iterations without the need to manage migration files:

 npx drizzle-kit push

Note - You can ckeck entry in tables go to Neon website but there is another way to check entry using this below command to run on terminal that run database locally-

 npx drizzle-kit studio


Step 6) -
### Autentication

For authentication use Clerk (https://clerk.com/) 
Clerk is also provide Subscription Billing Model that is attached to the stripe payment gateway

1. Install @clerk/nextjs

 Run the following command to install the SDK:
 
  npm install @clerk/nextjs


2. Set your Clerk API keys

 Add these keys to your .env or create the file if it doesn't exist. Retrieve these keys anytime from the API keys page.
 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
 CLERK_SECRET_KEY=


3. Update middleware.ts

 Update your middleware file, or create one at the root of your project, or the src/ directory if you're using a src/ directory structure.
 The clerkMiddleware helper enables authentication and is where you'll configure your protected routes.

 import { clerkMiddleware } from '@clerk/nextjs/server';

 export default clerkMiddleware();

 export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};


4. Add ClerkProvider to your app

 The ClerkProvidercomponent provides Clerk's authentication context to your app. It's recommended to wrap your entire app at the entry point with ClerkProvider to make authentication globally accessible. See the reference docs for other configuration options.
 Copy and paste the following code into your layout.tsx file. This creates a header with Clerk's prebuilt components to allow users to sign in and out.


 import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
 } from '@clerk/nextjs' 👈

 export default function RootLayout({
  children,
 }: Readonly<{
  children: React.ReactNode
 }>) {
  return (
    <ClerkProvider> 👈
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
         //remaining code
          {children}
        </body>
      </html>
    </ClerkProvider> 👈
  )
 }


5. Create your first user

 Run your project. Then, visit your app's homepage at http://localhost:3000 and sign up to create your first user.

 npm run dev


Continue to the NextJS guide - 

1. Build a sign-in-or-up page

 The following example demonstrates how to render the <SignIn /> component on a dedicated page using the Next.js optional catch-all route

 app/sign-in/[[...sign-in]]/page.tsx      (or app/(auth)/sign-in/[[...sign-in]]/page.tsx)

 import { SignIn } from '@clerk/nextjs'
 export default function Page() {
  return <SignIn />
}

2. Make the sign-in-or-up route public

 By default, clerkMiddleware() makes all routes public. This step is specifically for applications that have configured clerkMiddleware() to make all routes protected. If you have not configured clerkMiddleware() to protect all routes, you can skip this step.

 To make the sign-in route public:

 Navigate to your middleware.ts file.
 Create a new route matcher that matches the sign-in route, or you can add it to your existing route matcher that is making routes public.
 Create a check to see if the user's current route is a public route. If it is not a public route, use auth.protect() to protect the route.

 middleware.ts

 Replace complete code of middleware with this -

 import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

 const isPublicRoute = createRouteMatcher(['/sign-in(.*)'])

 export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
 })

 export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

3. Update your environment variables

 Set the CLERK_SIGN_IN_URL environment variable to tell Clerk where the <SignIn /> component is being hosted.
 Set CLERK_SIGN_IN_FALLBACK_REDIRECT_URL as a fallback URL incase users visit the /sign-in route directly.
 Set CLERK_SIGN_UP_FALLBACK_REDIRECT_URL as a fallback URL incase users select the 'Don't have an account? Sign up' link at the bottom of the component.

 NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
 NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
 NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

4. Add Custom Signup Page -

 Build a sign-up page
 The following example demonstrates how to render the <SignUp /> component on a dedicated sign-up page using the Next.js optional catch-all route.

 app/sign-up/[[...sign-up]]/page.tsx      (or app/(auth)/sign-up/[[...sign-up]]/page.tsx )

 import { SignUp } from '@clerk/nextjs'

 export default function Page() {
  return <SignUp />
}

5. Make the sign-up route public
 By default, clerkMiddleware() makes all routes public. This step is specifically for applications that have configured clerkMiddleware() to make all routes protected. If you have not configured clerkMiddleware() to protect all routes, you can skip this step.

 To make the sign-up route public:

 Navigate to your middleware.ts file.
 Add the sign-up route to your existing route matcher that is making routes public.

 middleware.ts

 import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

 const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)' 👈
 ])

 export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
 })

 export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

6. Update your environment variables

 Set the CLERK_SIGN_UP_URL environment variable to tell Clerk where the <SignUp /> component is being hosted.
 Set CLERK_SIGN_UP_FALLBACK_REDIRECT_URL as a fallback URL incase users visit the /sign-up route directly.
 Set CLERK_SIGN_IN_FALLBACK_REDIRECT_URL as a fallback URL incase users select the 'Already have an account? Sign in' link at the bottom of the component.

 NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
 NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
 NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/

7. Run the Project



### For logo
for logo - use logoipsum (https://logoipsum.com/)