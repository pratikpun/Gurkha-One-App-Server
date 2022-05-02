import { getRepository } from "typeorm";
import { Tournaments } from "../entity/Tournaments";
import { Team } from "../entity/Team";
import { FavouriteTeam } from "../entity/FavouriteTeam";
import { UpcomingTournaments } from "../entity/UpcomingTournaments";
import { User } from "../entity/User";
const authCheck = require("../authCheck");

const express = require("express");
const router = express.Router();
//const authCheck = require("../authCheck");
//const jwt = require("jsonwebtoken");

router.get("/api/tournaments", authCheck, async (req, res, error) => {
  const data = await getRepository(Tournaments).find();
  //res.send("Hello sent");
  res.send(data);
});
router.post("/api/tournaments", async (req, res, error) => {
  const tournamentName = req.body.value;
  const data = await getRepository(Tournaments).find({ Name: tournamentName });

  res.send(data);
});

router.get("/api/teams", authCheck, async (req, res, error) => {
  const data = await getRepository(Team).find();
  //res.send("Hello sent");
  res.send(data);
});

router.post("/api/teams", async (req, res, error) => {
  const teamName = req.body.value;
  //res.send(teamName);
  //console.log(teamName);
  const data = await getRepository(Team).find({ teamName: teamName });
  res.send(data);
});

router.post("/api/favourites", async (req, res, error) => {
  let favouriteTeam = new FavouriteTeam();

  favouriteTeam.userID = req.body.userID;
  favouriteTeam.teamName = req.body.team.teamName;
  //res.send(teamName);
  //   console.log(req.body.team.teamName);
  //   console.log(req.body.userID);
  const data = await getRepository(FavouriteTeam).save(favouriteTeam);
  res.send("Successfully saved");
});

router.get("/api/favourites/:userID", authCheck, async (req, res, error) => {
  const userID = req.params.userID;
  //console.log(userID);
  const data = await getRepository(FavouriteTeam).find({ userID: userID });
  //res.send("Hello sent");
  res.send(data);
});

router.delete("/api/favourites/:userID/:teamName", async (req, res, error) => {
  const userID = req.params.userID;
  const teamName = req.params.teamName;

  const data = await getRepository(FavouriteTeam).find({ teamName: teamName });
  const deleteTeam = await getRepository(FavouriteTeam).remove(data);
  const remaningData = await getRepository(FavouriteTeam).find({
    userID: userID,
  });

  res.send(remaningData);
});

router.get("/api/upcoming", authCheck, async (req, res, error) => {
  //const userID = req.params.userID;
  //console.log(userID);
  const data = await getRepository(UpcomingTournaments).find();
  //res.send("Hello sent");
  res.send(data);
});

router.delete("/api/deleteUser/:userID", async (req, res, error) => {
  const userID = req.params.userID;
  console.log(userID);
  const data = await getRepository(User).find({ userID: userID });
  const deleteUser = await getRepository(User).remove(data);
  //console.log(deleteUser);
  res.send(deleteUser);
});

module.exports = router;
