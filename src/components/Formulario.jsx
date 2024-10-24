import { useState, useEffect } from 'react'

function Formulario () {
    const [nombre, setNombre] = useState('')
    const [error, setError] = useState('')
    const [pokemon, setPokemon] = useState('')
    const [imagen, setImagen] = useState('')
  
    const getPokemon = () => {
      setError('')
  
      if(!nombre) return 
  
      fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
      .then(response => {
        if(response.ok === false){
          return setError(`Pokemon no encontrado`)
        } return response.json()
      })
      .then (data => {
        setPokemon(data.name)
        setImagen(data.sprites.front_default)
      })
      .catch(() => {
        setError('Pokemon no encontrado')
        setPokemon('')
        setImagen('')
      })
    }
  
    useEffect(()=> {
      setTimeout(() => {
      getPokemon()},500)
    },[nombre])
  
    const handleSubmit = (e) => {
      e.preventDefault()
      getPokemon()
    }
  
    return (
    <>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Nombre de Pokemon </label>
        <input type='text' id='nombre' name='nombre' value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
        <button type='submit'>Enviar</button>
      </form>
      <div className='card'>
          {imagen && <img src={imagen} alt={pokemon} />}
          {pokemon && <p>{pokemon}</p>}
      </div>
      <div className='error'>{error}</div>
    </>
  )
}

export default Formulario
