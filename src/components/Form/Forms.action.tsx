'use server'
import apiFunction from "../api"
const userResponse = await apiFunction("GET", "/user", {});
const userData = userResponse.data;
console.log(userData)
export default async function postInfo (data : any){
    try {
        const response = await apiFunction("PATCH", `/${userData.tag}/${userData.key}`, data)
      } catch (error) {
        console.log(error)
      }
}