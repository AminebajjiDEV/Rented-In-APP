import React from 'react'
import "../partials/RegisterPage.scss"
const RegisterPage = () => {
  return (
    <div class="register_container">
      <div class="title">Registration</div>
      <div class="register_content">
        <form action="#">
          <div class="user-details">
            <div class="input-box">{/* Last Name */}
              <span class="details">Last Name</span>
              <input type="text" placeholder="Enter your last name" required></input>
            </div>
            <div class="input-box">{/* First Name */}
              <span class="details">First Name</span>
              <input type="text" placeholder="Enter your first name" required></input>
            </div>
            <div class="input-box">{/* Email */}
              <span class="details">Email</span>
              <input type="text" placeholder="Enter your email" required></input>
            </div>
            <div class="input-box">{/* Phone Number */}
              <span class="details">Phone Number</span>
              <input type="tel" placeholder="Enter your number" required></input>
            </div>
            <div class="input-box">{/* Password */}
              <span class="details">Password</span>
              <input type="password" placeholder="Enter your password" required></input>
            </div>
            <div class="input-box">{/* Confirm Password */}
              <span class="details">Confirm Password</span>
              <input type="password" placeholder="Confirm your password" required></input>
            </div>
          </div>
          <div className="profile-picture">{/* profile-picture */}
            <input id='image' type="file" name='profilePicture' accept='image/*' style={{ display: "none" }} required />
            <label htmlFor="image">
              <p>Upload your Photo here</p>
              <img src="/assets/upload-image.png" alt="add profile picture" />
            </label>
          </div>
          <div class="button">
            <input type="submit" value="Register"></input>
          </div>
        </form>
        <span className='already-signedUP'>Already have an account? <a href="/login">log in here</a></span>
      </div>
    </div>
  )
}

export default RegisterPage