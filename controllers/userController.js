import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import moment from "moment/moment.js";
import OrderDetails from "../models/OrderDetails.js";
import MenuItems from "../models/MenuItems.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    return res.json({
      data: {},
      message: 'user not found',
      status: 404
    });
  }
  const userWithoutPassword = user.toJSON();
  return res.json({
    data: userWithoutPassword,
    message: 'single menu items',
    status: 200
  });
};


export const updateUser = async (req, res) => {

  try {
    const { userId } = req.user;
    const { name, email, password } = req.body;

    const user = await User.findById(userId);

    // If user not found, return 404
    if (!user) {
      return res.json({
        data: {},
        message: 'user not found',
        status: 404
      });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await hashPassword(req.body.password);
      user.password = hashedPassword;
    }

    await user.save();
    return res.json({
      data: user,
      message: 'User updated successfully',
      status: 200
    });
  } catch (error) {
    console.error(error);
    res.json({
      data: {},
      message: 'Internal server error',
      status: 500
    });
  }
};

export const getDashboardDetails = async (req, res) => {
  try {
    const start = moment().startOf('month').unix();
    const end = moment().endOf('month').unix();

    const [totalOrders, totalMenuItems] = await Promise.all([
      OrderDetails.countDocuments({ time: { $gte: start, $lte: end } }).lean(),
      MenuItems.countDocuments()
    ])

    return res.json({
      data: {
        totalOrders,
        totalMenuItems
      },
      message: 'Dashboard details',
      status: 200
    })



  } catch (error) {
    console.error(error);
    res.json({
      data: {},
      message: 'Internal server error',
      status: 500
    });
  }

}
