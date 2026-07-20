const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../server");

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test("serves the public webpage", async () => {
  const response = await fetch(baseUrl);
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(body, /Addition service/);
});

test("adds two numbers using the GET endpoint", async () => {
  const response = await fetch(`${baseUrl}/api/add?num1=12.5&num2=7.5`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    num1: 12.5,
    num2: 7.5,
    operation: "addition",
    result: 20
  });
});

test("rejects missing or invalid numbers", async () => {
  const response = await fetch(`${baseUrl}/api/add?num1=hello&num2=7`);
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.match(body.error, /valid numbers/);
});
