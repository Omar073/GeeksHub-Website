import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import NewUser from './NewUser';
import UserDashboard from './UserDashboard';
import LandingPage from './LandingPage';
import ErorPage from './ErorPage';
import Reservations from './Reservations';
import Subscription from './Subscription';
import Settings from './Settings';
import Sidebar from './components/Sidebar';
import PrivateRoute from './context/PrivateRoute';
import AdminBar from './components/Adminbar';
import ActiveUsers from './user';
import SubscribersAdmin from './SubscribersAdmin';
import AdminSettings from './AdminSettings';
import AdminPrivateRoute from './context/AdminPrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<ErorPage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<NewUser />} />

        {/*-----------------------ROUTE PATH FOR THE USER DASHBOARD N(((((((((((NEED TO BE PROTECTED)))))))))))-----------------------*/}
        <Route path="/home/*" element={<PrivateRoute element={Sidebar}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="subscribtions" element={<Subscription />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="settings" element={<Settings />} />
        </PrivateRoute>} />

        <Route path="/admin/*" element={<AdminPrivateRoute element={AdminBar}>
          <Route path="/" element={<ActiveUsers />} />
          <Route path="subscibers" element={<SubscribersAdmin />} />
          <Route path="adminsettings" element={<AdminSettings />} />
        </AdminPrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
