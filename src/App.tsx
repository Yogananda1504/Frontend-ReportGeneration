import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import { useAuth } from './hooks/useAuth';
import Dashboard from './pages/Director/dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import Landing from './pages/Landing';
import QuickHelp from './pages/shared/QuickHelp';
import "react-toastify/dist/ReactToastify.css";
import { Dashboard as FacultyDashboard } from './pages/Faculty/dashboard/Dashboard';
import { useEffect, useState } from 'react';

// The Protected Route component is used to restrict access to certain routes based on the user's role
// It takes the allowedRoles prop which is an array of roles that are allowed to access the route
// If the user is not authenticated, they are redirected to the login page

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

function App() {
  const [toastPosition, setToastPosition] = useState(
    window.innerWidth < 768 ? "bottom-center" : "top-right"
  );

  useEffect(() => {
    const handleResize = () => {
      setToastPosition(window.innerWidth < 768 ? "bottom-center" : "top-right");
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <ToastContainer
        position={toastPosition as any}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />

          <Route path="/" element={<Layout />}>
            {/* Faculty Routes */}
            <Route
              path="faculty/dashboard"
              element={
                <ProtectedRoute allowedRoles={['FACULTY']}>
                  <FacultyDashboard />
                </ProtectedRoute>
              }
            />

            {/* HOD Routes */}
            <Route
              path="hod/dashboard"
              element={
                <ProtectedRoute allowedRoles={['HOD']}>
                  <div>HOD Dashboard Component Goes Here ....</div>
                </ProtectedRoute>
              }
            />

            {/* Director Routes */}
            <Route
              path="director/dashboard"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* QuickHelp Routes */}
            <Route
              path="hod/QuickHelp"
              element={
                <ProtectedRoute allowedRoles={['HOD']}>
                  <QuickHelp />
                </ProtectedRoute>
              }
            />
            <Route
              path="faculty/QuickHelp"
              element={
                <ProtectedRoute allowedRoles={['FACULTY']}>
                  <QuickHelp />
                </ProtectedRoute>
              }
            />
            <Route
              path="director/QuickHelp"
              element={
                <ProtectedRoute allowedRoles={['DIRECTOR']}>
                  <QuickHelp />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;