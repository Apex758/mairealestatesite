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
  dateAdded?: Date; // When the property was added to favorites
}

// Message interface
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  read: boolean;
  category?: 'support' | 'agent' | 'system'; // Message category
}

// User store state interface
interface UserState {
  favorites: FavoriteProperty[];
  messages: Message[];
  addToFavorites: (property: FavoriteProperty) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  sendMessage: (content: string, isFromUser: boolean, category?: 'support' | 'agent' | 'system') => void;
  markMessageAsRead: (messageId: string) => void;
  markAllMessagesAsRead: () => void;
  getUnreadMessageCount: () => number;
  clearAllMessages: () => void;
  compareProperties: (propertyIds: string[]) => FavoriteProperty[];
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
          read: false,
          category: 'system'
        }
      ],
      
      // Add a property to favorites
      addToFavorites: (property: FavoriteProperty) => {
        const { favorites } = get();
        // Check if property already exists in favorites
        if (!favorites.some(fav => fav.id === property.id)) {
          // Add dateAdded property
          const propertyWithDate = {
            ...property,
            dateAdded: new Date()
          };
          set({ favorites: [...favorites, propertyWithDate] });
          
          // Send a system message about the new favorite
          setTimeout(() => {
            get().sendMessage(
              `You've added "${property.name}" to your favorites. Our agents will notify you of any price changes or special offers for this property.`,
              false,
              'system'
            );
          }, 1000);
        }
      },
      
      // Remove a property from favorites
      removeFromFavorites: (propertyId: string) => {
        const { favorites } = get();
        const property = favorites.find(fav => fav.id === propertyId);
        set({ favorites: favorites.filter(fav => fav.id !== propertyId) });
        
        // Send a system message about removing the favorite
        if (property) {
          setTimeout(() => {
            get().sendMessage(
              `You've removed "${property.name}" from your favorites.`,
              false,
              'system'
            );
          }, 500);
        }
      },
      
      // Check if a property is in favorites
      isFavorite: (propertyId: string) => {
        const { favorites } = get();
        return favorites.some(fav => fav.id === propertyId);
      },
      
      // Send a new message
      sendMessage: (content: string, isFromUser: boolean, category = isFromUser ? undefined : 'support') => {
        const { messages } = get();
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          sender: isFromUser ? 'You' : 'MAI Real Estate Support',
          content,
          timestamp: new Date(),
          read: isFromUser, // User's messages are automatically read
          category: isFromUser ? undefined : category
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
      
      // Mark all messages as read
      markAllMessagesAsRead: () => {
        const { messages } = get();
        set({
          messages: messages.map(msg => ({ ...msg, read: true }))
        });
      },
      
      // Get count of unread messages
      getUnreadMessageCount: () => {
        const { messages } = get();
        return messages.filter(msg => !msg.read).length;
      },
      
      // Clear all messages
      clearAllMessages: () => {
        set({
          messages: [
            {
              id: `msg-${Date.now()}`,
              sender: 'MAI Real Estate Support',
              content: 'All messages have been cleared. How can we help you today?',
              timestamp: new Date(),
              read: false,
              category: 'system'
            }
          ]
        });
      },
      
      // Compare properties
      compareProperties: (propertyIds: string[]) => {
        const { favorites } = get();
        return favorites.filter(property => propertyIds.includes(property.id));
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
          state.messages = state.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp as unknown as string)
          }));
        }
      }
    }
  )
);

// Helper function to generate automatic responses
function getAutomaticResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  
  // Property price inquiries
  if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
    return "Our properties range from 500,000 AED to 10,000,000 AED depending on location, size, and amenities. We can provide detailed pricing information for any specific property you're interested in. Would you like to schedule a consultation with our pricing specialist?";
  }
  
  // Location inquiries
  if (message.includes('location') || message.includes('area') || message.includes('where')) {
    return "We have properties across Dubai including Dubai Marina, Palm Jumeirah, Downtown Dubai, and Business Bay. Each area offers unique advantages in terms of lifestyle, investment potential, and amenities. I'd be happy to provide more details about any specific area you're interested in.";
  }
  
  // Viewing inquiries
  if (message.includes('visit') || message.includes('tour') || message.includes('see')) {
    return "We'd be happy to arrange a viewing! Our agents are available 7 days a week for both in-person and virtual tours. Please provide your preferred date and time, and we'll confirm your appointment. Would you prefer a private tour or are you interested in our weekly open house events?";
  }
  
  // Payment and financing inquiries
  if (message.includes('payment') || message.includes('mortgage') || message.includes('loan') || message.includes('finance')) {
    return "We offer flexible payment plans and can assist with mortgage arrangements through our partner banks. Typical down payments start at 20%, with financing options up to 25 years. Our financial advisors can provide personalized options based on your requirements and help you secure the best interest rates available.";
  }
  
  // Investment inquiries
  if (message.includes('invest') || message.includes('return') || message.includes('roi')) {
    return "Dubai real estate offers excellent investment opportunities with average ROI between 5-8% annually. Rental yields typically range from 6-10% depending on the area and property type. We can provide detailed investment analysis for any property you're interested in, including projected capital appreciation and rental income.";
  }
  
  // Property features inquiries
  if (message.includes('feature') || message.includes('amenities') || message.includes('facilities')) {
    return "Our properties come with a range of premium amenities including swimming pools, fitness centers, 24/7 security, smart home technology, and concierge services. Many of our luxury developments also offer private beach access, spa facilities, and children's play areas. Is there a specific feature you're looking for?";
  }
  
  // Gratitude
  if (message.includes('thank')) {
    return "You're welcome! We're here to make your property journey as smooth as possible. Feel free to reach out if you have any other questions or if there's anything else we can assist you with.";
  }
  
  // Default response
  return "Thank you for your message. I'll make sure one of our specialist agents gets back to you shortly with the information you need. In the meantime, feel free to browse our featured properties or use our advanced search to find properties that match your specific requirements.";
}
