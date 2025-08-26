import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Popular } from './pages/Popular';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';
import { BookPage } from './pages/BookPage';
import { LoginSignup } from './pages/LoginSignup';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedBook(null);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setCurrentPage('book');
  };

  const handleLike = (bookId, isLiked) => {
    console.log(`Book ${bookId} ${isLiked ? 'liked' : 'unliked'}`);
  };

  const handleFavorite = (bookId, isFavorited) => {
    console.log(`Book ${bookId} ${isFavorited ? 'favorited' : 'unfavorited'}`);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onBookClick={handleBookClick}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        );
      case 'popular':
        return (
          <Popular 
            onBookClick={handleBookClick}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        );
      case 'favorites':
        return (
          <Favorites 
            onBookClick={handleBookClick}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        );
      case 'profile':
        return <Profile />;
      case 'book':
        return <BookPage book={selectedBook} onBack={() => setCurrentPage('home')} />;
      case 'auth':
        return <LoginSignup onClose={() => setCurrentPage('home')} />;
      default:
        return (
          <Home 
            onBookClick={handleBookClick}
            onLike={handleLike}
            onFavorite={handleFavorite}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          {currentPage !== 'auth' && (
            <Navbar 
              currentPage={currentPage} 
              onPageChange={handlePageChange} 
            />
          )}
          <main className={currentPage !== 'auth' ? 'container mx-auto px-4 py-8' : ''}>
            {renderCurrentPage()}
          </main>
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;