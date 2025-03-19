import React from 'react'

const Unauthorized = () => {
    return (
        <div>
            <div className='flex items-center justify-center w-full min-h-screen'>
                <div className="bg-black">
                    <h2 className='text-white'>You are not permitted</h2>
                    <p>Go back home to the
                        <span className='text-md font-bold'>sales page</span>
                    </p>

                </div>

            </div>
        </div>
    )
}

export default Unauthorized
