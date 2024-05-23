"use client"
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';


export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const handleUpdatePassword = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErrorMessage('Error: ' + error.message);
    } else {
      setMessage('Password updated successfully.');
      router.push('/')
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
          <h1 className='text-5xl font-semibold p-10'>Update Password</h1>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className='my-10 self-center bg-white drop-shadow duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500'
          />
          <Button className='hover:drop-shadow-lg w-36 self-center text-white bg-blue-500' onClick={handleUpdatePassword}>Update Password</Button>
          <div className='p-10'>
            <div className='text-center text-red-500'>{errorMessage}</div>
            <div className='text-center text-green-500'>{message}</div>
          </div>
        </div>
      </div>
    </main>
  );
}