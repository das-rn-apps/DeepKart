import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { generateToken } from "../utils/jwt.utils";
import Address from "../models/address.model";
import { validationResult, body } from "express-validator";
import mongoose from "mongoose";

// User Registration Validation Middleware
export const validateRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
];

// Address Creation Validation Middleware
export const validateAddressCreation = [
  body("addressLine1").notEmpty().withMessage("Address line 1 is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("postalCode").notEmpty().withMessage("Postal code is required"),
  body("country").notEmpty().withMessage("Country is required"),
];

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { username, email, password, firstName, lastName, phoneNumber } =
      req.body;

    if (await User.findOne({ email })) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password || ""))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id.toString());
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = await User.findById(req.user.userId)
      .populate("addresses")
      .lean();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};
export const getAddressById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.params.addressId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const address = await Address.findById(req.params.addressId);
    if (!address) {
      res.status(404).json({ message: "Address not found" });
      return;
    }

    res.json(address);
  } catch (error) {
    res.status(500).json({ message: "Error fetching address", error });
  }
};

export const addUserAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { addressLine1, addressLine2, city, state, postalCode, country } =
      req.body;
    const newAddress = new Address({
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      userId: req.user.userId,
    });

    await newAddress.save();
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { addresses: newAddress._id } },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding user address", error });
  }
};

export const validateAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  await Promise.all(
    validateAddressCreation.map((validation) => validation.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  res.json({ message: "Address is valid", address: req.body });
};

export const setDefaultAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user.userId;
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
      res.status(400).json({ message: "Invalid address ID" });
      return;
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const objectAddressId = new mongoose.Types.ObjectId(addressId);
    if (
      !user.addresses.some(
        (addr) => addr.toString() === objectAddressId.toString()
      )
    ) {
      res.status(400).json({ message: "Address not found for user" });
      return;
    }

    await Address.updateMany({ userId }, { isDefault: false });
    await Address.findByIdAndUpdate(addressId, { isDefault: true });

    res.json({ message: "Default address set" });
  } catch (error) {
    res.status(500).json({ message: "Error setting default address", error });
  }
};
