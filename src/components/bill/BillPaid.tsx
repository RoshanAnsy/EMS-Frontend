import React, { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Line } from 'rc-progress';
import { AlertDialogTitle, AlertDialogCancel } from '../ui/alert-dialog';
import pdfIcon from "../../../public/pdfIcon.svg";
import Image from "next/image";
import { GetSignUrl } from "@/api/Bill";
import { UploadIcon, X,Eye } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { CreatePayment } from '@/api/Bill';

type Inputs = {
  amount: number;
  tds: string;
  remark: string;
  file: File | null;
};

const BillPaid = ({ id, setOpen, billAmount }: { id: string; billAmount: number; setOpen: (val: boolean) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [FileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [percentValue, setPercentValue] = useState<number[]>([0, 10, 30]);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { amount, tds, remark } = data;
  
    // Check if paid amount is greater than bill amount and confirm the action
    if (amount > billAmount && !window.confirm("Paid amount is greater than bill amount. Are you sure you want to proceed?")) {
      // If the user cancels, stop the process
      console.log("Action canceled");
      return; // Stop further execution
    }
  
    // Proceed with payment if confirmed or no issue with the amount
    await proceedWithPayment(amount, tds, remark);
  };

  const proceedWithPayment = async (amount: number, tds: string, remark: string) => {
    setSubmitLoading(true);
    try {
      const response = await CreatePayment(id.trim(), amount, tds, imageUrl, remark);
      console.log(response);
      alert("Record updated successfully");
    } catch (error) {
      console.error("Error record payment:", error);
      alert("Failed to update record");
    }
    reset();
    setFile(null);
    setFileName("");
    setImageUrl("");
    setLoading(false);
    setSubmitLoading(false);
    setOpen(false);
    setPercentValue([0, 10, 30]);
  };

  const uploadFile = async (file: File) => {
    setFileName(file?.name);
    setLoading(true);
    try {
      // Step 1: Get signed URL from backend
      const  {signedUrlData}  = await GetSignUrl();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signedUrlData.apiKey);
      formData.append("timestamp", signedUrlData.timestamp.toString());
      formData.append("signature", signedUrlData.signature);
      formData.append("public_id", signedUrlData.publicId);
      const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${signedUrlData.cloudName}/raw/upload`;
      const uploadResponse = await axios.post(cloudinaryUploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: false,
      });

      setPercentValue(()=>[100])
      const imageUrl = uploadResponse.data.secure_url;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload");
    } finally {
      // setLoading(false);
    }
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        uploadFile(uploadedFile)
        setFile(uploadedFile);
      }
    }, []);
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: { "application/pdf": [] },
      multiple: false,
      maxSize: 10 * 1024 * 1024, 
    });

  

  return (
    <>
    
        <AlertDialogTitle className='flex justify-between shadow-none hover:shadow-none border-none'>
          <span>Payment detail</span>
        <AlertDialogCancel className="mr-2 cursor-pointer"><X/></AlertDialogCancel>
        </AlertDialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
            <Input placeholder='paid amount' type='number'   {...register("amount",{required:true})}  />
            <Input placeholder="TDS" {...register("tds",{required:true})}  />
            <Input placeholder="Remark" {...register("remark")}  />
            <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-300 p-6 text-center cursor-pointer rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          <input {...getInputProps()} />
          <UploadIcon className="h-6 w-6 mx-auto text-gray-500" />
          <p className="text-sm text-gray-600">Drag and Drop file here or <span className="text-blue-500">Choose File</span></p>
          <p className="text-xs text-gray-400">No. of File: {file ? "1" : "0"} | Format: PDF | Limit: 10 MB</p>
        </div>
        {
          loading &&
          (
            <div className="flex flex-col bg-gray-100 p-4  gap-y-3 rounded-xl shadow-sm w-full mt-4">
              <div className=" flex gap-4">
                <Image src={pdfIcon} alt="PDF Icon" width={30} height={30} className="mr-3" />
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{FileName}</p>
                </div>
                <a href={imageUrl} className=" cursor-pointer" target="blank"><Eye className=" h-5 w-5"/></a>
                <Button variant="secondary" className="ml-4 hover:shadow text-red-900 cursor-pointer font-bold" onClick={()=>{setLoading(false);}}>
                  <X className="text-red-900" />
                </Button>
              </div>
              <div className=" flex gap-x-3">
                <Line percent={percentValue}  strokeWidth={1} strokeColor="#635DFF" trailWidth={6} className="mt-2" />
                <p className="text-gray-600 text-sm ml-2">100%</p>
              </div>
           </div>
          )
        }
            <div className="flex justify-end mt-4">
                <Button variant="secondary" className=' cursor-pointer' type='submit'  disabled={submitLoading}>
                  {submitLoading ? "submitting..." : "Submit"}
                  </Button>
            </div>
        </form>
    </>
     
  );
};


export default BillPaid;
