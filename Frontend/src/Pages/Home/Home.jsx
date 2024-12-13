import React from 'react';
import logo from '../../../public/logo-2.png';
import home from '../../../public/home.png';
import { Link } from 'react-router-dom'
import {useTypewriter,Cursor, Typewriter} from 'react-simple-typewriter'


function Home() {
  const role = 'register';
  const [text] = useTypewriter({
    words:['Iregation','R&B'],
    loop:{},
  })
  return (
    <React.Fragment>
      <div className="w-full container mt-20 px-4 lg:px-20 flex flex-col items-center m-auto">
        <div className="flex flex-col mt-24 lg:flex-row gap-10 w-full max-w-screen-xl items-center m-auto">
          {/* Text Section */}
          <div className="lg:w-1/2 flex flex-col">
            <p className="text-3xl font-bold leading-snug">
              A.E. Association Department:- <span className="text-blue-700">{text}</span><Cursor/>
              <br /> For Developing Roads and Dams in Gujarat
            </p>
            <p className="mt-6 text-lg text-justify">
              Hello, This is the site of A.E. Association. We are here to develop an emerging Gujarat. This is the Civil department of Gujarat. A.E. Association is dedicated to civil infrastructure in the state.
            </p>

            <div className="mt-8 flex justify-end gap-4">
              {role === 'register' && (
                <>
                  <Link
                    to={`/login`}
                    className="flex justify-center items-center py-2 px-5 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to={`/register`}
                    className="flex justify-center items-center py-2 px-5 border-2 border-blue-700 rounded-md hover:text-white hover:bg-blue-700 transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 flex justify-center">
            <img className="w-full h-auto max-h-96 rounded-lg shadow-lg" src={home} alt="Civil Department" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
