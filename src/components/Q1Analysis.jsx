import { useState, useMemo } from 'react';
import { useCSV, formatNumber, formatPercent, formatHour, formatDecimal } from '../utils/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const PAGE_SIZE = 20;

export default function Q1Analysis() {
  const { data, columns, loading, error } = useCSV('/data/Q1_Conversion_Rate.csv');
  const [storeFilter, setStoreFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [hourFilter, setHourFilter] = useState('');
  const [page, setPage] = useState(0);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const filterOptions = useMemo(() => {
    if (!data.length) return {};
    return {
      store_id: [...new Set(data.map(r => r.store_id))].sort(),
      trade_date: [...new Set(data.map(r => r.trade_date))].sort(),
      hour: [...new Set(data.map(r => r.hour))].sort((a, b) => a - b),
    };
  }, [data]);

  const filtered = useMemo(() => {
    let result = data;
    if (storeFilter) result = result.filter(r => r.store_id === storeFilter);
    if (dateFilter) result = result.filter(r => r.trade_date === dateFilter);
    if (hourFilter) result = result.filter(r => String(r.hour) === hourFilter);

    if (sortCol) {
      result = [...result].sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol];
        if (av == null) return 1;
        if (bv == null) return -1;
        if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
        return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
      });
    }
    return result;
  }, [data, storeFilter, dateFilter, hourFilter, sortCol, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  // Chart data — aggregate by hour for the selected store/date
  const chartData = useMemo(() => {
    const byHour = {};
    filtered.forEach(r => {
      const h = r.hour;
      if (!byHour[h]) byHour[h] = { hour: h, totalFootfall: 0, totalBills: 0, count: 0 };
      byHour[h].totalFootfall += r.footfall || 0;
      byHour[h].totalBills += r.bills || 0;
      byHour[h].count++;
    });
    return Object.values(byHour)
      .map(d => ({ ...d, conversion: d.totalFootfall > 0 ? d.totalBills / d.totalFootfall : 0 }))
      .sort((a, b) => a.hour - b.hour);
  }, [filtered]);

  function handleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
    setPage(0);
  }

  if (loading) return <div className="text-center py-12 text-slate-500">Loading Q1_Conversion_Rate.csv...</div>;
  if (error) return <ErrorState file="Q1_Conversion_Rate.csv" error={error} />;

  return (
    <div className="space-y-6">
      {/* Formula card */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
        <div className="font-mono text-center sm:text-left">
          <span className="text-accent font-semibold">Conversion Rate</span>
          <span className="text-slate-500 mx-2">=</span>
          <span className="text-emerald">Bills</span>
          <span className="text-slate-500 mx-1">/</span>
          <span className="text-cyan">Footfall</span>
        </div>
        <div className="text-xs text-slate-500">Only usable sensor periods included · {formatNumber(data.length)} records</div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={storeFilter} onChange={e => { setStoreFilter(e.target.value); setPage(0); }} className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-accent/50" aria-label="Filter by store">
          <option value="">All Stores</option>
          {(filterOptions.store_id || []).map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <select value={dateFilter} onChange={e => { setDateFilter(e.target.value); setPage(0); }} className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-accent/50" aria-label="Filter by date">
          <option value="">All Dates</option>
          {(filterOptions.trade_date || []).map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <select value={hourFilter} onChange={e => { setHourFilter(e.target.value); setPage(0); }} className="bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-accent/50" aria-label="Filter by hour">
          <option value="">All Hours</option>
          {(filterOptions.hour || []).map(v => <option key={v} value={String(v)}>{formatHour(v)}</option>)}
        </select>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
          <h4 className="text-sm font-medium text-slate-400 mb-4">Conversion Rate by Hour</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2840" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={h => `${h}:00`} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => (v * 100).toFixed(0) + '%'} />
              <Tooltip content={<Q1Tooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
              <Bar dataKey="conversion" radius={[4, 4, 0, 0]} maxBarSize={40}>
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.conversion < 0.1 ? '#f43f5e' : '#6366f1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <div className="text-xs text-slate-500 mb-2">
        {formatNumber(filtered.length)} records · Page {page + 1} of {totalPages || 1}
      </div>
      <div className="table-container rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-900/80">
              {columns.map(col => (
                <th key={col} onClick={() => handleSort(col)} className="px-3 py-2.5 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors whitespace-nowrap select-none">
                  <span className="inline-flex items-center gap-1">
                    {col}
                    {sortCol === col ? (sortDir === 'asc' ? <ArrowUp size={10} /> : <ArrowDown size={10} />) : <ArrowUpDown size={10} className="opacity-30" />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {pageData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                {columns.map(col => (
                  <td key={col} className="px-3 py-2 text-slate-300 whitespace-nowrap font-mono text-xs">
                    {col === 'conversion_rate' ? formatPercent(row[col]) : col === 'hour' ? formatHour(row[col]) : col === 'footfall' || col === 'bills' ? formatNumber(row[col]) : String(row[col] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-1 mt-3">
          <PgBtn onClick={() => setPage(0)} disabled={page === 0}><ChevronsLeft size={14} /></PgBtn>
          <PgBtn onClick={() => setPage(p => p - 1)} disabled={page === 0}><ChevronLeft size={14} /></PgBtn>
          <PgBtn onClick={() => setPage(p => p + 1)} disabled={page >= totalPages - 1}><ChevronRight size={14} /></PgBtn>
          <PgBtn onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}><ChevronsRight size={14} /></PgBtn>
        </div>
      )}
    </div>
  );
}

function Q1Tooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs shadow-xl">
      <div className="text-slate-300 font-medium mb-1">{formatHour(d.hour)}</div>
      <div className="text-slate-400">Footfall: <span className="text-cyan font-mono">{formatNumber(d.totalFootfall)}</span></div>
      <div className="text-slate-400">Bills: <span className="text-emerald font-mono">{formatNumber(d.totalBills)}</span></div>
      <div className="text-slate-400">Conversion: <span className="text-accent font-mono">{formatPercent(d.conversion)}</span></div>
    </div>
  );
}

function PgBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className="p-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors" aria-label="Page navigation">
      {children}
    </button>
  );
}

function ErrorState({ file, error }) {
  return (
    <div className="bg-rose/10 border border-rose/30 rounded-xl p-6 text-center">
      <p className="text-rose">Unable to load {file}.</p>
      <p className="text-slate-400 text-sm mt-2">Please verify that the file exists under public/data/.</p>
      <p className="text-slate-500 text-xs mt-1">{error}</p>
    </div>
  );
}
