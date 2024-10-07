// export default function Login() {
//     return (
//       <>
        // <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        //   <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        //     <img
        //       alt="Your Company"
        //       src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        //       className="mx-auto h-10 w-auto"
        //     />
        //     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        //       Sign in to your account
        //     </h2>
        //   </div>
  
        //   <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        //     <form action="#" method="POST" className="space-y-6">
        //       <div>
        //         <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
        //           user
        //         </label>
        //         <div className="mt-2">
        //           <input
        //             id="user"
        //             name="user"
        //             type="user"
        //             required
        //             autoComplete="user"
        //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //           />
        //         </div>
        //       </div>
  
        //       <div>
        //         <div className="flex items-center justify-between">
        //           <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
        //             Password
        //           </label>
        //           <div className="text-sm">
        //             <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
        //               Forgot password?
        //             </a>
        //           </div>
        //         </div>
        //         <div className="mt-2">
        //           <input
        //             id="password"
        //             name="password"
        //             type="password"
        //             required
        //             autoComplete="current-password"
        //             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        //           />
        //         </div>
        //       </div>
  
        //       <div>
        //         <button
        //           type="submit"
        //           className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        //         >
        //           Sign in
        //         </button>
        //       </div>
        //     </form>
  
        //     <p className="mt-10 text-center text-sm text-gray-500">
        //       Not a member?{' '}
        //       <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        //         Start a 14 day free trial
        //       </a>
        //     </p>
        //   </div>
        // </div>
//       </>
//     )
//   }
  // src/components/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ name, password }))
    .unwrap()
      .then(() => {
        navigate('/dashboard'); // Redirect to dashboard after login
      })
      .catch(() => {
        // Error is already handled by Redux state
        console.log("loggedin failed")
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {status === 'loading' && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="user" className="block text-sm font-medium leading-6 text-gray-900">
                  user
                </label>
                <div className="mt-2">
                  <input
                    id="user"
                    name="user"
                    type="text"
                    value={name} onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="user"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
    </div>
  );
};

export default Login;
