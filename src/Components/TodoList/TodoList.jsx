import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './TodoList.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

function TodoList() {
  return (
    <div className={cx('todolist-container')}>
      <div className={cx('todolist-body')}>
        <TaskInput />
        <TaskList doneTaskList={true} />
        <TaskList doneTaskList={false} />
      </div>
    </div>
  )
}

export default TodoList
