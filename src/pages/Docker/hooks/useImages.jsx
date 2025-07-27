import { useState, useEffect } from 'react';
import { dockerApi } from '../../../utils/dockerApi';

const useImages = () => {
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchImages = async () => {
        setLoading(true);
        console.log('Fetching Docker images...');
        try {
            const data = await dockerApi.images.list();
            if (data.success) {
                console.log('Docker images fetched successfully:', data.data);
                setImages(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch Docker images:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeImage = async (imageId, force = false) => {
        try {
            console.log(`Removing image ${imageId} with force=${force}`);
            const response = await dockerApi.images.remove(imageId, { force });
            if (response.success) {
                console.log(`Image ${imageId} removed successfully`);
                fetchImages(); // Refresh the list after removal
            } else {
                console.error(`Failed to remove image ${imageId}:`, response.error);
            }
        } catch (error) {
            console.error(`Error removing image ${imageId}:`, error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return { images, removeImage, fetchImages, loading };
};

export default useImages;