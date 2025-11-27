# HR Management Application

A simple HR Management app built with **Next.js**, **Prisma**, **React Hook Form**, **Zod**, and **shadcn/ui**.

---

## Features

### HR
- Manage Users (Create, Update, Delete)
- Manage Attendance (Create, Update, Delete)
- Manage Payroll
- View Performance (read-only)

### Manager
- Assign and Update Performance Tasks
- View Users, Attendance, and Payroll (read-only)

### Common Features
- Authentication (NextAuth or JWT)
- Role-based access
- Form validation with **Zod**
- CRUD operations with modal messages

---

## Live URL 

URL = https://github.com/I-am-MoRsHeD/HR-management-xponent.git

---

## Credentials

HR -> hr@gmail.com / 123456A@a
Manager -> manager@gmail.com /123456A@a

---

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/I-am-MoRsHeD/HR-management-xponent.git
```

2. Install dependencies:
```bash
bun i 
#or
pnpm i
```

3. Configure environment variables:
```bash 
DATABASE_URL=db_url

JWT_ACCESS_SECRET=token_secret
JWT_ACCESS_EXPIRES=secret_expries

BCRYPT_SALT_ROUNDS=salt_rounds
```

4. Run Prisma migrations:
```bash
npx prisma migrate dev
```

5. Start the development server :
```bash
bun dev
```

