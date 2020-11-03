import React from 'react'
import { Link } from 'react-router-dom'

export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">Вы еще не сократили ни одной ссылки</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Оригинальная</th>
          <th>Сокращенная</th>
          <th>Кликов</th>
          <th>Открыть</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>
                <a href={link.to} target="_blank" rel="noopener noreferrer">
                  {link.to}
                </a>
              </td>
              <td>{link.clicks}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Открыть</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
