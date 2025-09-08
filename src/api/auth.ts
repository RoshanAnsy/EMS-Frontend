import axios from "axios";
// import userProfileStore from "@/store/user.store";

// const {setUserProfile} = userProfileStore();
axios.defaults.withCredentials = true;

export const checkAuth = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth-check`,{withCredentials:true});
    return response.data;
  };

export const GetUser= async(token:string)=>{
  console.log(token,"from test2")
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getUser`,
      {    
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
}

export const GetUserList= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/userList`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}


export const CreateUser= async(name:string,email:string,password:string,conformPassword:string,role:string,EmplyID:string)=>{
  console.log(name,
    email,
    password,
    conformPassword);
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`,{
    name,
    email,
    password,
    conformPassword,role,EmplyID
  });
  
  console.log(response);
  return response.data;
}