"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Circle, Plus } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import userProfileStore from "@/store/user.store";
import { useRef } from "react";
import { AddComment } from "@/api/Bill";
import Comment from "../common/comment";
import CommentDesign, { CommentDesignRef } from "../common/commentDesign";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2,RefreshCw } from "lucide-react";
import { toast } from "sonner";
enum TabTypes {
  All = "all",
  FollowUp = "follow-up",
  Comment = "comment",
}

type Inputs = {
  comment: string;
};

export default function TimeLine({ id,status }: { id: string,status:string }) {
  const [refreshLoading, setRefreshLoading] = useState<boolean>(false);
  const [commentComp, setCommentComp] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabTypes>(TabTypes.All);
  const [loading,setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const commentRef = useRef<CommentDesignRef>(null);
  const {role} = userProfileStore();
  console.log("this is role ",role)
  const handleRefresh = async() => {
    setRefreshLoading(true);
    await commentRef.current?.refetchComments();
    setRefreshLoading(false);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    setLoading(true);
    const response =await AddComment(id.trim(),data.comment);
    console.log(response)
    reset();
    setLoading(false);
    setDialogOpen(false);
    toast.success("Comment added successfully");

  };
  console.log("status",status)

  return (
    <div className="flex justify-center items-center bg-gray-100 p-4">
      <Card className="w-full max-w-lg border border-purple-300 shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-700 to-red-400 text-white text-center py-1 rounded-t-md">
          <h2 className="text-sm">Timeline</h2>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs value={activeTab} className="w-full">
            <TabsList className="flex space-x-2 mb-4">
              <TabsTrigger
                value={TabTypes.All}
                className="data-[state=active]:bg-blue-100 cursor-pointer"
                onClick={() => setActiveTab(TabTypes.All)}
              >
               <span>Comment</span>
               <button onClick={()=>{handleRefresh(); setRefreshLoading(true)}}className=" cursor-pointer">
          {
            refreshLoading ? <RefreshCw className="h-5 w-5 text-gray-700 animate-spin" />:
            <RefreshCw className="h-5 w-5 text-gray-700" />
          } 
        </button>
              </TabsTrigger>
              {/* <TabsTrigger
                value={TabTypes.Comment}
                className="data-[state=active]:bg-blue-100 cursor-pointer"
                onClick={() => setActiveTab(TabTypes.Comment)}
              >
                Comment
              </TabsTrigger>
              <TabsTrigger
                value={TabTypes.FollowUp}
                className="data-[state=active]:bg-blue-100 cursor-pointer"
                onClick={() => setActiveTab(TabTypes.FollowUp)}
              >
                Follow Up
              </TabsTrigger> */}
            </TabsList>
          </Tabs>

          <div>
            {/* {activeTab === TabTypes.Comment && (
              <div className="flex gap-3 items-center">
                <CommentDesign id={id} />
              </div>
            )} */}

            {/* {activeTab === TabTypes.FollowUp && <div>This is follow-up</div>} */}

            {activeTab === TabTypes.All && (
              <div>
                <CommentDesign  ref={commentRef} id={id} />

                {commentComp && (
                  <div>
                    <p className="flex gap-3 items-center mt-4">
                      <Circle size={16} className="text-blue-600" />
                      <span>Comment</span>
                    </p>
                    <Comment setCommentComp={setCommentComp} />
                  </div>
                )}

                <div className="flex justify-start mt-4">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger >
                    <button
                        className="flex cursor-pointer shadow p-2 rounded-full items-center gap-1 text-sm bg-blue-100 "
                        disabled={status === "PAID" && role === "VENDOR"}
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add New</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                          <DialogTitle>Add New Comment</DialogTitle>
                        </DialogHeader>
                        <Input
                          {...register("comment", { required: true })}
                          placeholder="Add your comment here..."
                          className="w-full mt-4"
                        />
                        {errors.comment && (
                          <span className="text-red-500 text-xs">
                            This field is required
                          </span>
                        )}
                        <Button type="submit" className="mt-4 cursor-pointer">
                        {loading && (
                            <Loader2 className="animate-spin h-4 w-4" />
                          )}
                          {loading ? "Submit..." : "Submit"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
