import { useState, useEffect } from 'react';
import { TrendingUp, Award, Gem } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookList } from './BookList';

export const PopularBooks = ({ onBookClick, onLike, onFavorite }) => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [topRatedBooks, setTopRatedBooks] = useState([]);
  const [hiddenGems, setHiddenGems] = useState([]);

  useEffect(() => {
    // Mock data for popular books
    const mockTrending = Array.from({ length: 8 }, (_, i) => ({
      id: `trending-${i + 1}`,
      title: `Trending Book ${i + 1}`,
      author: `Author ${i + 1}`,
      coverImage: `https://images.pexels.com/photos/15959893/pexels-photo-15959893.jpeg?auto=compress&cs=tinysrgb&w=300&h=400`,
      description: 'A captivating story that has taken the reading world by storm...',
      rating: 4.5 + Math.random() * 0.5,
      reviewCount: Math.floor(Math.random() * 500) + 200,
      likes: Math.floor(Math.random() * 1000) + 500,
      isLiked: false,
      isFavorited: false,
      category: 'Fiction',
      isNew: i < 2
    }));

    const mockTopRated = Array.from({ length: 8 }, (_, i) => ({
      id: `top-${i + 1}`,
      title: `Top Rated ${i + 1}`,
      author: `Acclaimed Author ${i + 1}`,
      coverImage: `https://images.pexels.com/photos/1666012/pexels-photo-1666012.jpeg?auto=compress&cs=tinysrgb&w=300&h=400`,
      description: 'An exceptional work that critics and readers alike have praised...',
      rating: 4.7 + Math.random() * 0.3,
      reviewCount: Math.floor(Math.random() * 300) + 100,
      likes: Math.floor(Math.random() * 800) + 300,
      isLiked: false,
      isFavorited: false,
      category: 'Literary Fiction'
    }));

    const mockHiddenGems = Array.from({ length: 8 }, (_, i) => ({
      id: `gem-${i + 1}`,
      title: `Hidden Gem ${i + 1}`,
      author: `Emerging Author ${i + 1}`,
      coverImage: `https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=300&h=400`,
      description: 'A remarkable discovery that deserves more recognition...',
      rating: 4.6 + Math.random() * 0.4,
      reviewCount: Math.floor(Math.random() * 50) + 10,
      likes: Math.floor(Math.random() * 100) + 20,
      isLiked: false,
      isFavorited: false,
      category: 'Indie'
    }));

    setTrendingBooks(mockTrending);
    setTopRatedBooks(mockTopRated);
    setHiddenGems(mockHiddenGems);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Popular Books</h1>
        <p className="text-muted-foreground">
          Discover what everyone's reading and loving
        </p>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trending" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </TabsTrigger>
          <TabsTrigger value="top-rated" className="flex items-center space-x-2">
            <Award className="h-4 w-4" />
            <span>Top Rated</span>
          </TabsTrigger>
          <TabsTrigger value="hidden-gems" className="flex items-center space-x-2">
            <Gem className="h-4 w-4" />
            <span>Hidden Gems</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
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
        </TabsContent>

        <TabsContent value="top-rated" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>Highest Rated Books</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BookList 
                books={topRatedBooks} 
                onBookClick={onBookClick}
                onLike={onLike}
                onFavorite={onFavorite}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hidden-gems" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gem className="h-5 w-5 text-purple-500" />
                <span>Hidden Gems</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BookList 
                books={hiddenGems} 
                onBookClick={onBookClick}
                onLike={onLike}
                onFavorite={onFavorite}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};