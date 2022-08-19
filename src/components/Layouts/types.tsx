import { ReactNode } from 'react'

export type SubRoute = {
  path: string
  name: ReactNode
  component: React.LazyExoticComponent<() => JSX.Element>
}
