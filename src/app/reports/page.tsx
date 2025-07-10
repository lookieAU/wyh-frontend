'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import ReportGenerator from '@/components/reports/ReportGenerator';
import AuthCheck from '@/components/auth/AuthCheck';

export default function ReportsPage() {
  return (
    <AuthCheck>
      <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReportGenerator />
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Available Assessment Types</h2>
            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">Health & Fitness Assessment</h3>
                <p className="text-sm text-gray-600">ID: as_hr_02</p>
                <p className="text-sm text-gray-600">Session: session_001</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900">Cardiac Assessment</h3>
                <p className="text-sm text-gray-600">ID: as_card_01</p>
                <p className="text-sm text-gray-600">Session: session_002</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </DashboardLayout>
    </AuthCheck>
  );
}
