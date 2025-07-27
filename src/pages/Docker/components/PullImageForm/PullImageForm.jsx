import React, { useState } from 'react';
import './PullImageForm.scss';
import { dockerApi } from '../../../../utils/dockerApi';

function PullImageForm({ onImagePulled }) {
    const [image, setImage] = useState('');
    const [tag, setTag] = useState('latest');
    const [pulling, setPulling] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPulling(true);

        try {
            const data = await dockerApi.images.pull(image, tag);

            if (data.success) {
                alert('Image pull initiated successfully');
                setImage('');
                setTag('latest');
                onImagePulled();
            } else {
                alert(`Failed to pull image: ${data.error}`);
            }
        } catch (error) {
            console.error('Failed to pull image:', error);
            alert('Failed to pull image');
        } finally {
            setPulling(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="pull-image-form">
            <input
                type="text"
                placeholder="Image name (e.g., nginx)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <button type="submit" disabled={pulling} className="btn-primary">
                {pulling ? 'Pulling...' : 'Pull Image'}
            </button>
        </form>
    );
}

export default PullImageForm;
