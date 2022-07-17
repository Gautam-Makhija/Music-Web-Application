import React from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header({ title }) {
	return (
		<header className="px-4 py-3 w-full h-16 flex justify-center items-center text-white gap-x-4 bg-blue-400 sticky top-0">
			<Link to='/' className='w-max text-2xl'>Music App</Link>
			<div className='w-auto text-center flex-1'>
				{title}
			</div>
			<LongMenu />
		</header>
	)
}

export default Header




function LongMenu() {
	const ITEM_HEIGHT = 48;
	const navigate = useNavigate();

	async function handle_logout() {
		axios({
			method: 'GET',
			url: 'http://localhost:5056/api/logout',
			headers: {}
		})
			.then(() => {
				localStorage.removeItem('token');
				navigate("/signin");
			})
	}

	const options = [
		<Link className='w-full px-4 py-1' to="/profile" >Profile</Link>,
		<span className='w-full px-4 py-1' onClick={handle_logout} >Logout</span>,
	];


	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls="long-menu"
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon style={{ fill: "white" }} />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
						padding: '0',
					},
				}}
			>
				{options.map((option, index) => (
					<MenuItem id="menuitem" key={index} onClick={handleClose}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}