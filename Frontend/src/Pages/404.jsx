import React from 'react'
import Header from '../Components/header'

function NotFound() {
	return (
		<div className='w-full min-h-screen head-main bg-blue-100'>
			<Header title={'404'} />
			<div className='h-full grid place-content-center'>
				<h1 className='text-8xl'>404</h1>
				<h2 className='text-2xl'>Page not found</h2>
			</div>
		</div>
	)
}

export default NotFound
