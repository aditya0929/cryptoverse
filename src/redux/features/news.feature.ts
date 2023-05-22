import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const newsApi = createApi({
	reducerPath: 'newsApi',

	baseQuery: retry(
		fetchBaseQuery({
			baseUrl: process.env.REACT_APP_NEWS_API_URL || '',
			headers: {
				'X-BingApis-SDK': 'true',
				'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY || '',
				'X-RapidAPI-Host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST || '',
			},
		}),
		{ maxRetries: 3 }
	),

	endpoints: (builder) => ({
		getFeeds: builder.query({
			query: ({ query = '', count = 12 }) =>
				`/news/search?q=${query}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
		}),
	}),
});

export const counterSlice = createSlice({
	name: 'news',
	initialState: {},
	reducers: {},
});

export const { useGetFeedsQuery } = newsApi;
export { newsApi };
