import React from 'react'
import { Link } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

const Navbar = () => {
    return (
        <nav>
            <div>
                <img className='w-10 h-10' src="https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg" alt="" />
            </div>
            <div>
                <Link to={Dashboard}>SignIn</Link>
            </div>
        </nav>
    )
}

export default Navbar
