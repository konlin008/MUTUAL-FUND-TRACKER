"# MUTUAL-FUND-TRACKER" 
## Overview

**MutualTrack** is a full-stack web application for tracking and saving mutual funds. It offers secure authentication, fund search, and personalized fund management with a modern, responsive UI.

## Features

- **User Authentication:** Register and log in securely using JWT-based authentication.
- **Search Mutual Funds:** Search for mutual funds using [mfapi.in](https://www.mfapi.in) via a central search bar.
- **View Fund Details:** Click on any search result to view detailed information about the mutual fund.
- **Save Mutual Funds:** Logged-in users can save mutual funds to their personal list.
- **View Saved Funds:** Access a dedicated page to view all saved mutual funds.
- **Protected Routes:** Fund details and saved funds pages are accessible only to authenticated users.
- **Responsive Design:** Fully responsive UI for seamless experience across devices.

## Technologies Used

### Frontend

- **React** for building the user interface
- **Tailwind CSS** with **shadcn/ui** for modern, responsive styling
- **Zustand** for state management

### Backend

- **Node.js** and **Express** for RESTful API development
- **MongoDB** for database management

### API Testing

- **Postman** for testing backend APIs

## Getting Started

1. **Clone the repository**
2. **Install dependencies** for both frontend and backend
3. **Set up environment variables** (MongoDB URI, JWT secret, etc.)
4. **Run backend server**
5. **Run frontend development server**

## License

This project is for educational purposes.
