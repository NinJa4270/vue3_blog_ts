export interface User {
  list: UserArr[];
  pagination: Pagination;
}

export interface UserArr {

}

export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}
