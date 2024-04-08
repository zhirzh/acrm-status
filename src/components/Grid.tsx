import { cx } from '@/utils'

export default function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cx(
        'divide-y divide-gray-200 rounded-md border border-gray-300',
        'sm:grid sm:grid-cols-2 sm:divide-y-0 sm:[&>:nth-child(odd)]:border-r',
        // add botder-bottom to all children in grid with 2 columns except last row
        'sm:[&>:not(:nth-child(2n):nth-last-child(-n+3)~*)]:border-b',
      )}
    >
      {children}
    </div>
  )
}
