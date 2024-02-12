const mongoose = require("mongoose")

const bikeSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    assembleTime: {
        type: Number,
        require: true
    },
    bikeImgPath: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("bike", bikeSchema)