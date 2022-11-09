import React, { useState } from "react";
import api from '../api'

const Users =() => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const renderPhrase = () => {
    const usersLength = users.length
    let text = `${usersLength} человек тусанет с тобой сегодня`
    let classes = 'badge m-2 bg-'
      classes += usersLength ? 'primary' : 'danger'

    if (!usersLength) text = "Никто с тобой не тусанет"
    if (usersLength > 4 && usersLength < 20) {
      return <span className={classes}>{text}</span> 
    }
    if (usersLength % 10 > 1 && usersLength % 10 < 5) {
      text = `${usersLength} человека тусанут с тобой сегодня`
      return <span className={classes}>{text}</span>
    }
    return  <span className={classes}>{text}</span> 
  }


  const renderQualitiesBadges = (qualities) => {
    return qualities.map((quality) => {
      const classes = 'badge m-1 bg-' + quality.color

      return (
        <span 
          key={quality._id} 
          className={classes}>
          {quality.name}
        </span>
      )
    })
  }

  const handleDelete = (userId)=> {
    setUsers(prevState => prevState.filter((users) => users._id !== userId))
  }

  const renderTable = () => {
    if (!users.length) return 
    return <table className="table table-striped" >
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качества</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
      </tr>
    </thead>
    <tbody>
      { users.map((user) => (
         <tr key={user._id}>
         <td>{user.name}</td>
         <td>{user.profession.name}</td>
         <td>{renderQualitiesBadges(user.qualities)}</td>
         <td>{user.completedMeetings}</td>
         <td>{user.rate}</td>
         <td>{user.bookmark}</td>
         <td> 
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(user._id)}
          >
            Delete
          </button>
         </td>
       </tr>
      ))  
      }
    </tbody>
  </table>
  }

  return (
    <>
    <h2>{renderPhrase()}</h2>
      {renderTable()}
    </>
  )
}

export default Users