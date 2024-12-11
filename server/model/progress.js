const { getConnection } = require("./supabase");
const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../client/src/models/progress").Progress} Progress
 */

/**
 * Helper function to save changes to the JSON file.
 */

/**
 * @template T
 * @returns {Promise<DataListEnvelope<Progress>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("progress")
    .select("*", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a progress entry by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Progress>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("progress")
    .select("*")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Add a new progress entry
 * @param {Progress} progress
 * @returns {Promise<DataEnvelope<Progress>>}
 */
async function add(progress) {
  const { data, error } = await conn
    .from("progress")
    .insert([
      {
        user_handle: progress.user_handle,
        weight: progress.weight,
        date: progress.date,
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
 * Update a progress entry
 * @param {number} id
 * @param {Progress} progress
 * @returns {Promise<DataEnvelope<Progress>>}
 */
async function update(id, progress) {
  const { data, error } = await conn
    .from("progress")
    .update({
      user_handle: progress.user_handle,
      weight: progress.weight,
      date: progress.date,
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
 * Remove a progress entry
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("progress")
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

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
};
