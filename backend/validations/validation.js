//Imports
const { check, validationResult } = require('express-validator')

//User Validation
module.exports = function (app, io) {
    let data = { status: 0, response: 'Invalid Request' }, validator = {}

    validator.registerUser = [
        check('role').notEmpty().withMessage('role cannot be empty').isNumeric('role must be number'),
        check('password').notEmpty().withMessage('password cannot be empty'),
        check('email').notEmpty().withMessage('email cannot be empty').isEmail().withMessage('Invalid email'),
        check('username').notEmpty().withMessage('username cannot be empty'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    
    validator.loginUser = [
        check('email').isEmail().withMessage('Invalid email'),
        check('password').notEmpty().withMessage('password cannot be empty'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.logoutUser = [
        check('userId').notEmpty().withMessage('userId cannot be empty').isMongoId().withMessage("Invalid userid"),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.insertBike = [
        check('name').notEmpty().withMessage('bikeName cannot be empty'),
        check('assembleTime').notEmpty().withMessage('assembleTime cannot be empty').isNumeric().withMessage("assembleTime must be number"),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.startAssembleBike = [
        check('bikeId').notEmpty().withMessage('bikeId cannot be empty').isMongoId().withMessage('Invalid bikeId'),
        check('employeeId').notEmpty().withMessage('employeeId cannot be empty').isMongoId().withMessage('Invalid employeeId'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]
    
    validator.completeAssembleBike = [
        check('assembleId').notEmpty().withMessage('assembleId cannot be empty').isMongoId().withMessage('Invalid assembleId'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.getAssembleBikesByEmpId = [
        check('employeeId').notEmpty().withMessage('employeeId cannot be empty').isMongoId().withMessage('Invalid employeeId'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    return validator;
}