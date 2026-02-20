// // // // server.js
// // const express = require('express');
// // const multer = require('multer');
// // const cors = require('cors');
// // const fs = require('fs');
// // const path = require('path');
// 
// // const app = express();
// // const PORT = 3001;
// 
// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// 
// 
// 
// // // File upload configuration
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const uploadDir = './uploads';
// //     if (!fs.existsSync(uploadDir)) {
// //       fs.mkdirSync(uploadDir);
// //     }
// //     cb(null, uploadDir);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + '-' + file.originalname);
// //   }
// // });
// 
// // const upload = multer({ 
// //   storage,
// //   fileFilter: (req, file, cb) => {
// //     const allowedTypes = /jpeg|jpg|png|pdf|csv|xlsx|webm|mp3|wav|m4a/;
// //     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// //     const mimetype = allowedTypes.test(file.mimetype);
    // 
// //     if (mimetype && extname) {
// //       return cb(null, true);
// //     }
// //     cb(new Error('Invalid file type'));
// //   }
// // });
// 
// // // OpenRouter API key
// // const OPENROUTER_API_KEY = "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";
// 
// // // Categorize text with AI
// // async function categorizeWithAI(text) {
// //   try {
// //     const prompt = `
// // You are a financial categorization AI. 
// // Categories: Food, Transport, Utility Bills, Shopping, Entertainment, Others
// 
// // Rules:
// // - Food → food, grocery, restaurant, drinks, meals
// // - Transport → taxi, auto, bus, fuel, rickshaw, metro
// // - Utility Bills → electricity, water, wifi, mobile recharge
// // - Shopping → clothes, electronics, amazon, flipkart
// // - Entertainment → movies, netflix, games, concerts
// // - Others → everything else
// 
// // Text: "${text}"
// 
// // Return ONLY valid JSON:
// // {"amount": number, "category": "Food | Transport | Utility Bills | Shopping | Entertainment | Others", "description": "brief description"}
// // `;
// 
// //     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
// //         'HTTP-Referer': 'http://localhost:3001',
// //         'X-Title': 'AI Expense Tracker Backend'
// //       },
// //       body: JSON.stringify({
// //         model: 'openai/gpt-4o-mini',
// //         messages: [{ role: 'user', content: prompt }]
// //       })
// //     });
// 
// //     const data = await response.json();
// //     const aiText = data.choices[0].message.content;
// //     const match = aiText.match(/\{[\s\S]*?\}/);
    // 
// //     if (!match) throw new Error('No JSON found');
// //     return JSON.parse(match[0]);
// 
// //   } catch (error) {
// //     console.error('AI categorization failed:', error);
// //     return manualCategorize(text);
// //   }
// // }
// 
// // // Fallback manual categorization
// // function manualCategorize(text) {
// //   const lower = text.toLowerCase();
// //   const amountMatch = text.match(/(\d+)/);
// //   const amount = amountMatch ? Number(amountMatch[1]) : 0;
// 
// //   let category = 'Others';
// 
// //   if (lower.match(/electric|water|gas|internet|wifi|bill|recharge|mobile/)) {
// //     category = 'Utility Bills';
// //   } else if (lower.match(/food|restaurant|grocery|meal|breakfast|lunch|dinner/)) {
// //     category = 'Food';
// //   } else if (lower.match(/shop|cloth|amazon|flipkart|buy|purchase/)) {
// //     category = 'Shopping';
// //   } else if (lower.match(/taxi|auto|metro|bus|fuel|petrol|diesel/)) {
// //     category = 'Transport';
// //   } else if (lower.match(/movie|netflix|game|entertainment/)) {
// //     category = 'Entertainment';
// //   }
// 
// //   return { amount, category, description: text };
// // }
// 
// // // **ENDPOINT 1: Text-based expense categorization**
// // app.post('/api/categorize', async (req, res) => {
// //   try {
// //     const { text } = req.body;
    // 
// //     if (!text || !text.trim()) {
// //       return res.status(400).json({ error: 'Text is required' });
// //     }
// 
// //     const result = await categorizeWithAI(text);
// //     res.json(result);
// 
// //   } catch (error) {
// //     console.error('Categorization error:', error);
// //     res.status(500).json({ error: 'Failed to categorize expense' });
// //   }
// // });
// 
// // // **ENDPOINT 2: Audio transcription & analysis (streaming)**
// // app.post('/api/analyze-audio', upload.single('audio'), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: 'Audio file required' });
// //     }
// 
// //     const audioPath = req.file.path;
    // 
// //     // Convert audio to base64
// //     const audioBuffer = fs.readFileSync(audioPath);
// //     const base64Audio = audioBuffer.toString('base64');
// 
// //     // Transcribe with OpenRouter (using Whisper)
// //     const transcriptionResponse = await fetch('https://openrouter.ai/api/v1/audio/transcriptions', {
// //       method: 'POST',
// //       headers: {
// //         'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
// //         'HTTP-Referer': 'http://localhost:3001'
// //       },
// //       body: JSON.stringify({
// //         model: 'openai/whisper-1',
// //         file: base64Audio
// //       })
// //     });
// 
// //     const transcription = await transcriptionResponse.json();
// //     const text = transcription.text;
// 
// //     // Categorize transcribed text
// //     const expense = await categorizeWithAI(text);
// 
// //     // Cleanup
// //     fs.unlinkSync(audioPath);
// 
// //     res.json({
// //       transcription: text,
// //       expense
// //     });
// 
// //   } catch (error) {
// //     console.error('Audio analysis error:', error);
// //     res.status(500).json({ error: 'Failed to analyze audio' });
// //   }
// // });
// 
// // // **ENDPOINT 3: File upload & expense extraction (CSV, PDF, Images)**
// // app.post('/api/analyze-file', upload.single('file'), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: 'File required' });
// //     }
// 
// //     const filePath = req.file.path;
// //     const fileExt = path.extname(req.file.originalname).toLowerCase();
// 
// //     let extractedExpenses = [];
// 
// //     // Handle CSV files
// //     if (fileExt === '.csv') {
// //       const csvContent = fs.readFileSync(filePath, 'utf8');
// //       const lines = csvContent.split('\n').filter(l => l.trim());
      // 
// //       for (let i = 1; i < lines.length; i++) {
// //         const result = await categorizeWithAI(lines[i]);
// //         if (result.amount > 0) {
// //           extractedExpenses.push(result);
// //         }
// //       }
// //     }
// //     // Handle images (receipt OCR simulation)
// //     else if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
// //       const fileBuffer = fs.readFileSync(filePath);
// //       const base64Image = fileBuffer.toString('base64');
// 
// //       const ocrPrompt = `Analyze this receipt image and extract expenses.
// // Return JSON array: [{"amount": number, "category": "Food|Transport|etc", "description": "item"}]`;
// 
// //       const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${OPENROUTER_API_KEY}`
// //         },
// //         body: JSON.stringify({
// //           model: 'openai/gpt-4o-mini',
// //           messages: [{
// //             role: 'user',
// //             content: [
// //               { type: 'text', text: ocrPrompt },
// //               { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` }}
// //             ]
// //           }]
// //         })
// //       });
// 
// //       const data = await response.json();
// //       const match = data.choices[0].message.content.match(/\[[\s\S]*?\]/);
// //       if (match) {
// //         extractedExpenses = JSON.parse(match[0]);
// //       }
// //     }
// 
// //     // Cleanup
// //     fs.unlinkSync(filePath);
// 
// //     res.json({
// //       success: true,
// //       expenses: extractedExpenses,
// //       count: extractedExpenses.length
// //     });
// 
// //   } catch (error) {
// //     console.error('File analysis error:', error);
// //     res.status(500).json({ error: 'Failed to analyze file' });
// //   }
// // });
// 
// // // **ENDPOINT 4: Get expense summary**
// // app.get('/api/expenses/summary', (req, res) => {
// //   // This would typically fetch from a database
// //   res.json({
// //     message: 'Summary endpoint - connect to database for persistence'
// //   });
// // });
// 
// // // Health check
// // app.get('/health', (req, res) => {
// //   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// // });
// 
// // app.listen(PORT, () => {
// //   console.log(`🚀 Backend server running on http://localhost:${PORT}`);
// //   console.log('📊 Endpoints:');
// //   console.log('  POST /api/categorize - Text categorization');
// //   console.log('  POST /api/analyze-audio - Audio recording analysis');
// //   console.log('  POST /api/analyze-file - File upload & extraction');
// // });
// 
// 
// 
// 































