import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import './App.css';
import Login from './Pages/signin';
import Signup from './Pages/signup';
import Profile from './Pages/profile'
import Songs from './Pages/songs';
import Player from './Pages/Player';
import NotFound from './Pages/404';

axios.interceptors.request.use(
	config => {
		const token = localStorage.getItem('token');
		config.headers.authorization = `Bearer ${token}`;
		console.log("auth", config.headers.authorization);
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/signin' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/' element={<Songs />} />
				<Route path='/player' element={<Player />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
