import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from './features/coins.feature';
import { newsApi } from './features/news.feature';

const store = configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(cryptoApi.middleware, newsApi.middleware),
});

export { store };
