import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Todo } from "types";

interface deleteTodoProps {
  id: string;
}

const deleteTodo = async (id: string) => {
  const { data, error } = await supabase
    .from<Todo>("todos")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation(({ id }: deleteTodoProps) => deleteTodo(id), {
    onMutate: async (deletedTodo: Todo) => {
      await queryClient.cancelQueries("todos");
      const previousTodos = queryClient.getQueryData<Todo[]>("todos");
      queryClient.setQueryData<Todo[]>("todos", (todos = []) =>
        todos.filter((todos) => todos.id !== deletedTodo.id)
      );
      return { previousTodos };
    },
    onError: (_, __, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>("todos", context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries("todos");
    },
  });
}
