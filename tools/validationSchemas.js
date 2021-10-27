const {
    checkSchema,
    validationResult
} = require('express-validator');

const postRootContestant = checkSchema({
    "name": {
        in: ["body"],
        notEmpty: {
            "errorMessage": "Name cannot be empty."
        },
        isString: {
            "errorMessage": "Name should be a string."
        },
        isAlpha: {
            "errorMessage": "Name cannot contain anything except for Alphabets and space."
        },
        trim: true,
    },
    "costumeTitle": {
        in: ["body"],
        notEmpty: {
            "errorMessage": "Costume title cannot be empty."
        },
        isString: {
            "errorMessage": "Costume title should be a string."
        },
        trim: true
    },
    "costumeImgUrl": {
        in: ["body"],
        notEmpty: {
            "errorMessage": "Costume Image URL cannot be empty."
        },
        isString: {
            "errorMessage": "Costume Image URL should be a string."
        },
        isURL: {
            "errorMessage": "Costume Image URL should be a URL, please check the URL again."
        },
        trim: true,
    },
    "city": {
        in: ["body"],
        notEmpty: {
            "errorMessage": "City cannot be empty."
        },
        isString: {
            "errorMessage": "City should be a string."
        },
        isAlpha: {
            "errorMessage": "City cannot contain anything except for Alphabets and space."
        },
        trim: true,
    },
    "country": {
        in: ["body"],
        notEmpty: {
            "errorMessage": "Country cannot be empty."
        },
        isString: {
            "errorMessage": "Country should be a string."
        },
        isAlpha: {
            "errorMessage": "Country cannot contain anything except for Alphabets and space."
        },
        trim: true,
    },
    "votes": {
        in: ["body"],
        optional: true,
        isEmpty: {
            errorMessage: "Votes should have some value, or else should not be sent."
        },
        isInt: {
            errorMessage: "Votes should be integer value."
        },
        toInt: true
    },
    "id": {
        in: ["body"],
        optional: true,
        isEmpty: {
            errorMessage: "ID cannot be empty, or else should not be provided"
        },
        isString: {
            errorMessage: "ID should be a string value."
        },
        isUUID: {
            errorMessage: "ID should be a valid UUID"
        }
    }
});

const getContestantViaId = checkSchema({
    "id": {
        in: "params",
        notEmpty: {
            errorMessage: "ID should be provided.",
        },
        isString: {
            errorMessage: "ID should be a string."
        },
        isUUID: {
            errorMessage: "ID should be a UUID."
        },
        trim: true
    }
});
const globalValidator = (req, res, next) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        res.status(400).send({
            "status": "error",
            "message": results.array({
                onlyFirstError: true
            })
        });
        return;
    }
    next();
}

module.exports = {
    postRootContestant,
    getContestantViaId,
    globalValidator
}