const { Router } = require('express');
const { check } = require('express-validator');
const { validateCampus } = require('../middlewares/validate-campus');
const { validateJWT } = require('../middlewares/validate-jwt')
const router = Router();

const {
    allElephants,
    createElephant,
    updateElephant,
    deleteElephant,
    allWord,
    sex,
    specie
  } = require('../controllers/elephants');

router.get('/',[validateJWT], allElephants);
router.get('/:word',[validateJWT], allWord);
router.get('/sex/:sex', [validateJWT], sex);
router.get('/specie/:specie',[validateJWT], specie);

router.post('/',
  [
    check('name', 'el email es obligatorio').not().isEmpty(),
    check('sex', 'el sexo es obligatorio').not().isEmpty(),
    check('species', 'la especie debe ser obligatoria').not().isEmpty(),
    check('affiliation', 'el zoo es obligatorio').not().isEmpty(),
    validateCampus,
  ],
createElephant);

router.put('/:id',  [
  check('name', 'el email es obligatorio').not().isEmpty(),
  check('sex', 'el sexo es obligatorio').not().isEmpty(),
  check('species', 'la especie debe ser obligatoria').not().isEmpty(),
  check('affiliation', 'el zoo es obligatorio').not().isEmpty(),
  validateCampus,
], updateElephant);

router.delete('/:id', [validateJWT ], deleteElephant);



module.exports = router;