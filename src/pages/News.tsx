import Helmet from '../components/Helmet';
import NewsList from '../components/News';
import AsyncWrapper from '../layouts/AsyncWrapper';
import { useGetFeedsQuery } from '../redux/features/news.feature';

function News() {
	const { isFetching, error, data } = useGetFeedsQuery({
		query: 'Cryptocurrencies',
		count: 15,
	});

	return (
		<AsyncWrapper loading={isFetching} error={error} fulfilled={Boolean(data)}>
			<Helmet
				title='News'
				description='Get latest news and articles relevant for Cryptocurrencies.'
			/>
			{Boolean(data) && <NewsList feeds={data.value} />}
		</AsyncWrapper>
	);
}

export default News;
