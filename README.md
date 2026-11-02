<p align="center">
  <img src="src/vibelogo.png" width="120" alt="MLB Stats Hub logo" />
</p>

<h1 align="center"> MLB Stats Hub</h1>

<p align="center">
  <b>Data visualisation web app</b> · Built by <a href="https://github.com/Slinde06">Shaun Linde</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chartdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white" />
</p>

---

## Table of contents

1. [About the project](#about-the-project)
2. [Getting started](#getting-started)
3. [Features](#features)
4. [Development process](#development-process)
5. [Final outcome](#final-outcome)
6. [Conclusion](#conclusion)
7. [License, contact & acknowledgements](#license)

---

## About the project

MLB Stats Hub is a React dashboard that turns MLB stadium data into charts. The list of teams and their stadiums comes live from the public MLB Stats API. You can compare two stadiums side by side on attendance, temperature and wind speed, and follow how a stat changes over time on a timeline chart.

> **Note:** the MLB Stats API doesn't provide attendance or weather data, so those values are simulated. The timeline uses sample data. See [Challenges](#challenges).

I built it to practise working with a real third-party API, handling asynchronous data in React, and choosing the right chart for each type of data.

**Built with:** React, React Router, Axios, Chart.js (react-chartjs-2), React Bootstrap, MLB Stats API

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer (includes npm)
- Git
- No API key is needed. The MLB Stats API is public.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Slinde06/dvspotifyapiresearch.git

# 2. Move into the project folder
cd dvspotifyapiresearch

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app opens at **http://localhost:3000**.

> This is a frontend-only project. Team data comes straight from `https://statsapi.mlb.com/api/v1`, so there is no backend to set up.

---

## Features

| Page | Route | What it does |
|---|---|---|
|  Landing | `/` | Hero section, feature cards and key stats |
|  Comparison | `/comparison` | Pick two teams' stadiums and compare them on bar, pie and radar charts |
|  Timeline | `/timeline` | Line chart showing how a chosen stat (such as attendance) changes over time |

### Screenshots

**Landing page**

<img width="1900" height="943" alt="Landingpage" src="https://github.com/user-attachments/assets/0c5db7c2-593c-49e6-b440-35ecd995e88a" />


**Comparison page**


<img width="1900" height="942" alt="Comparisonpage" src="https://github.com/user-attachments/assets/2eefe9b5-f865-4730-ac7c-52f43aec7a1a" />


**Timeline page**

<img width="1900" height="942" alt="Timeline page" src="https://github.com/user-attachments/assets/f98a98e7-7975-42f2-94ad-30da8473d716" />

---

## Development process

### Architecture

```
React (Create React App)
 ├── App.js            → React Router routes
 ├── pages/
 │    ├── LandingPage.js
 │    ├── ComparisonPage.js   → Bar, Pie and Radar charts
 │    └── TimelinePage.js     → Line chart
 └── components/Footer.js
          │
          ▼  Axios GET requests
   MLB Stats API (statsapi.mlb.com)  → /teams, /schedule
```

### Data model / flow

![Data flow diagram](./src/components/Flowchart%20-%20Page%201%20(1).png)

### Key code snippet: fetching teams from the API

```js
const fetchTeams = async () => {
  const res = await axios.get("https://statsapi.mlb.com/api/v1/teams?sportId=1");
  // sportId=1 limits results to Major League teams only
  setVenues(res.data.teams);
};
```

### Why these choices

- **Chart.js** because it supports bar, pie, radar and line charts with one library, and works well with React through `react-chartjs-2`.
- **Axios** for cleaner request and error handling than plain `fetch`.
- **Different chart types per question:** bars to compare two values, radar to compare several stats at once, and a line chart for change over time.

### Challenges

- **Missing data in the API:** the MLB Stats API gives teams and stadiums, but not attendance or weather. To still build and test the charts, I generate realistic simulated values for each stadium.
- **Timeline chart kept breaking:** I couldn't get reliable day-by-day data from the API, so the timeline now uses a sample data set. The live version is still in the code, commented out, ready to switch back.
- **Two selections at once:** the comparison page needed separate state for each stadium so changing one didn't reset the other.

### Testing

- Manually tested each page in Chrome with different team selections.

---

## Final outcome

-  **Demo video (5–8 min):** [DemonstrationVideo.mp4](DemonstrationVideo.mp4). Click **View raw** to download and watch.

---

## Conclusion

**Highlights:** connecting a React app to a live public API and showing data in four chart types (bar, pie, radar and line).

**Challenges and how I solved them:** the API didn't have all the data I wanted, so I learned to work around it with simulated and sample data while keeping the real API calls in place.

**Future improvements**

- Connect a real attendance and weather data source to replace the simulated values
- Get the live timeline working again
- Player-level stats and player-vs-player comparison
- Caching API responses to reduce loading time
- Mobile-friendly chart layouts
- Deploying the app online

---

## Author

**Shaun Linde**
[251208@virtualwindow.co.za](mailto:251208@virtualwindow.co.za) · [GitHub](https://github.com/Slinde06)
