import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import VoiceChat from './pages/VoiceChat';

function App() {
  const role = localStorage.getItem('role');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tests/results" element={<ResultsPage />} />
        <Route path="/test/:testType" element={<TestPage />} />
        <Route path="/chat" element={<VoiceChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
