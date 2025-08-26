import { PopularBooks } from '../components/PopularBooks';

export const Popular = ({ onBookClick, onLike, onFavorite }) => {
  return (
    <PopularBooks 
      onBookClick={onBookClick}
      onLike={onLike}
      onFavorite={onFavorite}
    />
  );
};