'use server'
import apiFunction from "../api"
export default async function postInfo (data : any){
    try {
        const response = await apiFunction("POST", "/roles/record", data)
      } catch (error) {
        console.log(error)
      }
}