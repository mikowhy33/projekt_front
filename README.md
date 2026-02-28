# ⌨️ Typeracer Clone - Next.js Typing Speed Test

A real-time typing speed test application built with Next.js (App Router), React, and Tailwind CSS. 

## 🚀 Tech Stack
* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS + shadcn/ui components
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Data Fetching:** Native Fetch API (Server-Side & Client-Side)

## ✨ Features Implemented
* **Real-time Metrics:** Calculates Words Per Minute (WPM) and character-level Accuracy on the fly.
* **Server-Side Rendering (SSR):** The initial sentence is fetched on the server using `DummyJSON API` for optimal performance and SEO, preventing client-side waterfalls.
* **Client-Side Hydration:** Subsequent sentences during the game are fetched on the client side without reloading the page.
* **Persistent History:** Player stats (WPM, Accuracy, correct words) are saved locally using `localStorage` and displayed in a custom Modal UI.

## 🏗️ Architectural Decisions & Trade-offs (Time Constraint)
Due to the strict time limit of the assignment, I made the following strategic decisions to focus on delivering a polished, working core loop:

1. **Backend / Database:** Instead of setting up a separate Node.js server and database (which would consume a lot of time), I utilized the browser's `localStorage` to handle the "saving and loading player stats" requirement. This perfectly simulates database persistence for a single user.
2. **Fake Multiplayer:** To ensure the core gameplay mechanics (timer, accurate WPM calculation) were solid, I prioritized the solo experience and UI polish over creating simulated bot opponents. 
3. **API Integration:** I integrated the free `DummyJSON Quotes API` to fetch random sentences instead of hardcoding them, demonstrating proficiency in handling asynchronous data and error states (both HTTP and network errors). Although if for some reason the API crashes we have a mock data prepared.

## 💻 How to run locally
1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
