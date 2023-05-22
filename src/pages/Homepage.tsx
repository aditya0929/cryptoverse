import { Statistic, Typography } from 'antd';
import millify from 'millify';
import CryptocurrenciesList from '../components/CryptocurrenciesList';
import Helmet from '../components/Helmet';
import News from '../components/News';
import AsyncWrapper from '../layouts/AsyncWrapper';
import { useGetCoinsQuery } from '../redux/features/coins.feature';
import { useGetFeedsQuery } from '../redux/features/news.feature';
import {
	DollarCircleOutlined,
	ExclamationCircleOutlined,
	MoneyCollectOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';

function Homepage() {
	const { isFetching, error, data } = useGetCoinsQuery('');
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
			loading={isFetching || feedsFetching}
			error={error || feedError}
			fulfilled={Boolean(data && feeds)}
		>
			<Helmet
				title='Homepage'
				description='These global statistics tell about the data available on coin ranking.'
			/>
			{Boolean(feeds && data) && (
				<>
					<h1 className='mb-5 mt-10 text-xl'>Global Crypto Stats</h1>
					<div className='mb-20 md:grid grid-cols-3'>
						<div className='col-span-1 m-3'>
							<Statistic
								title='Total Cryptocurrencies'
								value={millify(data.data.stats['total'])}
								prefix={<ExclamationCircleOutlined />}
							/>
						</div>
						<div className='col-span-1 m-3'>
							<Statistic
								title='Total Exchanges'
								value={millify(data.data.stats['totalExchanges'])}
								prefix={<MoneyCollectOutlined />}
							/>
						</div>
						<div className='col-span-1 m-3'>
							<Statistic
								title='Total Market Cap'
								value={millify(data.data.stats['totalMarketCap'])}
								prefix={<DollarCircleOutlined />}
							/>
						</div>
						<div className='col-span-1 m-3'>
							<Statistic
								title='Total 24 Volume'
								value={millify(data.data.stats['total24hVolume'])}
								prefix={<ThunderboltOutlined />}
							/>
						</div>
						<div className='col-span-1 m-3'>
							<Statistic
								title='Total Market'
								value={millify(data.data.stats['totalMarkets'])}
								prefix={<DollarCircleOutlined />}
							/>
						</div>
					</div>

					<Typography.Title level={3} className='mt-8'>
						Top 10 Cryptocurrencies in the world
					</Typography.Title>
					<CryptocurrenciesList coins={data.data.coins} limit={10} />

					<Typography.Title level={3} className='mt-8'>
						Latest Cryptocurrencies News
					</Typography.Title>
					<News feeds={feeds.value} />
				</>
			)}
		</AsyncWrapper>
	);
}

export default Homepage;
