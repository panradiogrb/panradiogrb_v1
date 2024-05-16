import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { IoLogOutOutline } from 'react-icons/io5';
import { Button } from './ui/button';
import { logout } from '@/lib/authActions/actions';

/*
    LogoutDialog
    -----------
    This dialogue box shows up when the user clicks the logout button.
    It's intended purpose is to ensure user's want to logout when they click the button.
    It can be passed tailwindcss 'className' props, which are applied on the root div of the element.

    Curently the routing is handled by a router object. This can be changed by the backend team if necessary.
*/

const LogoutDialog = ({ className }: { className?: string }): React.JSX.Element => {
    const router = useRouter();

    let [isOpen, setIsOpen] = useState(false);

    function CloseModal() {
        setIsOpen(false);
    }

    function OpenModal() {
        setIsOpen(true);
    }

    function handleLogout() {
        logout()
        router.push('/');
    }



    return (
        <div className={className}>
            <div>
                <button
                    className="hover:text-fuchsia-500 hover:scale-110  flex-none transition-all drop-shadow-2xl rounded-br-[5.5rem] group-hover:rounded-br-[8.5rem] overflow-hidden mb-10 flex flex-row items-center justify-center content-end w-full"
                    type="button"
                    onClick={OpenModal}
                >
                    <IoLogOutOutline size={25} className="" />
                </button>
            </div>

            <div className='scale-0'>Rendertext</div>

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

                    <div className="text-black fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-cente overflow-hidden">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95 translate-y-full"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95 -translate-y-full"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title className="font-bold text-center">Are you sure you want to log-out?</Dialog.Title>
                                    <div className="flex flex-row w-full justify-between min-h-full mt-10">
                                        <Button
                                            variant="outline"
                                            onClick={() => handleLogout()}
                                        >
                                            Logout
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => CloseModal()}
                                        >
                                            Cancel
                                        </Button>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

export default LogoutDialog;