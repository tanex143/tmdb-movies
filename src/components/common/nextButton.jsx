import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const NextButton = ({ currentPage, setCurrentPage }) => {
  return (
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      className='sm:text-lg border rounded py-1 sm:px-4 px-3 focus:outline-none hover:bg-gray-400'
    >
      Next
      <FontAwesomeIcon
        icon={faArrowRight}
        className='pl-2 sm:text-2xl text-xl align-middle'
      />
    </button>
  );
};

export default NextButton;
