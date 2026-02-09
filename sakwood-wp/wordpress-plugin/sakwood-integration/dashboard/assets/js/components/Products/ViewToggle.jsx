import React from 'react';

function ViewToggle({ currentView, onViewChange }) {
    return (
        <div className="sakwood-view-toggle">
            <button
                className={currentView === 'grid' ? 'active' : ''}
                onClick={() => onViewChange('grid')}
                aria-label="Grid view"
            >
                ⊞
            </button>
            <button
                className={currentView === 'table' ? 'active' : ''}
                onClick={() => onViewChange('table')}
                aria-label="Table view"
            >
                ☰
            </button>
        </div>
    );
}

export default ViewToggle;
