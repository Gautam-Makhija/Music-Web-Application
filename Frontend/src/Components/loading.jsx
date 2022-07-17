import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

function Loading({ children, loading }) {
	return (
		loading ?
			<div className='w-full h-full grid place-content-center'>
				< CircularProgress />
			</div >
			: children
	)
}

export default Loading
