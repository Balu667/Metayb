const express = require("express");
const {
  getAllBikes,
  insertBike,
  completeAssembleBike,
  startAssembleBike,
  progressAssembleBikeByEmployeeId,
  getAllAssembleBikes,
  getAssembleBikesByEmpId,
} = require("../controllers/bike");
const { verifyToken } = require("../auth/auth");

const bikeRouter = express.Router();

bikeRouter.get("/getAllBikes", verifyToken, getAllBikes);
bikeRouter.post("/insertBike", insertBike);
bikeRouter.post("/startAssembleBike", verifyToken, startAssembleBike);
bikeRouter.post("/completeAssembleBike", verifyToken, completeAssembleBike);
bikeRouter.post(
  "/getProgressAssembleBikeByEmployeeId", verifyToken,
  progressAssembleBikeByEmployeeId
);
bikeRouter.post("/getAllAssembleBikes", verifyToken, getAllAssembleBikes);
bikeRouter.post("/getAssembleBikesByEmpId", verifyToken, getAssembleBikesByEmpId);

module.exports = bikeRouter;
