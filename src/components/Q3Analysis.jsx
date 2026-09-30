import { useMemo } from 'react';
import { useCSV, formatNumber, formatPercent, formatDecimal } from '../utils/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line, Area, AreaChart, ComposedChart } from 'recharts';
import { TrendingDown, ArrowRight } from 'lucide-react';

export default function Q3Analysis() {
  const { data, loading, error } = useCSV('/data/Q3_Footfall_Deciles.csv');

  const chartData = useMemo(() => {
    if (!data.length) return [];
    return data.map(r => ({
      decile: r.decile,
      label: `D${r.decile}`,
      store_days: r.store_days,
      visitors: r.visitors,
      bills: r.bills,
      conversion_rate: r.conversion_rate,
    })).sort((a, b) => a.decile - b.decile);
  }, [data]);

  const d1 = chartData.find(d => d.decile === 1);
  const d10 = chartData.find(d => d.decile === 10);

  const drop = d1 && d10 ? ((d1.conversion_rate - d10.conversion_rate) / d1.conversion_rate * 100).toFixed(1) : null;

  if (loading) return <div className="text-center py-12 text-slate-500">Loading Q3_Footfall_Deciles.csv...</div>;
  if (error) return (
    <div className="bg-rose/10 border border-rose/30 rounded-xl p-6 text-center">
      <p className="text-rose">Unable to load Q3_Footfall_Deciles.csv.</p>
      <p className="text-slate-400 text-sm mt-2">{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Comparison cards: Decile 1 vs Decile 10 */}
      {d1 && d10 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-5">
            <div className="text-xs text-slate-500 mb-1">Lowest-Footfall Decile (D1)</div>
            <div className="text-2xl font-bold text-white font-mono">{formatDecimal(d1.conversion_rate, 4)}</div>
            <div className="text-sm text-emerald mt-1">{formatPercent(d1.conversion_rate)}</div>
            <div className="text-xs text-slate-500 mt-2">
              {formatNumber(d1.visitors)} visitors · {formatNumber(d1.bills)} bills
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <TrendingDown size={24} className="text-rose mx-auto mb-2" />
              <div className="text-lg font-bold text-rose font-mono">−{drop}%</div>
              <div className="text-xs text-slate-500">relative decrease</div>
            </div>
          </div>

          <div className="bg-rose/5 border border-rose/20 rounded-xl p-5">
            <div className="text-xs text-slate-500 mb-1">Highest-Footfall Decile (D10)</div>
            <div className="text-2xl font-bold text-white font-mono">{formatDecimal(d10.conversion_rate, 4)}</div>
            <div className="text-sm text-rose mt-1">{formatPercent(d10.conversion_rate)}</div>
            <div className="text-xs text-slate-500 mt-2">
              {formatNumber(d10.visitors)} visitors · {formatNumber(d10.bills)} bills
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-800/30 border border-slate-700/30 rounded-lg p-4 text-sm text-slate-400 leading-relaxed">
        <strong className="text-slate-300">Observation:</strong> Conversion is lower in the highest-footfall decile in this dataset.
        The relative decrease from D1 to D10 is approximately {drop}%. This is an observed pattern — it does not imply that higher footfall causes lower conversion.
      </div>

      {/* Chart */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
        <h4 className="text-sm font-medium text-slate-400 mb-4">Conversion Rate by Footfall Decile</h4>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={chartData} margin={{ top: 20, right: 10, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2840" />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickFormatter={v => (v * 100).toFixed(0) + '%'}
              domain={['auto', 'auto']}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              tickFormatter={v => (v / 1000).toFixed(0) + 'k'}
            />
            <Tooltip content={<Q3Tooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
            <Bar yAxisId="right" dataKey="visitors" fill="#1e2840" radius={[4, 4, 0, 0]} maxBarSize={36} name="Visitors" />
            <Line yAxisId="left" type="monotone" dataKey="conversion_rate" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} name="Conversion" />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-accent inline-block" /> Conversion Rate</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-slate-700 inline-block" /> Visitors (bar)</span>
        </div>
      </div>

      {/* Full data table */}
      <div className="table-container rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900/80">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-slate-400 uppercase">Decile</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-400 uppercase">Store Days</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-400 uppercase">Visitors</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-400 uppercase">Bills</th>
              <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-400 uppercase">Conversion Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {chartData.map(row => {
              const isExtreme = row.decile === 1 || row.decile === 10;
              return (
                <tr key={row.decile} className={`transition-colors ${isExtreme ? 'bg-accent/5 hover:bg-accent/10' : 'hover:bg-slate-800/30'}`}>
                  <td className="px-4 py-2 font-mono text-xs text-slate-300">D{row.decile}</td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-300 text-right">{formatNumber(row.store_days)}</td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-300 text-right">{formatNumber(row.visitors)}</td>
                  <td className="px-4 py-2 font-mono text-xs text-slate-300 text-right">{formatNumber(row.bills)}</td>
                  <td className="px-4 py-2 font-mono text-xs text-right font-semibold text-accent">
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

function Q3Tooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs shadow-xl">
      <div className="text-slate-300 font-medium mb-1">Decile {d.decile}</div>
      <div className="text-slate-400">Store Days: <span className="text-white font-mono">{formatNumber(d.store_days)}</span></div>
      <div className="text-slate-400">Visitors: <span className="text-cyan font-mono">{formatNumber(d.visitors)}</span></div>
      <div className="text-slate-400">Bills: <span className="text-emerald font-mono">{formatNumber(d.bills)}</span></div>
      <div className="text-slate-400">Conversion: <span className="text-accent font-mono">{formatDecimal(d.conversion_rate, 4)} ({formatPercent(d.conversion_rate)})</span></div>
    </div>
  );
}
