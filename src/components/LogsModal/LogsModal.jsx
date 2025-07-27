import React from 'react';
import './LogsModal.scss';
import useFetchContainerLogs from '../../pages/Docker/hooks/useFetchContainerLogs';

function LogsModal({ container, onClose }) {

    const { logs } = useFetchContainerLogs(container.Id);

    return (
        <div className="LogsModal" onClick={onClose}>
            <div className="LogsModal__container" onClick={(e) => e.stopPropagation()}>
                <div className="LogsModal__header">
                    <h3>Logs: {container.Names?.[0]?.replace('/', '') || container.Id.substring(0, 12)}</h3>
                    <button onClick={onClose} className="LogsModal__close">&times;</button>
                </div>
                <div className="LogsModal__body">
                    {logs && logs.length > 0 ? (
                        logs.map((log, index) => (
                            <div key={index} className="log-line">{log}</div>
                        ))
                    ) : (
                        <div className="log-line log-line--empty">No logs available.</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LogsModal;
