import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-zinc-800 justify-between p-2 text-white'>
        <div className="logo text-2xl font-bold mx-2">MY TODO</div>
        <ul className='flex w-1/4 items-center justify-around font-bold'>
            <li>Home</li>
            <li>Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
