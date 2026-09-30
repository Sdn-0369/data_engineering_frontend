import Section, { SectionTitle } from './Section';
import { AlertCircle, Copy, Clock, Store, Wifi, WifiOff, ArrowDown, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const QUALITY_CARDS = [
  { value: '300', label: 'ERR footfall values → NULL', icon: AlertCircle, color: 'text-rose-400', tooltip: 'Footfall counter readings of "ERR" were safely cast to NULL using safe type conversion.' },
  { value: '240', label: 'OFFLINE sensor records', icon: WifiOff, color: 'text-amber-400', tooltip: 'Counter rows marked OFFLINE result in footfall = NULL and sensor_ok = FALSE.' },
  { value: '130', label: 'Duplicate bills removed', icon: Copy, color: 'text-orange-400', tooltip: 'Bills were deduplicated using bill_id. 130 exact duplicate transactions were removed.' },
  { value: '75', label: 'Unknown-store bills rejected', icon: Store, color: 'text-red-400', tooltip: 'Bills belonging to unknown store ST13 were rejected during Silver layer validation.' },
  { value: '60', label: 'Outside-hours bills rejected', icon: Clock, color: 'text-yellow-400', tooltip: 'Bills occurring outside trading hours (10:00–21:00) were rejected.' },
];

export default function DataQuality() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Section id="data-quality">
      <SectionTitle subtitle="Systematic data-quality handling in the Silver layer to produce a reliable Gold dataset.">
        Data Quality
      </SectionTitle>

      {/* Quality metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
        {QUALITY_CARDS.map((card, i) => (
          <div
            key={i}
            className="relative bg-slate-900/60 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-all duration-300 cursor-default group"
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <card.icon size={16} className={`${card.color} mb-2`} />
            <div className="text-2xl font-bold text-white font-mono">{card.value}</div>
            <div className="text-xs text-slate-500 mt-1 leading-tight">{card.label}</div>

            {/* Tooltip */}
            {hoveredCard === i && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs text-slate-300 shadow-xl z-10 animate-fade-in">
                {card.tooltip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-slate-800 border-r border-b border-slate-700 rotate-45" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bills flow pipeline */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8 max-w-lg mx-auto">
        <h3 className="text-sm font-medium text-slate-400 mb-6 text-center uppercase tracking-wider">Bill Validation Flow</h3>

        <div className="space-y-3">
          <FlowStep label="Raw Bills (Bronze)" value="86,859" accent={false} />
          <FlowArrow label="Deduplicate by bill_id (−130)" />
          <FlowStep label="After Deduplication" value="86,729" accent={false} />
          <FlowArrow label="Remove unknown store (−75) & outside hours (−60)" />
          <FlowStep label="Valid Bills (Silver / Gold)" value="86,594" accent />
        </div>
      </div>
    </Section>
  );
}

function FlowStep({ label, value, accent }) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 rounded-lg border ${accent ? 'bg-accent/10 border-accent/30' : 'bg-slate-800/50 border-slate-700/50'}`}>
      <span className="text-sm text-slate-300">{label}</span>
      <span className={`font-mono font-semibold ${accent ? 'text-accent' : 'text-white'}`}>{value}</span>
    </div>
  );
}

function FlowArrow({ label }) {
  return (
    <div className="flex flex-col items-center py-1">
      <ChevronDown size={14} className="text-slate-600" />
      <span className="text-xs text-slate-500 mt-0.5">{label}</span>
    </div>
  );
}
