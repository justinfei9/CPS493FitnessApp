const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/workouts.json");
/** @type {{ items: Workout[] }} */
// const data = require("../data/workouts.json");
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
 * Helper function to save changes to the JSON file.
 */
function saveToFile() {
  fs.writeFileSync(
    filePath,
    JSON.stringify({ workouts: data.items }, null, 2),
    "utf8"
  );
}

/**
 * Get all workouts
 * @returns {Promise<DataListEnvelope<Workout>>}
 */
async function getAll() {
  return {
    isSuccess: true,
    data: data.items,
    total: data.items.length,
  };
}

/**
 * Get a workout by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function get(id) {
  const item = data.items.find((workout) => workout.id == id);
  return {
    isSuccess: !!item,
    data: item,
  };
}

/**
 * Add a new workout
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function add(workout) {
  workout.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(workout);
  saveToFile(); // Save changes to the JSON file
  return {
    isSuccess: true,
    data: workout,
  };
}

/**
 * Update a workout
 * @param {number} id
 * @param {Workout} workout
 * @returns {Promise<DataEnvelope<Workout>>}
 */
async function update(id, workout) {
  const workoutToUpdate = await get(id);
  if (!workoutToUpdate.isSuccess) {
    throw {
      isSuccess: false,
      message: "Workout not found",
      data: id,
      status: 404,
    };
  }
  Object.assign(workoutToUpdate.data, workout);
  saveToFile(); // Save changes to the JSON file
  return {
    isSuccess: true,
    data: workoutToUpdate.data,
  };
}

/**
 * Remove a workout
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const workoutIndex = data.items.findIndex((workout) => workout.id == id);
  if (workoutIndex === -1)
    throw {
      isSuccess: false,
      message: "Workout not found",
      data: id,
      status: 404,
    };
  data.items.splice(workoutIndex, 1);
  saveToFile(); // Save changes to the JSON file
  return {
    isSuccess: true,
    message: "Workout deleted",
    data: id,
  };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
