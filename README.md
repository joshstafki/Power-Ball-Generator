Powerball Pattern Generator
This is a web-based Powerball number generator that creates "predicted" combinations based on the historical frequency of winning numbers. The app is built entirely with client-side code (HTML, CSS, and JavaScript) and is ready to be deployed on any static site host (like GitHub Pages).

[Add a screenshot of the app in action here]

Features
Weighted Number Generation: Generates 5 main numbers (1-69) and 1 Powerball number (1-26) using a weighted random algorithm.

Data-Driven: The "weights" are based on the actual frequency of winning numbers from the included p.csv dataset.

Modern UI: A clean, responsive, and visually appealing interface with animated number reveals.

1-Hour Cooldown: Implements a client-side 1-hour rate limit using localStorage to prevent repeated generation.

Export as Image: A "Save Numbers as Image" button appears after generation, allowing you to download a PNG of your numbers using the html2canvas library.

How It Works: The "Pattern" Algorithm
This tool is for entertainment purposes only. Powerball is a game of chance, and past results do not statistically influence future random drawings.

The "pattern" algorithm works as follows:

Data Analysis: The provided p.csv file was analyzed to extract all winning numbers since the last major Powerball rule change on October 7, 2015 AD.

Frequency Calculation: The frequency (total count) of each main number (1-69) and each Powerball number (1-26) was calculated from this filtered dataset.

Data Embedding: To make the app fast and serverless, these calculated frequencies are embedded directly into the script.js file as JavaScript objects.

Weighted Selection: When you click "Generate," the script creates a "weighted" array where numbers that appeared more frequently in the past are more likely to be selected by the random number generator.

Tech Stack
HTML5: Provides the core structure of the application.

CSS3: Used for all styling, layout (Flexbox), and animations.

JavaScript (ES6+): Powers all application logic, including number generation, rate limiting, and DOM manipulation.

html2canvas: A JavaScript library used to "screenshot" the number display and convert it to a downloadable PNG image.

How to Use
No installation or build steps are required.

Option 1: Run Locally

Download the files (index.html, style.css, script.js).

Open index.html in your favorite web browser.

Option 2: Host on GitHub Pages

Upload index.html, style.css, and script.js to a new GitHub repository.

In your repository's Settings > Pages, select the main branch as your source.

Your site will be live and accessible to anyone.

Project Files
index.html: The main HTML file containing the page structure, including the number balls, buttons, and info boxes. It also imports the html2canvas library from a CDN.

style.css: The stylesheet that defines the app's appearance, including the "glassmorphism" card, button styles, and number ball animations.

script.js: The heart of the application. This file contains:

The pre-processed frequency data (from p.csv).

The weighted number generation algorithm.

The 1-hour cooldown logic using localStorage.

The image export functionality using html2canvas.

p.csv (Original Data): This file contains the raw historical data. It is not needed for the live application to run, as its data has already been processed and embedded into script.js.
