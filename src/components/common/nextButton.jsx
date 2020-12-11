import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const NextButton = ({ currentPage, setCurrentPage }) => {
  return (
    <button
      onClick={() => setCurrentPage(currentPage + 1)}
      className='text-lg border rounded py-1 px-4 focus:outline-none hover:bg-gray-400'
    >
      Next
      <FontAwesomeIcon
        icon={faArrowRight}
        className='pr-2 text-2xl align-middle'
      />
    </button>
  );
};

export default NextButton;
