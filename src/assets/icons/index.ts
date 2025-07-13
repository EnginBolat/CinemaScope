import HomeIcon from './HomeIcon';
import AccessTimeIcon from './AccessTimeIcon';
import BookmarkIcon from './BookmarkIcon';
import OndemandVideoIcon from './OndemandVideoIcon';
import { Star } from './Star';
import ChevronLeft from './ChevronLeft';
import HeartOutline from './HeartOutline';
import HeartFilled from './HeartFilled';
import { Search } from '@assets/icons/Search.tsx';

const Icons = {
  HomeIcon,
  AccessTimeIcon,
  BookmarkIcon,
  OndemandVideoIcon,
  Star,
  ChevronLeft,
  HeartOutline,
  HeartFilled,
  Search,
};

export type IconType = keyof typeof Icons;
export default Icons;
