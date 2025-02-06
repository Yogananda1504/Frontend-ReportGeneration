import React, { useState, useEffect } from 'react';
import { OverallAttendanceReport } from './OverallReport';
import DailyAttendanceReport from './DailyReport';
import { MonthlyAttendanceReport } from './MonthlyReport';
import { mockAttendanceData } from '../../../mock/student/mockdata';
import { getOverallAttendance } from '../../../api/services/Student';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

async function fetchOverallAttendanceData(scholarNumber) {
    const rawData = await getOverallAttendance(scholarNumber);
    const totalClasses = rawData.summary.reduce((acc, item) => acc + item.total, 0);
    const attendedClasses = rawData.summary.reduce((acc, item) => acc + item.present, 0);
    return {
        semesterSummary: {
            totalClasses,
            attendedClasses,
            overallPercentage: totalClasses ? (attendedClasses / totalClasses) * 100 : 0,
            subjectsData: rawData.summary.map(sub => ({
                subjectName: sub.subName,
                subjectCode: sub.subCode,
                professorName: sub.employee,
                totalClasses: sub.total,
                attendedClasses: sub.present,
                percentage: sub.total ? (sub.present / sub.total) * 100 : 0
            }))
        }
    };
}

async function fetchDailyAttendanceData() {
    // For now, we're using mock data; replace with actual API call if needed.
    return mockAttendanceData.daily;
}

async function fetchMonthlyAttendanceData() {
    // For now, we're using mock data; replace with actual API call if needed.
    return mockAttendanceData.monthly;
}

function StudentReport({ scholarNumber }: { scholarNumber }) {
    const [activeTab, setActiveTab] = useState('overall');
    const [overallData, setOverallData] = useState(null);
    const [dailyData, setDailyData] = useState(null);
    const [monthlyData, setMonthlyData] = useState(null);

    useEffect(() => {
        if (scholarNumber && activeTab === 'overall') {
            (async () => {
                try {
                    const data = await fetchOverallAttendanceData(scholarNumber);
                    setOverallData(data);
                    toast.success("Overall attendance data fetched successfully!");
                } catch (error) {
                    console.error('Error fetching overall attendance:', error);
                    toast.error("Error fetching overall attendance data.");
                }
            })();
        }
    }, [scholarNumber, activeTab]);

    useEffect(() => {
        if (activeTab === 'daily') {
            (async () => {
                try {
                    const data = await fetchDailyAttendanceData();
                    setDailyData(data);
                    toast.success("Daily attendance data fetched successfully!");
                } catch (error) {
                    console.error('Error fetching daily attendance:', error);
                    toast.error("Error fetching daily attendance data.");
                }
            })();
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'monthly') {
            (async () => {
                try {
                    const data = await fetchMonthlyAttendanceData();
                    setMonthlyData(data);
                    toast.success("Monthly attendance data fetched successfully!");
                } catch (error) {
                    console.error('Error fetching monthly attendance:', error);
                    toast.error("Error fetching monthly attendance data.");
                }
            })();
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Student Attendance Dashboard</h1>
                        <div className="mt-4">
                            <nav className="flex space-x-4" aria-label="Tabs">
                                {['overall', 'daily', 'monthly'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`${
                                            activeTab === tab
                                                ? 'bg-indigo-100 text-indigo-700'
                                                : 'text-gray-500 hover:text-gray-700'
                                            } px-3 py-2 font-medium text-sm rounded-md capitalize`}
                                    >
                                        {tab} Report
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {activeTab === 'overall' && overallData && (
                        <OverallAttendanceReport data={overallData} />
                    )}
                    {activeTab === 'daily' && dailyData && (
                        <DailyAttendanceReport data={dailyData} />
                    )}
                    {activeTab === 'monthly' && monthlyData && (
                        <MonthlyAttendanceReport data={monthlyData} />
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default StudentReport