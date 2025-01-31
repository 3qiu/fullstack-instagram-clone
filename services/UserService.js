const User = require("../models/index").users;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = class UserService {
  //Read
  static async findAll() {
    try {
      const allUser = await User.findAll();
      return allUser;
    } catch (error) {
      console.log(`could not find all user${error}`);
      return error;
    }
  }

  static async findOne(id) {
    try {
      const user = await User.findByPk(id);
      return user != null ? user : null;
    } catch (error) {
      console.log(`could not find one user and an error was occured`);
      return error;
    }
  }
  //Login
  static async login(body) {
    try {
      const user = await User.findOne({ where: { email: body.email } });
      if (!user) {
        var err = Error(`user not found`);
        err.status = 400;
        throw err;
      }
      if (await bcrypt.compare(body.password, user.password)) {
        return user;
      } else {
        var err = Error(`incorrect password`);
        err.status = 401;
        throw err;
      }
    } catch (error) {
      console.log(`could not login user`);
      return error;
    }
  }
  //Create
  static async createUser(body) {
    try {
      const hash = await bcrypt.hash(body.password, 10);
      var data = body;
      data.password = hash;
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log(`could not create user with email ${body.email}`);
      console.log(error);
      return error;
    }
  }
  //Update
  static async updateUser(content) {
    try {
      const user = await User.findByPk(content.id);
      if (user != null) {
        user.set(content);
        await user.save();
        return user.dataValues;
      } else {
        console.log("user not found");
        throw Error("user not found");
      }
    } catch (error) {
      console.log(`could not update user`);
    }
  }
};
