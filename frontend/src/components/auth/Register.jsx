import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import global from '../../assets/backgroundImage/global.jpg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from 'bcryptjs'; 

const Register = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};

    if (!formData.fname) {
      isvalid = false;
      validationErrors.fname = 'First name is required';
    }

    if (!formData.lname) {
      isvalid = false;
      validationErrors.lname = 'Last name is required';
    }

    if (!formData.email) {
      isvalid = false;
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = 'Email is not valid';
    }

    if (!formData.password) {
      isvalid = false;
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      isvalid = false;
      validationErrors.password = 'Password must have at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      isvalid = false;
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(validationErrors);

    if (isvalid) {
      //hash password 
      const hashedPassword = bcrypt.hashSync(formData.password, 10);
     
      //replacce plain password with hashed password 
      const dataToSend = {
        ...formData,
        password: hashedPassword,
        confirmPassword : hashedPassword
      };

      axios.post('http://localhost:8000/users', dataToSend)
      .then(result => {
        alert("Registered successfully")
        navigate('/login')
        console.log(result)

      })
      .catch((err) => {
        toast.error('Registration failed. Please try again.', {
          position: 'top-right',
        });
        console.error(err);
      });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${global})` }}
    >
      <ToastContainer />

      <div className="w-full md:w-1/2 backdrop-blur-xl bg-white/30 p-5 md:p-10 rounded-3xl drop-shadow-2xl m-5 ">
        <h2 className="text-3xl font-bold text-blue-950 text-center mb-6 font-Montserrat">
          Create Your Country View Pass
        </h2>

        <form className="space-y-5 text-blue-950" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            <div>
              <label className="text-sm font-semibold">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fname"
                placeholder="Enter First Name"
                className="w-full p-3 border border-black rounded-lg text-blue-950"
                onChange={(e) =>
                  setFormData({ ...formData, fname: e.target.value })
                }
              />
              {errors.fname && (
                <p className="text-red-800 text-sm mt-1">{errors.fname}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lname"
                placeholder="Enter Last Name"
                className="w-full p-3 border rounded-lg border-black text-blue-950"
                onChange={(e) =>
                  setFormData({ ...formData, lname: e.target.value })
                }
              />
              {errors.lname && (
                <p className="text-red-800 text-sm mt-1">{errors.lname}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full p-3 border rounded-lg border-black text-blue-950"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-800 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full p-3 border rounded-lg border-black text-blue-950"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-800 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-3 border rounded-lg border-black text-blue-950"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-800 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
          <button
          type="submit"
           className="w-1/2 bg-white text-black p-3 rounded-lg font-bold hover:bg-cyan-800 hover:text-white transition duration-300">
            Sign Up Now
             </button>
          </div>
          <p className="text-center text-white mt-4">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-950 font-bold hover:text-cyan-100" >
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
