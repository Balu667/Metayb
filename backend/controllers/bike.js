const assembleBikes = require("../schema/assembleBikes");
const Bike = require("../schema/bike");
const user = require("../schema/user");
const { ObjectId } = require('bson')
const path = require('path')
const fs = require('fs')

const getAllBikes = async (req, res) => {
    let data = { status: 0, response: "Invalid request" },
        bikeData;

    try {
        bikeData = await Bike.find({});
        if (bikeData) {
            return res
                .status(200)
                .send({ status: 1, data: JSON.stringify(bikeData) });
        }

        res.status(500).send(data);
    } catch (error) {
        data.response = error.message;
        res.status(500).send(data);
    }
};

const insertBike = async (req, res) => {
    let data = { status: 0, response: "Invalid request" },
        insertBike;

    try {
        let { name, assembleTime } = req.body, files = req.files, imagePath;
        imagePath = path.join(__dirname , '..', 'fileUploads', files[0].originalname)
        fs.writeFileSync(imagePath, files[0].buffer);
        insertBike = await Bike.create({
            name,
            assembleTime,
            bikeImgPath: `fileUploads/${files[0].originalname}`
        });

        if (insertBike) {
            return res
                .status(201)
                .send({ status: 1, response: "Bike inserted successfully" });
        }

        res.status(500).send(data);
    } catch (error) {
        data.response = error.message;
        res.status(500).send(data);
    }
};

const startAssembleBike = async (req, res) => {
    let data = { status: 0, response: "Invalid request" },
        insertBikeAssemble,
        bikeData,
        employeeData;

    try {
        const { employeeId, bikeId } = req.body;

        bikeData = await Bike.findOne({ _id: bikeId });
        employeeData = await user.findOne({ _id: employeeId });
        let checkAssemble = await assembleBikes.findOne({
            employeeId: employeeId,
            status: 2,
        });

        if (checkAssemble) {
            return res
                .status(400)
                .send({
                    status: 0,
                    response:
                        "Employee already assigning the one bike, he could not assemble the another bike at same time",
                });
        }

        if (!bikeData && !employeeData) {
            return res.status(400).send(data);
        }

        insertBikeAssemble = await assembleBikes.create({
            bikeId,
            employeeId,
            startTime: new Date(),
        });

        setTimeout(async () => {
            await assembleBikes.findByIdAndUpdate({ _id: insertBikeAssemble._id }, { endTime: new Date(), status: 1 }, { new: true })
        }, bikeData.assembleTime * 60 * 1000)

        if (insertBikeAssemble) {
            return res
                .status(200)
                .send({
                    status: 1,
                    response: "Bike Assemble Started !",
                    data: JSON.stringify({ assembleId: insertBikeAssemble._id }),
                });
        }

        res.status(500).send(data);
    } catch (error) {
        data.response = error.message;
        res.status(500).send(data);
    }
};

const progressAssembleBikeByEmployeeId = async (req, res) => {
    let data = { status: 0, response: "Invalid request" },
        bikeData,
        employeeData;

    try {
        const { employeeId } = req.body;
        employeeData = await user.findOne({ _id: employeeId });

        if (!employeeData) {
            return res.status(400).send(data);
        }

        bikeData = await assembleBikes.find({
            employeeId,
            status: 2,
        });

        if (bikeData) {
            return res
                .status(200)
                .send({ status: 1, data: JSON.stringify(bikeData) });
        }

        res.status(500).send(data);
    } catch (error) {
        data.response = error.message;
        res.status(500).send(data);
    }
};

const completeAssembleBike = async (req, res) => {
    let data = { status: 0, response: "Invalid request" },
        updateBikeAssemble,
        assembleData;

    try {
        const { assembleId } = req.body;
        assembleData = await assembleBikes.findOne({ _id: assembleId });

        if (assembleData == null) {
            return res.status(400).send(data);
        }

        updateBikeAssemble = await assembleBikes.findByIdAndUpdate(
            { _id: assembleId },
            { endTime: new Date(), status: 1 },
            { new: true }
        );

        if (updateBikeAssemble) {
            return res
                .status(200)
                .send({ status: 1, response: "Bike Assemble completed !" });
        }

        res.status(500).send(data);
    } catch (error) {
        data.response = error.message;
        res.status(500).send(data);
    }
};

const getAllAssembleBikes = async (req, res) => {
    let data = { status: 0, response: "Invalid request" },
        assembleBikeData;

    try {
        let { startDate, endDate } = req.body,
            query = { status: 1 };

        if (startDate) {
            query.startTime = { $gte: new Date(startDate) };
        }
        if (endDate) {
            query.startTime = { $lte: new Date(endDate) };
        }

        assembleBikeData = await assembleBikes.aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: "bikes",
                    localField: "bikeId",
                    foreignField: "_id",
                    as: "bikeData",
                },
            },
            {
                $unwind: "$bikeData",
            },
            {
                $group: {
                    _id: "$bikeId",
                    count: { $sum: 1 },
                    documentData: { $first: "$$ROOT" },
                    bikeName: { $first: "$bikeData.name" },
                },
            },
            {
                $project: {
                    _id: "$documentData._id",
                    bikeId: "$_id",
                    count: 1,
                    name: "$bikeName",
                    employeeId: "$documentData.employeeId",
                    startTime: "$documentData.startTime",
                    endTime: "$documentData.endTime",
                },
            },
        ]);
        if (assembleBikeData) {
            return res
                .status(200)
                .send({ status: 1, data: JSON.stringify(assembleBikeData) });
        }

        res.status(500).send(data);
    } catch (error) {
        data.response = error.message;
        res.status(500).send(data);
    }
};

const getAssembleBikesByEmpId = async (req, res) => {
    let data = { status: 0, response: "Invalid request" },
        assembleBikeData;

    try {
        let { employeeId, date } = req.body,
            query = { status: 1, employeeId: new ObjectId(employeeId) }, startDate, endDate;

        if (date) {
            startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0); 
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            query.startTime = { $gte: startDate, $lte: endDate };
        }

        assembleBikeData = await assembleBikes.aggregate([
            {
                $match: query,
            },
            {
                $lookup: {
                    from: "bikes",
                    localField: "bikeId",
                    foreignField: "_id",
                    as: "bikeData",
                },
            },
            {
                $unwind: "$bikeData",
            },
            {
                $group: {
                    _id: "$bikeId",
                    count: { $sum: 1 },
                    documentData: { $first: "$$ROOT" },
                    bikeName: { $first: "$bikeData.name" },
                },
            },
            {
                $project: {
                    _id: "$documentData._id",
                    bikeId: "$_id",
                    count: 1,
                    name: "$bikeName",
                    employeeId: "$documentData.employeeId",
                    startTime: "$documentData.startTime",
                    endTime: "$documentData.endTime",
                },
            },
        ]);
        if (assembleBikeData) {
            return res
                .status(200)
                .send({ status: 1, data: JSON.stringify(assembleBikeData) });
        }

        res.status(500).send(data);
    } catch (error) {
        data.response = error.message;
        res.status(500).send(data);
    }
};

module.exports = {
    getAllBikes,
    insertBike,
    startAssembleBike,
    completeAssembleBike,
    progressAssembleBikeByEmployeeId,
    getAllAssembleBikes,
    getAssembleBikesByEmpId
};
