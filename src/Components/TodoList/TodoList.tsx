import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './TodoList.module.scss'
import classNames from 'classnames/bind'
import { Todo } from '../@types/todo.type'
import { useState } from 'react'
const cx = classNames.bind(styles)

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const doneTodos = todos.filter((item) => item.done)
  const notDoneTodos = todos.filter((item) => !item.done)

  const addTodo = (value: string) => {
    const newTodo: Todo = {
      name: value,
      id: new Date().toISOString(),
      done: false
    }
    setTodos((pre) => [...pre, newTodo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    setTodos((pre) => {
      return pre.map((todo) => {
        if (todo.id === id) {
          todo = { ...todo, done }
        }
        return todo
      })
    })
  }
  return (
    <div className={cx('todolist-container')}>
      <div className={cx('todolist-body')}>
        <TaskInput addTodo={addTodo} />
        <TaskList doneTaskList={false} todos={notDoneTodos} handleDoneTodo={handleDoneTodo} />
        <TaskList doneTaskList={true} todos={doneTodos} handleDoneTodo={handleDoneTodo} />
      </div>
    </div>
  )
}

export default TodoList
