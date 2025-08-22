import React from 'react';
import './TabImages.scss';
import useImages from '../../hooks/useImages';
import PullImageForm from '../PullImageForm/PullImageForm';
import ImageCard from '../ImageCard/ImageCard';

function TabImages() {

    const { images, removeImage, fetchImages, loading } = useImages();

    return (
        <div className="images-section">
            <div className="section-header">
                <h2>Docker Images</h2>
                <PullImageForm onImagePulled={fetchImages} />
            </div>

            {loading ? (
                <div className="loading">Loading images...</div>
            ) : (
                <div className="images-grid">
                    {images.map(image => (
                        <ImageCard
                            key={image.Id}
                            image={image}
                            onRemove={removeImage}
                            onRefresh={fetchImages}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TabImages;