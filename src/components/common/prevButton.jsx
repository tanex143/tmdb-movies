import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PrevButton = ({ currentPage, setCurrentPage }) => {
  return (
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      className='sm:text-lg border rounded py-1 sm:px-4 px-3 focus:outline-none hover:bg-gray-400'
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        className='pr-2 sm:text-2xl text-xl align-middle'
      />
      Prev
    </button>
  );
};

export default PrevButton;
