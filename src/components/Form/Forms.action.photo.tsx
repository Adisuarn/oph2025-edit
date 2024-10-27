'use server'
import apiFunction from "../api"
const userResponse = await apiFunction("GET", "/user", {});
const userData = userResponse.data;
console.log(userData)
interface FormData {
  members: string;
  ig: string;
  fb: string;
  others: string;
  admissions: string;
  courses: string;
  interests: string;
  descimg1: string;
  descimg2: string;
  descimg3: string;
  captureimg1: File;
  captureimg2: File;
  captureimg3: File;
}

export default async function postInfo (data : FormData){
  // const formData = new FormData();
  // formData.append('members', data.members);
  // formData.append('ig', data.ig);
  // formData.append('fb', data.fb);
  // formData.append('others', data.others);
  // formData.append('admissions', data.admissions);
  // formData.append('courses', data.courses);
  // formData.append('interests', data.interests);
  // formData.append('captureimg1', data.captureimg1);
  // formData.append('captureimg1', data.captureimg1);
  // formData.append('captureimg1', data.captureimg1);
  // formData.append('descimg1', data.descimg1);
  // formData.append('descimg2', data.descimg2);
  // formData.append('descimg3', data.descimg3);
    try {
        const response = await apiFunction("PATCH", `/${userData.tag}/${userData.key}`, data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
}