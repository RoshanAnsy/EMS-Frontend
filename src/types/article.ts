export interface ArticleView {
    viewContent: string;
  }
  
  export interface Article {
    id?: string;
    tags: string[];
    title: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    ArticleView:ArticleView;
    thumbnail : string;
    user:{name:string};
  }
  
  export interface SuggestionType {
    id: string;
    title: string;
  }

  export interface RelatedArticlesTypes {
    id: string;
    title: string;
    thumbnail : string;
    description: string;
    tags: string[];
    createdAt: Date;
    
  }



import { z } from "zod";

export enum BillStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PAID = "PAID",
}

export const billSchema = z.object({
  billNo: z.string().min(3, "Bill number is required"),
  vendorName: z.string().min(3, "Vendor name is required"),
  siteName: z.string().min(3, "Minimum 3 characters required"),
  description: z.string().min(3, "Minimum 3 characters required"),
  billDate: z.string().datetime({ message: "Invalid date format" }),
  poNo: z.string().optional(),
  poDate: z.string().datetime().optional(),
  netAmount: z.number().min(0, "Net amount must be positive"),
  taxAmount: z.number().min(0, "Tax amount must be positive"),
  grandTotal: z.number().min(0, "Grand total must be positive"),
  fileUrl: z.string().url("Invalid file URL"),
  status: z.nativeEnum(BillStatus).default(BillStatus.PENDING),
  isCancelled: z.boolean().default(false)
});

export type UploadBillParamss = z.infer<typeof billSchema>;
