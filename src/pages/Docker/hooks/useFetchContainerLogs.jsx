import { useState, useEffect, useCallback } from 'react';
import dockerApi from '../../../utils/dockerApi';

const useFetchContainerLogs = (containerId) => {
    const [logs, setLogs] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLogs = useCallback(async () => {
        if (!containerId) return;
        setLoading(true);
        console.log(`Fetching logs for container ${containerId}...`);
        setError(null);
        try {
            const data = await dockerApi.containers.logs(containerId, { stdout: true, stderr: true, tail: '100' });
            if (data.success) {
                console.log('Container logs fetched successfully:', data.data.logs);
                setLogs(data.data.logs);
            }
        } catch (err) {
            console.error(`Failed to fetch logs for container ${containerId}:`, err);
            setError(err);
            setLogs('');
        } finally {
            setLoading(false);
        }
    }, [containerId]);

    useEffect(() => {
        if (containerId) {
            fetchLogs();
        }
    }, [containerId, fetchLogs]);

    return { logs, loading, error, fetchLogs };
};

export default useFetchContainerLogs;