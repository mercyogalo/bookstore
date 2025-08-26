import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

export const FavoriteButton = ({ isFavorited = false, onFavorite }) => {
  const [favorited, setFavorited] = useState(isFavorited);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFavorite = () => {
    setIsAnimating(true);
    const newFavoritedState = !favorited;
    setFavorited(newFavoritedState);
    
    if (onFavorite) {
      onFavorite(newFavoritedState);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleFavorite}
      className={cn(
        "flex items-center space-x-1 transition-all duration-200",
        favorited && "text-blue-500 hover:text-blue-600",
        isAnimating && "scale-110"
      )}
    >
      <Bookmark 
        className={cn(
          "h-4 w-4 transition-all duration-200",
          favorited && "fill-current",
          isAnimating && "animate-pulse"
        )} 
      />
      <span className="text-sm font-medium">
        {favorited ? 'Saved' : 'Save'}
      </span>
    </Button>
  );
};