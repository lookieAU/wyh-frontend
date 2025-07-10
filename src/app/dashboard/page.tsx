'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { reportsService } from '@/lib/api';
import AuthCheck from '@/components/auth/AuthCheck';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    sessionCount: 0,
    assessmentTypes: 0,
    systemHealth: 'Unknown'
  });
  const router = useRouter();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [sessionsResponse, typesResponse, healthResponse] = await Promise.all([
        reportsService.getSessionIds(),
        reportsService.getAssessmentTypes(),
        reportsService.healthCheck()
      ]);

      setStats({
        sessionCount: sessionsResponse.data.count,
        assessmentTypes: typesResponse.data.count,
        systemHealth: healthResponse.success ? 'Healthy' : 'Error'
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  return (
    <AuthCheck>
      <DashboardLayout>
        <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Available Sessions
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.sessionCount}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Assessment Types
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.assessmentTypes}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 ${stats.systemHealth === 'Healthy' ? 'bg-green-500' : 'bg-red-500'} rounded-md flex items-center justify-center`}>
                    <span className="text-white font-bold">H</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      System Health
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.systemHealth}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => router.push('/reports')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Generate New Report
            </button>
          </div>
        </div>
        </div>
      </DashboardLayout>
    </AuthCheck>
  );
}
