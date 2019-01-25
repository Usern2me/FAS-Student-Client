import { stringify, request } from "../config"
import { Toast } from "antd-mobile"
import { host } from "../config.js"

export async function getSchool(params) {
  return request(`${host}/api/school?${stringify(params)}`)
}
export async function getAllCollege(params) {
  return request(`${host}/api/allCollege?${stringify(params)}`)
}
export async function getMajor(params) {
  return request(`${host}/api/major?${stringify(params)}`)
}
export async function getAllClass(params) {
  return request(`${host}/api/allClass?${stringify(params)}`)
}
export async function getClass(params) {
  return request(`${host}/api/class?${stringify(params)}`)
}
// 拿一个班的课程表
export async function getCourse(params) {
  return request(`${host}/api/course?${stringify(params)}`)
}
