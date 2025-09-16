import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';

import AdminDashboard from './pages/AdminDashboard/Dashboard';
import Employee from './pages/AdminDashboard/Employee';
import LoanApproval from './pages/AdminDashboard/LoanApproval';
import Relations from './pages/AdminDashboard/Management/Relations';
import Meeting from './pages/AdminDashboard/Management/Meeting';
import Actions from './pages/AdminDashboard/Management/Actions';
import Request from './pages/AdminDashboard/Leave/Request';
import Credits from './pages/AdminDashboard/Leave/Credits';
import Type from './pages/AdminDashboard/Leave/Type';
import ArchiveEmployee from './pages/AdminDashboard/Archive/Employee';
import ArchiveLeaveType from './pages/AdminDashboard/Archive/LeaveType';
import ArchiveCredits from './pages/AdminDashboard/Archive/Credits';
import Payroll from './pages/AdminDashboard/Payroll';
import Attendance from './pages/AdminDashboard/Attendance';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  // Define routes that should trigger loader
  const showLoaderRoutes = [
    '/',
    '/admin/dashboard',
    '/admin/login',
    '/admin/register',
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (showLoaderRoutes.includes(pathname)) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [pathname]);

  if (loading && showLoaderRoutes.includes(pathname)) {
    return (
      <Loader
        title="University of Caloocan City"
        description="Please wait a moment."
      />
    );
  }

  return (
    <Routes>
      {/* ADMIN DASHBOARD LAYOUT */}
      <Route element={<DefaultLayout />}>
        <Route
          index
          element={
            <>
              <PageTitle title="UCC | Dashboard" />
              <AdminDashboard />
            </>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | Human Resource Management" />
              <AdminDashboard />
            </>
          }
        />

        <Route
          path="/admin/employee"
          element={
            <>
              <PageTitle title="Employee | Human Resource Management" />
              <Employee />
            </>
          }
        />

        <Route
          path="/admin/payroll"
          element={
            <>
              <PageTitle title="Payroll | Human Resource Management" />
              <Payroll />
            </>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <>
              <PageTitle title="Attendance | Human Resource Management" />
              <Attendance />
            </>
          }
        />

        <Route
          path="/admin/loan-approval"
          element={
            <>
              <PageTitle title="Loan | Human Resource Management" />
              <LoanApproval />
            </>
          }
        />

        <Route
          path="/admin/management/relations"
          element={
            <>
              <PageTitle title="Relations | Human Resource Management" />
              <Relations />
            </>
          }
        />

        <Route
          path="/admin/management/meeting"
          element={
            <>
              <PageTitle title="Meeting | Human Resource Management" />
              <Meeting />
            </>
          }
        />

        <Route
          path="/admin/management/actions"
          element={
            <>
              <PageTitle title="Actions | Human Resource Management" />
              <Actions />
            </>
          }
        />

        <Route
          path="/admin/leave/request"
          element={
            <>
              <PageTitle title="Request | Human Resource Management" />
              <Request />
            </>
          }
        />

        <Route
          path="/admin/leave/credits"
          element={
            <>
              <PageTitle title="Credits | Human Resource Management" />
              <Credits />
            </>
          }
        />

        <Route
          path="/admin/leave/type"
          element={
            <>
              <PageTitle title="Type | Human Resource Management" />
              <Type />
            </>
          }
        />

        <Route
          path="/admin/archive/employee"
          element={
            <>
              <PageTitle title="Employee | Human Resource Management" />
              <ArchiveEmployee />
            </>
          }
        />

        <Route
          path="/admin/archive/leave-type"
          element={
            <>
              <PageTitle title="Leave Type | Human Resource Management" />
              <ArchiveLeaveType />
            </>
          }
        />

        <Route
          path="/admin/archive/credits"
          element={
            <>
              <PageTitle title="Credits | Human Resource Management" />
              <ArchiveCredits />
            </>
          }
        />

        {/* DESIGN AND LAYOUT REFERENCE */}
        <Route
          path="/ecommerce"
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
      </Route>

      <Route
        path="/admin/login"
        element={
          <>
            <PageTitle title="Login | Human Resource Management" />
            <SignIn />
          </>
        }
      />

      <Route
        path="/admin/register"
        element={
          <>
            <PageTitle title="Register | Human Resource Management" />
            <SignUp />
          </>
        }
      />
    </Routes>
  );
}

export default App;
