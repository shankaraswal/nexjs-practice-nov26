export interface Post {
  _id: string;
  title: string;
  description: string;
  userName: string;
  createdAt: Date;
}

export interface CreatePost {
  title: string;
  description: string;
  userName: string;
}
