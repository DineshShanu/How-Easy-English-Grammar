import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Input, SecondaryButton } from '../components/ui'
import { useAppState } from '../state/AppState'

export default function Signup() {
  const { state, actions } = useAppState()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const emailTaken = useMemo(() => {
    const e = email.trim().toLowerCase()
    return state.users.some((u) => u.email.toLowerCase() === e)
  }, [email, state.users])

  return (
    <div className="mx-auto max-w-md">
      <Card className="p-6">
        <h1 className="text-xl font-extrabold">Create your account</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Start learning with EN/HI explanations.</p>
        <form
          className="mt-5 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            setError(null)
            if (emailTaken) {
              setError('This email is already registered.')
              return
            }
            if (!email || !password) {
              setError('Please fill all required fields.')
              return
            }
            actions.signup({ name, email, password })
            navigate('/dashboard')
          }}
        >
          <Input label="Name" value={name} onChange={setName} placeholder="Your name" />
          <Input label="Email" value={email} onChange={setEmail} type="email" placeholder="student@example.com" />
          <Input label="Password" value={password} onChange={setPassword} type="password" placeholder="••••••••" />
          {error ? <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">{error}</div> : null}
          <div className="mt-2 flex items-center gap-2">
            <Button type="submit" className="flex-1" disabled={!email || !password}>
              Sign up
            </Button>
            <SecondaryButton className="w-full flex-1" onClick={() => navigate('/login')}>
              Login
            </SecondaryButton>
          </div>
        </form>
      </Card>
    </div>
  )
}
