import { stringify, request } from "../config"
import { host } from "../config.js"

export async function addFace(params) {
  return request(`${host}/api/addFace`, { method: "POST", body: params })
}
export async function verifyFace(params) {
  return request(`${host}/api/verifyFace`, { method: "POST", body: params })
}
export async function deleteFace(params) {
  return request(`${host}/api/deleteFace`, { method: "POST", body: params })
}
export async function updateFace(params) {
  return request(`${host}/api/updateFace`, { method: "POST", body: params })
}
