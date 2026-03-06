import { Link } from 'react-router-dom'
import { Card } from '../components/ui'

export default function NotFound() {
  return (
    <Card>
      <div className="text-lg font-extrabold">Page not found</div>
      <Link to="/" className="mt-3 inline-block text-sm font-semibold underline">
        Go home
      </Link>
    </Card>
  )
}
