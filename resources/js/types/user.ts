export interface UserPhoto {
  id: number
  user_id: number
  path: string
}

export interface User {
  id: number
  employee_id: string
  name: string
  last_name?: string
  email: string
  role: string
  designation_id?: string
  designation: string
  location: string
  district: string
  employment_status: string
  date_employed: string
  photo?: UserPhoto | null
}