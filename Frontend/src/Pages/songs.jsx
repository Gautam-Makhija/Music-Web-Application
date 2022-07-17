import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useSearchParams,useNavigate } from 'react-router-dom'
import Header from '../Components/header';
import Info from '../Components/info';
import Loading from '../Components/loading';

function Songs() {
	const [songs, setSongs] = useState([]);
	const params = useSearchParams();
	const ssong = params.toString;
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setSongs([]);
			console.log("loging");
			axios({
				method: 'GET',
				url: 'http://localhost:5056/api/songs',
				headers: {},
			})
				.then(({ data }) => {
					console.log(data);
					if (data?.songs) {
						setSongs(data.songs);
					}
					else {
						navigate("/signin");
					}
				})
				.catch(() => {
					console.log("data");
					navigate("/signin");
				})
		})();
	}, [ssong]);


	return (
		<div className='w-full min-h-screen head-main justify-items-center bg-blue-100'>
			<Header title={"Songs"} />
			<Loading loading={songs.length === 0} >
				<div className='w-96 max-w-full py-10 flex flex-col gap-y-6'>
					{
						songs.map((song, index) => (
							<Link
								key={index}
								to={`/player?song=` + song["Name"]}
								className='w-full px-4 py-4 bg-white rounded shadow-md hover:bg-blue-50'
							>
								<Info info={song}/>
							</Link>
						))
					}
				</div>
			</Loading>
		</div>
	)
}

export default Songs
