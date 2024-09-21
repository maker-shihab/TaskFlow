import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.authLogin);
router.post("/logout", AuthController.authLogout);
router.post("/refresh-token", AuthController.authRefreshToken);
router.post("/forgot-password", AuthController.authForgotPassword);
router.post("/reset-password", AuthController.authResetPassword);
router.post("/send-verification", AuthController.authSendVerificationEmail);
router.post("/resend-verification", AuthController.authResendVerificationEmail);
router.post("/verify-email", AuthController.authVerifyEmail);
