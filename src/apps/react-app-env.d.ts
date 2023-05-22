/// <reference types="react-scripts" />

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

interface Coin {
	uuid: string;
	symbol: string;
	name: string;
	description: string;
	color: string;
	iconUrl: string;
	websiteUrl: string;
	links: [
		{
			name: string;
			type: string;
			url: string;
		}
	];

	supply: {
		confirmed: true;
		supplyAt: number;
		max: string;
		total: string;
		circulating: string;
	};

	numberOfMarkets: number;
	numberOfExchanges: number;
	'24hVolume': string;
	marketCap: string;
	fullyDilutedMarketCap: string;
	price: string;
	btcPrice: string;
	priceAt: number;
	change: string;
	rank: number;
	sparkline: string[];

	allTimeHigh: {
		price: string;
		timestamp: number;
	};

	coinrankingUrl: string;
	tier: number;
	lowVolume: boolean;
	listedAt: number;
	hasContent: true;
	notices: null;
	tags: string[];
}

interface Feed {
	name: string;
	url: string;
	image?: {
		thumbnail: {
			contentUrl: string;
		};
	};
	description: string;
	provider: [
		{
			name: string;
		}
	];
	datePublished: string;
}

type MenuItem = Required<MenuProps>['items'][number];

type AutoCompleteOption = { value: string; label: string; reset: Coin };

interface HistoryTimestamp {
	price: string;
	timestamp: number;
}

interface ChartProps {
	history: HistoryTimestamp[];
}

interface ReferenceCurrency {
	uuid: string;
	type: string;
	iconUrl?: string;
	name: string;
	symbol: string;
	sign?: string;
}

interface AsyncWrapperProps {
	loading: boolean;
	fulfilled: boolean;
	error?: unknown;
	children: React.JSX;
}

interface HelmetProps {
	title: string;
	description: string;
}

interface MarketCurrency {
	uuid: string;
	rank: number;
	base: {
		uuid: string;
		symbol: string;
	};
	quote: { uuid: string; symbol: string };
	exchange: { name: string; uuid: string; iconUrl: string };
	marketShare: string;
	btcPrice: string;
	recommended: true;
	filters: {};
	price: string;
	'24hVolume': string;
}

interface ExchangeCurrency {
	name: string;
	iconUrl: string;
	verified: boolean;
	recommended: true;
	numberOfMarkets: number;
	coinrankingUrl: string;
	btcPrice: string;
	price: string;
	uuid: string;
	rank: number;
}
