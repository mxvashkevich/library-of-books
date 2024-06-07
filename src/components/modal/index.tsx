import cn from 'classnames'

import styles from './styles.scss'

type ModalProps = {
  opened: boolean
  children: React.ReactNode
  onClick?: () => void
  className: string
}

export const Modal = ({ opened, children, onClick, className }: ModalProps) =>
  opened && (
    <div onClick={onClick} className={cn(styles.container, className)}>
      <div>{children}</div>
    </div>
  )