// // // second one

// // // server.js - Complete Backend with MongoDB





// // const express = require('express');
// // const multer = require('multer');
// // const cors = require('cors');
// // const mongoose = require('mongoose');
// // const fs = require('fs');
// // const path = require('path');

// // const app = express();
// // const PORT = 3001;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());

// // // MongoDB Connection
// // const MONGODB_URI = "mongodb://localhost:27017/expense_tracker";
// // mongoose.connect(MONGODB_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // }).then(() => {
// //   console.log('MongoDB Connected');
// // }).catch(err => {
// //   console.error('MongoDB Connection Failed:', err);
// // });

// // // Expense Schema
// // const expenseSchema = new mongoose.Schema({
// //   amount: { type: Number, required: true },
// //   category: { 
// //     type: String, 
// //     enum: ['Food', 'Transport', 'Utility Bills', 'Shopping', 'Entertainment', 'Others'],
// //     required: true 
// //   },
// //   description: { type: String, required: true },
// //   date: { type: Date, default: Date.now },
// //   confirmed: { type: Boolean, default: false },
// //   source: { type: String, enum: ['text', 'audio', 'file'], default: 'text' },
// //   userId: { type: String, default: 'default_user' } // For multi-user support
// // }, { timestamps: true });

// // const Expense = mongoose.model('Expense', expenseSchema);

// // // Budget Schema
// // const budgetSchema = new mongoose.Schema({
// //   userId: { type: String, default: 'default_user' },
// //   totalBudget: { type: Number, default: 0 },
// //   categoryBudgets: {
// //     "Food": { type: Number, default: 0 },
// //     "Transport": { type: Number, default: 0 },
// //     "Utility Bills": { type: Number, default: 0 },
// //     "Shopping": { type: Number, default: 0 },
// //     "Entertainment": { type: Number, default: 0 },
// //     "Others": { type: Number, default: 0 }
// //   },
// //   month: { type: String, default: () => new Date().toISOString().slice(0, 7) } // YYYY-MM
// // });

// // const Budget = mongoose.model('Budget', budgetSchema);

// // // File upload configuration
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     const uploadDir = './uploads';
// //     if (!fs.existsSync(uploadDir)) {
// //       fs.mkdirSync(uploadDir);
// //     }
// //     cb(null, uploadDir);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + '-' + file.originalname);
// //   }
// // });

// // const upload = multer({ 
// //   storage,
// //   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
// //   fileFilter: (req, file, cb) => {
// //     const allowedTypes = /jpeg|jpg|png|pdf|csv|xlsx|/;
// //     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
// //     if (extname) {
// //       return cb(null, true);
// //     }
// //     cb(new Error('Invalid file type'));
// //   }
// // });

// // //Updated No - 1

// // // OpenRouter API key
// // const OPENROUTER_API_KEY = "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";

// // // AI Categorization Function
// // async function categorizeWithAI(text) {
// //   try {
// //     const prompt = `You are a financial categorization AI.

// // Categories: Food, Transport, Utility Bills, Shopping, Entertainment, Others

// // Rules:
// // - Food → grocery, restaurant, meals, drinks, sweets
// // - Transport → taxi, auto, bus, fuel, metro, rickshaw
// // - Utility Bills → electricity, water, wifi, mobile recharge, gas
// // - Shopping → clothes, electronics, amazon, flipkart
// // - Entertainment → movies, netflix, games, concerts
// // - Others → everything else

// // Text: "${text}"

// // Return ONLY valid JSON:
// // {"amount": number, "category": "Food|Transport|Utility Bills|Shopping|Entertainment|Others", "description": "brief 5-10 word description"}`;

// //     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
// //         'HTTP-Referer': 'http://localhost:3001',
// //         'X-Title': 'AI Expense Tracker'
// //       },
// //       body: JSON.stringify({
// //         model: 'openai/gpt-4o-mini',
// //         messages: [{ role: 'user', content: prompt }]
// //       })
// //     });

// //     const data = await response.json();
// //     const aiText = data.choices[0].message.content;
// //     const match = aiText.match(/\{[\s\S]*?\}/);
    
// //     if (!match) throw new Error('No JSON found');
// //     return JSON.parse(match[0]);

// //   } catch (error) {
// //     console.error('AI failed:', error);
// //     return manualCategorize(text);
// //   }
// // }

// // // Fallback Manual Categorization
// // function manualCategorize(text) {
// //   const lower = text.toLowerCase();
// //   const amountMatch = text.match(/(\d+)/);
// //   const amount = amountMatch ? Number(amountMatch[1]) : 0;

// //   let category = 'Others';

// //   if (lower.match(/electric|water|gas|internet|wifi|bill|recharge|mobile/)) {
// //     category = 'Utility Bills';
// //   } else if (lower.match(/food|restaurant|grocery|meal|swiggy|zomato/)) {
// //     category = 'Food';
// //   } else if (lower.match(/shop|cloth|amazon|flipkart|buy/)) {
// //     category = 'Shopping';
// //   } else if (lower.match(/taxi|auto|metro|bus|fuel|petrol/)) {
// //     category = 'Transport';
// //   } else if (lower.match(/movie|netflix|game|entertainment/)) {
// //     category = 'Entertainment';
// //   }

// //   return { amount, category, description: text.substring(0, 50) };
// // }

// // // **ENDPOINT 1: Text Categorization (with confirmation)**
// // app.post('/api/categorize', async (req, res) => {
// //   try {
// //     const { text } = req.body;
    
// //     if (!text || !text.trim()) {
// //       return res.status(400).json({ error: 'Text is required' });
// //     }

// //     const result = await categorizeWithAI(text);
    
// //     // Return for user confirmation (not saved yet)
// //     res.json({
// //       success: true,
// //       expense: result,
// //       needsConfirmation: true
// //     });

// //   } catch (error) {
// //     console.error('Categorization error:', error);
// //     res.status(500).json({ error: 'Failed to categorize' });
// //   }
// // });

// // // **ENDPOINT 2: Confirm & Save Expense**
// // app.post('/api/expenses/confirm', async (req, res) => {
// //   try {
// //     const { amount, category, description, source = 'text' } = req.body;

// //     if (!amount || !category) {
// //       return res.status(400).json({ error: 'Amount and category required' });
// //     }

// //     const expense = new Expense({
// //       amount,
// //       category,
// //       description,
// //       source,
// // //    confirmed: true
// //     });

// //     await expense.save();

// //     res.json({
// //       success: true,
// //       expense,
// //       message: 'Expense saved successfully'
// //     });

// //   } catch (error) {
// //     console.error('Save error:', error);
// //     res.status(500).json({ error: 'Failed to save expense' });
// //   }
// // });



// // // **ENDPOINT 3: Audio Analysis (Streaming)**

// // app.post('/api/analyze-audio', upload.single('audio'), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: 'Audio file required' });
// //     }

// //     const audioPath = req.file.path;
// //     const audioBuffer = fs.readFileSync(audioPath);
// //     const base64Audio = audioBuffer.toString('base64');

// //     // Transcribe using OpenAI Whisper
// //     const formData = new FormData();
// //     const audioBlob = new Blob([audioBuffer], { type: 'audio/webm' });
// //     formData.append('file', audioBlob, 'audio.webm');
// //     formData.append('model', 'whisper-1');

// //     // Note: This is a simplified example. Real Whisper API needs proper setup
// //     const transcription = await transcribeAudio(audioPath);
    
// //     // Categorize transcribed text
// //     const expense = await categorizeWithAI(transcription);

// //     // Cleanup
// //     fs.unlinkSync(audioPath);

// //     res.json({
// //       success: true,
// //       transcription,
// //       expense,
// //     //   needsConfirmation: true,
// //       source: 'audio'
// //     });

// //   } catch (error) {
// //     console.error('Audio analysis error:', error);
// //     if (fs.existsSync(req.file?.path)) {
// //       fs.unlinkSync(req.file.path);
// //     }
// //     res.status(500).json({ error: 'Failed to analyze audio' });
// //   }
// // });

