import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import RecommendedBooks from './components/RecommendedBooks'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, AUTHOR_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors_result = useQuery(ALL_AUTHORS)
  const books_result = useQuery(ALL_BOOKS)
  const client = useApolloClient()


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} has been added`)
      updateCacheWith(addedBook)
    }
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded

      const dataInStore = client.readQuery({ query: ALL_AUTHORS })

      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors : dataInStore.allAuthors.concat(addedAuthor) }
      })
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])

  if (authors_result.loading || books_result.loading){
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    if(page === 'add' || page === 'recommended'){
      setPage('authors')
    }
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
          :
          <button onClick={() => setPage('login')}>login</button>
        }
        
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors_result.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        allBooks={books_result.data.allBooks}
      />

      <RecommendedBooks
        show={page === 'recommended'}
        books={books_result.data.allBooks}
        loggedIn={token ? true : false}
      />

      <Login 
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

    </div>
  )
}

export default App