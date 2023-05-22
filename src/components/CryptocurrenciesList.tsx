import { Avatar, Card } from 'antd';
import millify from 'millify';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CryptocurrenciesList(props: { coins: Coin[]; limit: number | null }) {
	const [coins, setCoins] = useState(props.coins);

	useEffect(() => {
		if (props.limit) {
			setCoins(props.coins.slice(0, props.limit));
		}
	}, [props]);

	return (
		<div className='sm:grid sm:grid-cols-2 md:grid-cols-3'>
			{coins.map((coin: Coin) => (
				<div className='col-span-1 m-3' key={coin.uuid}>
					<Link to={`/crypto/${coin.uuid}`}>
						<Card
							title={`${coin.rank}. ${coin.name}`}
							extra={<Avatar src={coin.iconUrl} alt={coin.name} className='rounded-none' />}
							className='hover:shadow-[0_3px_15px_rgba(22,_41,_124,_0.1)] transition-all duration-300'
							actions={[
								<Link to={`/market/${coin.uuid}`} key={`/market/${coin.uuid}`}> View Markets</Link>,
								<Link to={`/exchange/${coin.uuid}`} key={`/exchange/${coin.uuid}`}> View Exchanges</Link>,
							]}
						>
							<p className='flex justify-between my-1 '>
								<span className='text-lg font-medium'> Price:</span>
								<span>{millify(parseFloat(coin.price))}</span>
							</p>
							<p className='flex justify-between my-1 '>
								<span className='text-lg font-medium'> Market Cap:</span>
								<span>{millify(parseFloat(coin.marketCap))}</span>
							</p>
							<p className='flex justify-between my-1 '>
								<span className='text-lg font-medium'> Daily Change:</span>
								<span>{millify(parseFloat(coin.change))}</span>
							</p>
						</Card>
					</Link>
				</div>
			))}
		</div>
	);
}

CryptocurrenciesList.defaultProps = {
	coins: [],
	limit: null,
};

export default CryptocurrenciesList;
