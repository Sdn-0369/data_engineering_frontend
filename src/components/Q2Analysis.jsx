import { useMemo } from 'react';
import { useCSV, formatNumber, formatPercent, formatHour, formatDecimal } from '../utils/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, LabelList } from 'recharts';

export default function Q2Analysis() {
  const { data, loading, error } = useCSV('/data/Q2_Worst_Hours.csv');

  const chartData = useMemo(() => {
    if (!data.length) return [];
    return data.map(r => ({
      hour: r.hour,
      label: formatHour(r.hour),
      total_footfall: r.total_footfall,
      total_bills: r.total_bills,
      conversion_rate: r.conversion_rate,
      isWorst: r.hour === 15 || r.hour === 16 || r.hour === 14,
    })).sort((a, b) => a.hour - b.hour);
  }, [data]);

  const worstThree = useMemo(() => {
    if (!data.length) return [];
    return [...data].sort((a, b) => a.conversion_rate - b.conversion_rate).slice(0, 3);
  }, [data]);

  if (loading) return <div className="text-center py-12 text-slate-500">Loading Q2_Worst_Hours.csv...</div>;
  if (error) return (
    <div className="bg-rose/10 border border-rose/30 rounded-xl p-6 text-center">
      <p className="text-rose">Unable to load Q2_Worst_Hours.csv.</p>
      <p className="text-slate-400 text-sm mt-2">{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Worst three highlight */}
      <div className="grid grid-cols-3 gap-3">
        {worstThree.map((row, i) => (
          <div key={row.hour} className={`bg-slate-900/60 border rounded-xl p-4 text-center ${i === 0 ? 'border-rose/40' : 'border-slate-800'}`}>
            <div className="text-xs text-slate-500 mb-1">#{i + 1} Lowest</div>
            <div className="text-2xl font-bold text-white font-mono">{formatHour(row.hour)}</div>
            <div className="text-accent font-mono text-lg mt-1">{formatDecimal(row.conversion_rate, 4)}</div>
            <div className="text-xs text-slate-500 mt-1">{formatPercent(row.conversion_rate)}</div>
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-400 leading-relaxed">
        These represent the three lowest conversion hours in the <span className="text-slate-300 font-medium">chain-wide hourly aggregation</span>.
        The analysis aggregates all stores across the entire date range to identify which hours of the day consistently show the lowest conversion.
      </p>

      {/* Chart — all hours */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
        <h4 className="text-sm font-medium text-slate-400 mb-4">Conversion Rate by Hour of Day (All Hours)</h4>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 20, right: 10, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2840" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => (v * 100).toFixed(0) + '%'} domain={[0, 'auto']} />
            <Tooltip content={<Q2Tooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
            <Bar dataKey="conversion_rate" radius={[4, 4, 0, 0]} maxBarSize={44}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.isWorst ? '#f43f5e' : '#6366f1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-rose inline-block" /> Worst 3 hours</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-accent inline-block" /> Other hours</span>
        </div>
      </div>

      {/* Full table */}
      <div className="table-container rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900/80">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400 uppercase">Hour</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-400 uppercase">Total Footfall</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-400 uppercase">Total Bills</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-400 uppercase">Conversion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {data.sort((a, b) => a.conversion_rate - b.conversion_rate).map((row, i) => {
              const isWorst = i < 3;
              return (
                <tr key={row.hour} className={`transition-colors ${isWorst ? 'bg-rose/5 hover:bg-rose/10' : 'hover:bg-slate-800/30'}`}>
                  <td className="px-4 py-2 font-mono text-xs text-slate-300">{formatHour(row.hour)}</td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-300 text-right">{formatNumber(row.total_footfall)}</td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-300 text-right">{formatNumber(row.total_bills)}</td>
                  <td className={`px-4 py-2 font-mono text-xs text-right font-semibold ${isWorst ? 'text-rose' : 'text-accent'}`}>
                    {formatDecimal(row.conversion_rate, 4)} ({formatPercent(row.conversion_rate)})
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Q2Tooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs shadow-xl">
      <div className="text-slate-300 font-medium mb-1">{d.label}</div>
      <div className="text-slate-400">Footfall: <span className="text-cyan font-mono">{formatNumber(d.total_footfall)}</span></div>
      <div className="text-slate-400">Bills: <span className="text-emerald font-mono">{formatNumber(d.total_bills)}</span></div>
      <div className="text-slate-400">Conversion: <span className="text-accent font-mono">{formatDecimal(d.conversion_rate, 4)} ({formatPercent(d.conversion_rate)})</span></div>
    </div>
  );
}
