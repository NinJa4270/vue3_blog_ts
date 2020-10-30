export interface UserList {
  list: User[];
  pagination: Pagination;
}

export interface User {
  id: number;
  role: string;
  role_id: number;
  role_name: string;
  create_time: string;
  update_time: string;
  user: string;
}

export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}
