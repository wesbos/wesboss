export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      views: {
        Row: {
          id: string
          count: number | null
        }
        Insert: {
          id: string
          count?: number | null
        }
        Update: {
          id?: string
          count?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment: {
        Args: { row_id: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

