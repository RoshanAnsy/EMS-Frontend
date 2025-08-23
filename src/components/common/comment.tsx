"use client";

import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Define the prop types
interface CommentProps {
  setCommentComp: (value: boolean) => void;
  comment_data?: string;
}

const Comment: React.FC<CommentProps> = ({ setCommentComp, comment_data = "" }) => {
  const [commentText, setCommentText] = useState(comment_data);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!commentText.trim()) {
      toast("Comment cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/comments", { text: commentText });
      toast("Comment posted successfully");
      setCommentText(""); // Clear input on success
      setCommentComp(false); // Close comment component
    } catch (error) {
      console.log(error)
      toast("Failed to post comment");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setCommentText(""); // Clear input on cancel
    setCommentComp(false); // Close comment component
  };

  return (
    <div className="flex border-l border-purple-300 flex-col gap-1 px-4 pt-1 w-full max-w-md">
      <Input
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        disabled={loading}
      />
      <div className="flex justify-start gap-2 text-sm">
        <Button variant="outline" onClick={handleSave} className="shadow-none bg-none border-none" disabled={loading}>
          {loading ? "Posting..." : "Save"}
        </Button>
        <Button variant="outline" className="shadow-none bg-none border-none" onClick={handleCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Comment;
