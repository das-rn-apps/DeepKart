import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  addUserAddress,
  validateAddress,
  setDefaultAddress,
  validateRegistration,
  validateAddressCreation,
  getAddressById,
} from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", loginUser);
router.get("/me", authenticate, getMe);
router.get("/me/:addressId", authenticate, getAddressById);
router.post(
  "/me/addresses",
  authenticate,
  validateAddressCreation,
  addUserAddress
);
router.post("/addresses/validate", validateAddress);
router.put("/me/addresses/:addressId/default", authenticate, setDefaultAddress);

export default router;
