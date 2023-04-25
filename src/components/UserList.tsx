import { type FC } from 'react'
import { Sortby, type User } from '../types.d'

interface Props {
  users: User[]
  showColor: boolean
  deleteUser: (email: string) => void
  handleChangeSort: (newSorting: Sortby) => void
}

export const UserList: FC<Props> = ({ handleChangeSort, deleteUser, users, showColor }) => {
  return (
        <table width='100%'>
            <thead>
                <tr>
                    <th >Foto</th>
                    <th onClick={() => { handleChangeSort(Sortby.Name) }}>Nombre</th>
                    <th onClick={() => { handleChangeSort(Sortby.Last) }}>Apellido</th>
                    <th onClick={() => { handleChangeSort(Sortby.Country) }}>País</th>
                    <th >Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                      const backgroundColor = index % 2 === 0 ? '#333' : '#555'
                      const color = showColor ? backgroundColor : 'transparent'
                      return (
                            <tr key={user.email} style={{ backgroundColor: color }}>
                                <td>
                                    <img src={user.picture.thumbnail} alt={user.name.first} />
                                </td>
                                <td>{user.name.first}</td>
                                <td>{user.name.last}</td>
                                <td>{user.location.country}</td>
                                <td>
                                    <button onClick={() => { deleteUser(user.email) }}>Delete</button>
                                </td>
                            </tr>
                      )
                    })
                }
            </tbody>
        </table>
  )
}
