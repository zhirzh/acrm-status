import { cx } from '@/utils'
import Link, { LinkProps as NextLinkProps } from 'next/link'

type CommonButtonProps = {
  children: React.ReactNode
  fulWidth?: boolean
}

type ButtonProps = CommonButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, fulWidth, disabled, ...props }: ButtonProps) {
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

type LinkProps = CommonButtonProps &
  (NextLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>)

Button.Link = function LinkButton({ children, fulWidth, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={cx(
        'rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm',
        fulWidth && 'w-full',
        'bg-indigo-600 hover:bg-indigo-500',
      )}
    >
      {children}
    </Link>
  )
}
