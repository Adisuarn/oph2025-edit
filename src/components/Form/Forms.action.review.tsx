'use server'
import apiFunction from "../api"
const userResponse = await apiFunction("GET", "/user", {});
const userData = userResponse.data;
console.log(userData)
export default async function postReview (data : any){
    try {
      // data.map( async (datum:any) => {
      //   const response = await apiFunction("PATCH", `/${userData.tag}/${userData.key}/review/${datum.count}`, datum)
      // })
      for(const datum of data){
        const response = await apiFunction("PATCH", `/${userData.tag}/${userData.key}/review/${datum.count}`, datum)
      }} catch (error) {
        console.log(error)
      }
}