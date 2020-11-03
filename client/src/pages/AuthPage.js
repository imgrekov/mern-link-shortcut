import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, clearError, request } = useHttp()
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => window.M.updateTextFields(), [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизиция</span>
            <div>
              <div className="input-field">
                <input
                  className="yellow-input"
                  placeholder="Email"
                  id="email"
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Введите ваш email</label>
              </div>
              <div className="input-field">
                <input
                  className="yellow-input"
                  placeholder="Пароль"
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Введите ваш пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              onClick={loginHandler}
              disabled={loading}>
              Войти
            </button>
            <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
