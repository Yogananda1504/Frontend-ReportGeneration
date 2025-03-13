import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Calendar, FileText, Archive, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { useToast, ToastProvider } from '../../context/ToastContext';

type TabType = 'timetable' | 'selfReport' | 'class';

interface InputSectionProps {
    onTimetableSubmit?: (data: any) => void;
    onSelfReportSubmit?: (data: any) => void;
    onClassSubmit?: (data: any) => void;
}

const InputSectionContent = ({ onTimetableSubmit, onSelfReportSubmit, onClassSubmit }: InputSectionProps) => {
    const [selectedTab, setSelectedTab] = useState<TabType>('timetable');
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            if (selectedTab === 'timetable') {
                toast.showInfo("Submitting Timetable Data...", "timetable-loading");
                await onTimetableSubmit?.({});
                toast.showSuccess("Timetable data submitted", "timetable-success");
            } else if (selectedTab === 'selfReport') {
                toast.showInfo("Submitting SelfReport Data...", "selfReport-loading");
                await onSelfReportSubmit?.({ startDate, endDate });
                toast.showSuccess("SelfReport data submitted", "selfReport-success");
            } else if (selectedTab === 'class') {
                toast.showInfo("Submitting Class Data...", "class-loading");
                await onClassSubmit?.({});
                toast.showSuccess("Class data submitted", "class-success");
            }
        } catch (error) {
            toast.showError("Submission failed", "submission-error");
            console.error("Error during submission:", error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedTab, isLoading, onTimetableSubmit, onSelfReportSubmit, onClassSubmit, toast, startDate, endDate]);

    const debouncedSubmit = useMemo(() => (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
    }, [handleSubmit]);

    useEffect(() => {
        setIsLoading(false);
    }, [selectedTab]);

    return (
        <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 flex justify-between items-center cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
                <h2 className="text-2xl font-bold text-gray-900">Input Section</h2>
                {isCollapsed ? <ChevronDown className="w-6 h-6 text-gray-500" /> : <ChevronUp className="w-6 h-6 text-gray-500" />}
            </div>
            {!isCollapsed && (
                <form onSubmit={debouncedSubmit} className="p-6 pt-0">
                    {/* Tab Selection */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <button
                            type="button"
                            onClick={() => setSelectedTab('timetable')}
                            className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${selectedTab === 'timetable'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'}`}
                        >
                            <Calendar className="w-6 h-6 mr-2" />
                            <span className="font-medium">Timetable</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedTab('selfReport')}
                            className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${selectedTab === 'selfReport'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'}`}
                        >
                            <FileText className="w-6 h-6 mr-2" />
                            <span className="font-medium">SelfReport</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedTab('class')}
                            className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${selectedTab === 'class'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'}`}
                        >
                            <Archive className="w-6 h-6 mr-2" />
                            <span className="font-medium">Class</span>
                        </button>
                    </div>

                    {/* Dynamic Tab Content */}
                    {selectedTab === 'timetable' && (
                        <div>
                            <p>Timetable content goes here.</p>
                        </div>
                    )}
                    {selectedTab === 'selfReport' && (
                        <div className="flex gap-1">  {/* reduced gap from gap-2 to gap-1 */}
                            <div className="flex-1 mb-2">  {/* reduced margin-bottom from mb-4 to mb-2 */}
                                <label className="block mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    className="border p-2 rounded max-w-xs" // changed from w-full to max-w-xs
                                />
                            </div>
                            <div className="flex-1 mb-2">  {/* reduced margin-bottom from mb-4 to mb-2 */}
                                <label className="block mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    className="border p-2 rounded max-w-xs" // changed from w-full to max-w-xs
                                />
                            </div>
                        </div>
                    )}
                    {selectedTab === 'class' && (
                        <div>
                            <p>Class content goes here.</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-2 px-4 rounded-md transition-colors ${isLoading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                        >
                            {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                            {isLoading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

// ToastProvider wrapper
const InputSection = (props: InputSectionProps) => {
    return (
        <ToastProvider>
            <InputSectionContent {...props} />
        </ToastProvider>
    );
};

export default InputSection;
