'use client'
import { logout } from '@/app/Redux/actions'
import { routes } from '@/app/utils/routes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

export default function CustomNavbar() {

    const dispatch = useDispatch();
    const router = useRouter()

    const handleLogout = () => {
        if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem('user'); 
            dispatch(logout()); 
            toast.success('Logout successfully');
            router.push(routes.SIGNIN);
        }
    }

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" href={routes.HOME}>MyApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        <li className="nav-item d-flex justify-content-center align-items-center ms-3">
                            <Link className="nav-link" href={routes.HOME}>Home</Link>
                        </li>
                        <li className="nav-item d-flex justify-content-center align-items-center ms-3">
                            <div role='button' onClick={handleLogout} className="nav-link bg-light text-dark rounded py-0 ms-2">Logout</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}
