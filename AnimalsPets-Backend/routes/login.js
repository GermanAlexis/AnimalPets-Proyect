const { Router } = require('express');
const { check } = require('express-validator');
const { validateCampus } = require('../middlewares/validate-campus');
const { login } = require('../controllers/login');

const router = Router();

router.post(
  '/',
  [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el role es obligatorio').not().isEmpty(),
    validateCampus,
  ],
  login
);


module.exports = router;
