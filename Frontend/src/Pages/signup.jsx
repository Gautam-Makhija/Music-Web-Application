import React, { useState } from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (email.trim().length === 0) {
			setError("Please enter email");
		}
		else if (name.trim().length < 4) {
			setError("Please enter valid name");
		}
		else if (password.trim().length < 6) {
			setError("Please enter Password with at least 6 char");
		}
		else if (password !== cpassword) {
			setError("Both passwords must be same");
		}
		else {
			setLoading(true);
			localStorage.removeItem('token');

			const data = {
				email: email,
				name: name,
				password: password,
			};

			axios({
				method: 'POST',
				url: 'http://localhost:5056/api/signup',
				headers: {
					'Content-Type': 'application/json',
				},
				data: data
			})
				.then(({ data }) => {
					if (data?.user) {
						localStorage.setItem('token', data.token);
						navigate("/");
					}
					else {
						setError(data.msg);
						setLoading(false);
					}
				})
		}
	}

	function handleChange(e) {
		setError(null);

		const val = e.target.value;
		(e.target.name === "email") ? setEmail(val) : (
			(e.target.name === "name") ? setName(val) : (
				(e.target.name === "password") ? setPassword(val) : setCPassword(val)
			));
	}

	return (
		<div className='w-full h-screen grid place-content-center text-center bg-blue-100'>
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
					Signup to Music App
				</h1>
				<input
					className='px-2 py-1 h-10 border-2 rounded'
					type="email"
					name="email"
					placeholder="Email"
					onChange={handleChange}
				/>
				<input
					className='px-2 py-1 h-10 border-2 rounded'
					type="text"
					name="name"
					placeholder="Name"
					onChange={handleChange}
				/>
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
					placeholder="Confirm password"
					onChange={handleChange}
				/>
				<LoadingButton
					type="submit"
					endIcon={<PersonAddIcon />}
					loading={loading}
					variant="contained"
					loadingPosition="end"
				>
					Signup
				</LoadingButton>
			</form>
			<span className='my-4'>
				Already have account? <Link to="/signin" className='text-blue-600'>Signin Here</Link>
			</span>
		</div >
	)
}

export default Signup
