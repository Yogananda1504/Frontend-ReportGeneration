import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import { useReactTable, createColumnHelper, getCoreRowModel, flexRender } from '@tanstack/react-table';

type SubjectData = {
  subjectName: string;
  subjectCode: string;a
  professorName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
};

const columnHelper = createColumnHelper<SubjectData>();

const columns = [
  columnHelper.accessor('subjectName', {
    header: 'Subject',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('subjectCode', {
    header: 'Code',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('professorName', {
    header: 'Professor',
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

export const OverallAttendanceReport = ({ data }) => {
  const table = useReactTable({
    data: data.semesterSummary.subjectsData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const chartData = data.semesterSummary.subjectsData.map(subject => ({
    name: subject.subjectCode,
    percentage: subject.percentage,
  }));

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Overall Attendance Report</h2>
      
      <div className="mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Semester Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold">{data.semesterSummary.totalClasses}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">Attended Classes</p>
              <p className="text-2xl font-bold">{data.semesterSummary.attendedClasses}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600">Overall Percentage</p>
              <p className="text-2xl font-bold">{data.semesterSummary.overallPercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto">
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