// // // Audio Transcription Helper (placeholder - needs real Whisper implementation)
// // async function transcribeAudio(audioPath) {
// //   // This would use actual Whisper API or library
// //   // For now, return mock transcription
// //   return "Paid 500 rupees for groceries";
// // }

// // // **ENDPOINT 4: File Upload & Bulk Extraction**
// // app.post('/api/analyze-file', upload.single('file'), async (req, res) => {
// //   try {
// //     if (!req.file) {
// //       return res.status(400).json({ error: 'File required' });
// //     }

// //     const filePath = req.file.path;
// //     const fileExt = path.extname(req.file.originalname).toLowerCase();

// //     let extractedExpenses = [];

// //     // Handle CSV
// //     if (fileExt === '.csv') {
// //       const csvContent = fs.readFileSync(filePath, 'utf8');
// //       const lines = csvContent.split('\n').filter(l => l.trim());
      
// //       for (let i = 1; i < Math.min(lines.length, 50); i++) {
// //         const result = await categorizeWithAI(lines[i]);
// //         if (result.amount > 0) {
// //           extractedExpenses.push(result);
// //         }
// //       }
// //     }
// //     // Handle Images (Receipt OCR)
// //     else if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
// //       const fileBuffer = fs.readFileSync(filePath);
// //       const base64Image = fileBuffer.toString('base64');

// //       const ocrResult = await analyzeReceiptImage(base64Image);
// //       extractedExpenses = ocrResult;
// //     }

// //     // Cleanup
// //     fs.unlinkSync(filePath);

// //     res.json({
// //       success: true,
// //       expenses: extractedExpenses,
// //       count: extractedExpenses.length,
// //       needsConfirmation: true,
// //       source: 'file'
// //     });

// //   } catch (error) {
// //     console.error('File analysis error:', error);
// //     if (fs.existsSync(req.file?.path)) {
// //       fs.unlinkSync(req.file.path);
// //     }
// //     res.status(500).json({ error: 'Failed to analyze file' });
// //   }
// // });

// // // Receipt OCR Helper
// // async function analyzeReceiptImage(base64Image) {
// //   try {
// //     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${OPENROUTER_API_KEY}`
// //       },
// //       body: JSON.stringify({
// //         model: 'openai/gpt-4o-mini',
// //         messages: [{
// //           role: 'user',
// //           content: [
// //             { 
// //               type: 'text', 
// //               text: 'Extract expenses from this receipt. Return JSON array: [{"amount": number, "category": "Food|Transport|etc", "description": "item name"}]'
// //             },
// //             { 
// //               type: 'image_url', 
// //               image_url: { url: `data:image/jpeg;base64,${base64Image}` }
// //             }
// //           ]
// //         }]
// //       })
// //     });

// //     const data = await response.json();
// //     const match = data.choices[0].message.content.match(/\[[\s\S]*?\]/);
// //     return match ? JSON.parse(match[0]) : [];
// //   } catch (error) {
// //     console.error('OCR failed:', error);
// //     return [];
// //   }
// // }

// // // **ENDPOINT 5: Get Expense History**
// // app.get('/api/expenses/history', async (req, res) => {
// //   try {
// //     const { startDate, endDate, category } = req.query;
    
// //     let query = { confirmed: true };
    
// //     if (startDate || endDate) {
// //       query.date = {};
// //       if (startDate) query.date.$gte = new Date(startDate);
// //       if (endDate) query.date.$lte = new Date(endDate);
// //     }
    
// //     if (category) {
// //       query.category = category;
// //     }

// //     const expenses = await Expense.find(query).sort({ date: -1 });

// //     res.json({
// //       success: true,
// //       expenses,
// //       count: expenses.length
// //     });

// //   } catch (error) {
// //     console.error('History fetch error:', error);
// //     res.status(500).json({ error: 'Failed to fetch history' });
// //   }
// // });

// // // **ENDPOINT 6: Daily Summary**
// // app.get('/api/expenses/daily-summary', async (req, res) => {
// //   try {
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
    
// //     const tomorrow = new Date(today);
// //     tomorrow.setDate(tomorrow.getDate() + 1);

// //     const expenses = await Expense.find({
// //       confirmed: true,
// //       date: { $gte: today, $lt: tomorrow }
// //     });

// //     const summary = {
// //       date: today.toISOString().split('T')[0],
// //       totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0),
// //       count: expenses.length,
// //       byCategory: {}
// //     };

// //     expenses.forEach(e => {
// //       if (!summary.byCategory[e.category]) {
// //         summary.byCategory[e.category] = { amount: 0, count: 0 };
// //       }
// //       summary.byCategory[e.category].amount += e.amount;
// //       summary.byCategory[e.category].count += 1;
// //     });

// //     res.json({ success: true, summary });

// //   } catch (error) {
// //     console.error('Summary error:', error);
// //     res.status(500).json({ error: 'Failed to generate summary' });
// //   }
// // });

// // // **ENDPOINT 7: Update Budget**
// // app.post('/api/budget/update', async (req, res) => {
// //   try {
// //     const { totalBudget, categoryBudgets } = req.body;
    
// //     const month = new Date().toISOString().slice(0, 7);
    
// //     let budget = await Budget.findOne({ userId: 'default_user', month });
    
// //     if (!budget) {
// //       budget = new Budget({ totalBudget, categoryBudgets, month });
// //     } else {
// //       budget.totalBudget = totalBudget;
// //       if (categoryBudgets) {
// //         budget.categoryBudgets = categoryBudgets;
// //       }
// //     }

// //     await budget.save();

// //     res.json({ success: true, budget });

// //   } catch (error) {
// //     console.error('Budget update error:', error);
// //     res.status(500).json({ error: 'Failed to update budget' });
// //   }
// // });

// // // **ENDPOINT 8: Get Current Budget**
// // app.get('/api/budget/current', async (req, res) => {
// //   try {
// //     const month = new Date().toISOString().slice(0, 7);
// //     let budget = await Budget.findOne({ userId: 'default_user', month });
    
// //     if (!budget) {
// //       budget = new Budget({ month });
// //       await budget.save();
// //     }

// //     res.json({ success: true, budget });

// //   } catch (error) {
// //     console.error('Budget fetch error:', error);
// //     res.status(500).json({ error: 'Failed to fetch budget' });
// //   }
// // });

// // // Health Check
// // app.get('/health', (req, res) => {
// //   res.json({ 
// //     status: 'OK', 
// //     mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
// //     timestamp: new Date().toISOString() 
// //   });
// // });

// // // Start Server
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on http://localhost:${PORT}`);
// //   console.log('📊 Endpoints:');
// //   console.log('  POST /api/categorize - AI categorization');
// //   console.log('  POST /api/expenses/confirm - Save expense');
// //   console.log('  POST /api/analyze-audio - Audio analysis');
// //   console.log('  POST /api/analyze-file - File upload');
// //   console.log('  GET  /api/expenses/history - Get history');
// //   console.log('  GET  /api/expenses/daily-summary - Daily summary');
// //   console.log('  POST /api/budget/update - Update budget');
// //   console.log('  GET  /api/budget/current - Get budget');
// // });






















// // updated code with the authorization 



// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const session = require('express-session');
// const jwt = require('jsonwebtoken');

// const app = express();
// const PORT = 3001;

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// // OAuth Configuration
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'your-google-client-id';
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret';
// const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || 'your-facebook-app-id';
// const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || 'your-facebook-app-secret';
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// // Middleware
// app.use(cors({
//   origin: FRONTEND_URL,
//   credentials: true
// }));
// app.use(express.json());
// app.use(session({
//   secret: 'your-session-secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: process.env.NODE_ENV === 'production' }
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// // MongoDB Connection
// const MONGODB_URI = "mongodb://localhost:27017/expense_tracker";
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB Connected');
// }).catch(err => {
//   console.error('MongoDB Connection Failed:', err);
// });

// // User Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   name: { type: String },
//   password: { type: String }, // For email/password auth
//   googleId: { type: String, sparse: true },
//   facebookId: { type: String, sparse: true },
//   profilePicture: { type: String },
//   authProvider: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
//   createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.model('User', userSchema);

