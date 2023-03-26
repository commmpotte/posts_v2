import Message from '@/components/Message'
import { auth, db } from '@/utils/firebase'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { BsTrash2Fill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import Link from 'next/link'

function Dashboard() {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const [posts, setPosts] = useState([])

  //   If user logged
  const getData = async () => {
    if (loading) return
    if (!user) return route.push('/auth/login')
    const collectionRef = collection(db, 'posts')
    const q = query(collectionRef, where('user', '==', user.uid))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    })
    return unsubscribe
  }

  // Del post
  const deletePost = async (id) => {
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
  }

  //  Get user data here
  useEffect(() => {
    getData()
  }, [user, loading])

  return (
    <div>
      <h2 className="text-lg font-medium text-center">YOUR POSTS</h2>
      <div>
        {posts.map((post) => {
          return (
            <Message {...post} key={post.id}>
              <div className="flex gap-4">
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-pink-600 flex item-center justify-center py-2 gap-2 text-sm"
                >
                  <BsTrash2Fill className="text-2xl" />
                  DEL
                </button>
                <Link href={{ pathname: '/post', query: post }}>
                  <button className="text-teal-600 flex item-center justify-center py-2 gap-2 text-sm">
                    <AiFillEdit className="text-2xl" />
                    EDIT
                  </button>
                </Link>
              </div>
            </Message>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
