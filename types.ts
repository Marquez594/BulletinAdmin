export type UserType = {
  uid: string;
  username: string;
  firstname: string;
  lastname: string;
  date_created: string;
};

export type PostType = {
  postid: number;
  title: string;
  content: string;
  uid: string | null;
  created_at: string;
};

export type PostUserType = {
  postid: number;
  title: string;
  content: string;
  uid: string | null;
  created_at: string;
  users: {
    username?: string;
  };
};
