import TMDBLogo from '../images/logo.svg';
import { motion } from 'framer-motion';
import { useScroll } from './animation/useScroll';
import { zoomOut } from './animation/animate';

const Footer = () => {
  const [element, animControls] = useScroll();

  return (
    <div className='py-10 bg-gray-300'>
      <motion.div
        ref={element}
        variants={zoomOut}
        initial='hidden'
        animate={animControls}
        className='container mx-auto'
      >
        <div className='grid md:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-5'>
          <div className='md:col-start-2'>
            <img src={TMDBLogo} alt='' className='w-4/5 mx-auto h-full' />
          </div>
          <div>
            <h1 className='font-semibold'>The Basics</h1>
            <p>About</p>
            <p>Contact Us</p>
            <p>Support Forums</p>
            <p>System Status</p>
          </div>
          <div className='w-4/5 mx-auto'>
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
        <h1 className='text-center pt-5 font-semibold'>
          &copy; Alright Reserved TMDb December 2020.
        </h1>
      </motion.div>
    </div>
  );
};

export default Footer;
