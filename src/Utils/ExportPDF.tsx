// @ts-ignore
import html2pdf from 'html2pdf.js';



export const exportToPDF = async (elementId: string, fileName: string = 'report.pdf') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id "${elementId}" not found.`);
        return;
    }

    try {
        const options = {
            margin: [10, 10],
            filename: fileName,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                letterRendering: true,
                allowTaint: true
            },
            jsPDF: {
                unit: 'mm',
                format: 'a3',
                orientation: 'portrait'
            }
        };

        await html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error('Error exporting PDF:', error);
    }
};
