import { authClient } from '../../../lib/auth-client'

export const AuthSession = () => {
  const { data, isPending } = authClient.useSession()

  if (isPending) return 'LOADING...'

  return (
    <div>
      {JSON.stringify(data)}

      <>{data?.user.image && <img src={data.user.image} />}</>
    </div>
  )
}
