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
  designation?: string | null
  location: string
  district: string
  employment_status: string
  date_employed: string
  photo?: UserPhoto | null
}