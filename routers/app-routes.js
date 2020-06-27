const router = require("express").Router();
const userAuthController = require('../controllers/user-auth');
const appRoutes = require("../controllers/app-routes");

router.get('/',appRoutes.getIndex);


module.exports = router;
