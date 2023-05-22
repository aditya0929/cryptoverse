import React, { ReactElement, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Spinner from '../components/Spinner';
import Layout from '../layouts';
import { PUBLIC_ROUTES } from './lazyLoading';

interface SuspenseWrapperProps {
	children: ReactElement;
}

const SuspenseWrapper = (props: SuspenseWrapperProps) => {
	return (
		<React.Suspense fallback={<Spinner />}>{props.children}</React.Suspense>
	);
};

function MainRoutes() {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0 });
		// scroll to the top of the browser window when changing route
	}, [location]);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{PUBLIC_ROUTES.map((route) => (
					<Route
						path={route.path}
						key={route.path}
						element={
							<SuspenseWrapper>
								<route.component />
							</SuspenseWrapper>
						}
					/>
				))}
			</Route>
		</Routes>
	);
}

export default MainRoutes;
