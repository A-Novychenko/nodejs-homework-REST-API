// ответ должен иметь статус-код 201 !!!  ------- ГОТОВО

// *** нужно проверить что возвращается при рег...
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

const express = require("express");
const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const {DB_HOST, PORT = 3000} = process.env;

const register = require("./register");

const app = express();
const server = app.listen(PORT);

app.use(express.json());

app.post("/api/register", register);

describe("test register controller", function () {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    server.close();
  });

  it("test register controller", async () => {
    await request(app)
      .post("/api/register")
      .send({
        email: "TEST@example.com",
        password: "examplepassword",
      })

      .expect(201);
  });
});