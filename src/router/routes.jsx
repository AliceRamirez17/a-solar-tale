import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// pages
import Home from '../pages/Home/Home'
import Info from '../pages/Info/Info'

function MyRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/information' element={<Info />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes