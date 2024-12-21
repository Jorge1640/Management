import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Form = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError('Failed to login. Please try again.');
    }
  }, [searchParams]);

  const handleGoogleLogin = () => {
    // Agrega el parámetro redirect_uri a la URL de autorización
    const redirectUri = encodeURIComponent('http://localhost:3000/');
    window.location.href = `http://localhost:8080/oauth2/authorization/google?redirect_uri=${redirectUri}`;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="relative w-full max-w-md mx-4">
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
        
        <div className="relative backdrop-blur-sm bg-zinc-900/90 p-8 rounded-2xl shadow-2xl border border-zinc-800/50">
          {/* Header Section */}
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              Welcome Back
            </h2>
            <p className="text-zinc-400 text-sm">
              Sign in with your social media account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Google Login Button */}
          <button 
            onClick={handleGoogleLogin}
            className="group relative w-full bg-zinc-800 hover:bg-zinc-700 text-white p-4 rounded-xl transition-all duration-300 ease-in-out border border-zinc-700/50 hover:border-zinc-600 flex items-center justify-center space-x-3 overflow-hidden"
          >
            {/* Hover effect background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Google Icon */}
            <svg className="w-5 h-5" version="1.1" viewBox="0 0 512 512">
              <path fill="#FBBB00" d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"/>
              <path fill="#518EF8" d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"/>
              <path fill="#28B446" d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"/>
              <path fill="#F14336" d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"/>
            </svg>
            <span className="relative text-sm font-medium">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800"></div>
            <span className="text-zinc-500 text-sm font-medium">or</span>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800"></div>
          </div>

          {/* Sign Up Section */}
          <div className="text-center space-y-6">
            <p className="text-zinc-400 text-sm">
              Don't have an account?{' '}
              <a href="/auth/signup" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Sign up
              </a>
            </p>

            {/* Terms and Privacy */}
            <p className="text-zinc-500 text-xs px-6">
              By continuing, you agree to our{' '}
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-300">
                Terms of Service
              </span>
              {' '}and{' '}
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors duration-300">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;