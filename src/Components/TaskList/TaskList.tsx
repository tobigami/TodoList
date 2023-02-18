import styles from './TaskList.module.scss'
import classNames from 'classnames/bind'
import { Todo } from '../@types/todo.type'
const cx = classNames.bind(styles)
interface TaskListProps {
  doneTaskList: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
}
function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo } = props
  const onChangeCheckbox = (idTodo: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTodo(idTodo, event.target.checked)
  }
  return (
    <div className={cx('task-list-container')}>
      <h2 className={cx('title')}>{doneTaskList ? 'Done' : 'In Progress'}</h2>
      {todos.map((value) => {
        return (
          <div key={value.id} className={cx('task-list-body')}>
            <input
              onChange={onChangeCheckbox(value.id)}
              checked={value.done}
              type='checkBox'
              className={cx('task-check')}
            />
            <div
              className={cx('task-content', {
                'task-content-done': value.done
              })}
            >
              {value.name}
            </div>
            <div className={cx('action')}>
              <button onClick={() => startEditTodo(value.id)} className={cx('task-btn')}>
                ✏
              </button>
              <button className={cx('task-btn')}>🗑</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TaskList
