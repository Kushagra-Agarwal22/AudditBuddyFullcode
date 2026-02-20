// import { useState, useRef, useEffect } from "react";
// import { Mic, Send, Loader2, TrendingUp, TrendingDown, Upload, FileText } from "lucide-react";
// import {
//   PieChart, Pie, Cell,
//   BarChart, Bar, XAxis, YAxis,
//   LineChart, Line,
//   AreaChart, Area,
//   RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
//   ComposedChart,
//   ResponsiveContainer, Legend, Tooltip, CartesianGrid
// } from "recharts";

// const BACKEND_URL = "http://localhost:3001";

// export default function Home() {
//   const [inputValue, setInputValue] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [activeChart, setActiveChart] = useState("bar");
//   const [totalBudgetInput, setTotalBudgetInput] = useState(0);

//   const [expenses, setExpenses] = useState([
//     { category: "Utility Bills", amount: 0, color: "#FF6B6B", budget: 0 },
//     { category: "Shopping", amount: 0, color: "#4ECDC4", budget: 0 },
//     { category: "Food", amount: 0, color: "#45B7D1", budget: 0 },
//     { category: "Transport", amount: 0, color: "#FFA07A", budget: 0 },
//     { category: "Entertainment", amount: 0, color: "#98D8C8", budget: 0 },
//     { category: "Others", amount: 0, color: "#F7DC6F", budget: 0 }
//   ]);

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     const perCategory = Math.floor(totalBudgetInput / expenses.length);
//     setExpenses(prev => prev.map(e => ({ ...e, budget: perCategory })));
//   }, [totalBudgetInput]);

//   const addExpense = (result) => {
//     if (!result.amount || result.amount <= 0) return;

//     setExpenses(prev =>
//       prev.map(e =>
//         e.category === result.category
//           ? { ...e, amount: e.amount + result.amount }
//           : e
//       )
//     );
//   };

//   // **TEXT CATEGORIZATION via Backend**
//   const handleSubmit = async () => {
//     if (!inputValue.trim()) return;

