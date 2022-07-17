import { useState, useEffect } from 'react'
import { Slider } from '@mui/material'
import ARTIST from '../../Assets/artist_1.jpg'
import IconButton from '@mui/material/IconButton'
import PlayArrow from '@mui/icons-material/PlayArrow'
import Pause from '@mui/icons-material/Pause'
import SkipPrevious from '@mui/icons-material/SkipPrevious'
import SkipNext from '@mui/icons-material/SkipNext'
import Header from '../../Components/header';
import { useSearchParams } from 'react-router-dom'

function Player() {
	const [params] = useSearchParams();
	const song = params.get("song");

	return (
		<div className='w-full min-h-screen head-main justify-items-center bg-blue-100'>
			<Header title={"Music Player"} />
			<div className='grid place-content-center'>
				<img
					className='w-64 h-64 rounded-full shadow-lg'
					src={ARTIST}
					alt="User"
				/>
				<span className='p-3 text-lg text-center'>
					{song}
				</span>
				<ProgressBar />
				<Controls />
			</div>
		</div>
	)
}

function ProgressBar() {
	const [position, setPosition] = useState(6000);

	return (
		<Slider
			aria-label="time-indicator"
			size="medium"
			value={position}
			min={0}
			step={500}
			max={120000}
			onChange={(e) => { setPosition(e.target.value) }}
		/>
	)
}

function Controls() {
	return (
		<div className='flex flex-row justify-around'>
			<IconButton><SkipPrevious></SkipPrevious></IconButton>
			<IconButton>
				{true ?
					<PlayArrow></PlayArrow> :
					<Pause></Pause>
				}
			</IconButton>
			<IconButton><SkipNext></SkipNext></IconButton>
		</div>
	)
}

export default Player
