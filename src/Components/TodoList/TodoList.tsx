import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './TodoList.module.scss'
import classNames from 'classnames/bind'
import { Todo } from '../@types/todo.type'
import { useState } from 'react'
const cx = classNames.bind(styles)

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<null | Todo>(null)
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

  const startEditTodo = (id: string) => {
    const findTodo = todos.find((todo) => {
      return todo.id === id
    })
    if (findTodo) {
      setCurrentTodo(findTodo)
    }
  }

  const editTodo = (name: string) => {
    setCurrentTodo((pre) => {
      if (pre) {
        return { ...pre, name }
      }
      return null
    })
  }
  const finishEdit = () => {
    setTodos((pre) => {
      return pre.map((todo) => {
        if (todo.id === currentTodo?.id) {
          todo.name = currentTodo.name
        }
        return todo
      })
    })
    setCurrentTodo(null)
  }

  return (
    <div className={cx('todolist-container')}>
      <div className={cx('todolist-body')}>
        <TaskInput finishEdit={finishEdit} currentTodo={currentTodo} addTodo={addTodo} editTodo={editTodo} />
        <TaskList
          doneTaskList={false}
          todos={notDoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
        <TaskList doneTaskList={true} todos={doneTodos} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} />
      </div>
    </div>
  )
}

export default TodoList
