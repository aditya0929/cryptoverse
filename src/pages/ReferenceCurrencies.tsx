import { Avatar, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetReferenceCurrenciesQuery } from '../redux/features/coins.feature';
import AsyncWrapper from '../layouts/AsyncWrapper';
import Helmet from '../components/Helmet';
import noImage from '../assets/images/icons/no-image.jpeg';

const columns: ColumnsType<ReferenceCurrency> = [
	{
		title: '#',
		dataIndex: '0',
		key: 'uuid',
		render: (_, __, index) => index + 1,
	},
	{
		title: 'Avatar',
		dataIndex: 'iconUrl',
		key: 'uuid',
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
		sorter: (a, b) => a.name.length - b.name.length,
	},
	{
		title: 'Symbol',
		dataIndex: 'symbol',
		key: 'uuid',
		align: 'center',
	},
	{
		title: 'Sign',
		dataIndex: 'sign',
		key: 'uuid',
		align: 'center',
		render: (_, record) => (record.sign ? record.sign : '--'),
	},
];

function ReferenceCurrencies() {
	const {
		isFetching: isFetchingCoin,
		error: errorCoin,
		data: coinData,
	} = useGetReferenceCurrenciesQuery({});
	const {
		isFetching: isFetchingFiat,
		error: errorFiat,
		data: fiatData,
	} = useGetReferenceCurrenciesQuery({ type: 'fiat' });

	return (
		<AsyncWrapper
			loading={isFetchingCoin || isFetchingFiat}
			error={errorCoin || errorFiat}
			fulfilled={Boolean(coinData && fiatData)}
		>
			<Helmet
				title='Reference Currencies'
				description='Get a list of reference currencies, which can be used as reference for coins. The response includes all the essentials for this use-case, such as the symbol (e.g. USD) and - if available - the sign (e.g. $).'
			/>
			{Boolean(coinData && fiatData) && (
				<>
					<Typography.Title level={3} className='mt-8 mb-5'>
						Coin Reference Currencies
					</Typography.Title>
					<Table
						scroll={{ x: 'max-content' }}
						columns={columns}
						dataSource={coinData.data.currencies}
					/>

					<Typography.Title level={3} className='mt-20 mb-5'>
						Fiat Reference Currencies
					</Typography.Title>
					<Table
						scroll={{ x: 'max-content' }}
						columns={columns}
						dataSource={fiatData.data.currencies}
					/>
				</>
			)}
		</AsyncWrapper>
	);
}

export default ReferenceCurrencies;
