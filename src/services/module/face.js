import { stringify, request } from "../config"
import { host } from "../config.js"

export async function addFace(params){
  return request(`${host}/api/addFace?`,{ method: "POST", body: params })
}
