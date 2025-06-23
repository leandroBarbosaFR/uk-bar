'use client'

import {signIn} from 'next-auth/react'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Mail} from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('email', {
      email,
      callbackUrl: '/studio',
      redirect: false,
    })
    if (!res?.error) setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f0e7] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-[#33483e] mb-6">
          Connexion par e-mail
        </h1>

        {sent ? (
          <p className="text-center text-[#33483e]">
            Un lien de connexion a été envoyé à <strong>{email}</strong>.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-md focus:outline-none"
            />
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-[#33483e]"
            >
              <Mail size={18} />
              Se connecter par e-mail
            </Button>
          </form>
        )}

        <p className="text-sm text-center text-gray-500 mt-6">
          Vous devez être autorisé pour accéder à l’espace Studio.
        </p>
      </div>
    </div>
  )
}
