module.exports = (connection, DataTypes) => {
  const userSchema = {
    userName: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  };
  const user = connection.define("user", userSchema);

  return user;
};
