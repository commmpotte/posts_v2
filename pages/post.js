import { auth, db } from '@/utils/firebase'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'

function Post() {
  // Form state
  const [post, setPost] = useState({ description: '' })
  const [user, loading] = useAuthState(auth)
  const route = useRouter()
  const routeData = route.query

  //   Submit post
  const submitPost = async (e) => {
    e.preventDefault()

    // Check for description
    if (!post.description) {
      toast.error('Description field empty!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      })
      return
    }

    if (post.description.length > 300) {
      toast.error('Description too long!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      })
      return
    }

    if (post?.hasOwnProperty('id')) {
      const docRef = doc(db, 'posts ', post.id)
      const upadatedPost = { ...post, timestamp: serverTimestamp() }
      await updateDoc(docRef, upadatedPost)
      return route.push('/')
    } else {
      // Make a new post here
      const collectionRef = collection(db, 'posts')
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      })
      setPost({ description: '' })
      toast.success('Post has been made', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      })
      return route.push('/')
    }
  }

  //Checking user for editing
  const checkUser = async () => {
    if (loading) return
    if (!user) route.push('auth/login')
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id })
    }
  }

  useEffect(() => {
    checkUser()
  }, [user, loading])

  return (
    <div className="my-8 p-12 shadow-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty('id') ? 'Edit your post' : 'Create a new post'}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-600 h-48 w-full text-white rounded-lg text-sm p-2"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? 'text-red-600' : ''
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full font-medium bg-cyan-500 p-2 my-2 rounded-lg text-sm text-white"
        >
          SUBMIT
        </button>
      </form>
    </div>
  )
}

export default Post
