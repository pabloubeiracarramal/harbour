import React from 'react';
import './StatusIndicator.scss';
import { FaRunning, FaPlus, FaPause, FaRedo, FaTrash, FaSkull } from 'react-icons/fa';
import { ImExit } from "react-icons/im";

const StatusIndicator = ({ state }) => {
    const getStatusColor = (state) => {
        const colors = {
            running: '#4CAF50',
            exited: '#f44336',
            created: '#2196F3',
            paused: '#FF9800',
            restarting: '#9C27B0',
            removing: '#FF5722',
            dead: '#795548'
        };
        return colors[state] || '#9E9E9E';
    };

    const getStatusIcon = (state) => {
        const icons = {
            running: <FaRunning />,
            exited: <ImExit />,
            created: <FaPlus />,
            paused: <FaPause />,
            restarting: <FaRedo />,
            removing: <FaTrash />,
            dead: <FaSkull />
        };
        return icons[state] || null;
    };

    return (
        <div
            className="status-indicator"
            style={{ backgroundColor: getStatusColor(state), display: 'flex', alignItems: 'center', gap: '0.5em' }}
        >
            {getStatusIcon(state)}
            <span>{state}</span>
        </div>
    );
};

export default StatusIndicator;