// // Expense Schema (updated with userId reference)
// const expenseSchema = new mongoose.Schema({
//   amount: { type: Number, required: true },
//   category: { 
//     type: String, 
//     enum: ['Food', 'Transport', 'Utility Bills', 'Shopping', 'Entertainment', 'Others'],
//     required: true 
//   },
//   description: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   confirmed: { type: Boolean, default: false },
//   source: { type: String, enum: ['text', 'audio', 'file'], default: 'text' },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// }, { timestamps: true });

// const Expense = mongoose.model('Expense', expenseSchema);

// // Budget Schema (updated with userId reference)
// const budgetSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   totalBudget: { type: Number, default: 0 },
//   categoryBudgets: {
//     "Food": { type: Number, default: 0 },
//     "Transport": { type: Number, default: 0 },
//     "Utility Bills": { type: Number, default: 0 },
//     "Shopping": { type: Number, default: 0 },
//     "Entertainment": { type: Number, default: 0 },
//     "Others": { type: Number, default: 0 }
//   },
//   month: { type: String, default: () => new Date().toISOString().slice(0, 7) }
// });

// const Budget = mongoose.model('Budget', budgetSchema);

// // Passport Serialization
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// // Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: `http://localhost:${PORT}/auth/google/callback`
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ googleId: profile.id });
      
//       if (!user) {
//         // Check if user exists with same email
//         user = await User.findOne({ email: profile.emails[0].value });
        
//         if (user) {
//           // Link Google account to existing user
//           user.googleId = profile.id;
//           user.profilePicture = profile.photos[0]?.value;
//           await user.save();
//         } else {
//           // Create new user
//           user = await User.create({
//             googleId: profile.id,
//             email: profile.emails[0].value,
//             name: profile.displayName,
//             profilePicture: profile.photos[0]?.value,
//             authProvider: 'google'
//           });
//         }
//       }
      
//       return done(null, user);
//     } catch (error) {
//       return done(error, null);
//     }
//   }
// ));

// // Facebook Strategy
// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: `http://localhost:${PORT}/auth/facebook/callback`,
//     profileFields: ['id', 'emails', 'name', 'picture.type(large)']
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ facebookId: profile.id });
      
//       if (!user) {
//         const email = profile.emails && profile.emails[0]?.value;
        
//         if (email) {
//           user = await User.findOne({ email });
//         }
        
//         if (user) {
//           // Link Facebook account to existing user
//           user.facebookId = profile.id;
//           user.profilePicture = profile.photos[0]?.value;
//           await user.save();
//         } else {
//           // Create new user
//           user = await User.create({
//             facebookId: profile.id,
//             email: email || `${profile.id}@facebook.com`,
//             name: `${profile.name.givenName} ${profile.name.familyName}`,
//             profilePicture: profile.photos[0]?.value,
//             authProvider: 'facebook'
//           });
//         }
//       }
      
//       return done(null, user);
//     } catch (error) {
//       return done(error, null);
//     }
//   }
// ));

// // Auth Middleware
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'Access token required' });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid or expired token' });
//     }
//     req.user = user;
//     next();
//   });
// };

// // Generate JWT Token
// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, email: user.email },
//     JWT_SECRET,
//     { expiresIn: '7d' }
//   );
// };

// // **AUTH ROUTES**

// // Google Auth
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/callback',
//   passport.authenticate('google', { session: false, failureRedirect: `${FRONTEND_URL}/login` }),
//   (req, res) => {
//     const token = generateToken(req.user);
//     res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
//   }
// );

// // Facebook Auth
// app.get('/auth/facebook',
//   passport.authenticate('facebook', { scope: ['email'] })
// );

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { session: false, failureRedirect: `${FRONTEND_URL}/login` }),
//   (req, res) => {
//     const token = generateToken(req.user);
//     res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
//   }
// );

// // Get Current User
// app.get('/api/auth/me', authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     res.json({ success: true, user });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch user' });
//   }
// });

// // Logout
// app.post('/api/auth/logout', (req, res) => {
//   res.json({ success: true, message: 'Logged out successfully' });
// });

// // File upload configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = './uploads';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|pdf|csv|xlsx/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     if (extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Invalid file type'));
//   }
// });

// // OpenRouter API key
// const OPENROUTER_API_KEY = "sk-or-v1-30b5d7f511745edef9fa0fd89947051fcf266d98bb300081a66047e0";

// // AI Categorization Function
// async function categorizeWithAI(text) {
//   try {
//     const prompt = `You are a financial categorization AI.

// Categories: Food, Transport, Utility Bills, Shopping, Entertainment, Others

// Rules:
// - Food → grocery, restaurant, meals, drinks, sweets
// - Transport → taxi, auto, bus, fuel, metro, rickshaw
// - Utility Bills → electricity, water, wifi, mobile recharge, gas
// - Shopping → clothes, electronics, amazon, flipkart
// - Entertainment → movies, netflix, games, concerts
// - Others → everything else

// Text: "${text}"

// Return ONLY valid JSON:
// {"amount": number, "category": "Food|Transport|Utility Bills|Shopping|Entertainment|Others", "description": "brief 5-10 word description"}`;

//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
//         'HTTP-Referer': 'http://localhost:3001',
//         'X-Title': 'AI Expense Tracker'
//       },
//       body: JSON.stringify({
//         model: 'openai/gpt-4o-mini',
//         messages: [{ role: 'user', content: prompt }]
//       })
//     });

//     const data = await response.json();
//     const aiText = data.choices[0].message.content;
//     const match = aiText.match(/\{.*?\}/);
    
//     if (!match) throw new Error('No JSON found');
//     return JSON.parse(match[0]);

//   } catch (error) {
//     console.error('AI failed:', error);
//     return manualCategorize(text);
//   }
// }

// // Fallback Manual Categorization
// function manualCategorize(text) {
//   const lower = text.toLowerCase();
//   const amountMatch = text.match(/(\d+)/);
//   const amount = amountMatch ? Number(amountMatch[1]) : 0;

//   let category = 'Others';

//   if (lower.match(/electric|water|internet|wifi|bill|recharge|mobile/)) {
//     category = 'Utility Bills';
//   } else if (lower.match(/food|restaurant|grocery|meal|swiggy|zomato/)) {
//     category = 'Food';
//   } else if (lower.match(/shop|clothes|amazon|flipkart|buy/)) {
//     category = 'Shopping';
//   } else if (lower.match(/taxi|auto|metro|bus|fuel|petrol/)) {
//     category = 'Transport';
//   } else if (lower.match(/movie|netflix|game|entertainment/)) {
//     category = 'Entertainment';
//   }

//   return { amount, category, description: text.substring(0, 50) };
// }

// // **PROTECTED ENDPOINTS** (require authentication)

// app.post('/api/categorize', authenticateToken, async (req, res) => {
//   try {
//     const { text } = req.body;
    
//     if (!text || !text.trim()) {
//       return res.status(400).json({ error: 'Text is required' });
//     }

//     const result = await categorizeWithAI(text);
    
//     res.json({
//       success: true,
//       expense: result,
//       needsConfirmation: true
//     });

//   } catch (error) {
//     console.error('Categorization error:', error);
//     res.status(500).json({ error: 'Failed to categorize' });
//   }
// });

// app.post('/api/expenses/confirm', authenticateToken, async (req, res) => {
//   try {
//     const { amount, category, description, source = 'text' } = req.body;

//     if (!amount || !category) {
//       return res.status(400).json({ error: 'Amount and category required' });
//     }

//     const expense = new Expense({
//       amount,
//       category,
//       description,
//       source,
//       userId: req.user.id,
//       confirmed: true
//     });

//     await expense.save();

//     res.json({
//       success: true,
//       expense,
//       message: 'Expense saved successfully'
//     });

//   } catch (error) {
//     console.error('Save error:', error);
//     res.status(500).json({ error: 'Failed to save expense' });
//   }
// });

// app.get('/api/expenses/history', authenticateToken, async (req, res) => {
//   try {
//     const { startDate, endDate, category } = req.query;
    
//     let query = { confirmed: true, userId: req.user.id };
    
