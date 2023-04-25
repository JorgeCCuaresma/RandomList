import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { Sortby, type User } from './types.d'
import { UserList } from './components/UserList'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<Sortby>(Sortby.None)
  const originalUsers = useRef<User[]>([])
  const [filteredCountry, setFilteredCountry] = useState<string | null>(null)
  const ChangeColor = () => {
    setShowColor(!showColor)
  }
  const sortListByCountry = () => {
    const newSorting = sorting === Sortby.None ? Sortby.Country : Sortby.None
    setSorting(newSorting)
  }

  const handleChangeSort = (newSorting: Sortby) => {
    setSorting(newSorting)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(error => { console.error(error) })
  }, [])

  const filteredUsers = useMemo(() => {
    return typeof filteredCountry === 'string' && filteredCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filteredCountry.toLowerCase()))
      : users
  }, [filteredCountry, users])

  const sortedUser = useMemo(() => {
    if (sorting === Sortby.Country) {
      return [...filteredUsers].sort((a, b) => a.location.country.localeCompare(b.location.country))
    }
    if (sorting === Sortby.Name) {
      return [...filteredUsers].sort((a, b) => a.name.first.localeCompare(b.name.first))
    }
    if (sorting === Sortby.Last) {
      return [...filteredUsers].sort((a, b) => a.name.last.localeCompare(b.name.last))
    }
    if (sorting === Sortby.None) return filteredUsers
    return filteredUsers
  }, [sorting, filteredUsers])

  const deleteUser = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const resetState = () => {
    setUsers(originalUsers.current)
    setFilteredCountry(null)
    setSorting(Sortby.None)
  }

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={ChangeColor}>
          Colorear filas
        </button>
        <button onClick={sortListByCountry}>
          {sorting === Sortby.Country ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={resetState}>
          Resetear estado
        </button>
        <input placeholder='Buscar por país' onChange={(e) => { setFilteredCountry(e.target.value) }} />

      </header>
      <UserList handleChangeSort={handleChangeSort} deleteUser={deleteUser} showColor={showColor} users={sortedUser} />
    </div>
  )
}

export default App
