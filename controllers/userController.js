const db = require("../config/db");
const { User } = db;

exports.addUser = async (req, res) => {
  try {
    //   const user = new User({
    //     userName: req.body.userName,
    //     age: req.body.age,
    //     gender: req.body.gender,
    //     email: req.body.email,
    //     password : req.body.password,
    //   });

    //   const newUser = await user.save();

    // or

    const { userName, age, gender, email, password } = req.body;

    const user = {
      userName,
      age,
      gender,
      email,
      password,
    };

    const newUser = await User.create(user);

    const result = {
      id: newUser.id,
      userName: newUser.userName,
      age: newUser.age,
      gender: newUser.gender,
      email: newUser.email,
      password: newUser.password,
    };

    return res
      .status(200)
      .json({ data: result, message: "User Added Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAlluser = async (req, res) => {
  try {
    const users = await User.findAll();

    const result = users.map((user) => {
      return {
        id: user.id,
        userName: user.userName,
        age: user.age,
        gender: user.gender,
        email: user.email,
      };
    });
    return res
      .status(200)
      .json({ data: result, message: "User get Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getByID = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = await User.findByPK(id);
  
      if (!user) {
        const error = new Error("user not found..!");
        error.stausCode = 404;
        throw error;
      }

      const result = {
        id: user.id,
        userName: user.userName,
        age: user.age,
        gender: user.gender,
        email: user.email,
      };
  
      return res.status(200).json({
        success: true,
        data : result,
        message: "user deleted successfully..!",
      });
    } catch (error) {
      const status = error.stausCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }
  };
  

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id)

    user.userName = req.body.userName
    user.age = req.body.age
    user.gender = req.body.gender
    user.email = req.body.email

    const newUser =  await user.save()

    // if (!newUser) {
    //   const error = new Error("user not found..!");
    //   error.stausCode = 404;
    //   throw error;
    // }

    const result = {
      id: newUser.id,
      userName: newUser.userName,
      age: newUser.age,
      gender: newUser.gender,
      email: newUser.email,
    };

    return res.status(200).json({
      success: true,
      data: result,
      message: "user updated successfully..!",
    });
  } catch (error) {
    const status = error.stausCode || 500;
    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.destroy({ where: { id } });

    if (!user) {
      const error = new Error("user not found..!");
      error.stausCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      message: "user deleted successfully..!",
    });
  } catch (error) {
    const status = error.stausCode || 500;
    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};
