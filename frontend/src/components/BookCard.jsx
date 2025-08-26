import { useState } from 'react';
import { Heart, Star, MessageCircle, Eye } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { LikeButton } from './LikeButton';
import { FavoriteButton } from './FavoriteButton';
import { Link } from 'react-router-dom';

export function BookCard({ book }) {
  const [isLiked, setIsLiked] = useState(book.isLiked || false);
  const [isFavorited, setIsFavorited] = useState(book.isFavorited || false);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={book.cover || 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg'}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Link to={`/book/${book.id}`}>
            <Button size="sm" variant="secondary">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </Link>
          <FavoriteButton 
            bookId={book.id} 
            isFavorited={isFavorited}
            onToggle={setIsFavorited}
          />
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <Link to={`/book/${book.id}`}>
              <h3 className="font-semibold text-sm hover:text-primary transition-colors line-clamp-2">
                {book.title}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              by {book.author}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {book.categories?.slice(0, 2).map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{book.rating || '4.5'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-3 w-3" />
              <span>{book.reviewCount || 0}</span>
            </div>
          </div>
          
          <LikeButton 
            bookId={book.id}
            initialCount={book.likes || 0}
            isLiked={isLiked}
            onToggle={setIsLiked}
          />
        </div>
      </CardContent>
    </Card>
  );
}