import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS_BY_GENRE } from '../queries'

const Books = ( { show, allBooks } ) => {
  const [ getBooks, result ] = useLazyQuery(ALL_BOOKS_BY_GENRE)
  const [ booksByGenre, setBooksByGenre ] = useState(null)
  const [ genre, setGenre ] = useState(null)

  useEffect(() => {
    if(result.data){
      setBooksByGenre(result.data.allBooks)
    }

  }, [result.data])

  if (!show) {
    return null
  }

  if(result.loading){
    return <div>loading...</div>
  }

  const filterByGenre = genre => {
    setGenre(genre)
    getBooks({ variables: { genre }})
  }

  const resetFilter = () => {
    setGenre(null)
    setBooksByGenre(null)
  }

  const booksToShow = booksByGenre ? booksByGenre : allBooks

  const genres = [...new Set(allBooks.map(book => book.genres).flat())]

  return (
    <div>
      <h2>books</h2>

      {genre ? 
        <p>in genre <b>{genre}</b></p>
        :
        null
      }
      

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
      {genres.map(genre => 
        <button key={genre} onClick={() => filterByGenre(genre)}>{genre}</button>
      )}
      <button onClick={resetFilter}>all books</button>
    </div>
  )
}

export default Books