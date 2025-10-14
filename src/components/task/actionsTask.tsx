

// components/AcceptButton.tsx
"use client";
import { AcceptTaskApi } from "@/api/task";
// import { AcceptTask } from "@/actions/task";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export function AcceptButton({ taskId ,token}: { taskId: string,token:string }) {
    const AcceptTask = async (taskId: string) => {
        await AcceptTaskApi(token, taskId);
        toast.success("Task Accepted Successfully");
        // Optionally, you can add some UI feedback here, like a toast notification or updating the UI state.
    }
  return (
    <Button onClick={() => AcceptTask(taskId)}>
      Accept
    </Button>
  );
}

