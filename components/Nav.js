import { auth } from '@/utils/firebase'
import Link from 'next/link'
import { useAuthState } from 'react-firebase-hooks/auth'

function Nav() {
  const [user, loading] = useAuthState(auth)

  return (
    <nav className="flex justify-between item-center py-5">
      <Link href="/">
        <button className="text-lg font-medium mt-8">
          PEOPLE THOUGHTS
        </button>
      </Link>
      <ul className="flex item-center gap-10">
        {!user && (
          <Link href={'/auth/login'}>
            <button className="py-2 px-4 bg-cyan-500 text-white font-medium mt-4">
              JOIN
            </button>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-2">
            <Link href="/post">
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 textx-sm">
                POST
              </button>
            </Link>
            <Link href="/">
              <button
                onClick={() => auth.signOut()}
                className="font-medium text-white bg-gray-800 py-2 px-4 my-6"
              >
                SIGN OUT{' '}
              </button>
            </Link>
            <Link href="/dashboard">
              <img
                className="w-12 rounded-full cursor-pointer"
                src={user.photoURL}
                alt="user_photo"
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  )
}

export default Nav
