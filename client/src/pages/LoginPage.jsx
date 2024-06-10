import React from 'react'
import "../partials/LoginPage.scss"

const LoginPage = () => {
    return (  
      <div className="login">
      <div className="wrapper">
      <form action="#">
        <h2>Login</h2>
          <div className="input-field">
          <input type="text" required></input>
          <label>Enter your email</label>
        </div>
        <div className="input-field">
          <input type="password" required></input>
          <label>Enter your password</label>
        </div>
        <div className="forget">
          <label for="remember">
            <input type="checkbox" id="remember"></input>
            <p>Remember me</p>
          </label>
        </div>
        <button type="submit">Log In</button>
        <div className="register-newUser">
        <p>Don't have an account? <a href="/register">register here</a></p>
      </div>
      </form>
    </div>
    </div>
    )
}

export default LoginPage