import { stringify, request } from "../config"
import { Toast } from "antd-mobile"
import { host } from "../config.js"

export async function getAllCollege(params) {
  return request(`${host}/api/allCollege?${stringify(params)}`)
}
export async function getMajor(params) {
  return request(`${host}/api/major?${stringify(params)}`)
}
export async function getAllClass(params) {
  return request(`${host}/api/class?${stringify(params)}`)
}
