import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const admin = useSelector((state) => state.auth.admin);

  return (
    <div className='h-full flex justify-center items-center bg-gradient-to-b from-yellow-400 to-white '>
      <div className='flex justify-center items-center h-[80%] w-[80%]'>
        <div className='font-bold text-center text-xl'>
          {
            admin && (
            <h1>Welcome Admin {admin}</h1>)

          }
          <h1>Welcome to <span className='text-yellow-600'>Film Folio</span></h1>
          <h2>View the current movie releases</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
