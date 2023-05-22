import { Alert, Layout, Select, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCoinsQuery } from '../redux/features/coins.feature';

function Navbar() {
	const navigateTo = useNavigate();
	const { isFetching, error, data } = useGetCoinsQuery('');

	const [options, setOptions] = useState<AutoCompleteOption[]>([]);

	useEffect(() => {
		setOptions(
			data?.data?.coins.map((coin: Coin) => ({
				value: coin.name,
				label: coin.name,
				reset: { ...coin },
			}))
		);
	}, [data]);

	const onSelect = (_value: string, option: AutoCompleteOption) => {
		navigateTo(`/crypto/${option.reset.uuid}`);
	};

	if (isFetching) {
		return <Spin size='small' />;
	} else if (error) {
		return <Alert showIcon message={JSON.stringify(error)} type='warning' />;
	} else if (data) {
		return (
			<Layout.Header className='p-0 bg-white md:grid grid-cols-5 items-center'>
				<div className='mx-5 col-span-2 items-center'>
					<Select
						showSearch
						onSelect={onSelect}
						className='w-full'
						placeholder='Search for Cryptocurrencies ??'
						filterOption={(inputValue, option) =>
							option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
							-1
						}
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '')
								.toLowerCase()
								.localeCompare((optionB?.label ?? '').toLowerCase())
						}
						options={options}
					/>
				</div>
			</Layout.Header>
		);
	} else {
		return <></>;
	}
}

export default Navbar;
