"use client"
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { RiUserSettingsLine } from "react-icons/ri";
import { Button } from '@/components/ui/button';
import * as React from 'react';
import { logout } from '@/lib/authActions/actions';

export default function UpdatePassword({user, role}: { user: string | null; role: string | null } ) {
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
            logout();
            router.push('/')
        }
    };

    const handleCancel = () => {
        router.push('/dashboard/database');
      };

    React.useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null);
            }, 2000); // Clear error message after 2 seconds

            // Cleanup the timer if the component unmounts or errorMessage changes
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);




  return (
        
          <div className='flex flex-col '>
            <div className='self-center w-96 rounded-md bg-slate-50 drop-shadow text-center my-10 '>
              <h1>
                <span className='font-bold p-2'>Name:</span><span>{user}</span>
              </h1>
              <h1>
              <span className='font-bold p-2'>Role:</span><span>{role}</span>
              </h1>
            </div>
            <h1 className='text-center font-bold text-4xl'>Update Password</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className=" my-10 self-center bg-white  drop-shadow  duration-150 hover:shadow-stone-300 hover:shadow-sm hover:border-gray-400 shadow focus:border-gray-700 focus:duration-300 transition-all rounded-md px-3 py-2 mr-2 focus:outline-none w-56 h-14 text-black border placeholder-gray-500"

              
            />
            <div className='flex-row self-center my-10'>
            <Button className=' bg-blue-600 hover:drop-shadow-lg text-white self-center w-36 mr-20' onClick={handleUpdatePassword}>Update Password</Button>

            <Button className=' bg-red-600 hover:drop-shadow-lg text-white self-center w-36  ' onClick={handleCancel} > Cancel</Button>
            </div>
            <div className='text-center text-red-500'>{errorMessage}</div>
            <div className='text-center text-green-500'>{message}</div>

          </div>
       

  );
}