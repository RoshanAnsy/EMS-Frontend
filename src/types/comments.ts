export interface CommentTypes {
    id?: string;
    commentText: string;
    timeAgo?: string;
    user: {
        name: string;
    };

}