import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
} from '@tanstack/react-table';

interface FacultyRecord {
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    branch: string;
    semester: string;
    section: string;
    course: string;
    session: string;
    scheduledClasses: number;
    totalClasses: number;
    isMarked: number;
}

const FacultyReport: React.FC<{ data: FacultyRecord[] }> = ({ data }) => {
    const tableData = React.useMemo(() => data, [data]);

    const columns = React.useMemo<ColumnDef<FacultyRecord>[]>(() => [
        { header: 'Subject ID', accessorKey: 'subjectId' },
        { header: 'Subject Name', accessorKey: 'subjectName' },
        { header: 'Subject Code', accessorKey: 'subjectCode' },
        { header: 'Branch', accessorKey: 'branch' },
        { header: 'Semester', accessorKey: 'semester' },
        { header: 'Section', accessorKey: 'section' },
        { header: 'Course', accessorKey: 'course' },
        { header: 'Session', accessorKey: 'session' },
        { header: 'Scheduled Classes', accessorKey: 'scheduledClasses' },
        { header: 'Total Classes', accessorKey: 'totalClasses' },
        { header: 'Marked Classes', accessorKey: 'isMarked' },
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