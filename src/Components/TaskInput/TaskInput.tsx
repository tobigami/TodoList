import styles from './TaskInput.module.scss'
import classNames from 'classnames/bind'
import { useRef, useState } from 'react'
import { Todo } from '../@types/todo.type'
const cx = classNames.bind(styles)
interface typeTaskInput {
  addTodo: (value: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEdit: () => void
}
function TaskInput(props: typeTaskInput) {
  const { addTodo, currentTodo, editTodo, finishEdit } = props
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editTodo(event.target.value)
    } else {
      setName(event.target.value)
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEdit()
      setName('')
    } else {
      if (name === '') {
        return
      }
      addTodo(name)
      inputRef.current?.focus()
      setName('')
    }
  }
  console.log(name)
  return (
    <form onSubmit={handleSubmit} className={cx('task-input-container')}>
      <h2 className={cx('title')}>Todo List App</h2>
      <div className={cx('task-input-body')}>
        <input
          ref={inputRef}
          onChange={onChangeInput}
          value={currentTodo ? currentTodo.name : name}
          type='text'
          placeholder='Enter Your Task'
          className={cx('task-input')}
        />
        <button className={cx('add-btn')} type='submit'>
          {currentTodo ? '😒' : '➕'}
        </button>
      </div>
    </form>
  )
}

export default TaskInput
