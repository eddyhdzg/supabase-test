import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Todo } from "types";

interface updateTodoProps extends Pick<Todo, "task" | "is_complete"> {
  id: string;
}

const updateTodo = async ({ id, ...todo }: updateTodoProps) => {
  const { data, error } = await supabase
    .from<Todo>("todos")
    .update(todo)
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation((todo: updateTodoProps) => updateTodo(todo), {
    onMutate: async (updatedTodo: Todo) => {
      await queryClient.cancelQueries("todos");
      const previousTodos = queryClient.getQueryData<Todo[]>("todos");
      queryClient.setQueryData<Todo[]>("todos", (todos = []) =>
        todos.map((todo) =>
          todo.id !== updatedTodo.id
            ? todo
            : { ...todo, is_complete: Boolean(updatedTodo?.is_complete) }
        )
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
