import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/articles_/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/articles_/"!</div>
}
