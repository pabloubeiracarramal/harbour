import { useState, useEffect } from 'react';
import { dockerApi } from '../../../utils/dockerApi';

const useFetchDockerInfo = () => {
    const [dockerInfo, setDockerInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDockerInfo = async () => {
        setLoading(true);
        console.log('Fetching Docker info...');
        try {
            const data = await dockerApi.getInfo();
            if (data.success) {
                console.log('Docker info fetched successfully:', data.data);
                setDockerInfo(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch Docker info:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDockerInfo();
    }, []);

    return { dockerInfo, loading };

};

export default useFetchDockerInfo;