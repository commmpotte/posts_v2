import Message from '@/components/Message'
import { auth, db } from '@/utils/firebase'
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Details() {
  const route = useRouter()
  const routeData = route.query
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState([])

  //   Submit comments
  const submitMessage = async () => {
    const docRef = doc(db, 'posts', routeData.id)
    // Check if user login?
    if (!auth.currentUser) return route.push('/auth/login')
    if (!message) {
      toast.error('You can not leave an empty message!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      })
      return
    }
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    })
    setMessage('')
  }

  //   Get comments
  const getComments = async () => {
    const docRef = doc(db, 'posts', routeData.id)
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments)
    })
    return unsubscribe
  }

  useEffect(() => {
    if (!route.isReady) return
    getComments()
  }, [route.isReady])

  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4">
        <div className="flex">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Leave a comment"
            type="text"
            className="bg-gray-800 text-white w-full p-2 text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-500 text-white py-2 px-4 text-sm"
          >
            SUBMIT
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">COMMENTS</h2>
          {allMessages?.map((message) => (
            <div className="bg-white p-4 my-4 border-2" key={message.time}>
              <div className="flex item-center gap-2 mb-4">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt="ava"
                />
                <h2>{message.username}</h2>
              </div>
              <h2>{message.message}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Details
