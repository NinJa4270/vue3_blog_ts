export interface IDialogConfig {
  visible: boolean;
  title: string;
  id: number;
}
export interface IUserDialogConfig extends IDialogConfig {
  type: string;
}
export interface IAddConfig {
  newValue: string;
  disabled: boolean;
}

export interface INavForm {
  name: string;
  pid: number;
  path: string;
  role_id: number;
}

export interface IUserForm {
  user: string;
  password: string;
  role_id: number;
}

export interface ISelectItem {
  value: number;
  label: string;
}