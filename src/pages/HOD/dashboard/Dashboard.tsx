import React, { useState, useEffect } from 'react';
import InputSection from '../../../components/HOD/inputSection';
import { ToastProvider } from '../../../context/ToastContext';





export function Dashboard() {
    return (
        <ToastProvider>
            <InputSection />
        </ToastProvider>
    )
}
