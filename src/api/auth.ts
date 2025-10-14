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

export const DeleteUser= async(userID:string,token:string)=>{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/DeleteUser`,
    {userID},
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}


export const CreateUser= async(name:string,email:string,password:string,conformPassword:string,role:string,EmplyID:string,DateOfJoining?:Date,token?:string)=>{
  console.log(name,
    email,
    password,
    conformPassword);
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/AddNewUser`,{
    name,
    email,
    password,
    conformPassword,role,EmplyID,DateOfJoining
  },
  {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
);
  
  console.log(response);
  return response.data;
}


export const GetUserDetails= async(token:string,userId:string)=>{
  console.log("token and userId",token,userId)
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetUserDetails?userId=${userId}`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}


export const UpdateUserDetailsApi= async(name:string,MobileNo:string,PanNo:string,AdharNo:string,EmergencyContactNo:string,PermanentAddress:string,CurrentAddress:string,
  BankName:string,IFSCCode:string,Branch:string,accountNo:string, token:string,id:string)=>{
  // console.log(name,
  //   email,
  //   password,
  //   conformPassword);
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/UpdateUserDetails?userId=${id}`,{
    name,
            MobileNo,
            PanNo,
            AdharNo,
            EmergencyContactNo,
            PermanentAddress,
            CurrentAddress,
            BankName,
            IFSCCode,
            Branch,
            accountNo,
  },
  {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
);
  
  console.log(response);
  return response.data;
}


export const GetUserListForDropDown= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetUserListForDropdown`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}


export const GetAccessSideBar= async(token:string,userId:string)=>{
  console.log("testing code latest token and userid",token,userId)
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetMenuAccessList?userId=${userId}`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("this is server this is code",response)
  
  return response.data;
}

export const UpdatePassword= async(token:string,EmpID:string,password:string,conformPassword:string)=>{
  // console.log("testing code latest token and userid",token,userId)
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/updatePassword`,
    // {EmpID,password,conformPassword},
    {password,conformPassword:conformPassword,EmplyID:EmpID},
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("this is server this is code",response)
  
  return response.data;
}
