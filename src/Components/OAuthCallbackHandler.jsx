// import { useEffect, useState } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Loader2, AlertCircle } from 'lucide-react';

// const BACKEND_URL = "http://localhost:3000"; // FIXED: Changed from 3001 to 3000

// export default function OAuthCallbackHandler() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [error, setError] = useState('');

//   useEffect(() => {
//     handleCallback();
//   }, []);

//   const handleCallback = async () => {
//     try {
//       const token = searchParams.get('token');
//       const errorParam = searchParams.get('error');

//       if (errorParam) {
//         setError('OAuth authentication failed');
//         setTimeout(() => navigate('/login'), 2000);
//         return;
//       }

//       if (!token) {
//         setError('No authentication token received');
//         setTimeout(() => navigate('/login'), 2000);
//         return;
//       }

//       if (token.split('.').length !== 3) {
//         setError('Invalid token received');
//         setTimeout(() => navigate('/login'), 2000);
//         return;
//       }

//       try {
//         localStorage.setItem('token', token);

//         const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (!response.ok || !data.success) {
//           throw new Error('User fetch failed');
//         }

//         localStorage.setItem('user', JSON.stringify(data.user));

//         navigate('/home', { replace: true });
//       } catch (err) {
//         console.error(err);
//         setError('Authentication failed');
//         setTimeout(() => navigate('/login'), 2000);
//       }
//     } catch (error) {
//       console.error('Callback error:', error);
//       setError('An unexpected error occurred');
//       setTimeout(() => navigate('/login'), 2000);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
//       <div className="text-center">
//         {error ? (
//           <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 max-w-md">
//             <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold text-white mb-2">
//               Authentication Failed
//             </h2>
//             <p className="text-gray-400 mb-4">{error}</p>
//             <p className="text-sm text-gray-500">
//               Redirecting to login...
//             </p>
//           </div>
//         ) : (
//           <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
//             <Loader2 size={48} className="text-blue-500 mx-auto mb-4 animate-spin" />
//             <h2 className="text-2xl font-bold text-white mb-2">
//               Completing Sign In
//             </h2>
//             <p className="text-gray-400">
//               Please wait while we authenticate your account...
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// second one 
// 
// 
// import { useEffect, useState } from 'react';
// // import { useNavigate, useSearchParams } from 'react-router-dom';
// import { Loader2, AlertCircle } from 'lucide-react';
// 
// // const BACKEND_URL = "http://localhost:3001"; // FIXED: Changed from 3001 to 3000
// 
// export default function OAuthCallbackHandler() {
  // const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const [error, setError] = useState('');
// 
  // useEffect(() => {
    // handleCallback();
  // }, []);
// 
  // const handleCallback = async () => {
    // try {
      // const token = searchParams.get('token');
      // const errorParam = searchParams.get('error');
// 
      // if (errorParam) {
        // setError('OAuth authentication failed');
        // setTimeout(() => navigate('/login'), 2000);
        // return;
      // }
// 
      // if (!token) {
        // setError('No authentication token received');
        // setTimeout(() => navigate('/login'), 2000);
        // return;
      // }
// 
      // if (token.split('.').length !== 3) {
        // setError('Invalid token received');
        // setTimeout(() => navigate('/login'), 2000);
        // return;
      // }
// 
      // try {
        // localStorage.setItem('token', token);
// 
        // // const response = await fetch(`${BACKEND_URL}/api/auth/me`, {
          // headers: {
            // Authorization: `Bearer ${token}`,
          // },
        // });
// 
        // const data = await response.json();
// 
        // if (!response.ok || !data.success) {
          // throw new Error('User fetch failed');
        // }
// 
        // // localStorage.setItem('user', JSON.stringify(data.user));
// 
        // navigate('/home', { replace: true });
      // } catch (err) {
        // console.error(err);
        // setError('Authentication failed');
        // setTimeout(() => navigate('/login'), 2000);
      // }
    // } catch (error) {
      // console.error('Callback error:', error);
      // setError('An unexpected error occurred');
      // setTimeout(() => navigate('/login'), 2000);
    // }
  // };
// 
  // return (
    // // // <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      {/* <div className="text-center"> */}
        {/* {error ? ( */}
          // // <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 max-w-md">
            {/* {/* <AlertCircle size={48} className="text-red-500 mx-auto mb-4" /> */} 
            {/* {/* <h2 className="text-2xl font-bold text-white mb-2"> */} 
              {/* Authentication Failed */}
            {/* </h2> */}
            {/* <p className="text-gray-400 mb-4">{error}</p> */}
            {/* <p className="text-sm text-gray-500"> */}
              {/* Redirecting to login... */}
            {/* </p> */}
          {/* </div> */}
        // ) : (
          // // <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
            {/* {/* <Loader2 size={48} className="text-blue-500 mx-auto mb-4 animate-spin" /> */} 
            {/* {/* <h2 className="text-2xl font-bold text-white mb-2"> */} 
              {/* Completing Sign In */}
            {/* </h2> */}
            {/* <p className="text-gray-400"> */}
              {/* {/* Please wait while we authenticate your account... */} 
            {/* </p> */}
          {/* </div> */}
        // )}
      {/* </div> */}
    {/* </div> */}
  // );
// }
// 





import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';

const BACKEND_URL = 'http://localhost:3000';

export default function OAuthCallbackHandler() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');

    if (errorParam || !token) {
      setError('OAuth login failed');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    if (token.split('.').length !== 3) {
      setError('Invalid token');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    localStorage.setItem('token', token);

    fetch(`${BACKEND_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) throw new Error();
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/home', { replace: true });
      })
      .catch(() => {
        setError('Authentication failed');
        setTimeout(() => navigate('/login'), 2000);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {error ? (
        <div className="text-center text-red-400">
          <AlertCircle size={40} className="mx-auto mb-4" />
          {error}
        </div>
      ) : (
        <div className="text-center text-white">
          <Loader2 size={40} className="animate-spin mx-auto mb-4" />
          Signing you in...
        </div>
      )}
    </div>
  );
}



















;



 


 























