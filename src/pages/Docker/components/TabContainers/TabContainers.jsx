import React, { useState } from 'react';
import './TabContainers.scss';
import useContainers from '../../hooks/useContainers';
import RunContainerForm from '../RunContainerForm/RunContainerForm';
import LogsModal from '../../../../components/LogsModal/LogsModal';
import ContainerCard from '../ContainerCard/ContainerCard';
import { FaPlus } from 'react-icons/fa';

function TabContainers() {

    const [showRunForm, setShowRunForm] = useState(false);
    const [selectedContainer, setSelectedContainer] = useState(null);
    const { containers, loading, showAllContainers, setShowAllContainers, refetchContainers } = useContainers();

    const handleShowLogs = (container) => {
        setSelectedContainer(container);
    };

    const handleRefresh = () => {
        refetchContainers();
    };

    return (
        <div className="containers-section">
            <div className="section-header">
                <div className="controls">
                    <label>
                        <input
                            type="checkbox"
                            checked={showAllContainers}
                            onChange={(e) => setShowAllContainers(e.target.checked)}
                        />
                        Show all containers
                    </label>
                    <button onClick={() => setShowRunForm(true)} className="btn-primary">
                        <FaPlus size={20} /> Run New Container
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading containers...</div>
            ) : (
                <div className="containers-grid">
                    {containers.map(container => (
                        <ContainerCard
                            key={container.Id}
                            container={container}
                            onShowLogs={handleShowLogs}
                            onRefresh={handleRefresh}
                        />
                    ))}
                </div>
            )}

            {showRunForm && (
                <RunContainerForm
                    onClose={() => setShowRunForm(false)}
                />
            )}

            {selectedContainer && (
                <LogsModal
                    container={selectedContainer}
                    onClose={() => setSelectedContainer(null)}
                />
            )}

        </div>
    );
}

export default TabContainers;