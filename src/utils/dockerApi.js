// Docker API utility functions
const API_BASE = 'http://yardmaster.pabloubeiracarramal.com';

export const dockerApi = {
    // Docker info
    getInfo: async () => {
        const response = await fetch(`${API_BASE}/api/docker/info`);
        return response.json();
    },

    // Container operations
    containers: {
        list: async (showAll = false) => {
            const response = await fetch(`${API_BASE}/api/docker/containers?all=${showAll}`);
            return response.json();
        },

        get: async (id) => {
            const response = await fetch(`${API_BASE}/api/docker/containers/${id}`);
            return response.json();
        },

        start: async (id) => {
            const response = await fetch(`${API_BASE}/api/docker/containers/${id}/start`, {
                method: 'POST'
            });
            return response.json();
        },

        stop: async (id, timeout = 10) => {
            const response = await fetch(`${API_BASE}/api/docker/containers/${id}/stop?timeout=${timeout}`, {
                method: 'POST'
            });
            return response.json();
        },

        restart: async (id, timeout = 10) => {
            const response = await fetch(`${API_BASE}/api/docker/containers/${id}/restart?timeout=${timeout}`, {
                method: 'POST'
            });
            return response.json();
        },

        remove: async (id, force = false, volumes = false) => {
            const params = new URLSearchParams({ force, volumes });
            const response = await fetch(`${API_BASE}/api/docker/containers/${id}?${params}`, {
                method: 'DELETE'
            });
            return response.json();
        },

        logs: async (id, options = {}) => {
            const params = new URLSearchParams({
                stdout: 'true',
                stderr: 'true',
                tail: '100',
                ...options
            });
            const response = await fetch(`${API_BASE}/api/docker/containers/${id}/logs?${params}`);
            return response.json();
        },

        run: async (config) => {
            const response = await fetch(`${API_BASE}/api/docker/containers/run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(config)
            });
            return response.json();
        }
    },

    // Image operations
    images: {
        list: async (showAll = false, dangling = false) => {
            const params = new URLSearchParams({ all: showAll, dangling });
            const response = await fetch(`${API_BASE}/api/docker/images?${params}`);
            return response.json();
        },

        pull: async (image, tag = 'latest') => {
            const response = await fetch(`${API_BASE}/api/docker/images/pull`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image, tag })
            });
            return response.json();
        },

        remove: async (id, force = false, noprune = false) => {
            const params = new URLSearchParams({ force, noprune });
            const response = await fetch(`${API_BASE}/api/docker/images/${id}?${params}`, {
                method: 'DELETE'
            });
            return response.json();
        }
    },

    // Health check
    health: async () => {
        const response = await fetch(`${API_BASE}/health`);
        return response.json();
    }
};

// Utility functions
export const utils = {
    formatBytes: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    formatDate: (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString();
    },

    getStatusText: (state) => {
        const statusMap = {
            running: 'Running',
            exited: 'Stopped',
            created: 'Created',
            paused: 'Paused',
            restarting: 'Restarting',
            removing: 'Removing',
            dead: 'Dead'
        };
        return statusMap[state] || state;
    },

    parsePortMappings: (ports) => {
        if (!ports || ports.length === 0) return 'None';
        return ports
            .filter(p => p.PublicPort)
            .map(p => `${p.PublicPort}:${p.PrivatePort}`)
            .join(', ') || 'Internal only';
    },

    formatImageName: (repoTags) => {
        if (!repoTags || repoTags.length === 0) return '<none>:<none>';
        return repoTags[0];
    },

    truncateId: (id, length = 12) => {
        return id.substring(id.startsWith('sha256:') ? 7 : 0, length);
    }
};

export default dockerApi;
