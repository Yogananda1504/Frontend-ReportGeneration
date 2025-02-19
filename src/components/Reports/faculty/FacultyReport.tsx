import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';

interface ScheduledClass {
    _id: string;
    subjectName: string;
    scheduledClasses: number;
}

interface AttendanceData {
    total: number;
    marked: number;
}

interface FacultyReportData {
    scheduledClasses: ScheduledClass[];
    totalClasses: number;
    isMarked: string[];
    subjectWiseAttendance: Array<[string, AttendanceData]>;
}

interface TableRow {
    _id: string;
    subjectName: string;
    scheduledClasses: number;
    total: number | 'N/A';
    marked: number | 'N/A';
}

interface FacultyReportProps {
    data: FacultyReportData;
}

const FacultyReport: React.FC<FacultyReportProps> = ({ data }) => {
    const tableData = React.useMemo<TableRow[]>(() =>
        data.scheduledClasses.map(item => {
            const attendance = data.subjectWiseAttendance.find(([id]) => id === item._id)?.[1];
            return {
                _id: item._id,
                subjectName: item.subjectName,
                scheduledClasses: item.scheduledClasses,
                total: attendance?.total ?? 'N/A',
                marked: attendance?.marked ?? 'N/A',
            };
        }), [data.scheduledClasses, data.subjectWiseAttendance]
    );

    const columns = React.useMemo<ColumnDef<TableRow>[]>(() => [
        {
            header: 'Subject ID',
            accessorKey: '_id',
        },
        {
            header: 'Subject Name',
            accessorKey: 'subjectName',
        },
        {
            header: 'Scheduled Classes',
            accessorKey: 'scheduledClasses',
        },
        {
            header: 'Total Classes',
            accessorKey: 'total',
        },
        {
            header: 'Marked Classes',
            accessorKey: 'marked',
        },
    ], []);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="shadow-md rounded-lg bg-white p-4">
            <h2 className="text-xl font-bold mb-4">Faculty Attendance Report</h2>
           
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-md">
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-2 border border-gray-300 text-left font-semibold">
                                        {header.isPlaceholder ? null :
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-2 border border-gray-300">
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

export default FacultyReport;