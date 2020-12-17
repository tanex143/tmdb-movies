import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

export const CountingStar = (props) => {
  const stars = [];
  const rating = Math.floor(props);

  for (let i = 1; i <= 10; i++) {
    if (i <= rating) {
      stars.push(<FontAwesomeIcon icon={solidStar} key={i} alt='star' />);
    } else {
      stars.push(<FontAwesomeIcon icon={regularStar} key={i} alt='star' />);
    }
  }

  return stars;
};
