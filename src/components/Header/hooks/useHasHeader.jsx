import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useHasHeader = () => {
    
    const location = useLocation();

    return useMemo(() => {
        
        if (location.pathname === '/login') {
            return false;
        }

        return true;
    }, [location]);
};

export default useHasHeader;