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
const validation = require("../validations/validation")();

const bikeRouter = express.Router();

bikeRouter.get("/getAllBikes", verifyToken, getAllBikes);
bikeRouter.post("/insertBike", validation.insertBike, insertBike);
bikeRouter.post("/startAssembleBike", validation.startAssembleBike, verifyToken, startAssembleBike);
bikeRouter.post("/completeAssembleBike", validation.completeAssembleBike, verifyToken, completeAssembleBike);
bikeRouter.post(
  "/getProgressAssembleBikeByEmployeeId", validation.getAssembleBikesByEmpId, verifyToken,
  progressAssembleBikeByEmployeeId
);
bikeRouter.post("/getAllAssembleBikes", verifyToken, getAllAssembleBikes);
bikeRouter.post("/getAssembleBikesByEmpId", validation.getAssembleBikesByEmpId, verifyToken, getAssembleBikesByEmpId);

module.exports = bikeRouter;
