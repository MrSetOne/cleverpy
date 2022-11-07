export interface post {
  id: number | null
  userId: number | null
  gender: 'male' | 'female' | null
  username: string | null
  title: string | null
  body: string | null
}

export type tools = 'edit' | 'delete' | false