//     setIsProcessing(true);
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/categorize`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: inputValue })
//       });

//       const result = await response.json();
//       addExpense(result);
//       setInputValue("");
//     } catch (error) {
//       console.error('Backend error:', error);
//       alert('Backend connection failed. Make sure server is running on port 3001');
//     }
//     setIsProcessing(false);
//   };

//   // **AUDIO RECORDING START**
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
      
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (e) => {
//         audioChunksRef.current.push(e.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         await sendAudioToBackend(audioBlob);
//         stream.getTracks().forEach(track => track.stop());
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error('Microphone access error:', error);
//       alert('Microphone access denied');
//     }
//   };

//   // **AUDIO RECORDING STOP**
//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // **SEND AUDIO TO BACKEND**
//   const sendAudioToBackend = async (audioBlob) => {
//     setIsProcessing(true);
    
//     const formData = new FormData();
//     formData.append('audio', audioBlob, 'recording.webm');

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/analyze-audio`, {
//         method: 'POST',
//         body: formData
//       });

//       const data = await response.json();
      
//       if (data.expense) {
//         addExpense(data.expense);
//         setInputValue(data.transcription || '');
//       }
//     } catch (error) {
//       console.error('Audio analysis failed:', error);
//       alert('Failed to analyze audio');
//     }
    
//     setIsProcessing(false);
//   };

//   // **FILE UPLOAD HANDLER**
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setIsProcessing(true);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/analyze-file`, {
//         method: 'POST',
//         body: formData
//       });

//       const data = await response.json();
      
//       if (data.expenses && data.expenses.length > 0) {
//         data.expenses.forEach(exp => addExpense(exp));
//         alert(`✅ ${data.count} expenses extracted from file`);
//       }
//     } catch (error) {
//       console.error('File upload failed:', error);
//       alert('Failed to analyze file');
//     }

//     setIsProcessing(false);
//     e.target.value = '';
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
//   const totalBudget = expenses.reduce((s, e) => s + e.budget, 0);
//   const budgetUsed = totalBudget > 0 ? ((totalExpenses / totalBudget) * 100).toFixed(1) : 0;

//   const highestExpense = expenses.reduce((a, b) => a.amount > b.amount ? a : b);
//   const lowestExpense = expenses.reduce((a, b) => a.amount < b.amount ? a : b);

//   const tabs = [
//     { id: "pie", label: "Pie" },
//     { id: "bar", label: "Bar" },
//     { id: "line", label: "Line" },
//     { id: "area", label: "Area" },
//     { id: "radar", label: "Radar" },
//     { id: "budget", label: "Budget vs Actual" }
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold mb-2">AI Expense Tracker</h1>
//         <p className="text-gray-400 mb-8">Record audio, upload files, or type expenses</p>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
//               <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

//               <textarea
//                 className="w-full p-4 bg-black border border-gray-700 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//                 rows={5}
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Speak, upload, or type:
// • Paid 850 electricity bill
// • Spent 1200 on groceries"
//                 disabled={isProcessing || isRecording}
//               />

//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={isRecording ? stopRecording : startRecording}
//                   className={`px-4 py-4 rounded-lg ${
//                     isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-800 hover:bg-gray-700'
//                   } disabled:opacity-50 transition-all`}
//                   disabled={isProcessing}
//                 >
//                   <Mic size={24} className={isRecording ? "text-white animate-pulse" : "text-gray-300"} />
//                 </button>

//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileUpload}
//                   accept=".csv,.jpg,.jpeg,.png,.pdf"
//                   className="hidden"
//                 />

//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="bg-gray-800 px-4 py-4 rounded-lg hover:bg-gray-700 disabled:opacity-50"
//                   disabled={isProcessing}
//                 >
//                   <Upload size={24} className="text-gray-300" />
//                 </button>

//                 <button
//                   onClick={handleSubmit}
//                   disabled={!inputValue.trim() || isProcessing || isRecording}
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 hover:from-blue-700 hover:to-purple-700"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <Loader2 size={20} className="animate-spin" />
//                       Processing
//                     </>
//                   ) : (
//                     <>
//                       <Send size={20} />
//                       Add
//                     </>
//                   )}
//                 </button>
//               </div>

//               {isRecording && (
//                 <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-center">
//                   <p className="text-red-300 text-sm font-semibold animate-pulse">🎙️ Recording... Click mic to stop</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="lg:col-span-2">
//             <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 mb-6">
//               <label className="text-sm text-gray-400">Total Monthly Budget</label>
//               <input
//                 type="number"
//                 value={totalBudgetInput}
//                 onChange={(e) => setTotalBudgetInput(Number(e.target.value))}
//                 className="w-full mt-2 bg-black border border-gray-700 p-3 rounded-lg"
//                 placeholder="Enter total budget"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="bg-[#1a1a1a] p-4 rounded-xl">
//                 <p className="text-gray-400 text-sm mb-1">Total Expenses</p>
//                 <p className="text-2xl font-bold">₹{totalExpenses}</p>
//               </div>

//               <div className="bg-[#1a1a1a] p-4 rounded-xl">
//                 <p className="text-gray-400 text-sm mb-1">Budget Used</p>
//                 <p className="text-2xl font-bold">{budgetUsed}%</p>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
//                   <div className="flex items-center gap-2 mb-2">
//                     <TrendingUp size={16} className="text-red-400" />
//                     <p className="text-gray-400 text-xs">Highest</p>
//                   </div>
//                   <p className="text-sm font-semibold">{highestExpense.category}</p>
//                   <p className="text-lg font-bold">₹{highestExpense.amount}</p>
//                 </div>

//                 <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
//                   <div className="flex items-center gap-2 mb-2">
//                     <TrendingDown size={16} className="text-green-400" />
//                     <p className="text-gray-400 text-xs">Lowest</p>
//                   </div>
//                   <p className="text-sm font-semibold">{lowestExpense.category}</p>
//                   <p className="text-lg font-bold">₹{lowestExpense.amount}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
//               <div className="flex gap-2 mb-4 overflow-x-auto">
//                 {tabs.map(t => (
//                   <button
//                     key={t.id}
//                     onClick={() => setActiveChart(t.id)}
//                     className={`px-4 py-2 rounded whitespace-nowrap ${
//                       activeChart === t.id ? "bg-blue-600" : "bg-gray-800"
//                     }`}
//                   >
//                     {t.label}
//                   </button>
//                 ))}
//               </div>

//               <div className="bg-[#0a0a0a] p-6 rounded-xl border border-gray-800">
//                 {activeChart === "pie" && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <PieChart>
//                       <Pie data={expenses} dataKey="amount" nameKey="category" outerRadius={140}>
//                         {expenses.map((e, i) => (
//                           <Cell key={i} fill={e.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'bar' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <BarChart data={expenses}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis dataKey="category" stroke="#999" angle={-20} textAnchor="end" height={100} />
//                       <YAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Legend />
//                       <Bar dataKey="amount" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'line' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <LineChart data={expenses}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis dataKey="category" stroke="#999" />
//                       <YAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Line type="monotone" dataKey="amount" stroke="#45B7D1" strokeWidth={3} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'area' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <AreaChart data={expenses}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis dataKey="category" stroke="#999" />
//                       <YAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Area type="monotone" dataKey="amount" fill="#98D8C8" stroke="#45B7D1" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'radar' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <RadarChart data={expenses}>
//                       <PolarGrid stroke="#333" />
//                       <PolarAngleAxis dataKey="category" stroke="#999" />
//                       <PolarRadiusAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Radar dataKey="amount" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.6} />
//                     </RadarChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'budget' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <ComposedChart data={expenses}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis dataKey="category" stroke="#999" />
//                       <YAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Legend />
//                       <Bar dataKey="budget" fill="#4CAF50" name="Budget" />
//                       <Bar dataKey="amount" fill="#FF6B6B" name="Actual" />
//                       <Line type="monotone" dataKey="amount" stroke="#FFA726" strokeWidth={2} />
//                     </ComposedChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





















// import { useState, useRef, useEffect } from "react";
// import { Mic, Send, Loader2, TrendingUp, TrendingDown, Upload, Check, X, History, Calendar } from "lucide-react";
// import {
//   PieChart, Pie, Cell,
//   BarChart, Bar, XAxis, YAxis,
//   LineChart, Line,
//   AreaChart, Area,
//   RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
//   ComposedChart,
//   ResponsiveContainer, Legend, Tooltip, CartesianGrid
// } from "recharts";

// const BACKEND_URL = "http://localhost:3001";

// export default function Home() {
//   const [inputValue, setInputValue] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [activeChart, setActiveChart] = useState("bar");
//   const [totalBudgetInput, setTotalBudgetInput] = useState(0);
  
//   // Confirmation state
//   const [pendingExpense, setPendingExpense] = useState(null);
//   const [showConfirmation, setShowConfirmation] = useState(false);
  
//   // History state
//   const [showHistory, setShowHistory] = useState(false);
//   const [expenseHistory, setExpenseHistory] = useState([]);

//   const [expenses, setExpenses] = useState([
//     { category: "Utility Bills", amount: 0, color: "#FF6B6B", budget: 0 },
//     { category: "Shopping", amount: 0, color: "#4ECDC4", budget: 0 },
//     { category: "Food", amount: 0, color: "#45B7D1", budget: 0 },
//     { category: "Transport", amount: 0, color: "#FFA07A", budget: 0 },
//     { category: "Entertainment", amount: 0, color: "#98D8C8", budget: 0 },
//     { category: "Others", amount: 0, color: "#F7DC6F", budget: 0 }
//   ]);

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const fileInputRef = useRef(null);

//   // Load budget from backend on mount
//   useEffect(() => {
//     loadBudget();
//     loadTodaysSummary();
//   }, []);

//   const loadBudget = async () => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/budget/current`);
//       const data = await response.json();
      
//       if (data.success && data.budget) {
//         setTotalBudgetInput(data.budget.totalBudget);
        
//         setExpenses(prev => prev.map(e => ({
//           ...e,
//           budget: data.budget.categoryBudgets[e.category] || 0
//         })));
//       }
//     } catch (error) {
//       console.error('Failed to load budget:', error);
//     }
//   };

//   const loadTodaysSummary = async () => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/expenses/daily-summary`);
//       const data = await response.json();
      
//       if (data.success && data.summary.byCategory) {
//         setExpenses(prev => prev.map(e => ({
//           ...e,
//           amount: data.summary.byCategory[e.category]?.amount || 0
//         })));
//       }
//     } catch (error) {
//       console.error('Failed to load summary:', error);
//     }
//   };

//   const saveBudget = async (newBudget) => {
//     try {
//       const perCategory = Math.floor(newBudget / expenses.length);
//       const categoryBudgets = {};
      
//       expenses.forEach(e => {
//         categoryBudgets[e.category] = perCategory;
//       });

//       await fetch(`${BACKEND_URL}/api/budget/update`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           totalBudget: newBudget,
//           categoryBudgets 
//         })
//       });

//       setExpenses(prev => prev.map(e => ({ ...e, budget: perCategory })));
//     } catch (error) {
//       console.error('Failed to save budget:', error);
//     }
//   };

//   useEffect(() => {
//     if (totalBudgetInput > 0) {
//       saveBudget(totalBudgetInput);
//     }
//   }, [totalBudgetInput]);

//   // **TEXT CATEGORIZATION**
//   const handleSubmit = async () => {
//     if (!inputValue.trim()) return;

//     console.log('🔵 Submitting:', inputValue);
//     setIsProcessing(true);
    
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/categorize`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: inputValue })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}`);
//       }

//       const data = await response.json();
//       console.log('🔵 Categorization result:', data);
      
//       if (data.success && data.expense) {
//         console.log('✅ Setting pending expense:', data.expense);
//         setPendingExpense({ ...data.expense, source: 'text' });
//         setShowConfirmation(true);
//       } else {
//         console.error('❌ Invalid response:', data);
//         alert('Failed to categorize expense');
//       }
//     } catch (error) {
//       console.error('❌ Backend error:', error);
//       alert(`Backend connection failed: ${error.message}`);
//     }
//     setIsProcessing(false);
//   };

//   // **CONFIRM EXPENSE**
//   const confirmExpense = async () => {
//     if (!pendingExpense) return;

//     console.log('🔵 Confirming expense:', pendingExpense);

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/expenses/confirm`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(pendingExpense)
//       });

//       const data = await response.json();
//       console.log('🔵 Backend response:', data);
      
//       if (data.success) {
//         console.log('✅ Updating chart for category:', pendingExpense.category);
        
//         // Update local state - FORCE RE-RENDER
//         setExpenses(prev => {
//           const updated = prev.map(e => 
//             e.category === pendingExpense.category
//               ? { ...e, amount: e.amount + pendingExpense.amount }
//               : e
//           );
//           console.log('✅ New expenses state:', updated);
//           return updated;
//         });
        
//         setInputValue("");
//         setShowConfirmation(false);
//         setPendingExpense(null);
        
//         console.log('✅ Expense confirmed and chart should update now!');
//       }
//     } catch (error) {
//       console.error('❌ Failed to save:', error);
//       alert('Failed to save expense');
//     }
//   };

//   // **REJECT EXPENSE**
//   const rejectExpense = () => {
//     setShowConfirmation(false);
//     setPendingExpense(null);
//   };

//   // **AUDIO RECORDING**
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
      
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (e) => {
//         audioChunksRef.current.push(e.data);
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//         await sendAudioToBackend(audioBlob);
//         stream.getTracks().forEach(track => track.stop());
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//     } catch (error) {
//       console.error('Microphone error:', error);
//       alert('Microphone access denied');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   const sendAudioToBackend = async (audioBlob) => {
//     setIsProcessing(true);
    
//     const formData = new FormData();
//     formData.append('audio', audioBlob, 'recording.webm');

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/analyze-audio`, {
//         method: 'POST',
//         body: formData
//       });

//       const data = await response.json();
      
//       if (data.success && data.expense) {
//         setInputValue(data.transcription || '');
//         setPendingExpense({ ...data.expense, source: 'audio' });
//         setShowConfirmation(true);
//       }
//     } catch (error) {
//       console.error('Audio analysis failed:', error);
//       alert('Failed to analyze audio');
//     }
    
//     setIsProcessing(false);
//   };

//   // **FILE UPLOAD**
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setIsProcessing(true);

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/analyze-file`, {
//         method: 'POST',
//         body: formData
//       });

//       const data = await response.json();
      
//       if (data.success && data.expenses.length > 0) {
//         // For multiple expenses, confirm first one
//         setPendingExpense({ ...data.expenses[0], source: 'file' });
//         setShowConfirmation(true);
        
//         // Store remaining for batch processing
//         if (data.expenses.length > 1) {
//           alert(`Found ${data.expenses.length} expenses. Confirming one by one.`);
//         }
//       }
//     } catch (error) {
//       console.error('File upload failed:', error);
//       alert('Failed to analyze file');
//     }

//     setIsProcessing(false);
//     e.target.value = '';
//   };

//   // **LOAD HISTORY**
//   const loadHistory = async () => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/api/expenses/history`);
//       const data = await response.json();
      
//       if (data.success) {
//         setExpenseHistory(data.expenses);
//         setShowHistory(true);
//       }
//     } catch (error) {
//       console.error('Failed to load history:', error);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
//   const totalBudget = expenses.reduce((s, e) => s + e.budget, 0);
//   const budgetUsed = totalBudget > 0 ? ((totalExpenses / totalBudget) * 100).toFixed(1) : 0;

//   const highestExpense = expenses.reduce((a, b) => a.amount > b.amount ? a : b);
//   const lowestExpense = expenses.reduce((a, b) => a.amount < b.amount ? a : b);

//   const tabs = [
//     { id: "pie", label: "Pie" },
//     { id: "bar", label: "Bar" },
//     { id: "line", label: "Line" },
//     { id: "area", label: "Area" },
//     { id: "radar", label: "Radar" },
//     { id: "budget", label: "Budget vs Actual" }
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">AI Expense Tracker</h1>
//             <p className="text-gray-400">Record, upload, or type expenses</p>
//           </div>
          
//           <button
//             onClick={loadHistory}
//             className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
//           >
//             <History size={20} />
//             History
//           </button>
//         </div>

//         {/* CONFIRMATION MODAL */}
//         {showConfirmation && pendingExpense && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//             <div className="bg-[#1a1a1a] rounded-xl p-8 max-w-md w-full border border-gray-700">
//               <h3 className="text-2xl font-bold mb-4">Confirm Expense</h3>
              
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Amount:</span>
//                   <span className="font-bold text-xl">₹{pendingExpense.amount}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Category:</span>
//                   <span className="font-semibold">{pendingExpense.category}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Description:</span>
//                   <span className="text-sm">{pendingExpense.description}</span>
//                 </div>
                
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Source:</span>
//                   <span className="text-xs uppercase text-blue-400">{pendingExpense.source}</span>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={rejectExpense}
//                   className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
//                 >
//                   <X size={20} />
//                   Cancel
//                 </button>
                
//                 <button
//                   onClick={confirmExpense}
//                   className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
//                 >
//                   <Check size={20} />
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* HISTORY MODAL */}
//         {showHistory && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//             <div className="bg-[#1a1a1a] rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold">Expense History</h3>
//                 <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-white">
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 {expenseHistory.length === 0 ? (
//                   <p className="text-gray-400 text-center py-8">No expenses yet</p>
//                 ) : (
//                   expenseHistory.map((exp, i) => (
//                     <div key={i} className="bg-black p-4 rounded-lg border border-gray-800">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <p className="font-semibold">{exp.description}</p>
//                           <p className="text-sm text-gray-400">{exp.category}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold text-lg">₹{exp.amount}</p>
//                           <p className="text-xs text-gray-500">
//                             {new Date(exp.date).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-1 space-y-6">
//             <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
//               <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

//               <textarea
//                 className="w-full p-4 bg-black border border-gray-700 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
//                 rows={5}
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Speak, upload, or type:
// • Paid 850 electricity bill
// • Spent 1200 on groceries"
//                 disabled={isProcessing || isRecording}
//               />

//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={isRecording ? stopRecording : startRecording}
//                   className={`px-4 py-4 rounded-lg ${
//                     isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-800 hover:bg-gray-700'
//                   } disabled:opacity-50 transition-all`}
//                   disabled={isProcessing}
//                 >
//                   <Mic size={24} className={isRecording ? "text-white animate-pulse" : "text-gray-300"} />
//                 </button>

//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileUpload}
//                   accept=".csv,.jpg,.jpeg,.png,.pdf"
//                   className="hidden"
//                 />

//                 <button
//                   onClick={() => fileInputRef.current?.click()}
//                   className="bg-gray-800 px-4 py-4 rounded-lg hover:bg-gray-700 disabled:opacity-50"
//                   disabled={isProcessing}
//                 >
//                   <Upload size={24} className="text-gray-300" />
//                 </button>

//                 <button
//                   onClick={handleSubmit}
//                   disabled={!inputValue.trim() || isProcessing || isRecording}
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 hover:from-blue-700 hover:to-purple-700"
//                 >
//                   {isProcessing ? (
//                     <>
//                       <Loader2 size={20} className="animate-spin" />
//                       Processing
//                     </>
//                   ) : (
//                     <>
//                       <Send size={20} />
//                       Add
//                     </>
//                   )}
//                 </button>
//               </div>

//               {isRecording && (
//                 <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-center">
//                   <p className="text-red-300 text-sm font-semibold animate-pulse">🎙️ Recording... Click to stop</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="lg:col-span-2">
//             <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800 mb-6">
//               <label className="text-sm text-gray-400">Total Monthly Budget</label>
//               <input
//                 type="number"
//                 value={totalBudgetInput}
//                 onChange={(e) => setTotalBudgetInput(Number(e.target.value))}
//                 className="w-full mt-2 bg-black border border-gray-700 p-3 rounded-lg"
//                 placeholder="Enter total budget"
//               />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="bg-[#1a1a1a] p-4 rounded-xl">
//                 <p className="text-gray-400 text-sm mb-1">Total Expenses</p>
//                 <p className="text-2xl font-bold">₹{totalExpenses}</p>
//               </div>

//               <div className="bg-[#1a1a1a] p-4 rounded-xl">
//                 <p className="text-gray-400 text-sm mb-1">Budget Used</p>
//                 <p className="text-2xl font-bold">{budgetUsed}%</p>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
//                   <div className="flex items-center gap-2 mb-2">
//                     <TrendingUp size={16} className="text-red-400" />
//                     <p className="text-gray-400 text-xs">Highest</p>
//                   </div>
//                   <p className="text-sm font-semibold">{highestExpense.category}</p>
//                   <p className="text-lg font-bold">₹{highestExpense.amount}</p>
//                 </div>

//                 <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800">
//                   <div className="flex items-center gap-2 mb-2">
//                     <TrendingDown size={16} className="text-green-400" />
//                     <p className="text-gray-400 text-xs">Lowest</p>
//                   </div>
//                   <p className="text-sm font-semibold">{lowestExpense.category}</p>
//                   <p className="text-lg font-bold">₹{lowestExpense.amount}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
//               <div className="flex gap-2 mb-4 overflow-x-auto">
//                 {tabs.map(t => (
//                   <button
//                     key={t.id}
//                     onClick={() => setActiveChart(t.id)}
//                     className={`px-4 py-2 rounded whitespace-nowrap ${
//                       activeChart === t.id ? "bg-blue-600" : "bg-gray-800"
//                     }`}
//                   >
//                     {t.label}
//                   </button>
//                 ))}
//               </div>

//               <div className="bg-[#0a0a0a] p-6 rounded-xl border border-gray-800">
//                 {activeChart === "pie" && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <PieChart>
//                       <Pie data={expenses} dataKey="amount" nameKey="category" outerRadius={140}>
//                         {expenses.map((e, i) => (
//                           <Cell key={i} fill={e.color} />
//                         ))}
//                       </Pie>
//                       <Tooltip />
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'bar' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <BarChart data={expenses}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis dataKey="category" stroke="#999" angle={-20} textAnchor="end" height={100} />
//                       <YAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Legend />
//                       <Bar dataKey="amount" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'line' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <LineChart data={expenses}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis dataKey="category" stroke="#999" />
//                       <YAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Line type="monotone" dataKey="amount" stroke="#45B7D1" strokeWidth={3} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'area' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <AreaChart data={expenses}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis dataKey="category" stroke="#999" />
//                       <YAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Area type="monotone" dataKey="amount" fill="#98D8C8" stroke="#45B7D1" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'radar' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <RadarChart data={expenses}>
//                       <PolarGrid stroke="#333" />
//                       <PolarAngleAxis dataKey="category" stroke="#999" />
//                       <PolarRadiusAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Radar dataKey="amount" stroke="#FF6B6B" fill="#FF6B6B" fillOpacity={0.6} />
//                     </RadarChart>
//                   </ResponsiveContainer>
//                 )}

//                 {activeChart === 'budget' && (
//                   <ResponsiveContainer width="100%" height={400}>
//                     <ComposedChart data={expenses}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//                       <XAxis dataKey="category" stroke="#999" />
//                       <YAxis stroke="#999" />
//                       <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
//                       <Legend />
//                       <Bar dataKey="budget" fill="#4CAF50" name="Budget" />
//                       <Bar dataKey="amount" fill="#FF6B6B" name="Actual" />
//                       <Line type="monotone" dataKey="amount" stroke="#FFA726" strokeWidth={2} />
//                     </ComposedChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// new version with updated 









import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mic, Send, Loader2, Upload, TrendingUp, 
  TrendingDown, Check, X, History, LogOut, User, Brain
} from "lucide-react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis,
  LineChart, Line,
  AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart,
  ResponsiveContainer, Legend, Tooltip, CartesianGrid
} from "recharts";


