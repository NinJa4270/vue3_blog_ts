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
