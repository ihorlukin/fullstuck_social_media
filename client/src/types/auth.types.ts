import { IUser } from "./user.types"

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export interface ILoginForm {
	email: string
	password: string
}

export interface IRegisterForm extends ILoginForm {
  username: string,
  usertype: 'user' | 'organisation' | 'coach'
}
