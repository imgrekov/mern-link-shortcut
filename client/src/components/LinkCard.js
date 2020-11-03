import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const LinkCard = ({ link }) => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const _id = useParams().id

  const deleteLinkHandler = async () => {
    try {
      const data = await request('/api/link/delete', 'POST', { _id }, { Authorization: `Bearer ${auth.token}` })
      history.push(`${data.redirect.to}`)
    } catch (e) {}
  }

  return (
    <>
      <h2>Ссылка</h2>

      <p>
        Ваша ссылка:{' '}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Откуда:{' '}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Количество кликов по ссылке: <strong>{link.clicks}</strong>
      </p>
      <p>
        Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
      <div>
        <button className="btn red waves-effect waves-light" onClick={deleteLinkHandler}>
          Удалить
        </button>
      </div>
    </>
  )
}
