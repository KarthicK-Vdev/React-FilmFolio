import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/slice';
import { loginDetails } from '../services/apiCalls';

const Login = () => {
  const name = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await loginDetails(name.current.value, password.current.value);

      if (response.data.message === 'success') {
        const { token } = response.data;
        dispatch(loginSuccess({ admin: name.current.value, token }));
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <h2 className='h-[10%] text-2xl font-semibold'>Only Admins are Allowed to login</h2>
      <div className='border-2 border-yellow-400 h-[50%] w-[30%] rounded-md flex flex-col justify-center items-center'>
        <h1 className='h-[20%] font-bold text-2xl'>Login</h1>
        <form onSubmit={loginHandler} className='h-[60%] flex flex-col justify-around items-center'>
          <input
            className='h-[20%] p-2 bg-yellow-100 border-b-2 border-yellow-500'
            type='text'
            placeholder="Name"
            ref={name}
          />
          <input
            className='h-[20%] p-2 bg-yellow-100 border-b-2 border-yellow-500'
            type='password'
            placeholder="Password"
            ref={password}
          />
          <button type='submit' className='h-[17%] text-white px-5 bg-yellow-500 rounded-md'>
            Login!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
