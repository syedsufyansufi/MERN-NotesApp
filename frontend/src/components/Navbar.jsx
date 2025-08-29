import React from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'


const Navbar = () => {
    return (
        <div>
            <header className='w-full bg-base-300 border-base-content/10'>
                <div className='mx-auto max-w-6xl p-4'>
                    <div className='flex item-center justify-between'>
                        <h1 className='text-3xl font-bold text-primary font-mono tracking-tight '>
                            ThinkBoard
                        </h1>
                        <Link to='/create' className='btn btn-primary'>
                            Create Note
                            <PlusIcon className='size-4' />
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar