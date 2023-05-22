import {
	CheckOutlined,
	DollarCircleOutlined,
	ExclamationCircleOutlined,
	FundOutlined,
	MoneyCollectOutlined,
	NumberOutlined,
	StopOutlined,
	ThunderboltOutlined,
	TrophyOutlined,
} from '@ant-design/icons';
import millify from 'millify';

const TIME_PERIOD = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

const genericStats = (coin: Coin) => {
	return [
		{
			title: 'Number Of Markets',
			value: coin.numberOfMarkets,
			icon: FundOutlined,
		},
		{
			title: 'Number Of Exchanges',
			value: coin.numberOfExchanges,
			icon: MoneyCollectOutlined,
		},
		{
			title: 'Aprroved Supply',
			value: coin.supply.confirmed ? <CheckOutlined /> : <StopOutlined />,
			icon: ExclamationCircleOutlined,
		},
		{
			title: 'Total Supply',
			value: `$ ${millify(parseFloat(coin.supply.total))}`,
			icon: ExclamationCircleOutlined,
		},
		{
			title: 'Circulating Supply',
			value: `$ ${millify(parseFloat(coin.supply.max))}`,
			icon: ExclamationCircleOutlined,
		},
	];
};

const coinState = (coin: Coin) => {
	return [
		{
			title: 'Price to USD',
			value: `$ ${coin.price && millify(parseFloat(coin.price))}`,
			icon: DollarCircleOutlined,
		},
		{ title: 'Rank', value: coin.rank, icon: NumberOutlined },
		{
			title: '24h Volume',
			value: `$ ${coin['24hVolume'] && millify(parseFloat(coin['24hVolume']))}`,
			icon: ThunderboltOutlined,
		},
		{
			title: 'Market Cap',
			value: `$ ${coin.marketCap && millify(parseFloat(coin.marketCap))}`,
			icon: DollarCircleOutlined,
		},
		{
			title: 'All-time-high(daily avg.)',
			value: `$ ${millify(parseFloat(coin.allTimeHigh.price))}`,
			icon: TrophyOutlined,
		},
	];
};

export { TIME_PERIOD, coinState, genericStats };

