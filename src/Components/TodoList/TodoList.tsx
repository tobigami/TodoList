import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './TodoList.module.scss'
import classNames from 'classnames/bind'
import { Todo } from '../@types/todo.type'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)

type HandleNewTodosObj = (pra: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodosObj: HandleNewTodosObj) => {
  const todosString = localStorage.getItem('todos')
  const todosObj: Todo[] = JSON.parse(todosString || '[]')
  const newTodosObj = handleNewTodosObj(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<null | Todo>(null)
  const doneTodos = todos.filter((item) => item.done)
  const notDoneTodos = todos.filter((item) => !item.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (value: string) => {
    const newTodo: Todo = {
      name: value,
      id: new Date().toISOString(),
      done: false
    }
    setTodos((pre) => [...pre, newTodo])
    syncReactToLocal((value: Todo[]) => [...value, newTodo])
  }

  const removeTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }

    const handler = (todosObj: Todo[]) => {
      const result = [...todosObj]
      const index = todosObj.findIndex((todo) => todo.id === id)
      if (index > -1) {
        result.splice(index, 1)
      }
      return result
    }
    setTodos(handler)
    syncReactToLocal(handler)
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
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj: Todo[] = todosObj.map((todo) => {
      if (todo.id === id) {
        todo.done = done
      }
      return todo
    })
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
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
    const handler = (array: Todo[]) => {
      return array.map((todo) => {
        if (todo.id === currentTodo?.id) {
          todo.name = currentTodo.name
        }
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    syncReactToLocal(handler)
  }

  return (
    <div className={cx('todolist-container')}>
      <div className={cx('todolist-body')}>
        <TaskInput finishEdit={finishEdit} currentTodo={currentTodo} addTodo={addTodo} editTodo={editTodo} />
        <TaskList
          removeTodo={removeTodo}
          doneTaskList={false}
          todos={notDoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
        <TaskList
          removeTodo={removeTodo}
          doneTaskList={true}
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
        />
      </div>
    </div>
  )
}

export default TodoList
