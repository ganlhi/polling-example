export interface Task {
  id: number
  structure: string
  progress: number
  status: 'pending' | 'done'
}
