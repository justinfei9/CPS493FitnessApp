/** @type {{ items: User[] }} */
//const data = require("../data/users.json");
const data = { items: require("../data/users.json").users };

/**
 * @typedef {import("../../client/src/models/users").User} User
 */
/**
 * Get all users
 * @returns {Promise<User[]>}
 */
async function getAll() {
  return data.items;
}
/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<User>}
 */
async function get(id) {
  return data.items.find((user) => user.id == id);
}
/**
 * Add a new user
 * @param {User} user
 * @returns {Promise<User>}
 */
async function add(user) {
  user.id = data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(user);
  return user;
}
/**
 * Update a user
 * @param {number} id
 * @param {User} user
 * @returns {Promise<User>}
 */
async function update(id, user) {
  const userToUpdate = get(id);
  Object.assign(userToUpdate, user);
  return userToUpdate;
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<{ success: boolean, message: string, id: number }>}
 */
async function remove(id) {
  const userIndex = data.items.findIndex((user) => user.id == id);
  data.items.splice(userIndex, 1);
  return { success: true, message: "User deleted", id: id };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