// CONFIGURATION


const BACKEND_URL = "http://localhost:3000"; 
// Changed from 3001 to match your server.js

// UTILITY FUNCTIONS
// ============================================

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function Home() {
  const navigate = useNavigate();
  
  // ============================================
  // STATE MANAGEMENT
 
  
  // Input & UI State
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeChart, setActiveChart] = useState("bar");
  
  // User & Budget State
  const [currentUser, setCurrentUser] = useState(null);
  const [totalBudgetInput, setTotalBudgetInput] = useState(0);
  
  // Expense State
  const [expenses, setExpenses] = useState([
    { category: "Utility Bills", amount: 0, color: "#FF6B6B", budget: 0 },
    { category: "Shopping", amount: 0, color: "#4ECDC4", budget: 0 },
    { category: "Food", amount: 0, color: "#45B7D1", budget: 0 },
    { category: "Transport", amount: 0, color: "#FFA07A", budget: 0 },
    { category: "Entertainment", amount: 0, color: "#98D8C4", budget: 0 },
    { category: "Others", amount: 0, color: "#F7DC6F", budget: 0 },
  ]);
  
  // Confirmation & History State
  const [pendingExpense, setPendingExpense] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [expenseHistory, setExpenseHistory] = useState([]);
  
  // Notification State
  const [notification, setNotification] = useState(null);
  
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const fileInputRef = useRef(null);

  
  // EFFECTS
  
  
  useEffect(() => {
    loadCurrentUser();
    loadBudget();
    loadTodaysSummary();
  }, []);

  useEffect(() => {
    if (totalBudgetInput > 0) {
      saveBudget(totalBudgetInput);
    }
  }, [totalBudgetInput]);

  // ============================================
  // USER MANAGEMENT
  
  
  const loadCurrentUser = () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        setCurrentUser(JSON.parse(user));
      } else {
        // If no user, redirect to login
        navigate('/login');
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // ============================================
  // BUDGET MANAGEMENT
  // ============================================
  
  const loadBudget = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/budget/current`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch budget');
      }
      
      const data = await response.json();
      
      if (data.success && data.budget) {
        setTotalBudgetInput(data.budget.totalBudget);
        
        setExpenses(prev => prev.map(e => ({
          ...e,
          budget: data.budget.categoryBudgets[e.category] || 0
        })));
      }
    } catch (error) {
      console.error('Failed to load budget:', error);
      // Don't show error to user for first-time load
    }
  };

  const saveBudget = async (newBudget) => {
    try {
      const perCategory = Math.floor(newBudget / expenses.length);
      const categoryBudgets = {};
      
      expenses.forEach(e => {
        categoryBudgets[e.category] = perCategory;
      });

      const response = await fetch(`${BACKEND_URL}/api/budget/update`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          totalBudget: newBudget,
          categoryBudgets
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save budget');
      }

      setExpenses(prev => prev.map(e => ({ ...e, budget: perCategory })));
    } catch (error) {
      console.error('Failed to save budget:', error);
      showNotification('Failed to save budget', 'error');
    }
  };

  // ============================================
  // EXPENSE LOADING
  // ============================================
  
  const loadTodaysSummary = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/expenses/daily-summary`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }
      
      const data = await response.json();
      
      if (data.success && data.summary.byCategory) {
        setExpenses(prev => prev.map(e => ({
          ...e,
          amount: data.summary.byCategory[e.category]?.amount || 0
        })));
      }
    } catch (error) {
      console.error('Failed to load summary:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/expenses/history`, {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setExpenseHistory(data.expenses || []);
        setShowHistory(true);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
      showNotification('Failed to load expense history', 'error');
    }
  };

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  
  // TEXT INPUT HANDLING
  
  
  const handleSubmit = async () => {
    if (!inputValue.trim()) {
      showNotification('Please enter an expense', 'error');
      return;
    }

    console.log('Submitting text:', inputValue);
    setIsProcessing(true);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/categorize`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ text: inputValue })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(' Categorization result:', data);
      
      if (data.success && data.expense) {
        // Check if auto-confirmed
        if (data.autoConfirmed) {
          console.log(' Expense was auto-confirmed!');
          
          // Update UI immediately
          setExpenses(prev => prev.map(e => 
            e.category === data.expense.category
              ? { ...e, amount: e.amount + data.expense.amount }
              : e
          ));
          
          // Show success notification
          showNotification(
            data.matchedKeyword 
              ? `✨ Auto-saved ${formatCurrency(data.expense.amount)} to ${data.expense.category}! (Learned from "${data.matchedKeyword}")`
              : `Saved ${formatCurrency(data.expense.amount)} to ${data.expense.category}!`,
            'success'
          );
          
          setInputValue("");
        } else {
          // Needs confirmation
          console.log('Setting pending expense:', data.expense);
          setPendingExpense({ ...data.expense, source: 'text' });
          setShowConfirmation(true);
          
          // Show suggestion notification if from pattern
          if (data.suggestedFromPattern) {
            showNotification(
              `💡 ${data.message}`,
              'info'
            );
          }
        }
      } else {
        console.error(' Invalid response:', data);
        showNotification(data.message || 'Failed to categorize expense', 'error');
      }
    } catch (error) {
      console.error('Backend error:', error);
      showNotification(`Failed to connect to server: ${error.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ============================================
  // EXPENSE CONFIRMATION
  // ============================================
  
  const confirmExpense = async () => {
    if (!pendingExpense) return;

    console.log('🔵 Confirming expense:', pendingExpense);

    try {
      const response = await fetch(`${BACKEND_URL}/api/expenses/confirm`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(pendingExpense)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);
      
      if (data.success) {
        console.log('Updating UI for category:', pendingExpense.category);
        
        // Update local state
        setExpenses(prev => {
          const updated = prev.map(e => 
            e.category === pendingExpense.category
              ? { ...e, amount: e.amount + pendingExpense.amount }
              : e
          );
          console.log(' New expenses state:', updated);
          return updated;
        });
        
        // Clear states
        setInputValue("");
        setShowConfirmation(false);
        setPendingExpense(null);
        
        // Show success notification
        showNotification(
          data.message || `✅ Saved ${formatCurrency(pendingExpense.amount)} to ${pendingExpense.category}!`,
          'success'
        );
        
        console.log('✅ Expense confirmed successfully!');
      } else {
        throw new Error(data.message || 'Failed to save expense');
      }
    } catch (error) {
      console.error('❌ Failed to save:', error);
      showNotification(`Failed to save expense: ${error.message}`, 'error');
    }
  };

  const rejectExpense = () => {
    setShowConfirmation(false);
    setPendingExpense(null);
    showNotification('Expense cancelled', 'info');
  };

  // ============================================
  // AUDIO RECORDING
  // ============================================
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendAudioToBackend(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Microphone access error:', error);
      showNotification('Microphone access denied. Please check permissions.', 'error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    setIsProcessing(true);
    
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/api/analyze-audio`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.expense) {
        setInputValue(data.transcription || '');
        setPendingExpense({ ...data.expense, source: 'audio' });
        setShowConfirmation(true);
      } else {
        throw new Error(data.message || 'Failed to analyze audio');
      }
    } catch (error) {
      console.error('Audio analysis failed:', error);
      showNotification(`Failed to analyze audio: ${error.message}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  // ============================================
  // FILE UPLOAD
  // ============================================
  
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('File too large. Maximum size is 10MB', 'error');
      return;
    }

    setIsProcessing(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BACKEND_URL}/api/analyze-file`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.expenses && data.expenses.length > 0) {
        // For multiple expenses, confirm first one
        setPendingExpense({ ...data.expenses[0], source: 'file' });
        setShowConfirmation(true);
        
        // Store remaining for later processing
        if (data.expenses.length > 1) {
          showNotification(
            `Found ${data.expenses.length} expenses. Please confirm one by one.`,
            'info'
          );
        }
      } else {
        throw new Error(data.message || 'No expenses found in file');
      }
    } catch (error) {
      console.error('File upload failed:', error);
      showNotification(`Failed to analyze file: ${error.message}`, 'error');
    } finally {
      setIsProcessing(false);
      e.target.value = ''; // Reset file input
    }
  };

  // ============================================
  // COMPUTED VALUES
  // ============================================
  
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalBudget = expenses.reduce((sum, e) => sum + e.budget, 0);
  const budgetUsed = totalBudget > 0 ? ((totalExpenses / totalBudget) * 100).toFixed(1) : 0;

  const highestExpense = expenses.reduce((a, b) => a.amount > b.amount ? a : b);
  const lowestExpense = expenses.reduce((a, b) => a.amount < b.amount ? a : b);

  // ============================================
  // CHART CONFIGURATION
  // ============================================
  
  const tabs = [
    { id: "bar", label: "Bar Chart" },
    { id: "pie", label: "Pie Chart" },
    { id: "line", label: "Line Chart" },
    { id: "area", label: "Area Chart" },
    { id: "radar", label: "Radar Chart" },
    { id: "budget", label: "Budget vs Actual" }
  ];

  // ============================================
  // RENDER
  // ============================================
  
  return (
    <div className="min-h-screen w-full bg-black text-white p-6 ovverflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">AI Expense Tracker</h1>
            <p className="text-gray-400">Record, upload, or type your expenses</p>
          </div>
          
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                <User size={20} className="text-gray-400" />
                <span className="text-sm">{currentUser.name || currentUser.email}</span>
              </div>
            )}
            
            <button
              onClick={() => navigate('/history')}
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              <History size={20} />
              History
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Notification Banner */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md animate-slide-in ${
            notification.type === 'success' ? 'bg-green-600' : 
            notification.type === 'info' ? 'bg-blue-600' : 
            notification.type === 'error' ? 'bg-red-600' :
            'bg-gray-800'
          }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' && <Check size={20} />}
              {notification.type === 'info' && <Brain size={20} />}
              {notification.type === 'error' && <X size={20} />}
              <p className="text-white font-medium">{notification.message}</p>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmation && pendingExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-[#1a1a1a] rounded-xl p-6 max-w-md w-full border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Confirm Expense</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount:</span>
                  <span className="font-bold text-xl">{formatCurrency(pendingExpense.amount)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="font-bold">{pendingExpense.category}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Description:</span>
                  <span className="text-sm">{pendingExpense.description}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-400">Source:</span>
                  <span className="uppercase text-xs text-blue-400">{pendingExpense.source}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={rejectExpense}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  <X size={20} />
                  Cancel
                </button>
                
                <button
                  onClick={confirmExpense}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Check size={20} />
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* History Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1a1a] rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Expense History</h3>
                <button 
                  onClick={() => setShowHistory(false)} 
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                {expenseHistory.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No expenses yet</p>
                ) : (
                  expenseHistory.map((exp, i) => (
                    <div key={exp._id || i} className="bg-black p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-lg">{exp.description || exp.title}</p>
                          <p className="text-sm text-gray-400">{exp.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-xl">{formatCurrency(exp.amount)}</p>
                          <p className="text-xs text-gray-400">{formatDate(exp.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Input */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

              <textarea
                className="w-full bg-black border border-gray-700 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                rows={5}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type, upload, or record:
• Paid 850 electricity bill
• Spent 1200 on groceries
• 500 for uber ride"
                disabled={isProcessing || isRecording}
              />

              <div className="flex gap-3 mt-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-4 rounded-lg transition-all ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-gray-800 hover:bg-gray-700'
                  } disabled:opacity-50`}
                  disabled={isProcessing}
                  title={isRecording ? "Stop recording" : "Start recording"}
                >
                  <Mic size={20} className={isRecording ? "text-white animate-pulse" : "text-gray-300"} />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv,.jpg,.jpeg,.png,.pdf"
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition"
                  disabled={isProcessing}
                  title="Upload file"
                >
                  <Upload size={20} className="text-gray-300" />
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim() || isProcessing || isRecording}
                  className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg px-6 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 hover:from-blue-700 hover:to-purple-700 transition"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Add
                    </>
                  )}
                </button>
              </div>

              {isRecording && (
                <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-center">
                  <p className="text-red-300 text-sm font-semibold animate-pulse">
                    Recording... Click mic to stop
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Stats & Charts */}
          <div className="lg:col-span-1">
            {/* Budget Input */}
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-700 mb-6">
              <label className="text-sm text-gray-400 mb-2 block">Set Monthly Budget</label>
              <input
                type="text"
                inputMode="numeric"
                value={totalBudgetInput || ''}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setTotalBudgetInput(value ? Number(value) : 0);
                }}
                onFocus={(e) => {
                  if (e.target.value === '0') {
                    setTotalBudgetInput('');
                  }
                }}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setTotalBudgetInput(0);
                  }
                }}
                className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter total budget"
              />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a1a1a] p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Total Expenses</p>
                <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
              </div>

              <div className="bg-[#1a1a1a] p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-1">Budget Used</p>
                <p className={`text-2xl font-bold ${
                  budgetUsed > 90 ? 'text-red-500' : 
                  budgetUsed > 70 ? 'text-yellow-500' : 
                  'text-green-500'
                }`}>{budgetUsed}%</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-red-400" />
                  <p className="text-gray-400 text-xs">Highest</p>
                </div>
                <p className="text-sm font-semibold">{highestExpense.category}</p>
                <p className="text-lg font-bold">{formatCurrency(highestExpense.amount)}</p>
              </div>

              <div className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown size={16} className="text-green-400" />
                  <p className="text-gray-400 text-xs">Lowest</p>
                </div>
                <p className="text-sm font-semibold">{lowestExpense.category}</p>
                <p className="text-lg font-bold">{formatCurrency(lowestExpense.amount)}</p>
              </div>
            </div>

            {/* Charts */}
            <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-700">
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {tabs.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveChart(t.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                      activeChart === t.id ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="bg-[#0a0a0a] p-6 rounded-xl border border-gray-800">
                {activeChart === "pie" && (
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie 
                        data={expenses} 
                        dataKey="amount" 
                        nameKey="category" 
                        outerRadius={140}
                        label={(entry) => `${entry.category}: ${formatCurrency(entry.amount)}`}
                      >
                        {expenses.map((e, i) => (
                          <Cell key={`cell-${i}`} fill={e.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}

                {activeChart === 'bar' && (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={expenses}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis 
                        dataKey="category" 
                        stroke="#888" 
                        angle={0} 
                        textAnchor="end" 
                        height={100} 
                      />
                      <YAxis stroke="#888" />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="amount" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {activeChart === 'line' && (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={expenses}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="category" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#4ECDC4" 
                        strokeWidth={3}
                        dot={{ fill: '#4ECDC4', r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}



             {activeChart === 
'area' && (
                   
      <ResponsiveContainer width="100%" height=
      {400}>
                     <AreaChart data=
    {expenses}>
                       <CartesianGrid 
strokeDasharray="3 3" stroke="#333" />                       <XAxis 
dataKey="category" stroke="#999" />
                       <YAxis 
stroke="#999" />
                       <Tooltip 
formatter={(value) => `₹${value.
toLocaleString()}`} />
                       <Area 
type="monotone" dataKey="amount" 
fill="#98D8C8" stroke="#45B7D1" />
                     </AreaChart>
                   </ResponsiveContainer>
                 )}
               
               
               
               
               
               
               
               
               
               
               
               
               
               
               
               
               

                {activeChart === 'radar' && (
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={expenses}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="category" stroke="#888" />
                      <PolarRadiusAxis stroke="#888" />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Radar 
                        dataKey="amount" 
                        stroke="#4ECDC4" 
                        fill="#4ECDC4" 
                        fillOpacity={0.6} 
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                )}

                {activeChart === 'budget' && (
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={expenses}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="category" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="budget" fill="#888" name="Budget" />
                      <Bar dataKey="amount" fill="#4ECDC4" name="Actual" />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#FF6B6B" 
                        strokeWidth={2} 
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}



























































































































































































































































































































































































































































































































































































































































































































































































































































































































































