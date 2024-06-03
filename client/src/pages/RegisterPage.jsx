import React from 'react'
import { useState } from 'react'
import "../partials/RegisterPage.scss"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    porfilePicutre: null
  });
  console.log(formData)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData, // to collect & keep a copy of the data inputed
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value
    })
  }
  return (
    <div className="register">
      <div class="register_container">
        <div class="title">Registration</div>
        <div class="register_content">
          <form action="#">
            <div class="user-details">
              <div class="input-box">{/* Last Name */}
                <span class="details" >Last Name</span>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" required></input>
              </div>
              <div class="input-box">{/* First Name */}
                <span class="details" >First Name</span>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" required></input>
              </div>
              <div class="input-box">{/* Email */}
                <span class="details" >Email</span>
                <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required></input>
              </div>
              <div class="input-box">{/* Phone Number */}
                <span class="details" >Phone Number</span>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Enter your number" required></input>
              </div>
              <div class="input-box">{/* Password */}
                <span class="details" >Password</span>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required></input>
              </div>
              <div class="input-box">{/* Confirm Password */}
                <span class="details"  >Confirm Password</span>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required></input>
              </div>
            </div>
            <div className="profile-picture">{/* profile-picture */}
              <input id='image' type="file" name='profilePicture' value={formData.porfilePicutre} onChange={handleChange} accept='image/*' style={{ display: "none" }} required />
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
    </div>
  )
}

export default RegisterPage