//     if (startDate || endDate) {
//       query.date = {};
//       if (startDate) query.date.$gte = new Date(startDate);
//       if (endDate) query.date.$lte = new Date(endDate);
//     }
    
//     if (category) {
//       query.category = category;
//     }

//     const expenses = await Expense.find(query).sort({ date: -1 });

//     res.json({
//       success: true,
//       expenses,
//       count: expenses.length
//     });

//   } catch (error) {
//     console.error('History fetch error:', error);
//     res.status(500).json({ error: 'Failed to fetch history' });
//   }
// });

// app.get('/api/expenses/daily-summary', authenticateToken, async (req, res) => {
//   try {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const tomorrow = new Date(today);
//     tomorrow.setDate(tomorrow.getDate() + 1);

//     const expenses = await Expense.find({
//       confirmed: true,
//       userId: req.user.id,
//       date: { $gte: today, $lt: tomorrow }
//     });

//     const summary = {
//       date: today.toISOString().split('T')[0],
//       totalExpenses: expenses.reduce((sum, e) => sum + e.amount, 0),
//       count: expenses.length,
//       byCategory: {}
//     };

//     expenses.forEach(e => {
//       if (!summary.byCategory[e.category]) {
//         summary.byCategory[e.category] = { amount: 0, count: 0 };
//       }
//       summary.byCategory[e.category].amount += e.amount;
//       summary.byCategory[e.category].count += 1;
//     });

//     res.json({ success: true, summary });

//   } catch (error) {
//     console.error('Summary error:', error);
//     res.status(500).json({ error: 'Failed to generate summary' });
//   }
// });

// app.post('/api/budget/update', authenticateToken, async (req, res) => {
//   try {
//     const { totalBudget, categoryBudgets } = req.body;
    
//     const month = new Date().toISOString().slice(0, 7);
    
//     let budget = await Budget.findOne({ userId: req.user.id, month });
    
//     if (!budget) {
//       budget = new Budget({ 
//         userId: req.user.id,
//         totalBudget, 
//         categoryBudgets, 
//         month 
//       });
//     } else {
//       budget.totalBudget = totalBudget;
//       if (categoryBudgets) {
//         budget.categoryBudgets = categoryBudgets;
//       }
//     }

//     await budget.save();

//     res.json({ success: true, budget });

//   } catch (error) {
//     console.error('Budget update error:', error);
//     res.status(500).json({ error: 'Failed to update budget' });
//   }
// });

// app.get('/api/budget/current', authenticateToken, async (req, res) => {
//   try {
//     const month = new Date().toISOString().slice(0, 7);
//     let budget = await Budget.findOne({ userId: req.user.id, month });
    
//     if (!budget) {
//       budget = new Budget({ userId: req.user.id, month });
//       await budget.save();
//     }

//     res.json({ success: true, budget });

//   } catch (error) {
//     console.error('Budget fetch error:', error);
//     res.status(500).json({ error: 'Failed to fetch budget' });
//   }
// });

// // Health Check
// app.get('/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
//     timestamp: new Date().toISOString()
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log('📊 Auth Endpoints:');
//   console.log('  GET  /auth/google - Google OAuth');
//   console.log('  GET  /auth/facebook - Facebook OAuth');
//   console.log('  GET  /api/auth/me - Get current user');
// });

























// backend works karna hai Authorization ke sath Aur sath hi sath voice fuctional



// server.js - Complete Backend Implementation
// ============================================

// Load environment variables first
// require('dotenv').config();
// 
//Import required packages
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const passport = require('passport');
// // const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const session = require('express-session');
// 
//Initialize Express app
// const app = express();


//ENVIRONMENT VARIABLES USAGE
// 
// const PORT = process.env.PORT || 3000;
// // const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
// // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/expense_tracker';
// const JWT_SECRET = process.env.JWT_SECRET;
// // const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// // const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// // const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 10485760; // 10MB default
// // const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
// // const NODE_ENV = process.env.NODE_ENV || 'development';
// 
//Validate required environment variables
// if (!JWT_SECRET) {
  // // console.error(' FATAL ERROR: JWT_SECRET is not defined in .env file');
  // process.exit(1);
// }
// 
// // if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  // // // console.warn('  WARNING: Google OAuth credentials not found. Google login will not work.');
// }
// 
//============================================
//MIDDLEWARE CONFIGURATION
// 
// 
//CORS Configuration
// app.use(cors({
  // origin: FRONTEND_URL,
  // credentials: true,
  // // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  // // allowedHeaders: ['Content-Type', 'Authorization']
// }));
// 


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// 


//Session configuration (required for Passport)
// app.use(session({
  // secret: JWT_SECRET,
  // resave: false,
  // saveUninitialized: false,
  // cookie: {
    // secure: NODE_ENV === 'production',
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  // }
// }));
// 
//Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());
// 
//Serve uploaded files statically
// app.use('/uploads', express.static(UPLOAD_DIR));
// 
//Create uploads directory if it doesn't exist
// if (!fs.existsSync(UPLOAD_DIR)) {
  // fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  // // console.log(` Created upload directory: ${UPLOAD_DIR}`);
// }
// 
// ============================================
// DATABASE CONNECTION
// ============================================
// 
// mongoose.connect(MONGODB_URI)
  // .then(() => {
    // // console.log('✅ Connected to MongoDB successfully');
    // // console.log(`📊 Database: ${mongoose.connection.name}`);
  // })
  // .catch((err) => {
    // // console.error('❌ MongoDB connection error:', err.message);
    // process.exit(1);
  // });
// 
// ============================================
// DATABASE MODELS
// ============================================
// 
//User Model
// const userSchema = new mongoose.Schema({
  // name: {
    // type: String,
    // required: true,
    // trim: true
  // },
  // email: {
    // type: String,
    // required: true,
    // unique: true,
    // lowercase: true,
    // trim: true
  // },
  // password: {
    // type: String,
    // required: function() {
      // return !this.googleId;
    // }
  // },
  // googleId: {
    // type: String,
    // sparse: true,
    // unique: true
  // },
  // avatar: {
    // type: String,
    // default: null
  // },
  // authProvider: {
    // type: String,
    // enum: ['local', 'google'],
    // default: 'local'
  // },
  // createdAt: {
    // type: Date,
    // default: Date.now
  // }
// });
// 
//Hash password before saving
// userSchema.pre('save', async function(next) {
  // // if (!this.isModified('password') || !this.password) return next();
  // 
  // try {
    // const salt = await bcrypt.genSalt(10);
    // // this.password = await bcrypt.hash(this.password, salt);
    // next();
  // } catch (error) {
    // next(error);
  // }
// });
// 
//Method to compare passwords
// // userSchema.methods.comparePassword = async function(candidatePassword) {
  // if (!this.password) return false;
  // // return await bcrypt.compare(candidatePassword, this.password);
// };
// 
// const User = mongoose.model('User', userSchema);
// 
//Expense Model
// const expenseSchema = new mongoose.Schema({
  // userId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: true
  // },
  // title: {
    // type: String,
    // required: true,
    // trim: true
  // },
  // amount: {
    // type: Number,
    // required: true,
    // min: 0
  // },
  // category: {
    // type: String,
    // required: true,
    // // // enum: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Education', 'Other']
  // },
  // description: {
    // type: String,
    // trim: true
  // },
  // date: {
    // type: Date,
    // default: Date.now
  // },
  // receipt: {
    // type: String,
    // default: null
  // },
  // paymentMethod: {
    // type: String,
    // // enum: ['Cash', 'Card', 'UPI', 'Net Banking', 'Other'],
    // default: 'Cash'
  // },
  // createdAt: {
    // type: Date,
    // default: Date.now
  // }
// });
// 
// // const Expense = mongoose.model('Expense', expenseSchema);
// 
// ============================================
// FILE UPLOAD CONFIGURATION
// ============================================
// 
// const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
    // cb(null, UPLOAD_DIR);
  // },
  // filename: function(req, file, cb) {
    // // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // // cb(null, 'receipt-' + uniqueSuffix + path.extname(file.originalname));
  // }
// });
// 
// const fileFilter = (req, file, cb) => {
  // // // const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  // 
  // if (allowedTypes.includes(file.mimetype)) {
    // cb(null, true);
  // } else {
    // // cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed.'), false);
  // }
