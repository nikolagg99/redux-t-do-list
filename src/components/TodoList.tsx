import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addTodo, removeTodo, setTodoStatus } from '../redux/todoSlice';

// Import items from material-ui library
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import UndoIcon from '@material-ui/icons/Undo';

const TodoList = () => {
    const [todoDescription, setTodoDescription] = useState("");
  
    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();

    const [status, setStatus] = useState(true);

    return (
      <>
        <div className="container">
          <h1>My To Do List</h1>
          <div className="components-container">
            <div className="add-todo-container">
              <div className="add-todo-item">
                <input
                  placeholder="Add your todo item..."
                  className="todo-input"
                  type="text"
                  id="todo_description"
                  name="description"
                  onChange={(e) => setTodoDescription(e.target.value)}
                  value={todoDescription}
                />
              </div>
              <div className="add-todo-item">
                <button
                  className="add-button"
                  onClick={() => {
                    dispatch(addTodo(todoDescription));
                    setTodoDescription("");
                  }}
                >
                  Add Todo
                </button>
              </div>
            </div>
            <hr />

            <div className="todo-list-container">
              <h3>My list</h3>
              <div>
                <button
                  className="status-button status-all"
                  onClick={() => setStatus(true)}
                >
                  All
                </button>

                <button
                  className="status-button status-completed"
                  onClick={() => setStatus(false)}
                >
                  Completed
                </button>
              </div>
              <hr />
              <ul className="todo-list">
                {!todoList.length ? (
                  <p className="empty-alert">Your list is empty.</p>
                ) : status ? (
                  todoList.map((todo) => {
                    if (!todo.completed) {
                      return (
                        <li key={todo.id}>
                          <div className="todo-item check">
                            <Checkbox
                              value={todo.completed}
                              onChange={() => {
                                dispatch(
                                  setTodoStatus({
                                    completed: !todo.completed,
                                    id: todo.id,
                                  })
                                );
                              }}
                            />
                          </div>

                          <div className="todo-item description">
                            {todo.description}
                          </div>

                          <div className="todo-item delete">
                            <IconButton
                              className="delete-button"
                              onClick={() => {
                                dispatch(removeTodo(todo.id));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </li>
                      );
                    }
                  })
                ) : (
                  todoList.map((todo) => {
                    if (todo.completed) {
                      return (
                        <li key={todo.id}>
                          <div className="todo-item check">
                            <UndoIcon
                              onClick={() => {
                                dispatch(
                                  setTodoStatus({
                                    completed: !todo.completed,
                                    id: todo.id,
                                  })
                                );
                              }}
                            />
                          </div>

                          <div className="todo-item description">
                            {todo.description}
                          </div>

                          <div className="todo-item delete">
                            <IconButton
                              className="delete-button"
                              onClick={() => {
                                dispatch(removeTodo(todo.id));
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </li>
                      );
                    }
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
}

export default TodoList;