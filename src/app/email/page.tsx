"use client"
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import * as React from 'react';

export default function ResetPasswordRequest() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleResetPassword = async () => {
    const supabase = createClient();
    //this sends email to user and the redirect is where the user will go when they click reset on the email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/resetpassword', // replace with your actual URL of hosted link when in productio and ALSO change URL in supabase from localhost to hosted one
    });

    if (error) {
      setErrorMessage('Error: ' + error.message);
    } else {
      setMessage('Password reset email sent.');
    }
  };

  React.useEffect(() => {
    if (errorMessage) {
        const timer = setTimeout(() => {
            setErrorMessage(null);
        }, 2000); // Clear error message after 2 seconds
        return () => clearTimeout(timer);
    }
}, [errorMessage]);

React.useEffect(() => {
  if (message) {
      const timer = setTimeout(() => {
          setMessage(null);
      }, 2000); // Clear error message after 2 seconds
      return () => clearTimeout(timer);
  }
}, [message]);




  return (
    <main className='bg-gradient-to-t to-black via-black from-home-purple min-h-screen bg-no-repeat bg-cover bg-center bg-fixed my-0 mx-0 text-center h-max w-full flex flex-col'>
      <div className='flex flex-col items-center justify-center flex-grow p-20'>
        <div className='flex flex-col bg-white rounded-xl p-10'>
          <Image
            className='self-center rounded-full'
            src={"/logo.png"}
            alt={""}
            width={150}
            height={150}
          />
          <h1 className='text-5xl font-semibold p-10'>
            Reset <span className='text-green-500'>Password</span>
          </h1>
          <h2>Enter the email associated with your account and we will send you a link to reset your password.</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className='my-10 self-center bg-white drop-shadow duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500'
          />
          <Button className='hover:drop-shadow-lg w-36 self-center text-white bg-blue-500' onClick={handleResetPassword}>
            Send Reset Email
          </Button>
          <div className='p-10'>
            <div className='text-center text-red-500'>{errorMessage}</div>
            <div className='text-center text-green-500'>{message}</div>
          </div>
        </div>
      </div>
    </main>

  );
}