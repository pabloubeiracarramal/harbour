import React from 'react';
import './ContainerCard.scss';
import { utils, dockerApi } from '../../../../utils/dockerApi';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import { 
    FaDocker, 
    FaPlay, 
    FaStop, 
    FaRedo, 
    FaTrash, 
    FaFileAlt 
} from 'react-icons/fa';

function ContainerCard({ container, onShowLogs, onRefresh }) {

    // TODO: This functions should be into a custom hook or utility file
    // to keep the component clean and focused on rendering.
    const handleStart = async () => {
        try {
            await dockerApi.containers.start(container.Id);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('Failed to start container:', error);
        }
    };

    const handleStop = async () => {
        try {
            await dockerApi.containers.stop(container.Id);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('Failed to stop container:', error);
        }
    };

    const handleRestart = async () => {
        try {
            await dockerApi.containers.restart(container.Id);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('Failed to restart container:', error);
        }
    };

    const handleRemove = async () => {
        try {
            await dockerApi.containers.remove(container.Id, true);
            if (onRefresh) onRefresh();
        } catch (error) {
            console.error('Failed to remove container:', error);
        }
    };

    const handleShowLogs = () => {
        if (onShowLogs) {
            onShowLogs(container);
        }
    };

    return (
        <div className="container-card">
            <div className="container-header">
                <div className="container-name">
                    <FaDocker style={{ color: '#2496ED' }} />
                    {container.Names?.[0]?.replace('/', '') || container.Id.substring(0, 12)}
                </div>
                <StatusIndicator state={container.State} />
            </div>

            <div className="container-details">
                <div><strong>Image:</strong> {container.Image}</div>
                <div><strong>Status:</strong> {container.Status}</div>
                <div><strong>Created:</strong> {utils.formatDate(container.Created)}</div>
                {container.Ports && container.Ports.length > 0 && (
                    <div><strong>Ports:</strong> {utils.parsePortMappings(container.Ports)}</div>
                )}
            </div>

            <div className="container-actions">
                {container.State === 'running' && (
                    <>
                        <div onClick={handleStop} className="btn-warning">
                            <FaStop /> <div>Stop</div>
                        </div>
                        <div onClick={handleRestart} className="btn-info">
                            <FaRedo /> <div>Restart</div>
                        </div>
                    </>
                )}
                {container.State === 'exited' && (
                    <div onClick={handleStart} className="btn-success">
                        <FaPlay /> <div>Start</div>
                    </div>
                )}
                <div onClick={handleShowLogs} className="btn-info">
                    <FaFileAlt /> Logs
                </div>
                <div onClick={handleRemove} className="btn-danger">
                    <FaTrash /> Remove
                </div>
            </div>
        </div>
    );
}

export default ContainerCard;
