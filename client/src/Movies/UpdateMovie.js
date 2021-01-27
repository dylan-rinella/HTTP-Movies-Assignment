import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";


const initialUpdateValues = {
  title: '',
  director: '',
  metascore: '',
}

const UpdateMovie = props => {
  const { movieList, setMovieList } = props;
  const { push } = useHistory()
  const [movie, setMovie] = useState(initialUpdateValues)
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const changeHandler = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        props.setMovieList([...movieList, res.data])
        push('/movies')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }



  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='title'
          onChange={changeHandler}
          placeholder='title'
          value={movie.title}
        />

        <div className="baseline" />

        <input 
          type='text'
          name='director'
          onChange={changeHandler}
          placeholder='director'
          value={movie.director}
        />

        <div className="baseline" />

        <input 
          type='text'
          name='metascore'
          onChange={changeHandler}
          placeholder='metascore'
          value={movie.metascore}
        />

        <div className="baseline" />

        <button>Submit</button>
      </form>
    </div>
  )

}


export default UpdateMovie;