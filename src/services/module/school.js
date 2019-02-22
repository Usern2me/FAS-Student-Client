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
export async function getClassTable(params) {
  return request(`${host}/api/classtable?${stringify(params)}`)
}

// 获取学生当天考勤信息
export async function getStuAttendance(params) {
  return request(`${host}/api/getStuAttendance?${stringify(params)}`)
}

// 获取学生是否考勤
export async function getStuAttendanceStatus(params) {
  return request(`${host}/api/getStuAttendanceStatus?${stringify(params)}`)
}

//添加学生考勤记录
export async function addStuAttendance(params) {
  return request(`${host}/api/addStuAttendance`, { method: "POST", body: params })
}
// 获取学生折线图数据
export async function getLineChartOfStudent(params) {
  return request(`${host}/api/getLineChartOfStudent?${stringify(params)}`)
}

// 获取学生日历考勤数据
export async function getCalendarOfStudent(params) {
  return request(`${host}/api/getCalendarOfStudent?${stringify(params)}`)
}
