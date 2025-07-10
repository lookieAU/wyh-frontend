'use client';

import { useEffect, useState } from 'react';
import { reportsService } from '@/lib/api';

export default function ReportGenerator() {
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSessionIds();
  }, []);

  const loadSessionIds = async () => {
    try {
      const response = await reportsService.getSessionIds();
      setSessionIds(response.data.sessionIds);
    } catch (err: any) {
      setError('Failed to load session IDs');
    }
  };

  const generateReport = async () => {
    if (!selectedSession) {
      setError('Please select a session ID');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await reportsService.generateReport(selectedSession);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Generate PDF Report</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Session ID
          </label>
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Choose a session...</option>
            {sessionIds.map(id => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>

        <button
          onClick={generateReport}
          disabled={loading || !selectedSession}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate PDF Report'}
        </button>

        {result && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-medium">Report Generated Successfully!</p>
            <p className="text-sm">File: {result.data.fileName}</p>
            <p className="text-sm">Path: {result.data.pdfPath}</p>
          </div>
        )}
        
        {result && (
          <div className="mt-3">
            <button 
              onClick={async () => {
                try {
                  setLoading(true);
                  const response = await reportsService.downloadReport(selectedSession);
                  
                  const blob = new Blob([response.data], { type: 'application/pdf' });
                  const url = window.URL.createObjectURL(blob);
                  
                  const link = document.createElement('a');
                  link.href = url;
                  
                  const contentDisposition = response.headers['content-disposition'];
                  const fileName = contentDisposition 
                    ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                    : `report_${selectedSession}.pdf`;
                  
                  link.download = fileName;
                  
                  document.body.appendChild(link);
                  
                  link.click();
                  
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(link);
                } catch (err) {
                  console.error('Error downloading report:', err);
                  setError('Failed to download report. Please try again.');
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Download Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