// };
// 
// const upload = multer({
  // storage: storage,
  // limits: {
    // fileSize: MAX_FILE_SIZE
  // },
  // fileFilter: fileFilter
// });
// 
// ============================================
// GOOGLE OAUTH CONFIGURATION
// ============================================
// 
// if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  // passport.use(new GoogleStrategy({
    // clientID: GOOGLE_CLIENT_ID,
    // clientSecret: GOOGLE_CLIENT_SECRET,
    // callbackURL: '/api/auth/google/callback',
    // proxy: true
  // },
  // // async function(accessToken, refreshToken, profile, done) {
    // try {
      // // let user = await User.findOne({ googleId: profile.id });
      // 
      // if (user) {
        // return done(null, user);
      // }
      // 
      // // user = await User.findOne({ email: profile.emails[0].value });
      // 
      // if (user) {
        // user.googleId = profile.id;
        // user.authProvider = 'google';
        // user.avatar = profile.photos[0]?.value;
        // await user.save();
        // return done(null, user);
      // }
      // 
      // user = await User.create({
        // googleId: profile.id,
        // name: profile.displayName,
        // email: profile.emails[0].value,
        // avatar: profile.photos[0]?.value,
        // authProvider: 'google'
      // });
      // 
      // done(null, user);
    // } catch (error) {
      // done(error, null);
    // }
  // }));
// 
  // passport.serializeUser((user, done) => {
    // done(null, user.id);
  // });
// 
  // passport.deserializeUser(async (id, done) => {
    // try {
      // const user = await User.findById(id);
      // done(null, user);
    // } catch (error) {
      // done(error, null);
    // }
  // });
// }
// 
// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================
// 
// // const authenticateToken = async (req, res, next) => {
  // try {
    // // const authHeader = req.headers['authorization'];
    // // const token = authHeader && authHeader.split(' ')[1];
// 
    // if (!token) {
      // return res.status(401).json({ 
        // success: false, 
        // message: 'Access token required' 
      // });
    // }
// 
    // // const decoded = jwt.verify(token, JWT_SECRET);
    // // const user = await User.findById(decoded.userId).select('-password');
    // 
    // if (!user) {
      // return res.status(401).json({ 
        // success: false, 
        // message: 'User not found' 
      // });
    // }
// 
    // req.user = user;
    // next();
  // } catch (error) {
    // if (error.name === 'TokenExpiredError') {
      // return res.status(401).json({ 
        // success: false, 
        // message: 'Token expired' 
      // });
    // }
    // return res.status(403).json({ 
      // success: false, 
      // message: 'Invalid token' 
    // });
  // }
// };

// ============================================
// UTILITY FUNCTIONS
// ============================================

// const generateToken = (userId) => {
  // return jwt.sign(
    // { userId }, 
    // JWT_SECRET, 
    // { expiresIn: '7d' }
  // );
// };
// 
// ============================================
// API ROUTES
// ============================================

// app.get('/api/health', (req, res) => {
  // res.json({ 
    // success: true,
    // message: 'Server is running',
    // environment: NODE_ENV,
    // timestamp: new Date().toISOString()
  // });
// });
// 
// ============================================
// AUTHENTICATION ROUTES
// ============================================
// 
// // app.post('/api/auth/signup', async (req, res) => {
  // try {
    // const { name, email, password } = req.body;
// 
    // if (!name || !email || !password) {
      // return res.status(400).json({ 
        // success: false, 
        // message: 'All fields are required' 
      // });
    // }
// 
    // if (password.length < 6) {
      // return res.status(400).json({ 
        // success: false, 
        // // message: 'Password must be at least 6 characters' 
      // });
    // }
// 
    // // const existingUser = await User.findOne({ email });
    // if (existingUser) {
      // return res.status(400).json({ 
        // success: false, 
        // message: 'Email already registered' 
      // });
    // }
// 
    // const user = await User.create({
      // name,
      // email,
      // password,
      // authProvider: 'local'
    // });
// 
    // const token = generateToken(user._id);
// 
    // res.status(201).json({
      // success: true,
      // message: 'User registered successfully',
      // token,
      // user: {
        // id: user._id,
        // name: user.name,
        // email: user.email,
        // avatar: user.avatar
      // }
    // });
  // } catch (error) {
    // console.error('Signup error:', error);
    // res.status(500).json({ 
      // success: false, 
      // message: 'Server error during signup' 
    // });
  // }
// });
// 
// // app.post('/api/auth/login', async (req, res) => {
  // try {
    // const { email, password } = req.body;
// 
    // if (!email || !password) {
      // return res.status(400).json({ 
        // success: false, 
        // // message: 'Email and password are required' 
      // });
    // }
// 
    // const user = await User.findOne({ email });
    // if (!user) {
      // return res.status(401).json({ 
        // success: false, 
        // message: 'Invalid email or password' 
      // });
    // }
// 
    // if (user.authProvider !== 'local') {
      // return res.status(401).json({ 
        // success: false, 
        // // message: `Please login with ${user.authProvider}` 
      // });
    // }
// 
    // // const isMatch = await user.comparePassword(password);
    // if (!isMatch) {
      // return res.status(401).json({ 
        // success: false, 
        // message: 'Invalid email or password' 
      // });
    // }
// 
    // const token = generateToken(user._id);
// 
    // res.json({
      // success: true,
      // message: 'Login successful',
      // token,
      // user: {
        // id: user._id,
        // name: user.name,
        // email: user.email,
        // avatar: user.avatar
      // }
    // });
  // } catch (error) {
    // console.error('Login error:', error);
    // res.status(500).json({ 
      // success: false, 
      // message: 'Server error during login' 
    // });
  // }
// });
// 
//Google OAuth routes
// if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  // app.get('/api/auth/google',
    // passport.authenticate('google', { 
      // scope: ['profile', 'email'] 
    // })
  // );
// 
  // app.get('/api/auth/google/callback',
    // passport.authenticate('google', { 
      // // failureRedirect: `${FRONTEND_URL}/login?error=oauth_failed`,
      // session: false 
    // }),
    // (req, res) => {
      // try {
        // // const token = generateToken(req.user._id);
        // // res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
      // } catch (error) {
        // // console.error('OAuth callback error:', error);
        // // res.redirect(`${FRONTEND_URL}/login?error=oauth_error`);
      // }
    // }
  // );
// }
// 
// // app.get('/api/auth/me', authenticateToken, (req, res) => {
  // res.json({
    // success: true,
    // user: {
      // id: req.user._id,
      // name: req.user.name,
      // email: req.user.email,
      // avatar: req.user.avatar,
      // authProvider: req.user.authProvider
    // }
  // });
// });
// 
// ============================================
// EXPENSE ROUTES
// ============================================
// 
// // app.get('/api/expenses', authenticateToken, async (req, res) => {
  // try {
    // // const { category, startDate, endDate, search } = req.query;
    // 
    // const query = { userId: req.user._id };
    // 
    // if (category && category !== 'All') {
      // query.category = category;
    // }
    // 
    // if (startDate || endDate) {
      // query.date = {};
      // // if (startDate) query.date.$gte = new Date(startDate);
      // // if (endDate) query.date.$lte = new Date(endDate);
    // }
    // 
    // if (search) {
      // query.$or = [
        // // { title: { $regex: search, $options: 'i' } },
        // // { description: { $regex: search, $options: 'i' } }
      // ];
    // }
    // 
    // // const expenses = await Expense.find(query).sort({ date: -1 });
    // 
    // res.json({
      // success: true,
      // count: expenses.length,
      // expenses
    // });
  // } catch (error) {
    // console.error('Get expenses error:', error);
    // res.status(500).json({ 
      // success: false, 
      // message: 'Error fetching expenses' 
    // });
  // }
// });
// 
// // app.get('/api/expenses/:id', authenticateToken, async (req, res) => {
  // try {
    // const expense = await Expense.findOne({
      // _id: req.params.id,
      // userId: req.user._id
    // });
    // 
    // if (!expense) {
      // return res.status(404).json({ 
        // success: false, 
        // message: 'Expense not found' 
      // });
    // }
    // 
    // res.json({
      // success: true,
      // expense
    // });
  // } catch (error) {
    // console.error('Get expense error:', error);
    // res.status(500).json({ 
      // success: false, 
      // message: 'Error fetching expense' 
    // });
  // }
