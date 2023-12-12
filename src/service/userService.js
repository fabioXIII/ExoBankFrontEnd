import axios from "axios";


export async function getAllUser(){
    const response = await axios.get('http://localhost:8080/ExoBankRest/rest/UserRest/findAllUser');
  console.log(response.data);
  dispatch(set);
  }
  