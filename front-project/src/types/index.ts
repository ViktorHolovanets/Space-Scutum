
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface LoginResponse {
  user: User;
  authorisation?: {
    token: string;
    type: string;
  };
}

export interface Comment {
    id: string;
    body: string;
    user: string;
    user_id:string
    post_id: string;
    created_at: string; 
    updated_at: string; 
  }
 
  export interface UserRegister {
    id: string;
    name: string;
    email: string;
  }
  
  export interface User extends UserRegister {
    created_at: string; 
    updated_at: string; 
  }
  

  export interface Post {
    id: string;
    title: string;
    body: string;
    created_at: string; 
    user: User;
    comments: Comment[];
  }
  export interface PaginatedPostsResponse {
    data: Post[];
    total: number;
    current_page: number;
    last_page: number;
  }