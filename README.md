This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## INTRO
In this application, I have taken a deeper dive into working with Firebase by Google to interact with a database. Having worked on projects with Firebase before (here & here), I thoroughly enjoyed it and wanted to upgrade my app to include the ability to create posts. To achieve this, I worked with Next.js and utilized useful React hooks while adding styles with Tailwind CSS (apologies for the low-level adaptiveness for mobiles as I didn't focus much on it). Additionally, I added dynamic alerts via React Toast for a smooth user experience.

As for the functionality, the main page displays a list of all posts, where you can add comments if you are logged in. The login form is implemented via Google. On the 'post' page, you can create a post with a maximum of 300 characters. If you tap on your logo, you can access the 'dashboard' page, where you can delete or edit your own post. If you choose to edit your post, you will be redirected to the 'post' page with your modifications.

As usual, here are some screenshots for reference.
<img width="1280" alt="Снимок экрана 2023-03-26 в 10 39 07" src="https://user-images.githubusercontent.com/95095531/227762702-218f0f2d-0835-4b55-a420-79061eef9f1b.png">
<img width="1279" alt="Снимок экрана 2023-03-26 в 10 07 33" src="https://user-images.githubusercontent.com/95095531/227762697-7a3eb211-b565-4a77-8a1c-44b8df8d1890.png">
<img width="1280" alt="Снимок экрана 2023-03-26 в 10 10 16" src="https://user-images.githubusercontent.com/95095531/227762698-f42bea9f-b983-4da5-a4fb-7cba2754f928.png">
<img width="1280" alt="Снимок экрана 2023-03-26 в 10 11 13" src="https://user-images.githubusercontent.com/95095531/227762700-6eb25611-ff4b-4ea5-98c0-6bc187719335.png">
<img width="1280" alt="Снимок экрана 2023-03-26 в 10 39 07" src="https://user-images.githubusercontent.com/95095531/227762739-0ec4db36-7d09-4367-af01-d60b3a85b481.png">



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
