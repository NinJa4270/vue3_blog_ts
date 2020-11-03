export interface Pagination {
  total?: number;
  hasNextPage?: boolean;
  totalPage?: number;
}

export enum Order {
  positive,
  reverse,
}

export interface INav {
  list?: Array<INavItem>;
}

export interface INavItem {
  id: number;
  name: string;
  path: string;
  pid: number;
  role_id: number;
  create_time: string;
  update_time: string;
  children?: Array<INavItem>;
}

export interface IArtCate {
  list: Array<IArtCateItem>;
  pagination: Pagination;
}

export interface IArtCateItem {
  id: number;
  name: string;
  create_time: string;
  update_time: string;
  editable?: boolean;
}
