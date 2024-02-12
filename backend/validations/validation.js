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

    validator.getDocsByDocboxId = [
        check('boxId').notEmpty().withMessage('boxId cannot be empty').isMongoId().withMessage('Invalid boxId'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.uploadFile = [
        check('userId').notEmpty().withMessage('userId cannot be empty').isMongoId().withMessage('userId boxId'),
        check('boxId').notEmpty().withMessage('boxId cannot be empty').isMongoId().withMessage('Invalid boxId'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.deleteFile = [
        check('userId').notEmpty().withMessage('userId cannot be empty').isMongoId().withMessage('userId boxId'),
        check('fileId').notEmpty().withMessage('fileId cannot be empty').isMongoId().withMessage('Invalid fileId'),
        check('fileName').notEmpty().withMessage('fileName cannot be empty'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.getFileById = [
        check('fileId').notEmpty().withMessage('fileId cannot be empty').isMongoId().withMessage('Invalid fileId'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    //Docbox validations
    validator.createDocBox = [
        check('boxName').notEmpty().withMessage('boxName cannot be empty'),
        check('status').notEmpty().withMessage('status cannot be empty'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]

    validator.deleteDocBox = [
        check('boxId').notEmpty().withMessage('boxId cannot be empty').isMongoId().withMessage('Invalid boxId'),
        (req, res, next) => {
            const errors = validationResult(req).array();
            if (errors.length > 0) {
                data.response = errors[0].msg;

                return res.send(data);
            }

            return next();
        }
    ]
    
    validator.addUserToDocBox = [
        check('boxId').notEmpty().withMessage('boxId cannot be empty').isMongoId().withMessage('Invalid boxId'),
        check('users').isArray("users must be array"),
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