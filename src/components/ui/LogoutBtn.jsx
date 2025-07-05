import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { AuthService } from '../../appwrite/auth'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        AuthService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <>
            <button
                onClick={logoutHandler}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            >
                Logout
            </button>
        </>
    )
}

export default LogoutBtn
