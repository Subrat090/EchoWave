import React, { useState, useContext,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../config/axios.js';
import { UserContext } from '../context/user.context'

const Project = () => {
    const location = useLocation();

    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(new Set());
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);
    const [project,setProject] = useState(location.state.project);

    const handleUserClick = (id) => {
    setSelectedUserId((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
            newSet.delete(id); // toggle off
        } else {
            newSet.add(id); // toggle on
        }
        return newSet;
    });
};

    useEffect(() => {

        axios.get(`/project/get-project/${location.state.project._id}`).then(res => {

            console.log(res.data.project)

            setProject(res.data.project)
           
        })
       
            axios
                .get('/users/all')
                .then((res) => {
                    setUsers(res.data.users);
                })
                .catch((err) => {
                    console.error('Error fetching users:', err);
                });
        
    }, []);
   

   function addCollaborators() {

        axios.put("/project/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            console.log(res.data)
            setIsModalOpen(false)

        }).catch(err => {
            console.log(err)
        })

    }


    return (
        <main className="h-screen w-screen flex">
            <section className="left flex flex-col h-full min-w-96 bg-red-400">
                <header className="flex justify-between items-center px-4 p-2 w-full bg-slate-200">
                    <button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-fill mr-1"></i>
                        <p>Add collaborator</p>
                    </button>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className="p-2">
                        <i className="ri-group-fill"></i>
                    </button>
                </header>

                <div className="conversation-area pt-14 pb-10 flex-grow flex flex-col h-full relative">
                    <div className="message-box flex flex-col">
                        <div className="incoming message max-w-56 flex flex-col p-2 bg-white w-fit rounded-lg">
                            <small className="opacity-65 text-xs">example@gmail.com</small>
                            <p className="text-sm"> hello;</p>
                        </div>
                        <div className="outgoing ml-auto max-w-56 message flex flex-col p-2 bg-white w-fit rounded-lg">
                            <small className="opacity-65 text-xs">example@gmail.com</small>
                            <p className="text-sm">
                                hellokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk;
                            </p>
                        </div>
                    </div>
                    <div className="inputField w-full flex">
                        <input type="text" placeholder="Type a message" className="p-2 px-4 border-none outline-none flex-grow" />
                        <button className="px-5">
                            <i className="ri-send-plane-fill"></i>
                        </button>
                    </div>
                </div>

                <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-slate-50 absolute transition-all ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0`}>
                    <header className='flex justify-between items-center px-4 p-2 bg-slate-200'>

                        <h1
                            className='font-semibold text-lg'
                        >Collaborators</h1>

                        <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2'>
                            <i className="ri-close-fill"></i>
                        </button>
                    </header>
                    <div className="users flex flex-col gap-2">

                       {project.users && project.users.map(user => {
    return (
        <div key={user._id} className="user cursor-pointer hover:bg-slate-200 p-2 flex gap-2 items-center">

                                    <div className='aspect-square rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600'>
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            )


                        })}
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2">
                                <i className="ri-close-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map((user) => (
                                <div key={user._id} className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-slate-200' : ""} p-2 flex gap-2 items-center`} onClick={() => handleUserClick(user._id)}>
                                    <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className="font-semibold text-lg">{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Project;
