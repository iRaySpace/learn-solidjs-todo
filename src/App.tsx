import type { Component } from 'solid-js';
import { createSignal, batch, For } from 'solid-js';
import { createStore } from 'solid-js/store';

type TodoItem = { id: number; title: string; done: boolean };

const App: Component = () => {
  const [todoCounter, setTodoCounter] = createSignal(0);
  const [todoTitle, setTodoTitle] = createSignal("");
  const [todos, setTodos] = createStore<TodoItem[]>([]);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    batch(() => {
      setTodos(todos.length, {
        id: todoCounter(),
        title: todoTitle(),
        done: false,
      });
      setTodoTitle("");
      setTodoCounter(todoCounter() + 1);
    });
  }

  function handleRemove(currentTodos: TodoItem[], removedTodo: TodoItem) {
    return currentTodos.filter((todo) => todo.id !== removedTodo.id);
  }

  return (
    <div class="container mx-auto pt-11">
      <div class="max-w-lg mx-auto bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/10 p-5">
        <h1 class="text-gray-900 text-2xl text-center mb-5">SolidJS Todo</h1>
        <form 
          class="flex justify-between"
          onSubmit={handleSubmit}
        >
          <input
            required
            class="p-3"
            placeholder='enter todo and click +'
            value={todoTitle()}
            onInput={(e) => setTodoTitle(e.currentTarget.value)}
          />
          <button class="h-10 px-6 font-semibold rounded-md bg-[#0ea5e9] text-white">
            +
          </button>
        </form>
        <For each={todos}>
          {(todo, i) => (
            <div class="flex justify-between mt-3">
              <div>
                <input
                  class="mr-5"
                  type="checkbox"
                  checked={todo.done}
                  onChange={(e) => setTodos(i(), "done", e.currentTarget.checked)}
                />
                <span class={todo.done ? 'line-through' : ''}>
                  {todo.title}
                </span>
              </div>
              <button
                class="h-10 px-6 font-semibold rounded-md bg-red-500 text-white"
                onClick={() => setTodos((t) => handleRemove(t, todo))}
              >
                x
              </button>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default App;
