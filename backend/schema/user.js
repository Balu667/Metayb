const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        default: 1  // 1 - user 2 - admin
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("user", userSchema)