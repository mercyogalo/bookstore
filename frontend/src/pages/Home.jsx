import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BookList } from '../components/BookList';

export const Home = ({ onBookClick, onLike, onFavorite }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);

  useEffect(() => {
    // Mock data for home page
    const mockFeatured = Array.from({ length: 4 }, (_, i) => ({
      id: `featured-${i + 1}`,
      title: `Featured Book ${i + 1}`,
      author: `Featured Author ${i + 1}`,
      coverImage: `https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300&h=400`,
      description: 'An exceptional work that has captured readers\' hearts worldwide...',
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 200) + 100,
      likes: Math.floor(Math.random() * 500) + 200,
      isLiked: false,
      isFavorited: false,
      category: 'Featured',
      isNew: i < 2
    }));

    const mockNewArrivals = Array.from({ length: 4 }, (_, i) => ({
      id: `new-${i + 1}`,
      title: `New Release ${i + 1}`,
      author: `New Author ${i + 1}`,
      coverImage: `https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&w=300&h=400`,
      description: 'Fresh from the press, this new release is already making waves...',
      rating: 4.0 + Math.random() * 1,
      reviewCount: Math.floor(Math.random() * 50) + 5,
      likes: Math.floor(Math.random() * 100) + 10,
      isLiked: false,
      isFavorited: false,
      category: 'New Release',
      isNew: true
    }));

    const mockTrending = Array.from({ length: 4 }, (_, i) => ({
      id: `trend-${i + 1}`,
      title: `Trending Now ${i + 1}`,
      author: `Popular Author ${i + 1}`,
      coverImage: `https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=300&h=400`,
      description: 'Currently trending and loved by thousands of readers...',
      rating: 4.3 + Math.random() * 0.7,
      reviewCount: Math.floor(Math.random() * 300) + 150,
      likes: Math.floor(Math.random() * 800) + 400,
      isLiked: false,
      isFavorited: false,
      category: 'Trending'
    }));

    setFeaturedBooks(mockFeatured);
    setNewArrivals(mockNewArrivals);
    setTrendingBooks(mockTrending);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12 bg-gradient-to-br from-background to-accent/5 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to BookReview
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover amazing books, share your thoughts, and connect with fellow readers
        </p>
      </div>

      {/* Featured Books */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <span>Featured Books</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BookList 
              books={featuredBooks}
              onBookClick={onBookClick}
              onLike={onLike}
              onFavorite={onFavorite}
            />
          </CardContent>
        </Card>
      </section>

      {/* New Arrivals */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Clock className="h-6 w-6 text-green-500" />
              <span>New Arrivals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BookList 
              books={newArrivals}
              onBookClick={onBookClick}
              onLike={onLike}
              onFavorite={onFavorite}
            />
          </CardContent>
        </Card>
      </section>

      {/* Trending This Week */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              <span>Trending This Week</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BookList 
              books={trendingBooks}
              onBookClick={onBookClick}
              onLike={onLike}
              onFavorite={onFavorite}
            />
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-accent/5 rounded-lg">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Join Our Reading Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600">10,000+</div>
              <div className="text-muted-foreground">Books</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-green-600">50,000+</div>
              <div className="text-muted-foreground">Reviews</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-purple-600">25,000+</div>
              <div className="text-muted-foreground">Readers</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};