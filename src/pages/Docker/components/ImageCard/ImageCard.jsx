import React from 'react';
import './ImageCard.scss';
import { utils } from '../../../../utils/dockerApi';
import { 
    FaLayerGroup, 
    FaTrash, 
    FaExclamationTriangle
} from 'react-icons/fa';

function ImageCard({ image, onRemove, onRefresh }) {

    const handleRemove = async (force = false) => {
        try {
            if (onRemove) {
                await onRemove(image.Id, force);
                if (onRefresh) onRefresh();
            }
        } catch (error) {
            console.error('Failed to remove image:', error);
        }
    };

    const getImageName = () => {
        const imageName = utils.formatImageName(image.RepoTags);
        return imageName.split(':');
    };

    const [repository, tag] = getImageName();

    return (
        <div className="image-card">
            <div className="image-header">
                <div className="image-name">
                    <FaLayerGroup style={{ color: '#2496ED' }} />
                    <div className="image-details">
                        <div className="repository">{repository}</div>
                        <div className="tag">{tag}</div>
                    </div>
                </div>
            </div>

            <div className="image-info">
                <div className="info-item">
                    <strong>Image ID:</strong> 
                    <span className="image-id">{utils.truncateId(image.Id)}</span>
                </div>
                <div className="info-item">
                    <strong>Created:</strong> 
                    <span>{utils.formatDate(image.Created)}</span>
                </div>
                <div className="info-item">
                    <strong>Size:</strong> 
                    <span>{utils.formatBytes(image.Size)}</span>
                </div>
            </div>

            <div className="image-actions">
                <div onClick={() => handleRemove(false)} className="btn-danger">
                    <FaTrash /> Remove
                </div>
                <div onClick={() => handleRemove(true)} className="btn-warning">
                    <FaExclamationTriangle /> Force Remove
                </div>
            </div>
        </div>
    );
}

export default ImageCard;
