import { useCallback } from 'react';
import authApi from '../../../utils/authApi';
import { useNavigate } from 'react-router-dom';

const useLogIn = () => {
    const navigate = useNavigate();

    const logIn = () => {

        console.log("Attempting to log in with GitHub...");

        // 1. Generate a random state value
        const state = Math.random().toString(36).substring(2, 15);

        // 2. Store the state value in local storage to verify it later
        localStorage.setItem('oauth_state', state);

        // 3. Construct the authorization URL
        const GITHUB_CLIENT_ID = 'Ov23lirrxstJPbLGjdlm';
        const redirectURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&state=${state}&scope=read:user`;

        // 4. Redirect the user to the authorization URL
        window.location.href = redirectURL;
    }

    const callback = (code, receivedState) => {

        // 1. Retrieve the stored state
        const storedState = localStorage.getItem('oauth_state');

        // 2. Verify the received state matches the stored state
        if (!receivedState || storedState !== receivedState) {
            console.error('Authentication failed. State mismatch. Please try again.');
            localStorage.removeItem('oauth_state');
            return;
        }

        // 3. Clean up the stored state
        localStorage.removeItem('oauth_state');

        // 4. Send the 'code' to the backend server
        authApi.codeTokenExchange(code)
            .then(data => {
                if (data.error) {
                    console.error('Authentication failed. Please try again.');
                    return;
                }

                // Store the access token in local storage
                localStorage.setItem('access_token', data.access_token);

                navigate('/servers');

            });

    };

    return { logIn, callback };

};

export default useLogIn;