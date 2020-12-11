import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PrevButton = ({ currentPage, setCurrentPage }) => {
  return (
    <button
      onClick={() => setCurrentPage(currentPage - 1)}
      className='text-lg border rounded py-1 px-4 focus:outline-none hover:bg-gray-400'
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        className='pr-2 text-2xl align-middle'
      />
      Prev
    </button>
  );
};

export default PrevButton;
