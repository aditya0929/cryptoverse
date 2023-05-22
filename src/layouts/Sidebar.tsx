import {
	BulbOutlined,
	FormOutlined,
	FundOutlined,
	HomeOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import favicon from '../assets/images/icons/favicon.png';

const items: MenuItem[] = [
	{
		label: <NavLink to='/'>Home</NavLink>,
		key: '/',
		icon: <HomeOutlined />,
	},
	{
		label: <NavLink to='/currencies'>Currencies</NavLink>,
		key: '/currencies',
		icon: <FundOutlined />,
	},
	{
		label: <NavLink to='/reference-currencies'>Reference Currencies</NavLink>,
		key: '/reference-currencies',
		icon: <FormOutlined />,
	},
	{
		label: <NavLink to='/news'>News</NavLink>,
		key: '/news',
		icon: <BulbOutlined />,
	},
];

function Sidebar() {
	const { pathname } = useLocation();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout.Sider
			collapsible
			collapsed={collapsed}
			theme='light'
			width={300}
			onCollapse={(value) => setCollapsed(value)}
			breakpoint='md'
		>
			<Link className='flex items-center justify-center my-5' to='/'>
				<Avatar src={favicon} size='large' alt='Cryptoverse' />
				{!collapsed && (
					<h4 className='transition-all duration-300 text-white ml-4 text-2xl'>
						Cryptoverse
					</h4>
				)}
			</Link>

			<Menu
				defaultSelectedKeys={[pathname]}
				theme='light'
				mode='inline'
				items={items}
			/>
		</Layout.Sider>
	);
}

export default Sidebar;
