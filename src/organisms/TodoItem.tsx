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

  return (
    <div className={"p-3 max-h-14 flex align-center justify-between border"}>
      <span className={"truncate flex-grow"}>
        <input
          className="cursor-pointer mr-2"
          onChange={handleToggleCompleted}
          type="checkbox"
          checked={todo.is_complete}
        />
        <span
          className={`w-full flex-grow ${
            todo.is_complete ? "line-through" : ""
          }`}
        >
          {todo.task}
        </span>
      </span>
      <button
        className={"font-mono text-red-500 text-xl border px-2"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
