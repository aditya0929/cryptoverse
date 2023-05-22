import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import noImage from '../assets/images/icons/no-image.jpeg';
import { timeToX } from '../utils/day';

function News({ feeds = [] }) {
	return (
		<div className='sm:grid sm:grid-cols-2 md:grid-cols-3'>
			{feeds.map((feed: Feed) => (
				<div className='col-span-1 m-3' key={feed.url}>
					<a href={feed.url} target='_blank' title={feed.name} rel='noreferrer'>
						<Card className='hover:shadow-[0_3px_15px_rgba(22,_41,_124,_0.1)] transition-all duration-300'>
							<div className='flex'>
								<h2 className='font-bold text-lg duration-300 transition hover:text-[#1677ff]'>
									{feed.name}
								</h2>
								<img
									alt={feed.name}
									src={feed?.image?.thumbnail.contentUrl || noImage}
									className='max-w-full ml-3 w-24 h-24 object-cover'
								/>
							</div>
							<div className='flex justify-between items-center my-4 text-sm text-gray-500'>
								<div className='flex items-center'>
									<UserOutlined />
									<span className='mx-2'> {feed.provider[0].name}</span>
								</div>
								<div className='flex items-center'>
									<CalendarOutlined />
									<span className='mx-2'> {timeToX(feed.datePublished)}</span>
								</div>
							</div>
							<p className='mt-5 text-gray-700'>
								{feed.description.substring(0, 100)}
							</p>
						</Card>
					</a>
				</div>
			))}
		</div>
	);
}

News.defaultProps = {
	News: [],
};

export default News;
