import { verifyJWT } from "../utils/tokenUtils.js";
import {
  UnauthenticatedError,
  BadRequestError,
} from "../errors/customErrors.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers['token'];

  if (!token) {
    return res.status(401).json({
      data: {},
      message: 'Unauthorized',
      status: 401
    });
  }

  try {
    const { userId, role, name } = verifyJWT(token);
    req.user = { userId, role, name };
    next();
  } catch (error) {
    console.error(error);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        data: {},
        message: 'Unauthorized',
        status: 401
      });
    }
    res.json({
      data: {},
      message: 'Internal server error',
      status: 500
    });
  }
};

// export const authenticateUser = async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) throw new UnauthenticatedError("authentication invalid");

//   try {
//     const { userId, role } = verifyJWT(token);
//     const testUser = userId === "64c23b9d9e26a247e940229f";
//     req.user = { userId, role, testUser };
//     next();
//   } catch (error) {
//     throw new UnauthenticatedError("authentication invalid");
//   }
// };

// export const authorizePermissions = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       throw new UnauthorizedError("Unauthorized to access this route");
//     }
//     next();
//   };
// };

// export const checkForTestUser = (req, res, next) => {
//   if (req.user.testUser) {
//     throw new BadRequestError("Demo User. Read Only!");
//   }
//   next();
// };
