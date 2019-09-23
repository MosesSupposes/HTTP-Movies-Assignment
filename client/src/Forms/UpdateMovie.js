import React, { useState } from 'react'
import axios from 'axios'

export default function UpdateMovie(props) {
    const id = props.match.params.id

    const initialState = {
        id,
        title: '',
        director: '',
        metascore: '',
        stars: []
    }
    
    const [movie, setMovie] = useState(initialState)

    const handleSubmit = ev => {
        ev.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => { props.history.push("/") })
        .catch(err => { console.error(err) })
    }

    const handleChange = ev => {
        if (ev.target.name === "stars") {
            setMovie({
                ...movie,
                stars: ev.target.value.split(',')
            })
        } else {
            setMovie({
                ...movie, 
                [ev.target.name]: ev.target.value
            })
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">
                Title
                <input 
                    name="title"
                    type="text" 
                    onChange={handleChange} 
                />
            </label>
            <label htmlFor="director">
                Director
                <input 
                    name="director" 
                    type="text" 
                    onChange={handleChange} 
                />
            </label>
            <label htmlFor="metascore">
                Metascore
                <input 
                    name="metascore" 
                    type="text" 
                    onChange={handleChange} 
                />
            </label>
            <label htmlFor="stars">
                Stars
                <input 
                    name="stars"
                    type="text" 
                    onChange={handleChange} 
                    placeholder="separate stars by comma"
                />
            </label>
            <button role="submit">Submit</button>
        </form>
    )
}