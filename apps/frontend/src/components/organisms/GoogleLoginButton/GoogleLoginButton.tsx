import { authClient } from '../../../lib/auth-client'

const signIn = async () => {
  return authClient.signIn.social({
    provider: 'google',
    callbackURL: import.meta.env.VITE_FRONTEND_URI,
  })
}

export const GoogleLoginButton = () => {
  return <button onClick={() => signIn()}>Login with Google</button>
}
