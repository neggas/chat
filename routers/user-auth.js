const router = require("express").Router();
const userAuthController = require('../controllers/user-auth');

router.get('/inscription',userAuthController.getInscription);

router.post('/inscription',userAuthController.postInscription);

router.get('/connexion',userAuthController.getConnexion);

router.post('/connxion',userAuthController.postConnexion);

module.exports = router;