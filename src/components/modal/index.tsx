import cn from 'classnames'

import './styles.scss'

type ModalProps = {
  opened: boolean
  children: React.ReactNode
  onClick?: () => void
  className: string
}

export const Modal = ({ opened, children, onClick, className }: ModalProps) =>
  opened && (
    <div
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClick?.()
        }
      }}
      className={cn('modal-container', className)}
    >
      <>{children}</>
    </div>
  )
