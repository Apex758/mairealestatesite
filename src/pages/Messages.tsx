import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User, Home, Search, Filter, CheckCircle2, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserStore } from '../stores/userStore';
import { useGlobal } from '../contexts/GlobalContext';
import { translateText } from '../utils/translateUtils';
import { getTranslation } from '../translations';
import { toast } from 'sonner';

export function Messages() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { language } = useGlobal();
  const { messages, sendMessage, markMessageAsRead } = useUserStore();
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Animation effect for luxury elements
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // WhatsApp number
  const whatsappNumber = '+971522292717';
  
  // Generate WhatsApp link with pre-filled message
  const getWhatsAppLink = () => {
    const text = `Hello MAI Real Estate, I'm interested in learning more about your properties.`;
    return `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(text)}`;
  };
  
  // Translation state
  const [translatedContent, setTranslatedContent] = useState({
    messages: getTranslation('messages', language),
    pleaseLogin: 'Please login to view your messages',
    goToHome: 'Go to Home',
    searchMessages: 'Search messages...',
    allMessages: 'All Messages',
    unreadOnly: 'Unread Only',
    noMessagesMatch: 'No messages match your search',
    noMessages: 'No messages yet',
    typeYourMessage: 'Type your message... (Press Enter to send)',
    markAllRead: 'Mark All Read',
    dashboard: 'Dashboard',
    allMessagesMarkedRead: 'All messages marked as read',
    reply: 'Reply',
    markAsRead: 'Mark as Read',
    contactViaWhatsApp: 'Contact via WhatsApp'
  });
  
  // Update translations when language changes
  useEffect(() => {
    const updateTranslations = async () => {
      if (language === 'en') return;
      
      try {
        const translated = {
          messages: getTranslation('messages', language),
          pleaseLogin: await translateText('Please login to view your messages', language),
          goToHome: await translateText('Go to Home', language),
          searchMessages: await translateText('Search messages...', language),
          allMessages: await translateText('All Messages', language),
          unreadOnly: await translateText('Unread Only', language),
          noMessagesMatch: await translateText('No messages match your search', language),
          noMessages: await translateText('No messages yet', language),
          typeYourMessage: await translateText('Type your message... (Press Enter to send)', language),
          markAllRead: await translateText('Mark All Read', language),
          dashboard: await translateText('Dashboard', language),
          allMessagesMarkedRead: await translateText('All messages marked as read', language),
          reply: await translateText('Reply', language),
          markAsRead: await translateText('Mark as Read', language),
          contactViaWhatsApp: await translateText('Contact via WhatsApp', language)
        };
        
        setTranslatedContent(translated);
      } catch (error) {
        console.error('Error translating content:', error);
      }
    };
    
    updateTranslations();
  }, [language]);
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast.error('Please login to view your messages');
    }
  }, [isAuthenticated, navigate]);
  
  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Mark messages as read when viewed
  useEffect(() => {
    if (isAuthenticated) {
      messages.forEach(msg => {
        if (!msg.read) {
          markMessageAsRead(msg.id);
        }
      });
    }
  }, [isAuthenticated, messages, markMessageAsRead]);
  
  // Filter and search messages
  const filteredMessages = messages
    .filter(msg => filter === 'all' || (filter === 'unread' && !msg.read))
    .filter(msg => 
      msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.sender.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage, true);
      setNewMessage('');
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Mark all messages as read
  const markAllAsRead = () => {
    messages.forEach(msg => {
      if (!msg.read) {
        markMessageAsRead(msg.id);
      }
    });
    toast.success(translatedContent.allMessagesMarkedRead);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-12">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
        
        <div className="max-w-4xl mx-auto px-4">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-12 h-12 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-light tracking-wider">{translatedContent.messages}</h1>
                  <div className="h-px w-24 bg-amber-500/30 mt-1"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{translatedContent.contactViaWhatsApp}</span>
                </a>
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{translatedContent.markAllRead}</span>
                </button>
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition-all"
                >
                  <Home className="w-4 h-4" />
                  <span>{translatedContent.dashboard}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {!isAuthenticated ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
                {translatedContent.pleaseLogin}
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-900/20"
              >
                <Home className="w-5 h-5" />
                {translatedContent.goToHome}
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
              {/* Search and filter bar */}
              <div className="p-6 border-b dark:border-gray-700 flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={translatedContent.searchMessages}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full focus:border-amber-500 focus:ring focus:ring-amber-500/20 transition-all"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="text-amber-500 w-4 h-4" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                    className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-full px-4 py-3 focus:border-amber-500 focus:ring focus:ring-amber-500/20 transition-all"
                  >
                    <option value="all">{translatedContent.allMessages}</option>
                    <option value="unread">{translatedContent.unreadOnly}</option>
                  </select>
                </div>
              </div>
            
              {/* Messages container */}
              <div className="h-[500px] overflow-y-auto p-6">
                {filteredMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-12 h-12 text-amber-500/30 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      {searchTerm ? translatedContent.noMessagesMatch : translatedContent.noMessages}
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((msg, index) => (
                    <div 
                      key={msg.id} 
                      className={`flex items-start gap-4 mb-8 ${
                        msg.sender === 'You' ? 'flex-row-reverse' : ''
                      } transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <div className={`w-12 h-12 rounded-full ${msg.sender === 'You' ? 'bg-gradient-to-br from-amber-400 to-amber-600' : 'bg-gray-200 dark:bg-gray-700'} flex items-center justify-center flex-shrink-0 shadow-md`}>
                        <User className={`w-6 h-6 ${msg.sender === 'You' ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                      </div>
                      <div className={`max-w-[70%] ${
                        msg.sender === 'You' 
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-tl-2xl rounded-bl-2xl rounded-br-2xl shadow-lg shadow-amber-900/10' 
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-tr-2xl rounded-bl-2xl rounded-br-2xl shadow-md border border-gray-100 dark:border-gray-600'
                      } p-5 relative`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">
                            {msg.sender}
                          </span>
                          {!msg.read && msg.sender !== 'You' && (
                            <span className="bg-amber-500 w-3 h-3 rounded-full absolute top-3 right-3 animate-pulse"></span>
                          )}
                        </div>
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        <span className="text-xs mt-3 block opacity-60">
                          {msg.timestamp.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            
              {/* Message input */}
              <div className="border-t dark:border-gray-700 p-6 flex items-center gap-4">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={translatedContent.typeYourMessage}
                  className="flex-1 px-5 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl resize-none min-h-[100px] focus:border-amber-500 focus:ring focus:ring-amber-500/20 transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all self-end shadow-lg shadow-amber-900/20 group"
                >
                  <Send className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
