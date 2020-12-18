import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

export const useScroll = () => {
  const animControls = useAnimation();
  const [element, view] = useInView({ threshold: 0.2 });
  view ? animControls.start('show') : animControls.start('hidden');
  return [element, animControls];
};
