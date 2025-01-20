import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css';
import TodoItems from './TodoItems';

interface Todo {
  no: number;
  text: string;
  display: string;
}

let count = 0;

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = (): void => {
    if (inputRef.current?.value.trim()) {
      setTodos([
        ...todos,
        { no: count++, text: inputRef.current.value.trim(), display: '' },
      ]);

      inputRef.current.value = '';
      localStorage.setItem('todos_count', count.toString());
    }
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedCount = localStorage.getItem('todos_count');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos) as Todo[]);
    }

    if (savedCount) {
      count = parseInt(savedCount, 10);
    }
  }, []);

  useEffect(() => {
    const saveTodos = setTimeout(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, 100);

    return () => clearTimeout(saveTodos); // Cleanup timeout on component unmount or todos change
  }, [todos]);

  return (
    <div className='todo'>
      <div className='todo-header'>To-Do List</div>
      <div className='todo-add'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Enter Todos...'
          className='todo-input'
        />
        <div onClick={addTodo} className='todo-add-btn'>
          ADD
        </div>
      </div>

      <div className='todo-list'>
        {todos.map((item) => (
          <TodoItems
            key={item.no}
            no={item.no}
            display={item.display}
            text={item.text}
            setTodos={setTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
