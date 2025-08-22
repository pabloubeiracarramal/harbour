import './Login.scss'
import { FaGithub } from 'react-icons/fa'
import useLogIn from './hooks/useLogIn'
import { useEffect } from 'react';

function Login() {

  const { logIn, callback } = useLogIn();

  const handleLogin = () => {
    logIn();
  };

  const handleCallback = () => {
    const url = new URL(window.location.href);
    if (url.pathname === '/auth/github/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      callback(code, state);
    }
  };

  useEffect(() => {
    handleCallback();
  }, []);

  return (
    <div className="page">
      <div className="login">
        <h1>HARBOUR</h1>
        <div className='login-button' onClick={handleLogin}><p>Log In with GitHub</p> <FaGithub size={20} /></div>
      </div>
    </div>
  )
}

export default Login;
