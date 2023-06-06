const {
  usersFetcher,
  userCreator,
  userEditor,
  userUpdater,
  userRemover,
} = require("../repos/users");

const getUsers = async (req, res) => {
  try {
    const data = await usersFetcher(req.query);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    await userCreator(req.body);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userEditor(req.params.userId);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    await userUpdater(req.body);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userRemover(req.params.id);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
