import React, { useState } from "react";
import login from '../../assets/backgroundImage/login.jpg';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const validationErrors = {};

    if (!formData.email) {
      isValid = false;
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      isValid = false;
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      isValid = false;
      validationErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(validationErrors);

    if (isValid) {
      axios.get('http://localhost:8000/users')
        .then((res) => {
          const user = res.data.find((user) => user.email === formData.email);

          if (!user) {
            setErrors({ email: 'Email not found' });
            return;
          }

          const isPasswordMatch = bcrypt.compareSync(formData.password, user.password);

          if (!isPasswordMatch) {
            setErrors({ password: 'Incorrect password' });
            return;
          }

          toast.success("Login successful!", { position: 'top-right' });
          setTimeout(() => navigate("/"), 1000);
        })
        .catch((err) => {
          toast.error('Login failed. Please try again.', {
            position: 'top-right',
          });
          console.error(err);
        });
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${login})` }}
    >
      <ToastContainer />
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 backdrop-blur-xl bg-white/30 p-6 md:p-10 rounded-3xl drop-shadow-2xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-950 text-center mb-6 font-Montserrat">
          Welcome Back
        </h2>

        <form className="space-y-5 text-blue-950" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 text-black">
            <div>
              <label className="text-sm font-semibold">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full p-3 border rounded-lg border-black text-blue-950"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {errors.password && (
                <p className="text-red-800 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/2 bg-white text-black p-3 rounded-lg font-bold hover:bg-cyan-800 hover:text-white transition duration-300"
            >
              Login
            </button>
          </div>

          <p className="text-center text-white mt-4 text-sm md:text-base">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-950 font-bold hover:text-cyan-100"
            >
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
