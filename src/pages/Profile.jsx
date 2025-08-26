import { useState } from 'react';
import { ProfileCard } from '../components/ProfileCard';
import { AuthorDashboard } from '../components/AuthorDashboard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../context/AuthContext';

export const Profile = () => {
  const { user } = useAuth();
  const [isAuthor, setIsAuthor] = useState(user?.isAuthor || false);

  const handleUpdateProfile = (updatedData) => {
    // Update profile logic here
    console.log('Profile updated:', updatedData);
  };

  const handleUploadBook = (bookData) => {
    // Upload book logic here
    console.log('Book uploaded:', bookData);
  };

  const handleBecomeAuthor = () => {
    setIsAuthor(true);
    // Update user status to author
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
        <Button>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isAuthor ? (
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="author">Author Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileCard user={user} onUpdateProfile={handleUpdateProfile} />
          </TabsContent>

          <TabsContent value="author">
            <AuthorDashboard onUploadBook={handleUploadBook} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <ProfileCard user={user} onUpdateProfile={handleUpdateProfile} />
          
          {/* Become Author CTA */}
          <div className="text-center py-8 bg-accent/5 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Share Your Stories</h3>
            <p className="text-muted-foreground mb-4">
              Become an author and share your books with thousands of readers
            </p>
            <Button onClick={handleBecomeAuthor}>
              Become an Author
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};