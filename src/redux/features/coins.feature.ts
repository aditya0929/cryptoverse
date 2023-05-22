import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const cryptoApi = createApi({
	reducerPath: 'cryptoApi',

	baseQuery: retry(
		fetchBaseQuery({
			baseUrl: process.env.REACT_APP_CRYPTO_API_URL || '',
			headers: {
				'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY || '',
				'X-RapidAPI-Host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST || '',
			},
		}),
		{ maxRetries: 6 }
	),

	endpoints: (builder) => ({
		getCoins: builder.query({
			query: ({ limit = '' }) => `/coins${limit ? '?limit=' + limit : ''}`,
		}),
		getCoinDetails: builder.query({
			query: ({ coinId = '' }) => `/coin/${coinId}`,
		}),
		getCoinHistory: builder.query({
			query: ({ coinId = '', timePeriod = '' }) =>
				`/coin/${coinId}/history?timePeriod=${timePeriod}`,
		}),
		getCoinExchanges: builder.query({
			query: ({ coinId = '' }) => `/coin/${coinId}/exchanges`,
		}),
		getCoinMarkets: builder.query({
			query: ({ coinId = '' }) => `/coin/${coinId}/markets`,
		}),
		getReferenceCurrencies: builder.query({
			query: ({ limit = '50', type = 'coin' }) =>
				`/reference-currencies?limit=${limit}&types[0]=${type}`,
		}),
	}),
});

export const counterSlice = createSlice({
	name: 'coins',
	initialState: {},
	reducers: {},
});

export const {
	useGetCoinsQuery,
	useGetCoinDetailsQuery,
	useGetCoinHistoryQuery,
	useGetCoinExchangesQuery,
	useGetCoinMarketsQuery,
	useGetReferenceCurrenciesQuery,
} = cryptoApi;
export { cryptoApi };
