export interface ICreateAdmin {
  password: string;
  data: {
    email: string;
    phone: string;
    roleId?: string;
    name: string;
    joiningDate: string;
  };
}
