// ответ должен иметь статус-код 200 ---ГОТОВО
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const {DB_HOST, PORT = 3000} = process.env;

const login = require("./login");

const app = express();
const server = app.listen(PORT);

app.use(express.json());

app.post("/api/login", login);

describe("test register controller", function () {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    server.close();
  });

  it("response has status code 200", async () => {
    await request(app)
      .post("/api/login")
      .send({
        email: "TEST@example.com",
        password: "examplepassword",
      })
      .expect(200);
  });
});
