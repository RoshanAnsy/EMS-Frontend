import React, { useState, useCallback,useRef  } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import {  UploadIcon  } from "lucide-react";
import axios from "axios";
import { Line } from 'rc-progress';
import pdfIcon from "../../../public/pdfIcon.svg";
import Image from "next/image";
import { GetSignUrl } from "@/api/Bill";
import { uploadBill } from "@/api/Bill";
import { BillStatus } from "@/types/article";
import { UploadBillParams } from "@/api/Bill";
import userProfileStore from "@/store/user.store";
import { X,Eye } from 'lucide-react';
import { ComboboxDemo, ComboboxRef  } from "./comboBox";

const UploadBill = () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [billNo, setBillNo] = useState("");
  const [billDate, setBillDate] = useState("");
  const [poNo, setPoNo] = useState("");
  const [poDate, setPoDate] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [description, setDescription] = useState("");
  const [netAmount, setNetAmount] = useState<string>("");
  const [taxAmount, setTaxAmount] = useState<string>("");
  const [FileName, setFileName] = useState<string>("");
  const [loading,setLoading]= useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const[percentValue, setPercentValue] = useState<number[]>([0,10,30]);

  const comboRef = useRef<ComboboxRef>(null)
  const uploadFile = async (file: File) => {
    setFileName(file?.name);
    const name = userProfileStore.getState().name;
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

      setVendorName(name)
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




  const uploadBull = async()=>{
     setSubmitLoading(true);
      const formData: UploadBillParams = {
        billNo,
        vendorName,
        siteName,
        description,
        billDate,
        poNo,
        poDate,
        netAmount: Number(netAmount),
        taxAmount: Number(taxAmount),
        grandTotal: Number(Number(netAmount) + Number(taxAmount)),
        fileUrl: imageUrl,
        status: BillStatus.PENDING,
        isCancelled: false,
      };
      
    const response =await uploadBill(formData); 
    if(response?.success!=true){
      setSubmitLoading(false);
      alert("Failed to upload bill");
      return;
    }
    if(response?.success==true){
      alert("Bill uploaded successfully!");
    }
   
    setSubmitLoading(false);
    setBillNo("");
    setBillDate("");
    setPoNo("");
    setVendorName("");
    setPoDate("");
    setSiteName("");
    setDescription("");
    setNetAmount("");
    setTaxAmount("");
    setLoading(false);
    comboRef.current?.reset()

  }

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
    <div className="flex gap-4  rounded-lg ">
      <div className="w-1/2 p-4   bg-white rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Bill Upload <span className="text-gray-400">ⓘ</span>
        </h3>
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
                <Button variant="secondary" className="ml-4 hover:shadow text-red-900 cursor-pointer font-bold" onClick={()=>{setLoading(false);setVendorName("")}}>
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
      </div>

      {/* Bill Information Form */}
      <div className="w-1/2 p-4  bg-white rounded-md">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Bill Information <span className="text-gray-400">ⓘ</span>
        </h3>
        
        <div className="flex flex-col  gap-3">
            <div className=" flex gap-x-2 w-full">
                <Input placeholder="Enter Bill No." required value={billNo} maxLength={20} onChange={(e) => setBillNo(e.target.value)} />
                <Input type="date" value={billDate} required onChange={(e) => setBillDate(e.target.value)} />
                <Input placeholder="Enter PO No." required value={poNo} maxLength={20} onChange={(e) => setPoNo(e.target.value)} />
                <Input type="date" value={poDate}  required onChange={(e) => setPoDate(e.target.value)} />
            </div>
            <div className=" flex gap-x-2 w-full">
              <Input placeholder="Vendor Name" value={vendorName} readOnly className={`bg-gray-100 text-gray-700 font-medium border rounded-md px-3 py-2 focus:outline-none focus:ring-2 transition-all duration-150 ${
                    vendorName ? "border-blue-500 bg-blue-50" : ""
                  }`} />
              <ComboboxDemo ref={comboRef}  onSelect={(value) => {
                  setSiteName(value.value); // Assuming value.label contains the site name
                }} />
            </div>
          <Textarea placeholder="Enter Description (Optional)" required value={description} onChange={(e) => setDescription(e.target.value)}  className="col-span-2" />
          <div className=" flex gap-x-2">
            <Input type="number" required placeholder="Bill Net Amount" value={netAmount} onChange={(e) => { setNetAmount(e.target.value); }} />
            <Input type="number" required placeholder=" Tax Amount" value={taxAmount} onChange={(e) => { setTaxAmount(e.target.value);  }} />
            <Input type="number" readOnly placeholder="Bill Grand Total" value={Number(netAmount)+ Number(taxAmount)}/>
          </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end">
        <Button className=" mt-4 rounded-lg py-2 hover:bg-[#18469C] text-white bg-[#44587c] cursor-pointer" disabled={submitLoading }
        onClick={uploadBull} >
           {submitLoading ? 'uploading...' : 'Submit Bill'}
        </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadBill;
