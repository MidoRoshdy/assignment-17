import {
  UserConfirmEmsil,
  UserGender,
  userprovider,
  UserRole,
  UserStatus,
} from "../enums/user.enum";

export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  confirmEmail: UserConfirmEmsil;
  password: string;
  gender: UserGender;
  role: UserRole;
  status: UserStatus;
  provider: userprovider;
  createdAt: Date;
  updatedAt: Date;
}
