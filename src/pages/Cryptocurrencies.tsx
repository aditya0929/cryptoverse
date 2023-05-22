import CryptocurrenciesList from '../components/CryptocurrenciesList';
import { useGetCoinsQuery } from '../redux/features/coins.feature';
import AsyncWrapper from '../layouts/AsyncWrapper';
import Helmet from '../components/Helmet';

function Currencies() {
	const { isFetching, error, data } = useGetCoinsQuery('');

	return (
		<AsyncWrapper loading={isFetching} error={error} fulfilled={Boolean(data)}>
			<Helmet
				title='Cryptocurrencies'
				description='Get a list of coins. Coins are by default ordered by their rank, which - somewhat simplified - means that they are ordered on marketcap. The response not only returns a list of coins, but also statistics regarding the requested list, such as the volume in the last 24 hours.'
			/>
			{Boolean(data) && <CryptocurrenciesList coins={data.data.coins} />}
		</AsyncWrapper>
	);
}

export default Currencies;
