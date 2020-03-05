import React, {useState} from 'react'

const Search = ({searchData}) => {
  const [data, setData] = useState('')
  
  const handleSubmit = e => {
    e.preventDefault()
    searchData(data)
  }

  return (
    <form className="ui search" onSubmit={handleSubmit}>
      <div className="ui icon input">
        <input
          className="prompt" 
          type="text" 
          placeholder="Search by name..."
          value={data}
          onChange={(e) =>setData(e.target.value)}
        />
        <i className="search icon"/>
      </div>
    </form>
  )
}

export default Search