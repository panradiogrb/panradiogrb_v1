import { Fragment, useState, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { login } from '../lib/authActions/actions';

// export function testSetRouter(router)
// {
//     return router;
// }

export default function LoginDialog() {
    const loginFailString: string = "Login Failed, Wrong credentials";
    const loginSuccessString: string = "Login Success. Redirecting...";

    const router = useRouter();

    let [isOpen, setIsOpen] = useState(false);
    let [loginSuccess, setLoginSuccess] = useState(false);
    let [loading, setLoading] = useState(false);
    let [feedbackMessage, setFeedbackMessage] = useState('');

    function CloseModal() {
        setIsOpen(false);
        setLoading(false);
        setFeedbackMessage('');
        setLoginSuccess(false);
    }


    function OpenModal() {
        setIsOpen(true);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true); 
        setFeedbackMessage('');

        const formData = new FormData(event.currentTarget);
        const email = formData.get('user')?.toString() || ''; // Changed variable name to email
        const password = formData.get('password')?.toString() || '';
    
        const { user, error } = await login(email, password); // Using the login action
        if (!error) {
            console.log(user);
            setFeedbackMessage(loginSuccessString);
            setLoginSuccess(true);
            setLoading(false); 
            console.log(loginSuccessString);
            router.push('/dashboard/database');
        } else {
            console.log(error);
            setFeedbackMessage(loginFailString);
            setLoginSuccess(false);
            setLoading(false); // Stop loading if error
        }
    }

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={OpenModal}
                    className="sm:float-right hover:opacity-100 sm:opacity-100 opacity-10 hover:text-space-purple hover:scale-110 transition-all"
                >
                    Log In
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className=" overflow-hidden relative z-10" onClose={CloseModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-cente overflow-hidden">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95 translate-y-full"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo=" scale-95 -translate-y-full"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-bold leading-6 text-gray-900 mb-4"
                                    >
                                        Researcher Login
                                    </Dialog.Title>
                                    <form onSubmit={handleSubmit} className="flex-1 py-3 gap-6 flex flex-col justify-evenly w-full h-full">
                                        <div className="w-full flex flex-row justify-between place-items-center">
                                            <p className="h-fit font-medium">User:</p>
                                            <input
                                                className=" max-w-xs bg-slate-100 drop-shadow-xl rounded-md pl-3 py-2 ml-8 focus:outline-none w-80  text-black"
                                                name="user"
                                                placeholder="Username"
                                                required
                                            >

                                            </input>
                                        </div>
                                        <div className="w-full flex flex-row justify-between place-items-center">
                                            <p className="h-fit font-medium">Password:</p>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                className="bg-slate-100 drop-shadow-xl rounded-md pl-3 py-2 ml-8 focus:outline-none w-80  text-black"
                                                required
                                            >
                                            </input>
                                        </div>
                                        {loading && <p>Loading...</p>}
                                        {feedbackMessage && (
                                            <div className={loginSuccess ? "text-green-300 transition-all" : "text-red-300 transition-all"}>
                                                {feedbackMessage}
                                            </div>
                                        )}
                                        <div className="mt-4 flex flex-row flex-1 w-full justify-between">
                                            <button
                                                type="submit"
                                                className=" justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"

                                            >
                                                Login
                                            </button>
                                            <button
                                                type="button"
                                                className=" justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all"
                                                onClick={CloseModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <a
                                                href="/email"
                                                className="text-sm text-blue-500 hover:underline"
                                            >
                                                Forgot Password?
                                            </a>
                                        </div>
                                    </form>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
