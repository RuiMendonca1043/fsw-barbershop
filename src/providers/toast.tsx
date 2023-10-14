'use client'
import { ReactNode } from 'react';
import { ToastContainer as _ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const ToastProvider = ({children}: {children: ReactNode}) => {
    return ( <>
        {children}
        <_ToastContainer />
    </> );
}
 
export default ToastProvider;