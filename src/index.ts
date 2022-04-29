import "reflect-metadata";
import { createConnection } from "typeorm";
import { createOrmConnection } from "./database/typeormconfig";
import { User } from "./entity/User";
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const tournamentsRouter = require("./routes/tournaments");
const express = require("express");

const server = express();
// connecting routes to api/ localhost9000
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());

server.use("/", userRouter);
server.use("/", tournamentsRouter);

createOrmConnection()
  .then(() => {
    console.log("Successfully connected to database(workbench)!");
    server.listen(9000, () => {
      console.log("Listening to port: 9000(in the api)");
    });
  })
  //catching an error if there are connection issues
  .catch((error) => console.log(error));
