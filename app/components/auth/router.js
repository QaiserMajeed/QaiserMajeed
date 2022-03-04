const router = require('express').Router();
const auth = require('../../middleware/auth');
const handler = require('./handler');
const partnerHandler = require('../partner/handler');

// Signup/Login
router.post('/register', handler.register);
router.post('/register-partner', partnerHandler.create);
router.post('/resend-otp', handler.resendOtp);
router.post('/verify-otp', handler.verifyOTP);
router.post('/login', handler.login);
// router.post('/register-super-admin', handler.addSuperAdmin);

router.post('/check/login', handler.checkLogin);
// login api for admin portal (only Login admin where type === 1)
router.post('/login/superadmin/portal', handler.adminPortalLogin);
// forgot password
router.post('/forgot-password', handler.forgotPassword);
router.get('/generate-password', handler.generatePassword);
router.get('/sendToken', handler.sendToken);
// reset forgot password
router
  .route('/reset/:token')
  .get(handler.resetPasswordLink)
  .post(handler.resetPassword);
// Authenticate routes
router.post('/logout', handler.logout);
// router.post('/process-payment', auth, handler.registrationPayment);

module.exports = router;
