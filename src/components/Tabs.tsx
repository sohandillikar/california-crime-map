import { useState, ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export default function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div>
      <div className="flex space-x-6 border-b border-brown-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-brown-900'
                : 'text-brown-600 hover:text-brown-800'
            }`}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brown-900"></span>
            )}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {activeTabContent}
      </div>
    </div>
  );
}

