const { validationResult } = require('express-validator')


const validateCampus = (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        });
    }
    next()
}

module.exports = {validateCampus}