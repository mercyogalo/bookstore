import { useState, useEffect } from 'react';
import { ArrowLeft, Star, Share2, Flag, Users, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LikeButton } from '../components/LikeButton';
import { FavoriteButton } from '../components/FavoriteButton';
import { ReviewForm } from '../components/ReviewForm';
import { ReviewCard } from '../components/ReviewCard';

export const BookPage = ({ book, onBack }) => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Mock reviews data
    const mockReviews = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      userId: `user-${i + 1}`,
      userName: `Reader ${i + 1}`,
      userAvatar: null,
      content: `This book was ${['amazing', 'incredible', 'thought-provoking', 'engaging', 'wonderful'][Math.floor(Math.random() * 5)]}! ${['The characters were well-developed', 'The plot kept me hooked', 'The writing style was beautiful', 'I couldn\'t put it down', 'Highly recommend this read'][Math.floor(Math.random() * 5)]}.`,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      likes: Math.floor(Math.random() * 20) + 1,
      isLiked: false,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      isEdited: Math.random() > 0.7,
      isPinned: i < 2 && Math.random() > 0.5
    }));

    setReviews(mockReviews);
  }, [book.id]);

  const handleSubmitReview = (reviewData) => {
    const newReview = {
      id: Date.now(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: null,
      content: reviewData.content,
      rating: reviewData.rating,
      likes: 0,
      isLiked: false,
      createdAt: 'Just now',
      isEdited: false,
      isPinned: false
    };

    setReviews(prev => [newReview, ...prev]);
  };

  const handleEditReview = (reviewId, updatedData) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, ...updatedData, isEdited: true }
        : review
    ));
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(prev => prev.filter(review => review.id !== reviewId));
  };

  const handleLikeReview = (reviewId, isLiked) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            likes: isLiked ? review.likes + 1 : review.likes - 1,
            isLiked: isLiked 
          }
        : review
    ));
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'highest-rated':
        return b.rating - a.rating;
      case 'most-liked':
        return b.likes - a.likes;
      default: // newest
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Books
      </Button>

      {/* Book Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover and Actions */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-4">
                <img
                  src={book.coverImage || `https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400&h=600`}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <LikeButton
                    initialLikes={book.likes}
                    isLiked={book.isLiked}
                    size="default"
                  />
                  <FavoriteButton isFavorited={book.isFavorited} />
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Book Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{book.rating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Reviews</span>
                <span className="font-medium">{book.reviewCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Likes</span>
                <span className="font-medium">{book.likes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Views</span>
                <span className="font-medium">{Math.floor(Math.random() * 5000) + 1000}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Info and Description */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{book.title}</h1>
                <p className="text-xl text-muted-foreground">by {book.author}</p>
                <div className="flex items-center space-x-2">
                  {book.category && (
                    <Badge variant="secondary">
                      <Tag className="h-3 w-3 mr-1" />
                      {book.category}
                    </Badge>
                  )}
                  {book.isNew && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      New Release
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {book.description}
              </p>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Reviews ({reviews.length})</span>
                </CardTitle>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border rounded-md px-3 py-1 bg-background"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest-rated">Highest Rated</option>
                  <option value="most-liked">Most Liked</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ReviewForm onSubmit={handleSubmitReview} />
              
              <Separator />
              
              <div className="space-y-4">
                {sortedReviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onEdit={handleEditReview}
                    onDelete={handleDeleteReview}
                    onLike={handleLikeReview}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};