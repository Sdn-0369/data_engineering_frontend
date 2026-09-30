import { useState, useEffect } from 'react';
import Papa from 'papaparse';

export function useCSV(filePath) {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCSV() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath} (HTTP ${response.status})`);
        }
        const text = await response.text();
        const result = Papa.parse(text.trim(), {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
        });

        if (!cancelled) {
          setColumns(result.meta.fields || []);
          setData(result.data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadCSV();
    return () => { cancelled = true; };
  }, [filePath]);

  return { data, columns, loading, error };
}

export function formatNumber(num) {
  if (num == null || isNaN(num)) return '—';
  return new Intl.NumberFormat('en-IN').format(num);
}

export function formatCurrency(num) {
  if (num == null || isNaN(num)) return '—';
  return '₹' + new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatPercent(num) {
  if (num == null || isNaN(num)) return '—';
  return (num * 100).toFixed(2) + '%';
}

export function formatDecimal(num, digits = 4) {
  if (num == null || isNaN(num)) return '—';
  return Number(num).toFixed(digits);
}

export function formatHour(hour) {
  if (hour == null) return '—';
  return `${String(hour).padStart(2, '0')}:00`;
}
