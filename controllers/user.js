const user = require("../models/user");
const UserService = require("../services/UserService");

module.exports = class User {
  //Read
  static async apiGetAlluser(req, res, next) {
    try {
      const user = await UserService.findAll;
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async apiGetOneuser(req, res, next) {
    try {
      const user = await UserService.findOne(req.params.id);
      if (user != null) {
        res.send(user);
      } else {
        res.status(404).json({ error: "user not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  //Login
  static async apiLoginUser(req, res, next) {
    try {
      const user = await UserService.login(req.body);
      if (user instanceof Error) {
        throw user;
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(error.status).json({ error: error.message });
    }
  }
  //Create
  static async apiCreateNewUser(req, res, next) {
    const body = req.body;
    try {
      const user = await UserService.createUser(body);
      if (user.errors != null) {
        throw Error("user exist");
      }
      res.status(201).json(user);
    } catch (error) {
      if (error.message == "user exist") {
        res.status(409).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message });
    }
  }
  //Update
  static async apiUpdateUserPassword(req, res, next) {
    try {
      const { id, password } = req.body;
      if (!id) {
        res.status(401);
      }
      const user = await UserService.updateUser({ id, password });
      if (user == null) {
        res.status(501).json({ error: "unknown error" });
      }
      res.status(206).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async apiUpdateUserPhone(req, res, next) {
    try {
      const { id, phone } = req.body;
      if (!id) {
        res.status(401);
      }
      const user = await UserService.updateUser({ id, phone });
      if (user == null) {
        res.status(501).json({ error: "unknown error" });
      }
      res.status(206).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //Delete
  static async apiDeleteuser(req, res, next) {
    try {
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
};
