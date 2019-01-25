import { stringify, request } from "../config"
import { Toast } from "antd-mobile"
import { host } from "../config.js"

// 获取用户密码
async function getCustomPwd(params) {
  return request(`${host}/api/user?${stringify(params)}`)
}

// 获取学生信息 GET
export async function getInfo(params) {
  return request(`${host}/api/student?${stringify(params)}`)
}
// 更新学生信息 PATCH
export async function updateInfo(params) {
  return request(`${host}/api/student?`, { method: "PATCH", body: params })
}
// 注册学生用户 POST
export async function userRegister(params) {
  return request(`${host}/api/student`, { method: "POST", body: params })
}
// 学生登录
export async function userLogin(params) {
  let { id, pwd } = params
  try {
    let { data } = await getInfo({ id: id })
    let { uid } = data[0]
    let { data: customData } = await getCustomPwd({ user_id: uid })
    let { password: custompwd } = customData[0]
    if (pwd !== custompwd) {
      throw new Error("password error")
    }
    return true
  } catch (e) {
    Toast.fail("login fail...")
  }
}
