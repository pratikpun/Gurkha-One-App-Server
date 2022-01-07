import "reflect-metadata";
import { createConnection } from "typeorm";
import { createOrmConnection } from "./database/typeormconfig";
import { User } from "./entity/User";
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const express = require("express");

const server = express();
// connecting routes to api/ localhost9000
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());

server.use("/", userRouter);

createOrmConnection()
  .then(() => {
    console.log("Successfully connected to database(workbench)!");
    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // //auto generated from mysql workbench
    // //user.userID = 1;
    // user.firstName = "Another";
    // user.email = "test2";
    // user.password = "10";
    // await connection.manager.save(user);
    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User);
    // console.log("Loaded users: ", users);
    // console.log("Here you can setup and run express/koa/any other framework.");
    server.listen(9000, () => {
      console.log("Listening to port: 9000(in the api)");
    });
  })
  //catching an error if there are connection issues
  .catch((error) => console.log(error));
