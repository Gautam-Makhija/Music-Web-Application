import React from 'react'

function Info({ info }) {
	return (
		<ul>
			{
				Object.keys(info).map((infoKey, index) => (
					<li key={index}>
						{infoKey} : &nbsp;
						<span className='text-gray-600'>
							{info[infoKey]}
						</span>
					</li>
				))
			}
		</ul>
	)
}

export default Info
