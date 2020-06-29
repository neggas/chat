const router = require("express").Router();
const secureAuth = require("../middlewares/secureAuth");
const userAuthController = require('../controllers/user-auth');
const appRoutes = require("../controllers/app-routes");

router.get('/',secureAuth,appRoutes.getIndex);


module.exports = router;
