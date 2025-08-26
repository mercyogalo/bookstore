import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LikeButton({ bookId, initialCount = 0, isLiked: initialLiked = false, onToggle }) {
  const [count, setCount] = useState(initialCount);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setCount(prev => newLikedState ? prev + 1 : prev - 1);
    
    if (onToggle) {
      onToggle(newLikedState);
    }

    setTimeout(() => setIsAnimating(false), 200);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      className="flex items-center space-x-1 px-2 py-1 h-auto"
    >
      <Heart 
        className={`h-3 w-3 transition-all duration-200 ${
          isLiked 
            ? 'fill-red-500 text-red-500' 
            : 'text-muted-foreground hover:text-red-500'
        } ${isAnimating ? 'scale-125' : 'scale-100'}`}
      />
      <span className="text-xs">{count}</span>
    </Button>
  );
}