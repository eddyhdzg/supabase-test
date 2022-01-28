import { useQuery } from "react-query";
import { supabase } from "lib/api";
import { Todo } from "types";

const fetchTodos = async () => {
  const { data, error } = await supabase
    .from<Todo>("todos")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export default function useTodos() {
  return useQuery("todos", () => fetchTodos());
}
