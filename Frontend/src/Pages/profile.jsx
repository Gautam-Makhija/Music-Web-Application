import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AVATAR from '../Assets/avatar.png'
import Header from '../Components/header'
import Loading from '../Components/loading';
import LoadingButton from '@mui/lab/LoadingButton';
import { Close } from '@mui/icons-material';
import Info from '../Components/info';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Profile() {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	async function deleteAccount() {
		axios.get('http://localhost:5056/api/deleteAccount')
			.then(({ data }) => {
				if (data.msg === "done") {
					localStorage.removeItem("token");
					navigate("/signin");
				}
			})
	}

	useEffect(() => {
		(async function () {
			axios.get('http://localhost:5056/api/profile')
				.then(({ data }) => {
					if (data?.user) {
						console.log(data);
						setUser(data.user);
					}
					else {
						localStorage.removeItem('token');
						navigate("/signin");
					}
				})
		})();
	}, []);

	return (
		<div className='w-full min-h-screen head-main bg-blue-100'>
			{open && <ChangePassword callback={() => { setOpen(false) }} />}
			<Header title={'Profile'} />
			<Loading loading={user == null} >
				<div className='h-full flex flex-col items-center justify-center gap-y-3'>
					<img
						className='w-52 h-52 rounded-full'
						src={AVATAR}
						alt="User"
					/>
					{user && <Info info={user} />}
					<Button variant='outlined' onClick={() => setOpen(true)}>
						Change Password
					</Button>
					<Button variant='outlined' color='error' onClick={deleteAccount}>
						Delete Account
					</Button>
				</div>
			</Loading>
		</div>
	)
}

function ChangePassword({ callback }) {
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (password.trim().length < 6) {
			setError("Please enter valid Password with at least 6 char");
		}
		else if (password !== cpassword) {
			setError("Both password must be same");
		}
		else {
			setLoading(true);

			const data = {
				password: password,
			};

			axios({
				method: 'POST',
				url: 'http://localhost:5056/api/changePass',
				headers: {
					'Content-Type': 'application/json',
				},
				data: data
			})
				.then(({ data }) => {
					if (data.msg === "done") {
						localStorage.removeItem('token');
						navigate("/signin");
					}
				})
		}
	}


	function handleChange(e) {
		setError(null);

		const val = e.target.value;
		(e.target.name === "cpassword") ? setCPassword(val) : setPassword(val);
	}

	return (
		<div className="h-screen w-full bg-black absolute z-10 bg-opacity-80 ">
			<div className='h-screen w-full grid place-content-center'>
				<form
					className='p-10 flex flex-col place-items-center gap-y-4 shadow-lg rounded-md bg-white'
					onSubmit={handleSubmit}
				>
					{error ?
						<span className='px-3 py-2 -mt-20 mb-5 rounded bg-red-300 text-sm' >
							{error}
						</span> :
						<span className='px-3 py-2 -mt-20 mb-5 rounded text-sm' >
							&nbsp;
						</span>
					}
					<h1 className='mb-5 text-3xl text-blue-500'>
						Change Password
					</h1>
					<input
						className='px-2 py-1 h-10 border-2 rounded'
						type="password"
						name="password"
						placeholder="Password"
						onChange={handleChange}
					/>
					<input
						className='px-2 py-1 h-10 border-2 rounded'
						type="password"
						name="cpassword"
						placeholder="Confirm Password"
						onChange={handleChange}
					/>
					<LoadingButton
						type="submit"
						loading={loading}
						variant="contained"
					>
						Change Password
					</LoadingButton>
				</form>
			</div>
			<button className='absolute text-white top-0 right-1 z-20' onClick={callback} >
				<Close fontSize='large' />
			</button>
		</div>
	);
}

export default Profile
