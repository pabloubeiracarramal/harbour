import React, { useEffect } from 'react';
import './TabInfo.scss';

function TabInfo(props) {
    const { dockerInfo, loading } = props;

    return loading ? (
        <div className="docker-info-loading">Loading Docker info...</div>
    ) : (
        <div className="docker-info-section">
            <h2>Docker System Information</h2>
            <div className="info-grid">
                <div className="info-card">
                    <h3>Version Information</h3>
                    <div><strong>Version:</strong> {dockerInfo.version?.Version}</div>
                    <div><strong>API Version:</strong> {dockerInfo.version?.ApiVersion}</div>
                    <div><strong>Go Version:</strong> {dockerInfo.version?.GoVersion}</div>
                    <div><strong>OS:</strong> {dockerInfo.version?.Os}</div>
                    <div><strong>Architecture:</strong> {dockerInfo.version?.Arch}</div>
                </div>
                <div className="info-card">
                    <h3>System Statistics</h3>
                    <div><strong>Total Containers:</strong> {dockerInfo.info?.Containers}</div>
                    <div><strong>Running:</strong> {dockerInfo.info?.ContainersRunning}</div>
                    <div><strong>Paused:</strong> {dockerInfo.info?.ContainersPaused}</div>
                    <div><strong>Stopped:</strong> {dockerInfo.info?.ContainersStopped}</div>
                    <div><strong>Images:</strong> {dockerInfo.info?.Images}</div>
                </div>
            </div>
        </div>
    );
}

export default TabInfo;