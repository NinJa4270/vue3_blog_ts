export interface Categories {
  list: Category[];
  pagination: Pagination;
}

export interface Category {
  create_time: string;
  update_time: string;
  id: number;
  name: string;
  value?: number;
  label?: string;
}
export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}
export interface Tag {
  name: string;
  color: string;
}

export interface TagList {
  list?: Array<Tag>;
  inputVisible?: boolean;
  inputValue?: string;
}
