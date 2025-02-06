import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender } from '@tanstack/react-table';
import clsx from 'clsx';

type SubjectAttendance = {
  subjectName: string;
  subjectCode: string;
  professorName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  weekWiseBreakdown: Array<{
    week: string;
    attended: number;
    total: number;
  }>;
};

const columnHelper = createColumnHelper<SubjectAttendance>();

const columns = [
  columnHelper.accessor('subjectName', {
    header: 'Subject',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('subjectCode', {
    header: 'Code',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('totalClasses', {
    header: 'Total Classes',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('attendedClasses', {
    header: 'Attended',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('percentage', {
    header: 'Attendance %',
    cell: info => {
      const percentage = info.getValue();
      return (
        <div className={clsx(
          'px-3 py-1 rounded-full text-white text-center',
          percentage < 75 ? 'bg-red-500' : 'bg-green-500',
          percentage < 65 ? 'bg-red-700' : '',
          percentage > 85 ? 'bg-green-700' : ''
        )}>
          {percentage.toFixed(2)}%
        </div>
      );
    },
  }),
];

export const MonthlyAttendanceReport = ({ data }) => {
  const monthData = data.monthlySummary[0]; // Using first month for demo
  const table = useReactTable({
    data: monthData.subjectWiseAttendance,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Prepare data for the line chart with safeguard for weekWiseBreakdown lengths
  const chartData = monthData.subjectWiseAttendance[0].weekWiseBreakdown.map((week, index) => {
    const weekData: any = { name: week.week };
    monthData.subjectWiseAttendance.forEach(subject => {
      const breakdown = subject.weekWiseBreakdown[index];
      weekData[subject.subjectCode] = breakdown ? (breakdown.attended / breakdown.total) * 100 : 0;
    });
    return weekData;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Monthly Attendance Summary - {monthData.month}</h2>

      <div className="mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Monthly Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold">{monthData.overallSummary.totalClassesInMonth}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">Attended Classes</p>
              <p className="text-2xl font-bold">{monthData.overallSummary.totalAttendedClasses}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">Monthly Percentage</p>
              <p className="text-2xl font-bold">{monthData.overallSummary.overallMonthlyPercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Weekly Attendance Trends</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              {monthData.subjectWiseAttendance.map((subject, index) => (
                <Line
                  key={subject.subjectCode}
                  type="monotone"
                  dataKey={subject.subjectCode}
                  stroke={`hsl(${index * 60}, 70%, 50%)`}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Attendance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Best Attendance</p>
            <p className="font-semibold">{monthData.trends.bestAttendanceSubject}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Needs Improvement</p>
            <p className="font-semibold">{monthData.trends.lowestAttendanceSubject}</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Consecutive Days Present</p>
            <p className="font-semibold">{monthData.trends.consecutiveDaysPresent} days</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Leaves</p>
            <p className="font-semibold">{monthData.trends.totalLeaves}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Subject-wise Summary</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};