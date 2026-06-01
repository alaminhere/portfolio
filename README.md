# Alamin Portfolio — Full-Stack Developer Portfolio & Case Study CMS

A modern, full-stack developer portfolio built with **Next.js App Router**,
**Prisma**, **NextAuth**, and **Cloudinary**. It features a public-facing
portfolio site along with a fully custom **Admin Dashboard** to manage project
case studies — from writing and publishing to editing and deleting, all without
touching code.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-3178C6?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![NextAuth](https://img.shields.io/badge/NextAuth-Authentication-000000)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform)
![Zod](https://img.shields.io/badge/Zod-Validation-3068B7)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-Alerts-7066E0)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-30B980)
![bcrypt](https://img.shields.io/badge/bcrypt-Security-2E8B57)
![next-themes](https://img.shields.io/badge/next--themes-Dark_Mode-181717)
![Middleware](https://img.shields.io/badge/Middleware-Protected_Routes-FF9800)
![Lucide React](https://img.shields.io/badge/Lucide-Icons-F56565)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Live Demo

**Live Preview:** (https://alaminhere.com/)

---

## ✨ Features

### Public Portfolio

- Hero Section with Availability Status
- About Me Section
- Skills & Tools Showcase
- Case Studies / Projects Listing
- Single Case Study Detail Page
- Contact Form with Email Notifications
- Dark & Light Mode Toggle
- Custom Animated Cursor
- Fully Responsive Design

### Admin Dashboard

- Secure Admin Login
- Dashboard Overview (Total Case Studies, Published Count, Latest Project, Total
  Views)
- Add Case Study
- Edit Case Study
- Delete Case Study
- View Single Case Study
- All Case Studies List View
- Profile Management
- Account Settings

### Authentication

- Admin Login (NextAuth + bcrypt)
- Email Verification
- Protected Routes via Middleware

### Other Features

- Image Upload with Cloudinary
- Server Actions (no separate REST layer needed)
- Form Validation with React Hook Form + Zod
- Toast / SweetAlert2 Notifications
- Loading States & Error Handling

---

## Tech Stack

| Frontend                | Backend & Services     |
| ----------------------- | ---------------------- |
| Next.js 16 (App Router) | Next.js Server Actions |
| React 19                | Prisma ORM             |
| TypeScript              | NextAuth               |
| Tailwind CSS 4          | bcrypt                 |
| next-themes (Dark Mode) | Cloudinary             |
| Lucide React (Icons)    | Nodemailer             |
| React Hook Form         | Middleware             |
| Zod                     | Slugify                |
| SweetAlert2             | clsx                   |

---

## Screenshots

![Admin Overview](./public/admin_overview_.webp)

---

## Project Structure

```text
src/
├── actions/
│   ├── authActions.ts
│   ├── profileActions.ts
│   ├── projectActions.ts
│   └── sendEmailAction.ts
│
├── app/
│   ├── (admin)/
│   │   ├── admin/
│   │   └── layout.tsx
│   │
│   ├── (auth)/
│   │   ├── login-admin/
│   │   └── verification/
│   │
│   ├── (client)/
│   │   ├── projects/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── api/
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── admin/
│   ├── auth/
│   ├── home/
│   ├── layout/
│   └── ui/
│
├── libs/
├── provider/
└── middleware.ts
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/alaminhere/portfolio.git
```

### Navigate to the Project

```bash
cd my-portfolio
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env` file in the project root.

```env

NEXT_PUBLIC_SITE_URL="http://localhost:3000"

NEXTAUTH_SECRET=


CONTACT_RECEIVER_EMAIL=
RESEND_API_KEY=

DATABASE_URL=

NEXT_PUBLIC_CLOUD_NAME=
NEXT_PUBLIC_PRESET_NAME=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Repository

https://github.com/alamin-one/my-portfolio

---

## Developed By

**Al-Amin**

GitHub: https://github.com/alamin-one

---

## License

This project is licensed under the **MIT License**.

---

## Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
