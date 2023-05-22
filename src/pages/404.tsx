import PageNotFoundImage from '../assets/images/background/404-page.svg';
import Helmet from '../components/Helmet';

function PageNotFound() {

	return (
		<>
			<Helmet
				title='404 Page Not Found'
				description='Oops… You just found an error page'
			/>
			<div className='my-5 py-5'>
				<div className='flex h-100 items-center justify-center'>
					<div className='text-center'>
						<img
							src={PageNotFoundImage}
							alt='404 page'
							className='max-w-full w-full'
						/>
						<h2 className='text-3xl my-5'>
							Oops… You just found an error page
						</h2>
						<h3 className='s'>
							We are sorry but the page you are looking for was not found
						</h3>
					</div>
				</div>
			</div>
		</>
	);
}

export default PageNotFound;
