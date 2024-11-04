export interface IBase{
  id: string
  createdAt: string
  updetedAt: string
}

export interface IBaseResponse {
  status?: string
  error?: string
  data?: any 
}

export interface IValueForType2 {
  userType: string,
  userType1: string
}

export interface IType2{
  type2: string
}