// });
// 
// // app.post('/api/expenses', authenticateToken, upload.single('receipt'), async (req, res) => {
  // try {
    // // // const { title, amount, category, description, date, paymentMethod } = req.body;
    // 
    // if (!title || !amount || !category) {
      // return res.status(400).json({ 
        // success: false, 
        // // message: 'Title, amount, and category are required' 
      // });
    // }
    // 
    // const expenseData = {
      // userId: req.user._id,
      // title,
      // amount: parseFloat(amount),
      // category,
      // description: description || '',
      // date: date || new Date(),
      // paymentMethod: paymentMethod || 'Cash'
    // };
    // 
    // if (req.file) {
      // expenseData.receipt = req.file.filename;
    // }
    // 
    // // const expense = await Expense.create(expenseData);
    // 
    // res.status(201).json({
      // success: true,
      // message: 'Expense created successfully',
      // expense
    // });
  // } catch (error) {
    // // console.error('Create expense error:', error);
    // res.status(500).json({ 
      // success: false, 
      // message: 'Error creating expense' 
    // });
  // }
// });
// 
// // app.put('/api/expenses/:id', authenticateToken, upload.single('receipt'), async (req, res) => {
  // try {
    // // // const { title, amount, category, description, date, paymentMethod } = req.body;
    // 
    // const expense = await Expense.findOne({
      // _id: req.params.id,
      // userId: req.user._id
    // });
    // 
    // if (!expense) {
      // return res.status(404).json({ 
        // success: false, 
        // message: 'Expense not found' 
      // });
    // }
    // 
    // if (title) expense.title = title;
    // // if (amount) expense.amount = parseFloat(amount);
    // if (category) expense.category = category;
    // // if (description !== undefined) expense.description = description;
    // if (date) expense.date = date;
    // // if (paymentMethod) expense.paymentMethod = paymentMethod;
    // 
    // if (req.file) {
      // if (expense.receipt) {
        // // const oldPath = path.join(UPLOAD_DIR, expense.receipt);
        // if (fs.existsSync(oldPath)) {
          // fs.unlinkSync(oldPath);
        // }
      // }
      // expense.receipt = req.file.filename;
    // }
    // 
    // await expense.save();
    // 
    // res.json({
      // success: true,
      // message: 'Expense updated successfully',
      // expense
    // });
  // } catch (error) {
    // // console.error('Update expense error:', error);
    // res.status(500).json({ 
      // success: false, 
      // message: 'Error updating expense' 
    // });
  // }
// });
// 
// // app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
  // try {
    // const expense = await Expense.findOne({
      // _id: req.params.id,
      // userId: req.user._id
    // });
    // 
    // if (!expense) {
      // return res.status(404).json({ 
        // success: false, 
        // message: 'Expense not found' 
      // });
    // }
    // 
    // if (expense.receipt) {
      // // const filePath = path.join(UPLOAD_DIR, expense.receipt);
      // if (fs.existsSync(filePath)) {
        // fs.unlinkSync(filePath);
      // }
    // }
    // 
    // // await Expense.deleteOne({ _id: req.params.id });
    // 
    // res.json({
      // success: true,
      // message: 'Expense deleted successfully'
    // });
  // } catch (error) {
    // // console.error('Delete expense error:', error);
    // res.status(500).json({ 
      // success: false, 
      // message: 'Error deleting expense' 
    // });
  // }
// });
// 
// // app.get('/api/expenses/stats/summary', authenticateToken, async (req, res) => {
  // try {
    // // const expenses = await Expense.find({ userId: req.user._id });
    // 
    // // const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    // 
    // // const categoryStats = expenses.reduce((acc, expense) => {
      // if (!acc[expense.category]) {
        // acc[expense.category] = 0;
      // }
      // acc[expense.category] += expense.amount;
      // return acc;
    // }, {});
    // 
    // const thisMonthStart = new Date();
    // thisMonthStart.setDate(1);
    // thisMonthStart.setHours(0, 0, 0, 0);
    // 
    // // const thisMonthExpenses = expenses.filter(e => e.date >= thisMonthStart);
    // // const thisMonthTotal = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    // 
    // res.json({
      // success: true,
      // stats: {
        // totalExpenses: total,
        // expenseCount: expenses.length,
        // thisMonthTotal,
        // // thisMonthCount: thisMonthExpenses.length,
        // categoryBreakdown: categoryStats
      // }
    // });
  // } catch (error) {
    // console.error('Get stats error:', error);
    // res.status(500).json({ 
      // success: false, 
      // message: 'Error fetching statistics' 
    // });
  // }
// });
// 
// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// app.use((req, res) => {
  // res.status(404).json({
    // success: false,
    // message: 'Route not found'
  // });
// });
// 
// app.use((err, req, res, next) => {
  // console.error('Error:', err);
  // 
  // if (err instanceof multer.MulterError) {
    // if (err.code === 'LIMIT_FILE_SIZE') {
      // return res.status(400).json({
        // success: false,
        // // message: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`
      // });
    // }
  // }
  // 
  // res.status(500).json({
    // success: false,
    // // message: err.message || 'Internal server error'
  // });
// });
// 
// ============================================
// START SERVER
// ============================================
// 
// app.listen(PORT, () => {
  // // console.log('\n🚀 ===================================');
  // // console.log(`✅ Server running on port ${PORT}`);
  // // console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  // console.log(`📝 Environment: ${NODE_ENV}`);
  // // console.log(`📁 Upload directory: ${UPLOAD_DIR}`);
  // // console.log(`📏 Max file size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  // // console.log(`🔐 JWT configured: ${JWT_SECRET ? '✅' : '❌'}`);
  // // console.log(`🔑 Google OAuth: ${GOOGLE_CLIENT_ID ? '✅' : '❌'}`);
  // // console.log('🚀 ===================================\n');
// });
// 
// process.on('unhandledRejection', (err) => {
  // // console.error('Unhandled Promise Rejection:', err);
  // process.exit(1);
// });
// 










// new one 

// server.js - Complete Backend Implementation with Voice & AI Features
// ====================================================================

// Load environment variables first




require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

// Initialize Express app
const app = express();

// ============================================
// ENVIRONMENT VARIABLES USAGE
// ============================================

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/expense_tracker';

const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE) || 10485760;
const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Validate required environment variables
if (!JWT_SECRET) {
  console.error(' FATAL ERROR: JWT_SECRET is not defined in .env file');
  process.exit(1);
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.warn(' WARNING: Google OAuth credentials not found. Google login will not work.');
}

// ========================================
// MIDDLEWARE CONFIGURATION
// =========================================

// CORS Configuration
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration

app.use(session({
  secret: JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOAD_DIR));

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log(`Created upload directory: ${UPLOAD_DIR}`);
}

// ============================================
// DATABASE CONNECTION
// ============================================

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(' Connected to MongoDB successfully');
    console.log(`  Database: ${mongoose.connection.name}`);
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  });

// ============================================
// DATABASE MODELS
// ============================================

// User Model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    }
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  avatar: {
    type: String,
    default: null
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


userSchema.pre('save', async function () {
  if (!this.isModified('password') || !this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});












userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

// Expense Model
const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Utility Bills', 'Shopping', 'Food', 'Transport', 'Entertainment', 'Others']
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  receipt: {
    type: String,
    default: null
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'UPI', 'Net Banking', 'Other'],
    default: 'Cash'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

// Budget Model
const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  totalBudget: {
    type: Number,
    default: 0
  },
  categoryBudgets: {
    type: Map,
    of: Number,
    default: {}
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Budget = mongoose.model('Budget', budgetSchema);

// ============================================
// FILE UPLOAD CONFIGURATION
// ============================================

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'receipt-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: fileFilter
});

// ============================================
// GOOGLE OAUTH CONFIGURATION
// ============================================

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/api/auth/google/callback',
        proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          }

          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error('Google account has no email'), null);
          }

          user = await User.findOne({ email });

          if (user) {
            user.googleId = profile.id;
            user.authProvider = 'google';
            user.avatar = profile.photos?.[0]?.value;
            await user.save();
            return done(null, user);
          }

          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            avatar: profile.photos?.[0]?.value,
            authProvider: 'google'
          });

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}


