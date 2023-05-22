import { Spin } from 'antd';

function Spinner() {
	return (
		<div className='flex justify-center items-center h-96'>
			<Spin size='large' tip='Loading' />
		</div>
	);
}

export default Spinner;
