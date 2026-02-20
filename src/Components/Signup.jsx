// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { Mail, Lock, User as UserIcon, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

// // ============================================
// // CONFIGURATION
// // ============================================

// const BACKEND_URL = "http://localhost:3000";

// // ============================================
// // SIGNUP COMPONENT
// // ============================================

// export default function Signup() {
//   const navigate = useNavigate();
  
//   // State
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [passwordStrength, setPasswordStrength] = useState('');

//   // ============================================
//   // VALIDATION
//   // ============================================

//   const checkPasswordStrength = (password) => {
//     if (password.length === 0) return '';
//     if (password.length < 6) return 'weak';
//     if (password.length >= 6 && password.length < 10) return 'medium';
//     if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong';
//     return 'medium';
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));

//     // Check password strength
//     if (name === 'password') {
//       setPasswordStrength(checkPasswordStrength(value));
//     }
//   };

//   // ============================================
//   // FORM HANDLERS
//   // ============================================

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       setError('Please enter your name');
//       return false;
//     }

//     if (!formData.email.trim() || !formData.email.includes('@')) {
//       setError('Please enter a valid email address');
//       return false;
//     }

//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!validateForm()) return;

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password
//         })
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Save token and user info
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
        
//         // Redirect to home
//         navigate('/home', { replace:true});
//       } else {
//         setError(data.message || 'Signup failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Signup error:', error);
//       setError('Failed to connect to server. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignup = () => {
//     // Redirect to backend Google OAuth endpoint
//     window.location.href = `${BACKEND_URL}/api/auth/google`;
//   };

//   // ============================================
//   // RENDER
//   // ============================================

//   const getPasswordStrengthColor = () => {
//     switch (passwordStrength) {
//       case 'weak': return 'bg-red-500';
//       case 'medium': return 'bg-yellow-500';
//       case 'strong': return 'bg-green-500';
//       default: return 'bg-gray-700';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-r from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
//           <p className="text-gray-400">Start tracking your expenses with AI</p>
//         </div>

//         {/* Signup Card */}
//         <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 shadow-2xl">
//           {/* Error Message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg flex items-start gap-3">
//               <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
//               <p className="text-red-400 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Signup Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Name Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full bg-black border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="John Doe"
//                   disabled={isLoading}
//                   autoComplete="name"
//                 />
//               </div>
//             </div>

//             {/* Email Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full bg-black border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="you@example.com"
//                   disabled={isLoading}
//                   autoComplete="email"
//                 />
//               </div>
//             </div>

//             {/* Password Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full bg-black border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="••••••••"
//                   disabled={isLoading}
//                   autoComplete="new-password"
//                 />
//               </div>
              
//               {/* Password Strength Indicator */}
//               {passwordStrength && (
//                 <div className="mt-2">
//                   <div className="flex items-center gap-2 mb-1">
//                     <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
//                       <div 
//                         className={`h-full transition-all ${getPasswordStrengthColor()}`}
//                         style={{ 
//                           width: passwordStrength === 'weak' ? '33%' : 
//                                  passwordStrength === 'medium' ? '66%' : '100%' 
//                         }}
//                       ></div>
//                     </div>
//                     <span className={`text-xs font-medium ${
//                       passwordStrength === 'weak' ? 'text-red-500' :
//                       passwordStrength === 'medium' ? 'text-yellow-500' :
//                       'text-green-500'
//                     }`}>
//                       {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Confirm Password Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full bg-black border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="••••••••"
//                   disabled={isLoading}
//                   autoComplete="new-password"
//                 />
//                 {formData.confirmPassword && formData.password === formData.confirmPassword && (
//                   <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
//                 )}
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 size={20} className="animate-spin" />
//                   Creating account...
//                 </>
//               ) : (
//                 'Create Account'
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-4 my-6">
//             <div className="flex-1 h-px bg-gray-700"></div>
//             <span className="text-gray-500 text-sm">OR</span>
//             <div className="flex-1 h-px bg-gray-700"></div>
//           </div>

//           {/* Google Signup Button */}
//           <button
//             onClick={handleGoogleSignup}
//             disabled={isLoading}
//             className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Continue with Google
//           </button>

//           {/* Login Link */}
//           <div className="mt-6 text-center">
//             <p className="text-gray-400 text-sm">
//               Already have an account?{' '}
//               <Link 
//                 to="/login" 
//                 className="text-blue-500 hover:text-blue-400 font-semibold"
//               >
//                 Sign In
//               </Link>
//             </p>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 text-center">
//           <p className="text-gray-500 text-sm">
//             By creating an account, you agree to our Terms & Privacy Policy
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }













import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const BACKEND_URL = "http://localhost:3000"; // FIXED: Changed from 3001 to 3000

export default function Signup() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const checkPasswordStrength = (password) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'weak';
    if (password.length >= 6 && password.length < 10) return 'medium';
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong';
    return 'medium';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        navigate('/home', { replace: true });
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Failed to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Start tracking your expenses with AI</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-500 flex shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>
              
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${getPasswordStrengthColor()}`}
                        style={{ 
                          width: passwordStrength === 'weak' ? '33%' : 
                                 passwordStrength === 'medium' ? '66%' : '100%' 
                        }}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${
                      passwordStrength === 'weak' ? 'text-red-500' :
                      passwordStrength === 'medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-400 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            By creating an account, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

