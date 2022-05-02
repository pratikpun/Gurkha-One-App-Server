import { getRepository, SimpleConsoleLogger } from "typeorm";
import { User } from "../entity/User";
import { Team } from "../entity/Team";
import bcrypt from "bcrypt";
import { FavouriteTeam } from "../entity/FavouriteTeam";
const authCheck = require("../authCheck");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

const saltRounds = 10;

router.get("/", (req, res) => {
  res.send("This is a home page.");
});

// gets all users from the database
// router.get("/api/users", async (req, res, error) => {
//   const data = await getRepository(User).find();
//   res.send(data);
// });

// get specific user from the login textInput.
router.post("/api/login", async (req, res, error) => {
  // const user = {
  //   email: req.body.email,
  //   password: req.body.password,
  // };

  let user = new User();
  user.email = req.body.email;
  user.password = req.body.password;

  const data = await getRepository(User).findOne({
    email: user.email,
  });

  //this compares the requested password and the responded password from the database.
  // const validPassword = await bcrypt.compare(data.password, req.body.password);
  // console.log(validPassword);

  // logic for login, any error will cause data to be undefined.
  if (data === undefined) {
    //fix login logic here
    res.send({
      data: {
        success: false,
        msg: "User not found!",
      },
    });
    return;
  } else {
    // compare password given from user and the hash from the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      data.password
    );
    console.log(validPassword);
    //comapre data.email and validPassword then log in
    if (data.email && validPassword) {
      const loginDate = new Date();
      //console.log("Successfully Logged in");
      // token is generated after successful login
      const token = jwt.sign(
        {
          userEmail: data.email,
        },
        "secretKey",
        { expiresIn: "2d" }
      );
      res.send({
        data: {
          token: token,
          date: loginDate,
          success: true,
          msg: "Successfully logged in!",
          userID: data.userID,
          firstName: data.firstName,
          email: data.email,
        },
      });

      //console.log(data);
      return;
    } else {
      res.send({
        data: {
          success: false,
        },
      });
      return;
    }
  }

  //res.send(data);
});

// register user
router.post("/api/register", async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      // user: "gurkhaone1@gmail.com",
      // pass: "gurkha2022",
    },
  });
  console.log(process.env.EMAIL);
  console.log(process.env.PASSWORD);

  let EmailDetails = {
    from: `Gurkha One`,
    to: req.body.email,
    subject: "Successful Registration with Gurkha One!",
    html: `<h2>Hello, ${req.body.firstName}! </h2> <br /> <p> Thank you for registering with Gurkha One. We are happy to have you on board 😁. </p> <br /> <p>Please go back to the app to log in!</p> <br /> <p>Gurkha One Team ❤️!</p>`,
  };

  let user = new User();
  // hash and salt the password
  const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
  // const hashPasswordString = hashPassword.toString();

  user.firstName = req.body.firstName;
  user.email = req.body.email;
  user.password = hashPassword;
  // get userData in the User database
  const userData = getRepository(User);

  // Logic for checking if email already exists in database
  const userEmail = await userData.findOne({ email: user.email });

  if (!userEmail) {
    const savedData = await userData.save(user);
    await transporter.sendMail(EmailDetails, (err) => {
      if (err) {
        console.log("Email not sent: ", err);
      } else {
        console.log("Email sent successfully!");
      }
    });
    res.send({
      msg: "success",
    });
    return;
  }
  if (userEmail) {
    res.send({
      msg: "exist",
    });
    return;
  }

  // find - shows all the users in the database
  // findOne - shows a specific user in the database
  // const userInDatabase = await userData.findOne(savedData);

  // // send the response data from the database to the client(front-end)
  // res.send(userInDatabase);
});

router.get("/api/dashboard", async (req, res, error) => {
  const data = await getRepository(Team).find();
  res.send(data);
});

router.put("/api/editProfile", async (req, res, error) => {
  const userID = req.body.userID;
  const name = req.body.name;
  const email = req.body.email;
  const userDetails = await getRepository(User).findOne({
    userID: userID,
  });

  console.log(userDetails);
  userDetails.email = email;
  userDetails.firstName = name;

  await getRepository(User).save(userDetails);

  const updatedData = await getRepository(User).findOne({
    userID: userID,
  });

  res.send({
    msg: "success",
    data: updatedData,
  });
});

module.exports = router;
