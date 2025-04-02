import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Favorite property interface
export interface FavoriteProperty {
  id: string;
  name: string;
  image: string;
  address: string;
  price: number;
  currency: string;
  beds: number;
  baths: number;
  sqft: number;
}

// Message interface
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

// User store state interface
interface UserState {
  favorites: FavoriteProperty[];
  messages: Message[];
  addToFavorites: (property: FavoriteProperty) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  sendMessage: (content: string, isFromUser: boolean) => void;
  markMessageAsRead: (messageId: string) => void;
  getUnreadMessageCount: () => number;
}

// Create the user store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      favorites: [], // Start with empty favorites list
      messages: [
        // Initial welcome message
        {
          id: '1',
          sender: 'MAI Real Estate Support',
          content: 'Welcome to MAI Real Estate! How can we help you today?',
          timestamp: new Date(),
          read: false
        }
      ],
      
      // Add a property to favorites
      addToFavorites: (property: FavoriteProperty) => {
        const { favorites } = get();
        // Check if property already exists in favorites
        if (!favorites.some(fav => fav.id === property.id)) {
          set({ favorites: [...favorites, property] });
        }
      },
      
      // Remove a property from favorites
      removeFromFavorites: (propertyId: string) => {
        const { favorites } = get();
        set({ favorites: favorites.filter(fav => fav.id !== propertyId) });
      },
      
      // Check if a property is in favorites
      isFavorite: (propertyId: string) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === propertyId);
      },
      
      // Send a new message
      sendMessage: (content: string, isFromUser: boolean) => {
        const { messages } = get();
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          sender: isFromUser ? 'You' : 'MAI Real Estate Support',
          content,
          timestamp: new Date(),
          read: isFromUser // User's messages are automatically read
        };
        set({ messages: [...messages, newMessage] });
        
        // If it's a user message, simulate a response after a delay
        if (isFromUser) {
          setTimeout(() => {
            const responseContent = getAutomaticResponse(content);
            get().sendMessage(responseContent, false);
          }, 1000);
        }
      },
      
      // Mark a message as read
      markMessageAsRead: (messageId: string) => {
        const { messages } = get();
        set({
          messages: messages.map(msg => 
            msg.id === messageId ? { ...msg, read: true } : msg
          )
        });
      },
      
      // Get count of unread messages
      getUnreadMessageCount: () => {
        const { messages } = get();
        return messages.filter(msg => !msg.read).length;
      }
    }),
    {
      name: 'mai-user-storage', // Name for localStorage
      partialize: (state) => ({ 
        favorites: state.favorites,
        messages: state.messages.map(msg => ({
          ...msg,
          timestamp: msg.timestamp.toISOString() // Convert Date to string for storage
        }))
      }),
      onRehydrateStorage: () => (state) => {
        // Convert string timestamps back to Date objects
        if (state && state.messages) {
          // @ts-ignore
          state.messages = state.messages.map(msg => ({
            ...msg,
            // @ts-ignore
            timestamp: new Date(msg.timestamp)
          }));
        }
      }
    }
  )
);

// Helper function to generate automatic responses
function getAutomaticResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  if (message.includes('price') || message.includes('cost')) {
    return "Our properties range from 500,000 AED to 10,000,000 AED depending on location, size, and amenities. Is there a specific property you're interested in?";
  }
  
  if (message.includes('location') || message.includes('area') || message.includes('where')) {
    return "We have properties across Dubai including Dubai Marina, Palm Jumeirah, Downtown Dubai, and Business Bay. Which area are you most interested in?";
  }
  
  if (message.includes('visit') || message.includes('tour') || message.includes('see')) {
    return "We'd be happy to arrange a viewing! Please provide your preferred date and time, and our agent will confirm your appointment.";
  }
  
  if (message.includes('payment') || message.includes('mortgage') || message.includes('loan')) {
    return "We offer flexible payment plans and can assist with mortgage arrangements. Our financial advisors can provide personalized options based on your requirements.";
  }
  
  if (message.includes('thank')) {
    return "You're welcome! Feel free to reach out if you have any other questions.";
  }
  
  // Default response
  return "Thank you for your message. One of our agents will get back to you shortly. Is there anything specific you'd like to know about our properties?";
}
