import { Alert } from 'antd';
import Spinner from '../components/Spinner';

function AsyncWrapper(props: AsyncWrapperProps) {
	if (props.loading) {
		return <Spinner />;
	} else if (props.error) {
		return (
			<Alert showIcon message={JSON.stringify(props.error)} type='warning' />
		);
	} else if (props.fulfilled) {
		return props.children;
	} else {
		return <>Something has happen</>;
	}
}

AsyncWrapper.defaultValue = {
	loading: true,
	fulfilled: false,
	error: null,
	children: <></>,
};

export default AsyncWrapper;
