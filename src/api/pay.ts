import axios from "axios";
import { da } from "date-fns/locale";

// export const GetTaskList= async(token:string)=>{
//   const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetTasksList`,
//     {    
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
  
//   return response.data;
// }


export const GetUserTaskDetailWithCompleteDetails= async(token:string,id:string,StartDate:Date,EndDate:Date)=>{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/GetUserDetailsWithBankDetails`,
    {customerID:id, fromDate: StartDate, toDate: EndDate},
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}

export const DeletePaymentApi= async(token:string,id:string)=>{
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/DeletePayment`,
    {payMentID:id},
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}

export const MakePaymentToEmployeeApi = async (
  customerID: string,
  FixAmount: number,
  VariableAmount: number=0,
  totalAmount: number,
  remark: string,
  Tds: number=0,
  AnyTax: number=0,
  TravelCost: number=0,
  OtherCost: number=0,
  FoodAllowanceCost: number=0,
  medicleInsuranceCost: number=0,
  PFAmount: number=0,
  GratuityAmount: number=0,
  LaultyAmount: number=0,
  MisleneousAmount: number=0,
  token: string,

) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/MakePaymentToEmp`,
    {
      customerID,
      FixAmount,
      VariableAmount,
      totalAmount,
      remark,
      Tds,
      AnyTax,
      TravelCost,
      OtherCost,
      FoodAllowanceCost,
      medicleInsuranceCost,
      PFAmount,
      GratuityAmount,
      LaultyAmount,
      MisleneousAmount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(response);
  return response.data;
};



export const GetPayMentList= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetPaymentList`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}

export const GetPaymentListForEmp= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetPaymentListForEmp`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}



interface PayRoleSettingsState {
  FixAmount: boolean
  VariableAmount: boolean
  TotalAmount: boolean
  Tds: boolean
  AnyTax: boolean
  TravelCost: boolean
  OtherCost: boolean
  FoodAllowanceCost: boolean
  MedicleInsuranceCost: boolean
  PFAmount: boolean
  GratuityAmount: boolean
  LaultyAmount: boolean
  MisleneousAmount: boolean
}


export const UpdatePayReceiptPrintApi= async(token:string,data:PayRoleSettingsState)=>{
  console.log("data from api",data)
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/UpdatePaymentReceiptSetting`,
    {FixAmount:data.FixAmount,
  VariableAmount: data.VariableAmount,
  TotalAmount: data.TotalAmount,
  Tds: data.Tds,
  AnyTax: data.AnyTax,
  TravelCost: data.TravelCost,
  OtherCost: data.OtherCost,
  FoodAllowanceCost: data.FoodAllowanceCost,
  MedicleInsuranceCost: data.MedicleInsuranceCost,
  PFAmount: data.PFAmount,
  GratuityAmount: data.GratuityAmount,
  LaultyAmount: data.LaultyAmount,
  MisleneousAmount: data.MisleneousAmount},
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}

export const FindPaymentReceiptSetting= async(token:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/FindPaymentReceiptSetting`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}

export const GetPaymentDetails= async(token:string,payMentId:string)=>{
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/GetPaymentDetails?PayMentId=${payMentId}`,
    {    
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  return response.data;
}