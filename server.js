const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function parseNumbers(firstValue, secondValue) {
  const num1 = Number(firstValue);
  const num2 = Number(secondValue);

  if (
    firstValue === undefined ||
    secondValue === undefined ||
    !Number.isFinite(num1) ||
    !Number.isFinite(num2)
  ) {
    return null;
  }

  return { num1, num2 };
}

app.get("/api/add", (req, res) => {
  const numbers = parseNumbers(req.query.num1, req.query.num2);

  if (!numbers) {
    return res.status(400).json({
      error: "Please provide two valid numbers using num1 and num2.",
      example: "/api/add?num1=5&num2=7"
    });
  }

  const { num1, num2 } = numbers;
  return res.json({
    num1,
    num2,
    operation: "addition",
    result: num1 + num2
  });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "SIT725 Calculator API" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`SIT725 server running at http://localhost:${PORT}`);
    console.log(
      `Try the addition API: http://localhost:${PORT}/api/add?num1=5&num2=7`
    );
  });
}

module.exports = app;
