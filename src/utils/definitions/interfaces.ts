export interface CommentData {
  id?: string;
  username?: string;
  address?: string;
  userImg?: string;
  comment?: string;
  timestamp?: string;
}

export interface MomentMetadata {
  id: string;
  address: string;
  timestamp: string;
  text?: string;
  username?: string;
  userImg?: string;
  media?: string;
  mediaType?: "video" | "image";
}
