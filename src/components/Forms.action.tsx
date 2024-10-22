'use server'
import apiFunction from "./api"
export default async function postInfo (data : any){
    try {
        const response = await apiFunction("POST", "/roles/record", data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
}