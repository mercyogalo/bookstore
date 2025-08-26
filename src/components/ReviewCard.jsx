import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Star, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '../context/AuthContext';
import { LikeButton } from './LikeButton';

export const ReviewCard = ({ review, onEdit, onDelete, onLike }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(review.content);
  const [editedRating, setEditedRating] = useState(review.rating);
  const { user } = useAuth();

  const isOwner = user && user.id === review.userId;
  const isPinned = review.isPinned;

  const handleSave = () => {
    onEdit(review.id, { content: editedContent, rating: editedRating });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(review.content);
    setEditedRating(review.rating);
    setIsEditing(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  const renderEditableStars = (rating, onRatingChange) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        onClick={() => onRatingChange(i + 1)}
        className="focus:outline-none"
      >
        <Star
          className={`h-4 w-4 transition-colors ${
            i < rating ? 'fill-yellow-400 text-yellow-400 hover:fill-yellow-300' : 'text-muted-foreground hover:text-yellow-300'
          }`}
        />
      </button>
    ));
  };

  return (
    <Card className={`transition-all duration-200 ${isPinned ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.userAvatar} alt={review.userName} />
              <AvatarFallback>{review.userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-sm">{review.userName}</h4>
                {isPinned && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    Pinned
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{review.createdAt}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <div className="flex items-center space-x-1">
                {renderEditableStars(editedRating, setEditedRating)}
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>
            )}
            
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDelete(review.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="min-h-[80px] resize-none"
              placeholder="Write your review..."
            />
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed">{review.content}</p>
            <div className="flex items-center justify-between">
              <LikeButton
                initialLikes={review.likes}
                isLiked={review.isLiked}
                onLike={(liked) => onLike && onLike(review.id, liked)}
              />
              {review.isEdited && (
                <span className="text-xs text-muted-foreground">Edited</span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};