import Head from 'next/head'
import { Inter } from 'next/font/google'
import Message from '@/components/Message'
import { db } from '@/utils/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  // All posts state
  const [allPosts, setAllPosts] = useState([])

  const getPost = async () => {
    const collectionRef = collection(db, 'posts')
    const q = query(collectionRef, orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    })
    return unsubscribe
  }

  useEffect(() => {
    getPost()
  }, [])

  return (
    <>
      <Head>
        <title>People thoughts</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="my-2 text-lg font-medium">
        <h2 className="text-lg font-medium text-center uppercase">
          What other people thinking?
        </h2>
        {allPosts.map((post) => {
          return (
            <Message key={post.id} {...post}>
              <Link href={{ pathname: `${post.id}`, query: { ...post } }}>
                <button>
                  {post.comments?.length > 0 ? post.comments.length : 0}{' '}
                  comments
                </button>
              </Link>
            </Message>
          )
        })}
      </div>
    </>
  )
}
