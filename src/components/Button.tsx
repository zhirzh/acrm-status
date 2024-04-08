import { cx } from '@/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  fulWidth?: boolean
}

export default function Button({ children, fulWidth, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={cx(
        'rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm',
        fulWidth && 'w-full',
        disabled
          ? 'cursor-not-allowed bg-indigo-400 hover:bg-indigo-400'
          : 'bg-indigo-600 hover:bg-indigo-500',
      )}
    >
      {children}
    </button>
  )
}
