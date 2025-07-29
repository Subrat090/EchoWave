import React, { useState, useEffect, useContext, useRef } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../config/axios'
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket'
import Markdown from 'markdown-to-jsx'
import hljs from 'highlight.js';
import { getWebContainer } from '../config/webcontainer'


function SyntaxHighlightedCode(props) {
    const ref = useRef(null)

    React.useEffect(() => {
        if (ref.current && props.className?.includes('lang-') && window.hljs) {
            window.hljs.highlightElement(ref.current)

            // hljs won't reprocess the element unless this attribute is removed
            ref.current.removeAttribute('data-highlighted')
        }
    }, [ props.className, props.children ])

    return <code {...props} ref={ref} />
}


const Project = () => {

    const location = useLocation()

    const [ isSidePanelOpen, setIsSidePanelOpen ] = useState(false)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ selectedUserId, setSelectedUserId ] = useState(new Set()) // Initialized as Set
    const [ project, setProject ] = useState(location.state.project)
    const [ message, setMessage ] = useState('')
    const { user } = useContext(UserContext)
    const messageBox = React.createRef()

    const [ users, setUsers ] = useState([])
    const [ messages, setMessages ] = useState([]) // New state variable for messages
    const [ fileTree, setFileTree ] = useState({})

    const [ currentFile, setCurrentFile ] = useState(null)
    const [ openFiles, setOpenFiles ] = useState([])

    const [ webContainer, setWebContainer ] = useState(null)
    const [ iframeUrl, setIframeUrl ] = useState(null)

    const [ runProcess, setRunProcess ] = useState(null)

    const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }

            return newSelectedUserId;
        });


    }


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

    const send = () => {

        sendMessage('project-message', {
            message,
            sender: user
        })
        setMessages(prevMessages => [ ...prevMessages, { sender: user, message } ]) // Update messages state
        setMessage("")

    }

    function WriteAiMessage(message) {

        const messageObject = JSON.parse(message)

        return (
            <div
                className='overflow-auto bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white rounded-xl p-4 shadow-lg border border-purple-500/20'
            >
                <Markdown
                    children={messageObject.text}
                    options={{
                        overrides: {
                            code: SyntaxHighlightedCode,
                        },
                    }}
                />
            </div>)
    }

    useEffect(() => {

        initializeSocket(project._id)

        if (!webContainer) {
            getWebContainer().then(container => {
                setWebContainer(container)
                console.log("container started")
            })
        }


        receiveMessage('project-message', data => {

            console.log(data)
            
            if (data.sender._id == 'ai') {


                const message = JSON.parse(data.message)

                console.log(message)

                webContainer?.mount(message.fileTree)

                if (message.fileTree) {
                    setFileTree(message.fileTree || {})
                }
                setMessages(prevMessages => [ ...prevMessages, data ]) // Update messages state
            } else {


                setMessages(prevMessages => [ ...prevMessages, data ]) // Update messages state
            }
        })


         axios.get(`/project/get-project/${location.state.project._id}`).then(res => {

            console.log(res.data.project)

            setProject(res.data.project)
            setFileTree(res.data.project.fileTree || {})
        })

        axios.get('/users/all').then(res => {

            setUsers(res.data.users)

        }).catch(err => {

            console.log(err)

        })

    }, [])

    // Update syntax highlighting when file content changes
    useEffect(() => {
        if (currentFile && fileTree[currentFile] && window.hljs) {
            const highlightedElement = document.querySelector('.hljs code');
            if (highlightedElement) {
                const content = fileTree[currentFile].file.contents;
                const highlighted = hljs.highlight('javascript', content).value;
                highlightedElement.innerHTML = highlighted;
            }
        }
    }, [currentFile, fileTree])

    function saveFileTree(ft) {
        axios.put('/project/update-file-tree', {
            projectId: project._id,
            fileTree: ft
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }


    // Removed appendIncomingMessage and appendOutgoingMessage functions
    useEffect(() => {
  if (messageBox.current) {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }
}, [messages]);


    function scrollToBottom() {
        messageBox.current.scrollTop = messageBox.current.scrollHeight
    }

    return (
        <main className='h-screen w-screen flex bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'>
            <section className="left relative flex flex-col h-screen min-w-96 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-sm border-r border-white/20 shadow-2xl">
                <header className='flex justify-between items-center p-4 px-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 absolute z-10 top-0 shadow-lg'>
                    <button className='flex gap-2 items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300 text-white font-medium' onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-fill text-lg"></i>
                        <p>Add Collaborator</p>
                    </button>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 text-white'>
                        <i className="ri-group-fill text-lg"></i>
                    </button>
                </header>
                <div className="conversation-area pt-20 pb-4 flex-grow flex flex-col h-full relative">

                    <div
                        ref={messageBox}
                        className="message-box p-4 flex-grow flex flex-col gap-3 overflow-auto max-h-full scrollbar-hide">
                        {messages.map((msg, index) => (
                            <div key={index} className={`${msg.sender._id === 'ai' ? 'max-w-80' : 'max-w-64'} ${msg.sender._id == user._id.toString() && 'ml-auto'} message flex flex-col p-4 ${msg.sender._id === 'ai' ? 'bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200' : msg.sender._id == user._id.toString() ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-white border border-gray-200'} w-fit rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-300`}>
                                <small className={`${msg.sender._id == user._id.toString() ? 'text-white/80' : 'text-gray-500'} text-xs font-medium mb-1`}>{msg.sender.email}</small>
                                <div className='text-sm'>
                                    {msg.sender._id === 'ai' ?
                                        WriteAiMessage(msg.message)
                                        : <p className="leading-relaxed">{msg.message}</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="inputField w-full flex absolute bottom-0 p-4">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && message.trim()) {
                                    send();
                                }
                            }}
                            className='p-4 px-6 border-none outline-none flex-grow rounded-l-xl bg-white shadow-lg focus:shadow-xl transition-all duration-300 text-gray-700 placeholder-gray-400' 
                            type="text" 
                            placeholder='Type your message...' />
                        <button
                            onClick={send}
                            className='px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-r-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'>
                            <i className="ri-send-plane-fill text-lg"></i>
                        </button>
                    </div>
                </div>
                <div className={`sidePanel w-full h-full flex flex-col gap-2 bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-sm absolute transition-all duration-500 ease-in-out ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'} top-0 shadow-2xl`}>
                    <header className='flex justify-between items-center px-6 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'>

                        <h1
                            className='font-bold text-xl'
                        >Collaborators</h1>

                        <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className='p-2 hover:bg-white/20 rounded-lg transition-all duration-300'>
                            <i className="ri-close-fill text-xl"></i>
                        </button>
                    </header>
                    <div className="users flex flex-col gap-3 p-4">

                        {project.users && project.users.map((user, index) => {


                            return (
                                <div key={index} className="user cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 p-4 flex gap-4 items-center rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md border border-gray-100">
                                    <div className='aspect-square rounded-full w-12 h-12 flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg'>
                                        <i className="ri-user-fill text-lg"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg text-gray-700'>{user.email}</h1>
                                </div>
                            )


                        })}
                    </div>
                </div>
            </section>

            <section className="right bg-gradient-to-br from-gray-50 to-white flex-grow h-full flex shadow-inner">

                <div className="explorer h-full max-w-64 min-w-52 bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-xl">
                    <div className="file-tree w-full p-2">
                        <h3 className="text-sm font-bold text-gray-300 mb-3 px-2">FILES</h3>
                        {
                            Object.keys(fileTree).map((file, index) => (
                                <div
                                    key={index}
                                    className="tree-element cursor-pointer p-3 px-4 flex items-center justify-between hover:bg-white/10 w-full rounded-lg transition-all duration-300 mb-1 group">
                                    <div 
                                        className="flex items-center gap-3 flex-grow"
                                        onClick={() => {
                                            setCurrentFile(file)
                                            setOpenFiles([ ...new Set([ ...openFiles, file ]) ])
                                        }}
                                    >
                                        <i className="ri-file-code-line text-blue-400 group-hover:text-blue-300"></i>
                                        <p className='font-medium text-gray-200 group-hover:text-white truncate'>{file}</p>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            // Show confirmation before deleting
                                            if (window.confirm(`Are you sure you want to delete "${file}"?`)) {
                                                // Remove file from fileTree
                                                const updatedFileTree = { ...fileTree }
                                                delete updatedFileTree[file]
                                                setFileTree(updatedFileTree)
                                                saveFileTree(updatedFileTree)
                                                
                                                // Remove from openFiles if it was open
                                                const updatedOpenFiles = openFiles.filter(f => f !== file)
                                                setOpenFiles(updatedOpenFiles)
                                                
                                                // Update current file if the deleted file was active
                                                if (currentFile === file) {
                                                    setCurrentFile(updatedOpenFiles[0] || null)
                                                }
                                            }
                                        }}
                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 transition-all duration-300"
                                        title="Delete file"
                                    >
                                        <i className="ri-delete-bin-line text-sm"></i>
                                    </button>
                                </div>))

                        }
                    </div>

                </div>


                <div className="code-editor flex flex-col flex-grow h-full shrink bg-white">

                    <div className="top flex justify-between w-full bg-gradient-to-r from-gray-100 to-gray-200 border-b border-gray-300 shadow-sm">

                        <div className="files flex overflow-x-auto">
                            {
                                openFiles.map((file, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentFile(file)}
                                        className={`open-file cursor-pointer p-3 px-6 flex items-center w-fit gap-2 transition-all duration-300 font-medium ${currentFile === file ? 'bg-white text-blue-600 border-b-2 border-blue-500 shadow-sm' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}>
                                        <i className="ri-file-code-line text-sm"></i>
                                        <p className='truncate max-w-32'>{file}</p>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                // Only remove file from openFiles, keep it in fileTree
                                                const updatedOpenFiles = openFiles.filter(f => f !== file)
                                                setOpenFiles(updatedOpenFiles)
                                                
                                                // Update current file if the closed file was active
                                                if (currentFile === file) {
                                                    setCurrentFile(updatedOpenFiles[0] || null)
                                                }
                                            }}
                                            className="ml-2 text-xs hover:text-red-500 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </button>
                                ))
                            }
                        </div>

                        <div className="actions flex gap-2 p-2">
                            <button
                                onClick={async () => {
                                    await webContainer.mount(fileTree)


                                    const installProcess = await webContainer.spawn("npm", [ "install" ])



                                    installProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk)
                                        }
                                    }))

                                    if (runProcess) {
                                        runProcess.kill()
                                    }

                                    let tempRunProcess = await webContainer.spawn("npm", [ "start" ]);

                                    tempRunProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk)
                                        }
                                    }))

                                    setRunProcess(tempRunProcess)

                                    webContainer.on('server-ready', (port, url) => {
                                        console.log(port, url)
                                        setIframeUrl(url)
                                    })

                                }}
                                className='p-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium'
                            >
                                <i className="ri-play-fill mr-2"></i>
                                Run
                            </button>


                        </div>
                    </div>
                    <div className="bottom flex flex-grow max-w-full shrink overflow-auto">
                        {
                            fileTree[ currentFile ] && (
                                <div className="code-editor-area h-full overflow-auto flex-grow bg-gradient-to-br from-gray-900 to-gray-800 relative">
                                    <div className="absolute inset-0 flex">
                                        {/* Syntax highlighted background */}
                                        <pre className="hljs h-full flex-grow pointer-events-none absolute inset-0 z-0">
                                            <code
                                                className="hljs block h-full"
                                                dangerouslySetInnerHTML={{ 
                                                    __html: hljs.highlight('javascript', fileTree[ currentFile ].file.contents).value 
                                                }}
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                    paddingBottom: '25rem',
                                                    counterSet: 'line-numbering',
                                                    padding: '2rem',
                                                    fontSize: '14px',
                                                    lineHeight: '1.6',
                                                    color: 'transparent'
                                                }}
                                            />
                                        </pre>
                                        {/* Editable textarea overlay */}
                                        <textarea
                                            className="hljs h-full flex-grow resize-none outline-none bg-transparent relative z-10 font-mono"
                                            value={fileTree[ currentFile ].file.contents}
                                            onChange={(e) => {
                                                const updatedContent = e.target.value;
                                                const ft = {
                                                    ...fileTree,
                                                    [ currentFile ]: {
                                                        file: {
                                                            contents: updatedContent
                                                        }
                                                    }
                                                }
                                                setFileTree(ft)
                                            }}
                                            onBlur={() => {
                                                saveFileTree(fileTree)
                                            }}
                                            style={{
                                                whiteSpace: 'pre-wrap',
                                                paddingBottom: '25rem',
                                                counterSet: 'line-numbering',
                                                padding: '2rem',
                                                fontSize: '14px',
                                                lineHeight: '1.6',
                                                color: 'white',
                                                caretColor: 'white',
                                                background: 'transparent'
                                            }}
                                            spellCheck={false}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>

                {iframeUrl && webContainer &&
                    (<div className="flex min-w-96 flex-col h-full border-l border-gray-200 bg-white shadow-xl">
                        <div className="address-bar bg-gradient-to-r from-gray-100 to-gray-200 p-2 border-b border-gray-300">
                            <div className="flex items-center gap-2">
                                <i className="ri-global-line text-gray-500"></i>
                                <input type="text"
                                    onChange={(e) => setIframeUrl(e.target.value)}
                                    value={iframeUrl} 
                                    className="flex-grow p-2 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                                    placeholder="Enter URL..." />
                            </div>
                        </div>
                        <iframe src={iframeUrl} className="w-full h-full bg-white"></iframe>
                    </div>)
                }


            </section>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
                    <div className="bg-white p-6 rounded-2xl w-96 max-w-full relative shadow-2xl transform animate-in zoom-in-95 duration-300">
                        <header className='flex justify-between items-center mb-6'>
                            <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Select Users</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2 hover:bg-gray-100 rounded-lg transition-all duration-300'>
                                <i className="ri-close-fill text-xl text-gray-600"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-3 mb-20 max-h-96 overflow-auto">
                            {users.map(user => (
                                <div key={user.id} className={`user cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 ${Array.from(selectedUserId).indexOf(user._id) != -1 ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300' : "border border-gray-200"} p-4 flex gap-4 items-center rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md`} onClick={() => handleUserClick(user._id)}>
                                    <div className='aspect-square relative rounded-full w-12 h-12 flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg'>
                                        <i className="ri-user-fill text-lg"></i>
                                        {Array.from(selectedUserId).indexOf(user._id) != -1 && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                                                <i className="ri-check-fill text-green-500 text-xs"></i>
                                            </div>
                                        )}
                                    </div>
                                    <h1 className='font-semibold text-lg text-gray-700'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className='absolute bottom-6 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105'>
                            <i className="ri-user-add-line mr-2"></i>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Project