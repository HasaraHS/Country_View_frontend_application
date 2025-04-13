[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# React Countries Explorer

A responsive frontend application built with **React** (functional components) that allows users to explore information about countries using the [REST Countries API](https://restcountries.com/). Features include search, filter by region/language, and detailed views for each country.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [API Used](#api-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Challenges Faced](#challenges-faced)


## Features

- Search countries by name
- Filter countries by language
- View detailed information about each country
- Dynamic updates with no page refresh
- Responsive design for all devices
- User login and session management
- Unit and integration testing


## Tech Stack

| Area       | Tools/Frameworks                     |
|------------|--------------------------------------|
| Frontend   | React (Functional Components, Hooks) |
| Styling    | Tailwind CSS / Bootstrap / Material-UI |
| Testing    | Jest + React Testing Library         |
| Versioning | Git + GitHub                         |
| Hosting    | Vercel                               |


## API Used – REST Countries

Base URL: `https://restcountries.com/v3.1`

### Endpoints Used:

- `GET /all` – Fetch all countries
- `GET /name/{name}` – Search country by name
- `GET /region/{region}` – Filter countries by region
- `GET /alpha/{code}` – Get country details by alpha code

---

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/react-countries-app.git
   cd react-countries-app
2. Install dependency:
   npm install
3. Run the development server:
   npm start
4. Visit http://localhost:3000 in your browser
  
## Usage 
- Use the search bar to look up any country by name.
- Use the dropdown filters to filter by region or language.
- Click on any country card to view more details.
- (Optional) Login to access features like saving favorite countries.

## Project Structure
src/
│
├── components/
│   ├── SearchBar.jsx
│   ├── CountryCard.jsx
│   ├── CountryDetails.jsx
│   ├── RegionFilter.jsx
│   └── LanguageFilter.jsx
│
├── pages/
│   ├── Home.jsx
│   └── Login.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── index.js
└── App.css

## Testing
- Unit and integration tests are written using Jest and React Testing Library
- To run tests: npm test

## Deployment

##  Challenges Faced
- Handling edge cases like invalid country names or missing API data.
- Ensuring mobile responsiveness across various screen sizes.
- Managing state efficiently with hooks.
- Parsing deeply nested objects from the API (e.g., languages, currencies).
- (Optional) Storing user session and protected routes without a backend.

  

