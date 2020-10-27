export interface NavList {
  list?: NavListArr[];
}
export interface NavListArr {
  id: number;
  name: string;
  path: string;
  pid: number;
  role_id: number;
  create_time: string;
  update_time: string;
  children?: NavListArr[];
}
