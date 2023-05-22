import { Outlet } from 'react-router-dom';
import { FloatButton, Layout } from 'antd';

import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function LayoutWrapper() {
	return (
		<Layout className='min-h-screen'>
			<Sidebar />
			<Layout>
				<Navbar />
				<Layout.Content className='mx-4 mt-4'>
					<Outlet />
					<FloatButton.BackTop />
				</Layout.Content>
				<Footer />
			</Layout>
		</Layout>
	);
}

export default LayoutWrapper;