const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access token required' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired' 
      });
    }
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

const generateToken = (userId) => {
  return jwt.sign(
    { userId }, 
    JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

// Simple text categorization
const categorizeExpense = (text) => {
  const lowerText = text.toLowerCase();
  
  // Extract amount
  const amountMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
  const amount = amountMatch ? parseFloat(amountMatch[0].replace(/,/g, '')) : 0;
  
  // Categorize based on keywords
  let category = 'Others';
  
  if (lowerText.includes('electricity') || lowerText.includes('water') || lowerText.includes('gas') || lowerText.includes('bill')) {
    category = 'Utility Bills';
  } else if (lowerText.includes('grocery') || lowerText.includes('food') || lowerText.includes('restaurant') || lowerText.includes('meal')) {
    category = 'Food';
  } else if (lowerText.includes('uber') || lowerText.includes('taxi') || lowerText.includes('bus') || lowerText.includes('train') || lowerText.includes('transport')) {
    category = 'Transport';
  } else if (lowerText.includes('shop') || lowerText.includes('clothes') || lowerText.includes('amazon')) {
    category = 'Shopping';
  } else if (lowerText.includes('movie') || lowerText.includes('game') || lowerText.includes('entertainment')) {
    category = 'Entertainment';
  }
  
  return {
    amount,
    category,
    description: text
  };
};

// ============================================
// API ROUTES
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

app.post('/api/auth/Signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters' 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      authProvider: 'local'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during signup' 
    });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    if (user.authProvider !== 'local') {
      return res.status(401).json({ 
        success: false, 
        message: `Please login with ${user.authProvider}` 
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// Google OAuth routes
if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  app.get('/api/auth/google',
    passport.authenticate('google', { 
      scope: ['profile', 'email'] 
    })
  );

  app.get('/api/auth/google/callback',
    passport.authenticate('google', { 
      failureRedirect: `${FRONTEND_URL}/login?error=oauth_failed`,
      session: false 
    }),
    (req, res) => {
      try {
        const token = generateToken(req.user._id);
        res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
      } catch (error) {
        console.error('OAuth callback error:', error);
        res.redirect(`${FRONTEND_URL}/login?error=oauth_error`);
      }
    }
  );
}

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      authProvider: req.user.authProvider
    }
  });
});

// ============================================
// EXPENSE ROUTES
// ============================================

app.get('/api/expenses', authenticateToken, async (req, res) => {
  try {
    const { category, startDate, endDate, search } = req.query;
    
    const query = { userId: req.user._id };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const expenses = await Expense.find(query).sort({ date: -1 });
    
    res.json({
      success: true,
      count: expenses.length,
      expenses
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching expenses' 
    });
  }
});

// Get expense history
app.get('/api/expenses/history', authenticateToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 }).limit(100);
    
    res.json({
      success: true,
      expenses
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching expense history' 
    });
  }
});

// Get daily summary
app.get('/api/expenses/daily-summary', authenticateToken, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const expenses = await Expense.find({
      userId: req.user._id,
      date: { $gte: today }
    });
    
    const byCategory = {};
    expenses.forEach(exp => {
      if (!byCategory[exp.category]) {
        byCategory[exp.category] = { amount: 0, count: 0 };
      }
      byCategory[exp.category].amount += exp.amount;
      byCategory[exp.category].count += 1;
    });
    
    res.json({
      success: true,
      summary: {
        total: expenses.reduce((sum, e) => sum + e.amount, 0),
        count: expenses.length,
        byCategory
      }
    });
  } catch (error) {
    console.error('Get daily summary error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching daily summary' 
    });
  }
});

// Categorize text
app.post('/api/categorize', authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Text is required'
      });
    } 
    
    const expense = categorizeExpense(text);
    
    res.json({
      success: true,
      expense: {
        ...expense,
        title: text
      },
      autoConfirmed: false
    });
  } catch (error) {
    console.error('Categorize error:', error);
    res.status(500).json({
      success: false,
      message: 'Error categorizing expense'
    });
  }
});

// Confirm expense
app.post('/api/expenses/confirm', authenticateToken, async (req, res) => {
  try {
    const { title, amount, category, description } = req.body;
    
    const expense = await Expense.create({
      userId: req.user._id,
      title: title || description,
      amount,
      category,
      description
    });
    
    res.json({
      success: true,
      message: 'Expense saved successfully',
      expense
    });
  } catch (error) {
    console.error('Confirm expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving expense'
    });
  }
});

// Analyze audio (voice input)
app.post('/api/analyze-audio', authenticateToken, upload.single('audio'), async (req, res) => {
  try {
    // For now, return a mock response
    // You would integrate with a speech-to-text API here
    
    res.json({
      success: true,
      transcription: 'Paid 500 for groceries',
      expense: {
        amount: 500,
        category: 'Food',
        description: 'Paid 500 for groceries'
      }
    });
  } catch (error) {
    console.error('Audio analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing audio'
    });
  }
});

// Analyze file
app.post('/api/analyze-file', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    // Mock response - integrate with OCR/AI service
    res.json({
      success: true,
      expenses: [{
        amount: 1000,
        category: 'Shopping',
        description: 'Shopping receipt'
      }]
    });
  } catch (error) {
    console.error('File analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Error analyzing file'
    });
  }
});

app.get('/api/expenses/stats/summary', authenticateToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id });
    
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    const categoryStats = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});
    
    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    thisMonthStart.setHours(0, 0, 0, 0);
    
    const thisMonthExpenses = expenses.filter(e => e.date >= thisMonthStart);
    const thisMonthTotal = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    
    res.json({
      success: true,
      stats: {
        totalExpenses: total,
        expenseCount: expenses.length,
        thisMonthTotal,
        thisMonthCount: thisMonthExpenses.length,
        categoryBreakdown: categoryStats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching statistics' 
    });
  }
});

// ============================================
// BUDGET ROUTES
// ============================================

app.get('/api/budget/current', authenticateToken, async (req, res) => {
  try {
    let budget = await Budget.findOne({ userId: req.user._id });
    
    if (!budget) {
      budget = await Budget.create({
        userId: req.user._id,
        totalBudget: 0,
        categoryBudgets: {}
      });
    }
    
    res.json({
      success: true,
      budget: {
        totalBudget: budget.totalBudget,
        categoryBudgets: Object.fromEntries(budget.categoryBudgets)
      }
    });
  } catch (error) {
    console.error('Get budget error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching budget'
    });
  }
});

app.post('/api/budget/update', authenticateToken, async (req, res) => {
  try {
    const { totalBudget, categoryBudgets } = req.body;
    
    let budget = await Budget.findOne({ userId: req.user._id });
    
    if (!budget) {
      budget = new Budget({
        userId: req.user._id,
        totalBudget,
        categoryBudgets
      });
    } else {
      budget.totalBudget = totalBudget;
      budget.categoryBudgets = categoryBudgets;
      budget.updatedAt = new Date();
    }
    
    await budget.save();
    
    res.json({
      success: true,
      message: 'Budget updated successfully',
      budget
    });
  } catch (error) {
    console.error('Update budget error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating budget'
    });
  }
});

app.delete('/api/expenses/:id', authenticateToken, async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!expense) {
      return res.status(404).json({ 
        success: false, 
        message: 'Expense not found' 
      });
    }
    
    if (expense.receipt) {
      const filePath = path.join(UPLOAD_DIR, expense.receipt);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    
    await Expense.deleteOne({ _id: req.params.id });
    
    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting expense' 
    });
  }
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(3000, () => {
  console.log('\n🚀 ===================================');
  console.log(`✅Server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  console.log(`📁 Upload directory: ${UPLOAD_DIR}`);
  console.log(`📏 Max file size: ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  console.log(`🔐 JWT configured: ${JWT_SECRET ? '✅' : '❌'}`);
  console.log(`🔑 Google OAuth: ${GOOGLE_CLIENT_ID ? '✅' : '❌'}`);
  console.log('🚀 ===================================\n');
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
}

)






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































