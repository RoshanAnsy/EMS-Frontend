"use client";

import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Circle, Loader2 } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { CommentTypes } from "@/types/comments";
import { GetComments } from "@/api/Bill";
import Comment from "./comment";
import { Button } from "../ui/button";
import { toast } from "sonner";

export type CommentDesignRef = {
  refetchComments: () => void;
};

const CommentDesign = forwardRef<CommentDesignRef, { id: string }>(({ id }, ref) => {
  const [commentData, setCommentData] = useState<CommentTypes[]>([]);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const hasFetched = useRef(false);

  const fetchComments = useCallback(
    async (page: number, reset: boolean = false) => {
      if (!hasMoreComments && !reset) {
        toast("No more comments to load.");
        return;
      }

      try {
        setLoading(true);
        const { data } = await GetComments(id.trim(), page, 3);
        setHasMoreComments(data?.pagination?.hasMore);

        if (data?.comments?.length > 0) {
          setCommentData((prev) => reset ? data.comments : [...prev, ...data.comments]);
          setCurrentPage(page);
        } else if (reset) {
          setCommentData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    },
    [id, hasMoreComments]
  );

  useEffect(() => {
    if (hasFetched.current) return;
    fetchComments(1);
    hasFetched.current = true;
  }, [id, fetchComments]);

  useImperativeHandle(ref, () => ({
    refetchComments: () => {
      hasFetched.current = false;
      fetchComments(1, true);
    },
  }));

  const handleSetComment = (value: boolean) => {
    console.log("Set comment component:", value);
  };

  if (loading && commentData.length === 0) {
    return (
      <div className="flex gap-1 items-center justify-center text-gray-700">
        <Loader2 className="animate-spin rotate-180" />
        Loading...
      </div>
    );
  }

  if (commentData.length === 0) {
    return <div className="text-center text-gray-500">No comments available</div>;
  }

  return (
    <div className="relative pl-4">
      {commentData.map((item, index) => (
        <div key={index} className="pb-3">
          <div className="flex gap-x-3 items-center">
            <Circle className="text-blue-600" size={16} />
            <h3>Comment</h3>
          </div>

          <div className="flex flex-col items-start pl-8 border-l-2 border-gray-300">
            <p className="text-sm text-gray-500">
              <span>{item?.user.name}</span> · {item?.timeAgo}
            </p>
            <p className="text-gray-700 text-sm mt-1">{item?.commentText}</p>
            <div className="flex gap-4 text-blue-600 text-sm mt-2 cursor-pointer">
              <Popover.Root>
                <Popover.Trigger asChild></Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content className="bg-white p-4 shadow-md rounded">
                    <Comment setCommentComp={handleSetComment} />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button
          variant="secondary"
          disabled={!hasMoreComments || loading}
          onClick={() => fetchComments(currentPage + 1)}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              Loading...
            </>
          ) : (
            "Show more"
          )}
        </Button>
      </div>
    </div>
  );
});

CommentDesign.displayName = "CommentDesign";
export default CommentDesign;
