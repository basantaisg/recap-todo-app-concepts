import './CSS/TodoItems.css';
import tick from './Assets/tick.png';
import not_tick from './Assets/not_tick.png';
import cross from './Assets/cross.png';

interface TodoItemsProps {
  no: number;
  display: string;
  text: string;
  setTodos: (todos: Todo[]) => void;
}

interface Todo {
  no: number;
  display: string;
  text: string;
}

const TodoItems: React.FC<TodoItemsProps> = ({
  no,
  display,
  text,
  setTodos,
}) => {
  const toggle = (no: number): void => {
    const todos = localStorage.getItem('todos');
    if (!todos) return;

    const data: Todo[] = JSON.parse(todos);
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        data[i].display = data[i].display === '' ? 'line-through' : '';
        break;
      }
    }

    localStorage.setItem('todos', JSON.stringify(data));
    setTodos(data);
  };

  return (
    <div className='todoitems'>
      <div className='todoitems-container' onClick={() => toggle(no)}>
        {display === '' ? (
          <img src={not_tick} alt='Not completed' />
        ) : (
          <img src={tick} alt='Completed' />
        )}

        <div className='todoitems-text'>{text}</div>
      </div>
      <img src={cross} className='todoitems-cross-icon' alt='Delete' />
    </div>
  );
};

export default TodoItems;
