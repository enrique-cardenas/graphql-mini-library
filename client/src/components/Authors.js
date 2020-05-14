import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState(props.authors[0].name)
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS}, {query: ALL_BOOKS}]
  })

  if (!props.show) {
    return null
  }

  const authors = props.authors

  const updateAuthor = async event => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(born) } })
    
    setName('')
    setBorn('')
  }

  const handleSelectChange = event => {
    setName(event.target.value);
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <select value={name} onChange={handleSelectChange}>
          {authors.map(author => 
            <option key={author.name} value={author.name}>{author.name}</option>
          )}
        </select>
        <div>
          born <input value={born}
            onChange={({ target }) => setBorn(target.value) }
          />
        </div>
        <button type='submit'>update author </button>
      </form>

    </div>
  )
}

export default Authors
