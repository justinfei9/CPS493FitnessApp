const path = require("path");
const filePath = path.join(__dirname, "../data/users.json");

const { getConnection } = require("./supabase");
const conn = getConnection();

/** @type {{ items: User[] }} */
const data = { items: require(filePath).users };

/**
 * @template T
 * @typedef {import("../../client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../client/src/models/users").User} User
 */

/**
 * Helper function to save changes to the JSON file.
 */

/**
 * @template T
 * @returns {Promise<DataListEnvelope<User>>}
 */

async function getAll() {
  const { data, error, count } = await conn
    .from("users")
    .select("*", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<User>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("users")
    .select("*, reviews(*)")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}
/**
 * Add a new user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function add(user) {
  const { data, error } = await conn
    .from("users")
    .insert([
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        handle: user.handle,
        isAdmin: user.isAdmin,
        password: user.password,
      },
    ])
    .select("*")
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}
/**
 * Update a user
 * @param {number} id
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
async function update(id, user) {
  const { data, error } = await conn
    .from("users")
    .update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      handle: user.handle,
      isAdmin: user.isAdmin,
      password: user.password,
    })
    .eq("id", id)
    .select("*")
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("users")
    .delete()
    .eq("id", id)
    .select("*")
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}
async function seed() {
  for (const User of data.items) {
    await add(User);
  }
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  seed,
};
