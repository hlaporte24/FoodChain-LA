const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const { catchErrors } = require('../handlers/errorHandlers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', viewController.homepage);
router.get('/home',viewController.homepage);
router.get('/login',viewController.loginPage);
router.get('/about', viewController.aboutPage);
router.get('/volunteer',viewController.volunteerPage);
router.get('/contact',viewController.contactPage);
router.get('/volunteerInfo',viewController.volunteerInfo);
router.get('/produceInfo', viewController.produceInfo);
router.get('/viewAllVolunteers', catchErrors(viewController.showVolunteers));
router.get('/viewAllProduceInfo', catchErrors(viewController.showProduce));
router.get('/volunteerInfo/edit/:id', catchErrors(viewController.editVolunteer));
router.get('/volunteerInfo/delete/:id', catchErrors(viewController.deleteVolunteer));
router.get('/ProduceInfo/edit/:id', catchErrors(viewController.editProduce));
router.get('/ProduceInfo/delete/:id', catchErrors(viewController.deleteProduce));

router.post('/addVolunteer', viewController.createVolunteer);
router.post('/addProduce',viewController.createProduce);
router.post('/login', authController.login);



router.get('/logout', authController.logout);
router.get('/register', userController.registerForm);
router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);
router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  (authController.update)
);



module.exports = router;