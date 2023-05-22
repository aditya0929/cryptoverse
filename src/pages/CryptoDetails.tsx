import { TagOutlined } from '@ant-design/icons';
import { Avatar, Select, Typography } from 'antd';
import millify from 'millify';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Chart from '../components/Chart';
import Helmet from '../components/Helmet';
import News from '../components/News';
import { TIME_PERIOD, coinState, genericStats } from '../constants/crypto';
import AsyncWrapper from '../layouts/AsyncWrapper';
import {
	useGetCoinDetailsQuery,
	useGetCoinHistoryQuery,
} from '../redux/features/coins.feature';
import { useGetFeedsQuery } from '../redux/features/news.feature';

function CryptoDetails() {
	const params = useParams();
	const [timePeriod, setTimePeriod] = useState('24h');

	const { isFetching, error, data } = useGetCoinDetailsQuery({
		coinId: params?.coinId,
	});

	const {
		isFetching: isFetchingHistory,
		error: errorHistory,
		data: history,
	} = useGetCoinHistoryQuery({
		coinId: params?.coinId,
		timePeriod,
	});

	const {
		isFetching: feedsFetching,
		error: feedError,
		data: feeds,
	} = useGetFeedsQuery({
		query: 'Cryptocurrencies',
		count: 6,
	});

	return (
		<AsyncWrapper
			loading={isFetching || feedsFetching || isFetchingHistory}
			error={error || feedError || errorHistory}
			fulfilled={Boolean(data && feeds && history)}
		>
			{Boolean(data && feeds && history) && (
				<>
					<Helmet
						title={data.data.coin.name}
						description={data.data.coin.description}
					/>
					<div className='flex items-center mt-8 '>
						<Avatar src={data.data.coin.iconUrl} className='rounded-none' />
						<h1
							className=' text-5xl mx-4 my-0'
							style={{ color: data.data.coin.color }}
						>
							{data.data.coin.name}
						</h1>
						<a
							href={data.data.coin.websiteUrl}
							target='_blank'
							rel='noreferrer'
							title={data.data.coin.name}
						>
							<TagOutlined className='text-xl' />
						</a>
					</div>
					<p className='text-gray-500 mt-10'>{data.data.coin.description}</p>
					<div className='md:grid grid-cols-2 mt-10'>
						<div className='col-span-1 m-3'>
							<h3 className='text-2xl'>
								{data.data.coin.name} Value Statistics
							</h3>

							<p className='mb-5 mt-3 text-gray-600'>
								An overview showing the statistics of {data.data.coin.name},
								such as the base and quote currency, the rank, and trading
								volume.
							</p>

							{coinState(data.data.coin).map((st, index) => (
								<div
									className='flex my-2 items-center justify-between md:w-80'
									key={index}
								>
									<div className='flex'>
										<st.icon className='text-base text-gray-400' />
										<div className='text-base text-gray-400 ml-3'>
											{st.title}
										</div>
									</div>
									<div className='font-semibold'>{st.value}</div>
								</div>
							))}
						</div>
						<div className='col-span-1 m-3'>
							<h3 className='text-2xl'>Other Stats Info</h3>
							<p className='mb-5 mt-3 text-gray-600'>
								An overview showing the statistics of {data.data.coin.name},
								such as the base and quote currency, the rank, and trading
								volume.
							</p>

							{genericStats(data.data.coin).map((st, index) => (
								<div
									className='flex my-2 items-center justify-between md:w-80'
									key={index}
								>
									<div className='flex'>
										<st.icon className='text-base text-gray-400' />
										<div className='text-base text-gray-400 ml-3'>
											{st.title}
										</div>
									</div>
									<div className='font-semibold'>{st.value}</div>
								</div>
							))}
						</div>
						<div className='col-span-1 m-3'>
							<h3 className='text-2xl'>{data.data.coin.name} Url's</h3>

							{data.data.coin?.links.map((link: any, index: number) => (
								<div
									className='flex my-2 items-center justify-between md:w-80'
									key={index}
								>
									<div className='flex'>
										<div className='text-base text-gray-400 capitalize'>
											{link.type}
										</div>
									</div>
									<a href={link.url} target='_blank' rel='noreferrer'>
										{link.name}
									</a>
								</div>
							))}
						</div>
					</div>

					<div className='md:flex my-10 justify-between items-center'>
						<div className=''>
							<h1 className=' text-3xl '>{data.data.coin.name} Price Chart</h1>
							<div className='flex my-2 items-center justify-between md:w-80 font-bold mt-8'>
								<div className='flex'>
									<div className='text-base'>Changes:</div>
								</div>
								{parseFloat(history.data.change) > 0 ? (
									<div className='text-green-600'>+{history.data.change}%</div>
								) : (
									<div className='text-red-600'>{history.data.change}%</div>
								)}
							</div>
							<div className='flex my-2 items-center justify-between md:w-80 font-bold mt-3'>
								<div className='flex'>
									<div className='text-base'>
										Current {data.data.coin.name} price:
									</div>
								</div>
								<div>{millify(parseFloat(data.data.coin.price))} $</div>
							</div>
						</div>
						<div className='mt-5 md:mt-0'>
							<Select
								showSearch
								value={timePeriod}
								onSelect={(value: string) => setTimePeriod(value)}
								style={{ width: '200px' }}
								placeholder='Select Time Period'
								filterOption={(input, option) =>
									(option?.label ?? '').includes(input)
								}
								options={TIME_PERIOD.map((t) => ({ label: t, value: t }))}
							/>
						</div>
					</div>

					<div className='my-10'>
						<Chart history={history.data.history} />
					</div>

					<Typography.Title level={3} className='mt-8'>
						Latest Crypto News
					</Typography.Title>
					<News feeds={feeds.value} />
				</>
			)}
		</AsyncWrapper>
	);
}

export default CryptoDetails;
