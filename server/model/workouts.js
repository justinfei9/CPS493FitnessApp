/** @type {{ items: Workout[] }} */
// const data = require("../data/workouts.json");
const data = { items: require("../data/workouts.json").workouts };

/**
 * @typedef {import("../../client/src/models/workout").Workout} Workout
 */

/**
 * Get all workouts
 * @returns {Promise<Workout[]>}
 */
async function getAll() {
  return data.items;
}

/**
 * Get a workout by id
 * @param {number} id
 * @returns {Promise<Workout>}
 */
async function get(id) {
  return data.items.find((workout) => workout.id == id);
}

/**
 * Add a new workout
 * @param {Workout} workout
 * @returns {Promise<Workout>}
 */
async function add(workout) {
  workout.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(workout);
  return workout;
}

/**
 * Update a workout
 * @param {number} id
 * @param {Workout} workout
 * @returns {Promise<Workout>}
 */
async function update(id, workout) {
  const workoutToUpdate = get(id);
  Object.assign(workoutToUpdate, workout);
  return workoutToUpdate;
}

/**
 * Remove a workout
 * @param {number} id
 * @returns {Promise<{ success: boolean, message: string, id: number }>}
 */
async function remove(id) {
  const workoutIndex = data.items.findIndex((workout) => workout.id == id);
  if (workoutIndex !== -1) {
    data.items.splice(workoutIndex, 1);
    throw {
      isSuccess: false,
      message: "Item not found",
      data: id,
      status: 404,
    };
  } else {
    return { success: false, message: "Workout not found", id: id };
  }
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
