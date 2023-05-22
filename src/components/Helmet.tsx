import { Helmet as HelmetWrapper } from 'react-helmet';

function Helmet(props: HelmetProps) {
	return (
		<HelmetWrapper>
			<title>Cryptoverse | {props.title}</title>
			<meta name='description' content={props.description} />
		</HelmetWrapper>
	);
}

Helmet.defaultProps = {
	title: 'Page Title',
	description: 'Page Description',
};

export default Helmet;
