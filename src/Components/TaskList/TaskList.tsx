import styles from './TaskList.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
interface TaskListProps {
  doneTaskList: boolean
}
function TaskList(props: TaskListProps) {
  const { doneTaskList } = props
  return (
    <div className={cx('task-list-container')}>
      <h2 className={cx('title')}>{doneTaskList ? 'Done' : 'In Progress'}</h2>
      <div className={cx('task-list-body')}>
        <input type='checkBox' className={cx('task-check')} />
        <div className={cx('task-content')}>Learn React</div>
        <div className={cx('action')}>
          <button className={cx('task-btn')}>✏</button>
          <button className={cx('task-btn')}>🗑</button>
        </div>
      </div>

      <div className={cx('task-list-body')}>
        <input type='checkBox' className={cx('task-check')} />
        <div className={cx('task-content', 'task-content-done')}>Học React</div>
        <div className={cx('action')}>
          <button className={cx('task-btn')}>✏</button>
          <button className={cx('task-btn')}>🗑</button>
        </div>
      </div>
    </div>
  )
}

export default TaskList
