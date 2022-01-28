export interface Todo {
  id?: string;
  user_id?: string;
  task?: string;
  is_complete?: boolean;
  inserted_at?: any;
}

export type AuthAction = "REGISTER" | "LOGIN";

export interface HelperText {
  error: boolean | null;
  text: string | null;
}
