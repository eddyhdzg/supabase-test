import { Todo } from "types";
import { useUpdateTodo } from "hooks";

interface TodoItemProps {
  todo: Todo;
  onDelete: () => void;
}

const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  const updateTodo = useUpdateTodo();

  const handleToggleCompleted = () => {
    updateTodo.mutate({ id: todo.id || "", is_complete: !todo.is_complete });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTodo.mutate({ id: todo.id || "", task: e.target.value });
  };

  return (
    <div className="py-3 px-1 flex justify-between align-center">
      <div className="flex flex-1 items-center mb-4">
        <input
          id={`checkbox-${todo.id}`}
          type="checkbox"
          className="w-5 h-5 mr-2 cursor-pointer rounded border-2 ring-offset-1 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 focus:ring-2 dark:border-gray-500"
          checked={todo.is_complete}
          onChange={handleToggleCompleted}
        />
        <input
          type="text"
          id="small-input"
          className="w-full py-1 px-2 text-sm bg-transparent "
          onChange={handleTextChange}
          defaultValue={todo.task}
        />
      </div>
      <div>
        <button
          className="font-mono text-red-500 text-xl px-2 focus:ring-2 ring-red-500 rounded"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
