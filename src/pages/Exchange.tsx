import {
	CheckOutlined,
	LikeOutlined,
	LinkOutlined,
	StopOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';
import { Avatar, Statistic, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import noImage from '../assets/images/icons/no-image.jpeg';
import Helmet from '../components/Helmet';
import AsyncWrapper from '../layouts/AsyncWrapper';
import { useGetCoinExchangesQuery } from '../redux/features/coins.feature';

const columns: ColumnsType<ExchangeCurrency> = [
	{
		title: 'Rank',
		dataIndex: 'rank',
		key: 'uuid',
		align: 'center',
	},
	{
		title: 'Avatar',
		dataIndex: 'iconUrl',
		key: 'exchange.uuid',
		align: 'center',
		render: (_, record) => (
			<Avatar
				src={record.iconUrl || noImage}
				alt={record.name}
				className='rounded-none'
			/>
		),
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'uuid',
	},
	{
		title: 'Number Of Markets',
		dataIndex: 'numberOfMarkets',
		key: 'uuid',
		align: 'center',
	},
	{
		title: 'BTC Price',
		dataIndex: 'btcPrice',
		key: 'uuid',
		align: 'center',
		render: (_, record) => millify(parseFloat(record.btcPrice)),
	},
	{
		title: 'Recommended',
		dataIndex: 'recommended',
		key: 'uuid',
		align: 'center',
		render: (_, record) =>
			record.recommended ? (
				<CheckOutlined className='text-green-600' />
			) : (
				<StopOutlined className='text-red-600' />
			),
	},
	{
		title: 'Verified',
		dataIndex: 'verified',
		key: 'uuid',
		align: 'center',
		render: (_, record) =>
			record.verified ? (
				<CheckOutlined className='text-green-600' />
			) : (
				<StopOutlined className='text-red-600' />
			),
	},
	{
		title: 'Price',
		dataIndex: 'price',
		key: 'uuid',
		align: 'center',
		render: (_, record) => millify(parseFloat(record.price)),
	},
	{
		title: 'Coin Ranking Url',
		dataIndex: 'coinrankingUrl',
		key: 'uuid',
		align: 'center',
		render: (_, record) => (
			<a
				href={record.coinrankingUrl}
				target='_blank'
				rel='noreferrer'
				title={record.name}
			>
				<LinkOutlined className='text-xl' />
			</a>
		),
	},
];

function Exchange() {
	const params = useParams();

	const { isFetching, error, data } = useGetCoinExchangesQuery({
		coinId: params?.coinId,
	});

	return (
		<AsyncWrapper loading={isFetching} error={error} fulfilled={Boolean(data)}>
			<Helmet
				title='Exchange'
				description='Find exchanges where a specific coin can be traded.
				This endpoint requires the ultra plan or higher.'
			/>
			{Boolean(data) && (
				<>
					<h1 className='mb-5 mt-10 text-xl'>Exchange Crypto Stats</h1>
					<div className='mb-20 md:flex'>
						<Statistic
							title='24h Volume'
							prefix={<ThunderboltOutlined />}
							value={millify(data.data.stats['24hVolume'])}
						/>
						<Statistic
							title='Total'
							prefix={<LikeOutlined />}
							value={millify(data.data.stats['total'])}
							className='ml-40'
						/>
					</div>

					<Table
						columns={columns}
						scroll={{ x: 'max-content' }}
						dataSource={data.data.exchanges}
						pagination={{ pageSize: 20 }}
					/>
				</>
			)}
		</AsyncWrapper>
	);
}

export default Exchange;
