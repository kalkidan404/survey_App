
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

// REGISTER
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "First name, last name, email, and password are required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// GET CURRENT USER
const getme = async (req, res, next) => {
  try {
    const me = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    if (!me) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user: me });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create the JWT and set it in a cookie here
    // if your login flow uses JWT authentication.

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

export { register, getme, login, logout };
