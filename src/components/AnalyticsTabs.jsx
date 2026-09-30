import { useState } from 'react';
import Section, { SectionTitle } from './Section';
import Q1Analysis from './Q1Analysis';
import Q2Analysis from './Q2Analysis';
import Q3Analysis from './Q3Analysis';
import { Download } from 'lucide-react';

const TABS = [
  { id: 'q1', label: 'Q1: Conversion Rate', question: 'What is the conversion rate per store-hour?' },
  { id: 'q2', label: 'Q2: Worst Hours', question: 'What are the three worst hours of the day across the chain?' },
  { id: 'q3', label: 'Q3: Footfall Deciles', question: 'Does conversion drop on days with the highest footfall?' },
];

const DOWNLOADS = [
  { label: 'Gold Dataset', file: '/data/gold_store_hour.csv', name: 'gold_store_hour.csv' },
  { label: 'Q1 Conversion', file: '/data/Q1_Conversion_Rate.csv', name: 'Q1_Conversion_Rate.csv' },
  { label: 'Q2 Worst Hours', file: '/data/Q2_Worst_Hours.csv', name: 'Q2_Worst_Hours.csv' },
  { label: 'Q3 Deciles', file: '/data/Q3_Footfall_Deciles.csv', name: 'Q3_Footfall_Deciles.csv' },
];

export default function AnalyticsTabs() {
  const [activeTab, setActiveTab] = useState('q1');
  const currentTab = TABS.find(t => t.id === activeTab);

  return (
    <Section id="analytics">
      <SectionTitle subtitle="Analytical results from the completed Databricks + Snowflake pipeline.">
        Interactive Analytics
      </SectionTitle>

      {/* Tab bar */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
              activeTab === tab.id
                ? 'bg-accent/10 border border-accent/30 text-accent'
                : 'bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Question banner */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-lg px-5 py-3 mb-6">
        <p className="text-slate-300 font-medium text-sm">{currentTab?.question}</p>
      </div>

      {/* Tab content */}
      <div className="animate-fade-in" key={activeTab}>
        {activeTab === 'q1' && <Q1Analysis />}
        {activeTab === 'q2' && <Q2Analysis />}
        {activeTab === 'q3' && <Q3Analysis />}
      </div>

      {/* Downloads */}
      <div className="mt-10 pt-8 border-t border-slate-800">
        <h3 className="text-sm font-medium text-slate-400 mb-4">Download CSV Outputs</h3>
        <div className="flex flex-wrap gap-2">
          {DOWNLOADS.map(d => (
            <a
              key={d.name}
              href={d.file}
              download={d.name}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-slate-300 hover:border-accent/30 hover:text-accent transition-colors"
            >
              <Download size={12} />
              {d.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
