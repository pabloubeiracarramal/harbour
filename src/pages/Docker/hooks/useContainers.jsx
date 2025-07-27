import { useState, useEffect } from 'react';
import { dockerApi } from '../../../utils/dockerApi';

const useContainers = () => {
    const [containers, setContainers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAllContainers, setShowAllContainers] = useState(false);

    const fetchContainers = async () => {
        setLoading(true);
        console.log('Fetching Docker containers...');
        try {
            const data = await dockerApi.containers.list(showAllContainers);
            if (data.success) {
                console.log('Docker containers fetched successfully:', data.data);
                setContainers(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch Docker containers:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContainers();
    }, [showAllContainers]);

    return { 
        containers, 
        loading, 
        showAllContainers, 
        setShowAllContainers, 
        refetchContainers: fetchContainers 
    };
};

export default useContainers;