import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Path to subscribers JSON file
const subscribersPath = path.join(__dirname, 'data', 'subscribers.json');

// Initialize subscribers file if it doesn't exist
async function initSubscribersFile() {
  try {
    await fs.access(subscribersPath);
  } catch {
    await fs.mkdir(path.dirname(subscribersPath), { recursive: true });
    await fs.writeFile(subscribersPath, JSON.stringify({ subscribers: [] }));
  }
}

// Get subscribers list
app.get('/api/subscribers', async (req, res) => {
  try {
    const data = await fs.readFile(subscribersPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Failed to get subscribers' });
  }
});

// Add new subscriber
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const data = JSON.parse(await fs.readFile(subscribersPath, 'utf8'));
    
    // Check if email already exists
    if (data.subscribers.some(sub => sub.email === email)) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }

    // Add new subscriber with selected status
    data.subscribers.push({ 
      email, 
      selected: true,
      dateAdded: new Date().toISOString()
    });
    
    await fs.writeFile(subscribersPath, JSON.stringify(data, null, 2));
    res.json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// Update subscriber selected status
app.put('/api/subscribers/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { selected } = req.body;

    const data = JSON.parse(await fs.readFile(subscribersPath, 'utf8'));
    const subscriber = data.subscribers.find(sub => sub.email === email);
    
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    subscriber.selected = selected;
    await fs.writeFile(subscribersPath, JSON.stringify(data, null, 2));
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subscriber' });
  }
});

// Remove subscriber
app.delete('/api/subscribers/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const data = JSON.parse(await fs.readFile(subscribersPath, 'utf8'));
    
    data.subscribers = data.subscribers.filter(sub => sub.email !== email);
    await fs.writeFile(subscribersPath, JSON.stringify(data, null, 2));
    res.json({ message: 'Removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove subscriber' });
  }
});

// Send newsletter
app.post('/api/send-newsletter', async (req, res) => {
  try {
    const { subject, content } = req.body;
    const data = JSON.parse(await fs.readFile(subscribersPath, 'utf8'));
    const selectedSubscribers = data.subscribers.filter(sub => sub.selected);

    if (selectedSubscribers.length === 0) {
      return res.status(400).json({ error: 'No subscribers selected' });
    }

    // Configure nodemailer (replace with your email service details)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Send emails
    const emailPromises = selectedSubscribers.map(subscriber => {
      return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject,
        html: content
      });
    });

    await Promise.all(emailPromises);
    res.json({ message: 'Newsletter sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send newsletter' });
  }
});

// Initialize subscribers file and start server
initSubscribersFile().then(() => {
  app.listen(port, () => {
    console.log(`Newsletter server running on port ${port}`);
  });
});
