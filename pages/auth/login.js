import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

function Login() {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)

  // SIGN IN WITH GOOGLE
  const googleProvider = new GoogleAuthProvider()
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      route.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  //   For checking status on a page

  useEffect(() => {
    if (user) {
      route.push('/')
    } else {
      console.log('login plz')
    }
  }, [user])

  return (
    <div className="shadow-xl mt-4 p-10 text-gray-700 rounded-lg">
      <h2 className="text-2xl font-medium text-center">JOIN HERE</h2>
      <div className="py-4">
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FcGoogle className="text-2xl" />
          SIGN WITH GOOGLE
        </button>
      </div>
    </div>
  )
}

export default Login
