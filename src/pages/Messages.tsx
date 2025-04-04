import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, User, Home, Search, Filter, CheckCircle2 } from 'lucide-react';
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
    markAsRead: 'Mark as Read'
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
          markAsRead: await translateText('Mark as Read', language)
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
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <MessageCircle className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-light text-gray-900 dark:text-white">{translatedContent.messages}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{translatedContent.markAllRead}</span>
            </button>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Home className="w-4 h-4" />
              <span>{translatedContent.dashboard}</span>
            </Link>
          </div>
        </div>

        {!isAuthenticated ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <MessageCircle className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {translatedContent.pleaseLogin}
            </p>
            <Link 
              to="/" 
              className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {translatedContent.goToHome}
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            {/* Search and filter bar */}
            <div className="p-4 border-b dark:border-gray-700 flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={translatedContent.searchMessages}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="text-gray-500 dark:text-gray-400 w-4 h-4" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                >
                  <option value="all">{translatedContent.allMessages}</option>
                  <option value="unread">{translatedContent.unreadOnly}</option>
                </select>
              </div>
            </div>
            
            {/* Messages container */}
            <div className="h-[500px] overflow-y-auto p-6">
              {filteredMessages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm ? translatedContent.noMessagesMatch : translatedContent.noMessages}
                  </p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex items-start gap-4 mb-6 ${
                      msg.sender === 'You' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className={`max-w-[70%] ${
                      msg.sender === 'You' 
                        ? 'bg-blue-500 text-white rounded-tl-xl rounded-bl-xl rounded-br-xl' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-tr-xl rounded-bl-xl rounded-br-xl'
                    } p-4 relative`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">
                          {msg.sender}
                        </span>
                        {!msg.read && msg.sender !== 'You' && (
                          <span className="bg-blue-500 w-2 h-2 rounded-full absolute top-2 right-2"></span>
                        )}
                      </div>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      <span className="text-xs mt-2 block opacity-60">
                        {msg.timestamp.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message input */}
            <div className="border-t dark:border-gray-700 p-4 flex items-center gap-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={translatedContent.typeYourMessage}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg resize-none min-h-[80px]"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 self-end"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
