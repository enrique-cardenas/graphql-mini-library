import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ME } from '../queries'

const RecommendedBooks = ( { show, books, loggedIn } ) => {
  const result = useQuery(ME)
  
  if (!show || !loggedIn) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }
  const favoriteGenre = result.data.me.favoriteGenre
  const booksToShow = books.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{favoriteGenre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks