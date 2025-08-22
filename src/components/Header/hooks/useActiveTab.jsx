import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useActiveTab = () => {
    const location = useLocation();

    const path = location.pathname;

    let activeTab = ''

    if (path.startsWith('/server')) {
        activeTab = 'server';
    }

    if (path.startsWith('/deploys')) {
        activeTab = 'deploys';
    }

    if (path.startsWith('/docker')) {
        activeTab = 'docker';
    }

    return activeTab;
};

export default useActiveTab;
