// ответ должен иметь статус-код 200 ---ГОТОВО
// в ответе должен возвращаться токен ---  ГОТОВО
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {DB_HOST, PORT = 3000} = process.env;

const login = require("./login");

const app = express();
const server = app.listen(PORT);

app.use(express.json());

app.post("/api/login", login);

describe("test register controller", function () {
  const body = {
    email: "TEST@example.com",
    password: "examplepassword",
  };

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    server.close();
  });

  it("response has status code 200", async () => {
    const response = await request(app).post("/api/login").send(body);
    expect(response.status).toBe(200);
  });

  it("response has token", async () => {
    const response = await request(app).post("/api/login").send(body);

    expect(
      jwt.decode(response.body.data.token, {complete: true}).header.typ
    ).toBe("JWT");
  });

  it("a user object is returned with 2 fields email and subscription, both of which have a String data type", async () => {
    const response = await request(app).post("/api/login").send(body);

    expect(typeof response.body.data.user).toBe("object");
    expect(typeof response.body.data.user.email).toBe("string");
    expect(typeof response.body.data.user.subscription).toBe("string");
  });
});
