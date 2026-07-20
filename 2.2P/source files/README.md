# SIT725 Task 2.2P - Express Web Server

This project is a simple Node.js and Express application created for SIT725
Task 2.2P. It serves a webpage from the `public` folder and provides a REST API
that adds two numbers on the server.

## Features

- Express web server
- Static HTML, CSS and JavaScript served from `public`
- GET endpoint for server-side addition
- Input validation and helpful JSON errors
- Browser calculator that calls the API
- Automated tests using the built-in Node.js test runner

## Requirements

- Node.js 18 or later
- npm

## Run the project

1. Clone the repository and enter its folder:

   ```bash
   git clone https://github.com/sahancz/SIT725_s224817232.git
   cd "SIT725_s224817232/2.2P/source files"
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in a browser.

## REST API

### Add two numbers

Send a GET request to:

```text
GET /api/add?num1=5&num2=7
```

Example URL:

[http://localhost:3000/api/add?num1=5&num2=7](http://localhost:3000/api/add?num1=5&num2=7)

Successful response:

```json
{
  "num1": 5,
  "num2": 7,
  "operation": "addition",
  "result": 12
}
```

If either value is missing or invalid, the server returns HTTP status `400`:

```json
{
  "error": "Please provide two valid numbers using num1 and num2.",
  "example": "/api/add?num1=5&num2=7"
}
```

## Run the tests

```bash
npm test
```

The tests verify the webpage, a successful addition, and invalid input handling.

## Project structure

```text
.
├── public/
│   ├── index.html
│   ├── script.js
│   └── styles.css
├── test/
│   └── server.test.js
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Author

**Name:** Sahan Medagedara  
**Student ID:** s224817232
