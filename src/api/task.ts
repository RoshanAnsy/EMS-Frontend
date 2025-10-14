import axios from "axios";

export const GetTaskList= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetTasksList`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}


export const GetCompletedTasksList= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetCompletedTasksList`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}


export const GetInprogressTasksList= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetInprogressTasksList`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}

export const GetAssignTaskList= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetAssignTasksList`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}



export const CreateTaskApi= async(title:string,description:string,AssignID:string,pinCode:string,city:string,state:string,MobileNo:string,
  Address:string,companyName:string,ClientName:string, token:string)=>{
  // console.log(name,
  //   email,
  //   password,
  //   conformPassword);

  console.log(title, description, AssignID,pinCode,city,state,MobileNo,Address,companyName ,ClientName);
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/createTask`,{
   title, description, AssignID,pinCode,city,state,MobileNo,Address,companyName ,ClientName
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



export const CompleteTaskApi= async( taskId:string, TaskStartedAt:string, TaskCompletedAt:Date,TotalReceivedAmount:number,
            PerUnitCost:number,TotalUnits:number,TaskBalanceAmount:number,remark:string,projectCost:number,token:string)=>{
  // console.log(name,
  //   email,
  //   password,
  //   conformPassword);
console.log(TaskStartedAt, TaskCompletedAt,TotalReceivedAmount,
            PerUnitCost,TotalUnits,TaskBalanceAmount,remark,projectCost,token,taskId)

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/CompleteTask`,{
   taskId, TaskStartedAt, TaskCompletedAt,TotalReceivedAmount,
            PerUnitCost,TotalUnits,TaskBalanceAmount,remark,projectCost
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



export const GetTargetTaskList= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetTargetTasksList`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}


export const CreateTargetTaskApi= async(TaskStartedAt:Date, TaskCompletedAt:Date, TotalAmountTarget:number,TotalUnits:number,assignedTo:string,TaskType:string,remark:string,companyName:string, token:string)=>{
  // console.log(name,
  //   email,
  //   password,
  //   conformPassword);

  // console.log(title, description, AssignID,pinCode,city,state,MobileNo,Address,companyName ,ClientName);
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/CreateTargetTask`,{
   TaskStartedAt, TaskCompletedAt, TotalAmountTarget,TotalUnits,assignedTo,TaskType,remark,companyName
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



export const GetCompletedTaskDetails= async(token:string,taskId:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetCompletedTaskDetails?taskId=${taskId}`,
    // {taskId},
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}

export const AcceptTaskApi= async(token:string,taskId:string)=>{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/AcceptTask`,
    {taskId},
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}


export const DeleteTask= async(taskId:string,token:string)=>{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/DeleteTask`,
    {taskId},
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}