import React, { useState } from 'react';
import './RunContainerForm.scss';
import { dockerApi } from '../../../../utils/dockerApi';

function RunContainerForm({ onClose, onContainerCreated }) {
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        ports: '',
        environment: '',
        volumes: '',
        command: '',
        detach: true,
        restart: 'unless-stopped'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            image: formData.image,
            ...(formData.name && { name: formData.name }),
            ...(formData.ports && { ports: formData.ports.split(',').map(p => p.trim()) }),
            ...(formData.environment && { environment: formData.environment.split(',').map(e => e.trim()) }),
            ...(formData.volumes && { volumes: formData.volumes.split(',').map(v => v.trim()) }),
            ...(formData.command && { command: formData.command }),
            detach: formData.detach,
            restart: formData.restart
        };

        try {
            const data = await dockerApi.containers.run(requestData);

            if (data.success) {
                alert('Container created successfully');
                onContainerCreated();
                onClose();
            } else {
                alert(`Failed to create container: ${data.error}`);
            }
        } catch (error) {
            console.error('Failed to create container:', error);
            alert('Failed to create container');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Run New Container</h3>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="run-container-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Image *</label>
                            <input
                                type="text"
                                placeholder="e.g., nginx:latest"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Container name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Ports</label>
                            <input
                                type="text"
                                placeholder="8080:80, 8443:443"
                                value={formData.ports}
                                onChange={(e) => setFormData({ ...formData, ports: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Environment Variables</label>
                            <input
                                type="text"
                                placeholder="NODE_ENV=production, PORT=3000"
                                value={formData.environment}
                                onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Volumes</label>
                            <input
                                type="text"
                                placeholder="/host/path:/container/path"
                                value={formData.volumes}
                                onChange={(e) => setFormData({ ...formData, volumes: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Command</label>
                            <input
                                type="text"
                                placeholder="npm start"
                                value={formData.command}
                                onChange={(e) => setFormData({ ...formData, command: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Restart Policy</label>
                            <select
                                value={formData.restart}
                                onChange={(e) => setFormData({ ...formData, restart: e.target.value })}
                            >
                                <option value="no">No</option>
                                <option value="always">Always</option>
                                <option value="unless-stopped">Unless Stopped</option>
                                <option value="on-failure">On Failure</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.detach}
                                    onChange={(e) => setFormData({ ...formData, detach: e.target.checked })}
                                />
                                Run in detached mode
                            </label>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
                        <button type="submit" className="btn-primary">Create Container</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RunContainerForm;