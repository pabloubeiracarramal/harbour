import React, { useState, useEffect } from 'react';
import { dockerApi, utils } from '../../utils/dockerApi';
import './Docker.scss';
import TabContainers from './components/TabContainers/TabContainers';
import TabImages from './components/TabImages/TabImages';
import TabInfo from './components/TabInfo/TabInfo';
import useFetchDockerInfo from './hooks/useFetchDockerInfo';

function Docker() {
    const [activeTab, setActiveTab] = useState('containers');
    const { dockerInfo, loading } = useFetchDockerInfo();

    return (
        <div className="docker-page">
            <div className="docker-header">
                <h1>Docker Management</h1>
                {dockerInfo && (
                    <div className="docker-info-summary">
                        <span>Docker {dockerInfo.version?.Version}</span>
                        <span>{dockerInfo.info?.ContainersRunning}/{dockerInfo.info?.Containers} running</span>
                        <span>{dockerInfo.info?.Images} images</span>
                    </div>
                )}
            </div>

            <div className="docker-tabs">
                <button
                    className={activeTab === 'containers' ? 'active' : ''}
                    onClick={() => setActiveTab('containers')}
                >
                    Containers
                </button>
                <button
                    className={activeTab === 'images' ? 'active' : ''}
                    onClick={() => setActiveTab('images')}
                >
                    Images
                </button>
                <button
                    className={activeTab === 'info' ? 'active' : ''}
                    onClick={() => setActiveTab('info')}
                >
                    System Info
                </button>
            </div>

            {activeTab === 'containers' && (
                <TabContainers />
            )}

            {activeTab === 'images' && (
                <TabImages />
            )}

            {activeTab === 'info' && (
                <TabInfo dockerInfo={dockerInfo} loading={loading} />
            )}
        </div>
    );
}

export default Docker;