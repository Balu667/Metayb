const mongoose = require("mongoose")

const assembleBikeSchema = mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    bikeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bike',
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    status: {
        type: Number,
        default: 2   // 1- completed 2-Inprogress
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("assembleBikes", assembleBikeSchema)