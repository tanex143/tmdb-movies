import TMDBLogo from '../images/logo.svg';

const Footer = () => {
  return (
    <div className='py-10 bg-gray-300'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-6 gap-5'>
          <div className='col-start-2'>
            <img src={TMDBLogo} alt='' className='w-4/5 mx-auto h-full' />
          </div>
          <div>
            <h1 className='font-semibold'>The Basics</h1>
            <p>About</p>
            <p>Contact Us</p>
            <p>Support Forums</p>
            <p>System Status</p>
          </div>
          <div>
            <h1 className='font-semibold'>Legal</h1>
            <p>Term of Use</p>
            <p>Privacy Policy</p>
          </div>
          <div>
            <h1 className='font-semibold'>Community</h1>
            <p>Guidelines</p>
            <p>discussions</p>
            <p>Leaderboard</p>
          </div>
        </div>
        <h1 className='text-center pt-5'>
          &copy; Alright Reserved TMDb December 2020.
        </h1>
      </div>
    </div>
  );
};

export default Footer;
