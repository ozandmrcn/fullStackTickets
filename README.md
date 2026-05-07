# fullStackTickets

Welcome to the **fullStackTickets** project! A professional and efficient ticket management system built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**. This application allows users to create, track, and manage support tickets with a modern dashboard experience.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Bullseye.png" alt="Bullseye" width="25" height="25" /> Project Overview

fullStackTickets enables users to:

- Create, Edit, and Delete support tickets with ease
- Monitor ticket distribution through dynamic **Chart.js** dashboard
- Track ticket progress (0-100%) and priority levels (1-5)
- Categorize issues (Software, Hardware, Connection, etc.)
- View real-time statistics (Today's tickets, weekly growth, completion rate)
- Experience a fully responsive and sleek Dark Mode UI

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Features

- **Modern Tech Stack:** Built with React 19 and Next.js App Router.
- **Dynamic Analytics:** Visual data representation using **Chart.js** and **react-chartjs-2**.
- **Database:** Robust data management with MongoDB via **Mongoose**.
- **UI/UX:** Premium dark-themed interface styled with **Tailwind CSS v4**.
- **Server Actions:** Efficient data mutations with Next.js Server Actions and revalidation.
- **Icons:** High-quality vector icons with **Lucide React**.
- **Type Safety:** Fully developed with **TypeScript** for better maintainability.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="25" height="25" /> Technologies Used

- **Next.js 15** (Framework)
- **React 19** (UI Library)
- **TypeScript** (Type Safety)
- **Tailwind CSS v4** (Modern Styling)
- **Mongoose** (MongoDB ODM)
- **Chart.js** (Data Visualization)
- **Lucide React** (Icon Sets)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png" alt="Books" width="25" height="25" /> Key Concepts

- **Server-Side Rendering (SSR):** Optimized performance using Next.js 15.
- **API Routes:** Custom endpoints for ticket management.
- **Responsive Design:** Mobile-first approach with Tailwind CSS v4.
- **State Management:** Efficient data handling using React 19 hooks.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" alt="Desktop Computer" width="25" height="25" /> Demo

You can view a demo of the project by visiting the following link:  
[Full Stack Tickets DEMO](full-stack-tickets.vercel.app)

## Preview

<!-- <a href=""><img src="" alt="Preview 1" border="0" /></a> -->
<!-- <a href=""><img src="" alt="Preview 2" border="0" /></a> -->

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Wrench.png" alt="Wrench" width="25" height="25" /> Installation

To run the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/ozandmrcn/fullStackTickets.git

# Navigate to the project folder
cd fullStackTickets

# Install required dependencies
npm install

# Run the development server
npm run dev
```

### ⚙️ Environment Variables (.env Setup)

Create a `.env` file in the root directory and fill in the following values with your own credentials:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db_name>

# App API URL (Required for local development; optional on Vercel)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ **Note:** To ensure the system works correctly, you need a valid MongoDB connection string.
> 
> 💡 **Deployment Tip:** When deploying to **Vercel**, you can leave `NEXT_PUBLIC_APP_URL` blank. The application is configured to automatically detect and use the Vercel deployment URL if this variable is not provided.

## 📧 Contact

For any questions or feedback, feel free to contact:  
**Ozan Demircan** – ozandmrcn47@gmail.com
