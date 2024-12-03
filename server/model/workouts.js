/** @type {{ items: Workout[] }} */
// const data = require("../data/workouts.json");
const data = { items: require("../data/workouts.json").workouts };

/**
 * @typedef {import("../../client/src/models/workout").Workout} Workout
 */

/**
 * Get all workouts
 * @returns {Workout[]}
 */
function getAll() {
  return data.items;
}

/**
 * Get a workout by id
 * @param {number} id
 * @returns {Workout}
 */
function get(id) {
  return data.items.find((workout) => workout.id == id);
}

/**
 * Add a new workout
 * @param {Workout} workout
 * @returns {Workout}
 */
function add(workout) {
  workout.id =
    data.items.reduce((prev, x) => (x.id > prev ? x.id : prev), 0) + 1;
  data.items.push(workout);
  return workout;
}

/**
 * Update a workout
 * @param {number} id
 * @param {Workout} workout
 * @returns {Workout}
 */
function update(id, workout) {
  const workoutToUpdate = get(id);
  Object.assign(workoutToUpdate, workout);
  return workoutToUpdate;
}

/**
 * Remove a workout
 * @param {number} id
 * @returns {{ success: boolean, message: string, id: number }}
 */
function remove(id) {
  const workoutIndex = data.items.findIndex((workout) => workout.id == id);
  if (workoutIndex !== -1) {
    data.items.splice(workoutIndex, 1);
    return { success: true, message: "Workout deleted", id: id };
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
