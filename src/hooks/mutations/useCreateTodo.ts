import { useMutation, useQueryClient } from "react-query";
import { supabase } from "lib/api";
import { Todo } from "types";

interface createTodoProps {
  task: string;
  user_id: string;
}

const createTodo = async (task: string, user_id: string) => {
  const { data, error } = await supabase
    .from<Todo>("todos")
    .insert({ task, user_id })
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ task, user_id }: createTodoProps) => createTodo(task, user_id),
    {
      onMutate: async (newTodo: Todo) => {
        await queryClient.cancelQueries("todos");
        const previousTodos = queryClient.getQueryData<Todo[]>("todos");
        queryClient.setQueryData<Todo[]>("todos", (todos = []) => [
          newTodo,
          ...todos,
        ]);

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
    }
  );
}
