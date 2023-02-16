import styles from './TaskInput.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
function TaskInput() {
  return (
    <div className={cx('task-input-container')}>
      <h2 className={cx('title')}>Todo List App</h2>
      <div className={cx('task-input-body')}>
        <input type='text' placeholder='Enter Your Task' className={cx('task-input')} />
        <button className={cx('add-btn')}>➕</button>
      </div>
    </div>
  )
}

export default TaskInput
