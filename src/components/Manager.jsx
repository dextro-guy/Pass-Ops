import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';
const Manager = () => {
    const ref = useRef();

    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)

    }


    const showPassword = () => {
        console.log(ref.current.src);
        if (ref.current.src.includes("/public/icons/load.png"))
            ref.current.src = "/public/icons/download.png"
        else
            ref.current.src = "/public/icons/load.png"

    }

    const savePassword = (params) => {
        if(form.site.length>3&&form.username.length>3&&form.site.length>3)
            {

                setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
                localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]))
                setform({site: "", username: "", password: "" })
                toast('Password Saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    else
    {
        toast('Invalid Input!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        }); 
    }
    }
    const deletePassword = (id) => {
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        console.log('Deleting with id: ', id);
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
    }
    const editPassword = (id) => {
        console.log('Editing with id: ', id);
        setform(passwordArray.filter(item=>item.id===id)[0])
        setpasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }





    return (<>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition="Bounce"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform "></div>
        <div className="= mx-auto p-2 md:p-0 md:mycontainer">


            <h1 className='text-4xl font-bold text-center'>
                <span className="text-green-700">&lt;</span>
                Pass
                <span className="text-green-700">OP/&gt;</span>
            </h1>
            <p className='text-green-900 text-lg text-center'>Your own password manager</p>
            <div className='flex flex-col   p-4 gap-6 '>
                <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-700 text-black px-4 py-1' type="text" name='site' id='' />

                <div className="flex  flex-col md:flex-row justify-between gap-8">
                    <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full w-full border border-green-700 text-black px-4 py-1' type="text" name='username' id='' />
                    <div className="relative">

                        <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full w-full border border-green-700 text-black px-4 py-1' type="text" name='password' id='' />
                        <span className="absolute right-1 top-2 cursor-pointer hover:scale-105 " onClick={showPassword}>
                            <img ref={ref} className='rounded-full' width={30} src="/public/icons/load.png" alt="eye" />
                        </span>
                    </div>
                </div>

                <button onClick={savePassword} className='flex justify-center items-center mx-auto bg-green-500 hover:bg-green-400 rounded-full px-8 py-2 border border-green-900 gap-2 w-fit '>
                    <lord-icon
                        src="https://cdn.lordicon.com/jgnvfzqg.json"
                        trigger="hover">
                    </lord-icon>
                    Save Password</button>

            </div>
            <div className="passwords">
                <h2 className='font-bold text-xl py-4'>Your Passwords</h2>
                {passwordArray.length === 0 && <div>No Passwords to show</div>}
                {
                    passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden mb-12">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-white text-center w-32'>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center w-32'>
                                        <div className='flex items-center justify-center'>
                                            {item.username}
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center w-32'>
                                        <div className='flex items-center justify-center' onClick={() => { copyText(item.password) }}>
                                            {item.password}
                                            <div className='size-7 cursor-pointer'>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/depeqmsz.json"
                                                    trigger="hover">
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className=' py-2 border border-white text-center w-32'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/qnpnzlkk.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover">
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    </>
    )
}

export default Manager
