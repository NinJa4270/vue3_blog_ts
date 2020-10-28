export interface ArtCategories {
  list: ArtCategoryArr[];
  pagination: Pagination;
}

export interface ArtCategoryArr {
  id?: number;
  name?: string;
  create_time?: string;
  update_time?: string;
  editable?:boolean;
}

export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}
