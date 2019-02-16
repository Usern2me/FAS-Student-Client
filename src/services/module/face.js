import { stringify, request } from "../config"
import { host } from "../config.js"

// face
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

// 获取学生当天考勤信息
export async function getStuAttendance(params) {
  return request(`${host}/api/getStuAttendance?${stringify(params)}`)
}
//添加学生考勤记录
export async function addStuAttendance(params) {
  return request(`${host}/api/addStuAttendance`, { method: "POST", body: params })
}
