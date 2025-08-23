import React, { useEffect } from 'react'
import { GetPaymentDetails } from '@/api/Bill';
import { Eye,Loader2, FileText } from 'lucide-react';
import { Card,CardHeader,CardContent } from '../ui/card';
interface PaymentTypes{
    amount:number;
    tds:string;
    fileUrl:string;
    remark:string;
}

const PaymentDetails = ({id}:{id:string}) => {
    const [PaymentData, setPaymentData] = React.useState<PaymentTypes>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data,success } = await GetPaymentDetails(id as string);
                setPaymentData(data);
                setSuccess(success);
                console.log("this is response", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };
        fetchData();
    },[id])

    if(success === false && loading==false){
        return (
            <div className="flex justify-center items-center  bg-gray-100 p-4 border m-2 rounded-md">
                No payment details available
            </div>
        )
    }
    console.log("payment data",PaymentData)
  return (
    <div className="flex justify-center items-center  bg-gray-100 p-4 ">
      {loading? (<div className=" flex flex-col justify-center items-center"><Loader2 className="animate-spin w-6 h-6 text-gray-500" /> Loading</div>)
      :
      (
        <Card className='flex flex-col  w-full '>
            <CardHeader className="bg-gradient-to-r from-blue-700 to-red-400 text-white text-center py-1 rounded-t-md">
                <h2 className="">Payment detail</h2>
            </CardHeader>
            <CardContent className=' px-6 pb-6 flex flex-col gap-y-2  w-full text-bold'>
            <span>Paid Amount: {PaymentData?.amount}</span>
            <span> TDS: {PaymentData?.tds}</span>
            <span> Remark: {PaymentData?.remark}</span>
            <div className="mt-6">
              <p className="text-gray-500 text-sm">Attachment</p>
              <div className="flex items-center gap-8  p-2 border rounded-md mt-2">
                <FileText className="text-red-500" size={20} />
                {/* <div> */}
                  {/* <p className="text-sm ">FileName.pdf</p> */}
                  {/* <p className="text-xs text-gray-500">5 MB</p> */}
                {/* </div> */}
               <a href={PaymentData?.fileUrl} target="blank" className=" flex gap-x-2 items-center justify-end"><span className=" text-sm">view</span> <Eye className=" h-4 w-4 text-gray-600"/></a>
              </div>
            </div>
            </CardContent>
        </Card>
      )
      }
      
    </div>
  )
}

export default PaymentDetails;
