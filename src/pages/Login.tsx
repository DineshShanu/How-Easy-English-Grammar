import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, SecondaryButton } from '../components/ui'
import { useAppState } from '../state/AppState'

export default function Login() {
  const { state, actions } = useAppState()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const canLogin = useMemo(() => {
    const e = email.trim().toLowerCase()
    return state.users.some((u) => u.email.toLowerCase() === e && u.password === password)
  }, [email, password, state.users])

  return (
    <div className="mx-auto max-w-md">
      <Card className="p-6">
        <h1 className="text-xl font-extrabold">Login</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Welcome back. Continue your grammar journey.</p>
        <form
          className="mt-5 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            setError(null)
            if (!canLogin) {
              setError('Invalid email or password.')
              return
            }
            actions.login({ email, password })
            navigate('/dashboard')
          }}
        >
          <Input label="Email" value={email} onChange={setEmail} type="email" placeholder="student@example.com" />
          <Input label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
          {error ? <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">{error}</div> : null}
          <div className="mt-2 flex items-center gap-2">
            <Button type="submit" className="flex-1" disabled={!email || !password}>
              Login
            </Button>
            <SecondaryButton className="w-full flex-1" onClick={() => navigate('/signup')}>
              Create account
            </SecondaryButton>
          </div>
        </form>
      </Card>
    </div>
  )
}
