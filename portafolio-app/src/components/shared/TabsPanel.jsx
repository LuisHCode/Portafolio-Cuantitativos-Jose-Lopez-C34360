import React, { useState } from 'react';
import MethodIcon from './MethodIcon.jsx';
import './TabsPanel.css';

const TabsPanel = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs__header">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`tabs__btn ${activeTab === i ? 'tabs__btn--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            <span className="tabs__btn-icon"><MethodIcon name={tab.icon} size={16} /></span>
            <span className="tabs__btn-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default TabsPanel;
