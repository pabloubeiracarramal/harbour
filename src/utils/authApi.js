// Auth API utility functions

const API_BASE = import.meta.env.CRANE_API_BASE || 'http://localhost:3000';

export const authApi = {

    codeTokenExchange: async (code) => {
        const response = await fetch(`${API_BASE}/auth/github`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        });
        return response.json();
    }

}

export default authApi;