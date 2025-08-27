import axios from "axios";
// import userProfileStore from "@/store/user.store";

// const {setUserProfile} = userProfileStore();
axios.defaults.withCredentials = true;

export const checkAuth = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth-check`,{withCredentials:true});
    return response.data;
  };

export const GetUser= async()=>{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
      {    
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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