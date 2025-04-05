import { useState, useEffect } from 'react';

interface Subscriber {
  email: string;
  selected: boolean;
  dateAdded: string;
}

// Admin panel for managing newsletter subscribers
const NewsletterManager = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load subscribers
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/subscribers');
      const data = await response.json();
      setSubscribers(data.subscribers || []);
    } catch {
      setMessage('Failed to load subscribers');
    }
  };

  // Toggle subscriber selection
  const toggleSubscriber = async (email: string) => {
    try {
      const subscriber = subscribers.find(s => s.email === email);
      if (!subscriber) return;

      const response = await fetch(`http://localhost:3001/api/subscribers/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selected: !subscriber.selected })
      });

      if (response.ok) {
        setSubscribers(subscribers.map(s => 
          s.email === email ? { ...s, selected: !s.selected } : s
        ));
      }
    } catch {
      setMessage('Failed to update subscriber');
    }
  };

  // Remove subscriber
  const removeSubscriber = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/subscribers/${email}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setSubscribers(subscribers.filter(s => s.email !== email));
        setMessage('Subscriber removed');
      }
    } catch {
      setMessage('Failed to remove subscriber');
    }
  };

  // Send newsletter
  const sendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) {
      setMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content })
      });

      const data = await response.json();
      setMessage(data.message || data.error);
      
      if (response.ok) {
        setSubject('');
        setContent('');
      }
    } catch {
      setMessage('Failed to send newsletter');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Newsletter Manager</h2>
      
      {/* Subscriber List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Subscribers</h3>
        <div className="space-y-2">
          {subscribers.map(subscriber => (
            <div key={subscriber.email} className="flex items-center justify-between p-2 border-b dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={subscriber.selected}
                  onChange={() => toggleSubscriber(subscriber.email)}
                  className="h-4 w-4 text-blue-500"
                />
                <span className="dark:text-white">{subscriber.email}</span>
              </div>
              <button
                onClick={() => removeSubscriber(subscriber.email)}
                className="text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          {subscribers.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No subscribers yet</p>
          )}
        </div>
      </div>

      {/* Newsletter Composer */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Send Newsletter</h3>
        <form onSubmit={sendNewsletter} className="space-y-4">
          <div>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Newsletter content (HTML supported)"
              rows={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Sending...' : 'Send Newsletter'}
          </button>
        </form>
      </div>

      {/* Status Messages */}
      {message && (
        <div className={`p-4 rounded-lg ${message.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default NewsletterManager;
