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
            margin: [15, 15],
            filename: fileName,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 3,
                useCORS: true,
                letterRendering: true,
                allowTaint: true,
                logging: false,
                windowWidth: 1080
            },
            jsPDF: {
                unit: 'mm',
                format: 'a3',
                orientation: 'portrait',
                compress: true,
                precision: 16
            }
        };

        await html2pdf().set(options).from(element).save();
    } catch (error) {
        console.error('Error exporting PDF:', error);
    }
};