const path = require("path");
const filePath = path.join(__dirname, "../data/workouts.json");

const { getConnection } = require("./supabase");
const conn = getConnection();
const data = { items: require(filePath).workouts };

/**
 * @template T
 * @typedef {import("../../client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../client/src/models/workout").Workout} Workout
 */

/**
 * Get all workouts
 * @returns {Promise<DataListEnvelope<Workout>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("workouts")
    .select("*", { count: "estimated" }); // Get total count as well
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a workout by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("workouts")
    .select("*")
    .eq("id", id)
    .single(); // Retrieve a single workout by id
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Add a new workout
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function add(workout) {
  const { data, error } = await conn
    .from("workouts")
    .insert([workout]) // Insert new workout
    .select("*")
    .single(); // Return the newly created workout
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Update a workout
 * @param {number} id
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function update(id, workout) {
  const { data, error } = await conn
    .from("workouts")
    .update(workout) // Update workout fields
    .eq("id", id) // Match the workout by id
    .select("*")
    .single(); // Return the updated workout
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Remove a workout
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("workouts")
    .delete() // Delete the workout by id
    .eq("id", id)
    .select("*")
    .single(); // Return the deleted workout info
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}
async function seed() {
  for (const Workout of data.items) {
    console.log(Workout);
    await add(Workout);
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
