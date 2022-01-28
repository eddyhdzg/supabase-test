import { useState, useRef } from "react";
import { User } from "@supabase/supabase-js";
import TodoItem from "./TodoItem";
import { useTodos, useCreateTodo, useDeleteTodo, useLogout } from "hooks";

const Home = ({ user }: { user: User }) => {
  const newTaskTextRef = useRef<HTMLInputElement | null>(null);
  const { data: todos } = useTodos();
  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const logout = useLogout();

  const handleCreateTodo = async () => {
    const taskText = newTaskTextRef.current?.value || "";
    const task = taskText.trim();
    createTodo.mutate({ task, user_id: user.id });
    if (newTaskTextRef.current) {
      newTaskTextRef.current.value = "";
    }
  };

  return (
    <div className="w-screen flex flex-col min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-4 h-16 bg-gray-500">
        <h1 className="text-2xl sm:text-3xl">Todo List</h1>
        <button
          onClick={logout}
          className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </header>

      <div
        className="flex flex-col flex-grow p-4"
        style={{ height: "calc(100vh - 11.5rem)" }}
      >
        <div
          className={`p-2 border flex-grow grid gap-2 ${
            todos?.length ? "auto-rows-min" : ""
          } grid-cols-1 h-2/3 overflow-y-scroll first:mt-8`}
        >
          {todos?.length ? (
            todos?.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={() => deleteTodo.mutate({ id: todo?.id || "" })}
              />
            ))
          ) : (
            <span className="h-full flex justify-center items-center">
              You do have any tasks yet!
            </span>
          )}
        </div>
      </div>
      <div className="flex m-4 mt-0 h-10">
        <input
          ref={newTaskTextRef}
          type="text"
          onKeyUp={(e) => e.key === "Enter" && handleCreateTodo()}
          className="bg-gray-200 border px-2 border-gray-300 w-full mr-4"
        />
        <button
          onClick={handleCreateTodo}
          className="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Home;
