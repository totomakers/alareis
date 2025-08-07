import { Card } from '@alareis/design-system/Card'
import { Button } from '@alareis/design-system/Button'
import { GoogleLoginButton } from './components/organisms/GoogleLoginButton/GoogleLoginButton'
import { AuthSession } from './components/organisms/AuthSession/AuthSession'

function App() {
  return (
    <>
      <Card />
      <Button />
      <div>----------------</div>
      <GoogleLoginButton />
      <AuthSession />
    </>
  )
}

export default App
