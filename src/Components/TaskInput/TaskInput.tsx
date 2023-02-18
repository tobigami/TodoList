import styles from './TaskInput.module.scss'
import classNames from 'classnames/bind'
import { useRef, useState } from 'react'
const cx = classNames.bind(styles)
interface typeTaskInput {
  addTodo: (value: string) => void
}
function TaskInput(props: typeTaskInput) {
  const { addTodo } = props
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (name === '') {
      return
    }
    addTodo(name)
    inputRef.current?.focus()
    setName('')
  }
  return (
    <form onSubmit={handleSubmit} className={cx('task-input-container')}>
      <h2 className={cx('title')}>Todo List App</h2>
      <div className={cx('task-input-body')}>
        <input
          ref={inputRef}
          onChange={(e) => {
            setName(e.target.value)
          }}
          value={name}
          type='text'
          placeholder='Enter Your Task'
          className={cx('task-input')}
        />
        <button className={cx('add-btn')} type='submit'>
          ➕
        </button>
      </div>
    </form>
  )
}

export default TaskInput
