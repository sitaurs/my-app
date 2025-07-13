import { Route, Routes } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import OverviewPage from '@/pages/OverviewPage';
import TradesPage from '@/pages/TradesPage';
import PromptsPage from '@/pages/PromptsPage';
import EnvPage from '@/pages/EnvPage';
import SettingsPage from '@/pages/SettingsPage';
import DashboardLayout from '@/layouts/DashboardLayout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <DashboardLayout>
            <Routes>
              <Route index element={<OverviewPage />} />
              <Route path="trades" element={<TradesPage />} />
              <Route path="prompts" element={<PromptsPage />} />
              <Route path="env" element={<EnvPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Routes>
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

export default App;
