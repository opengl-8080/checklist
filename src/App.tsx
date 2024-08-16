import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from './routes/NotFound';
import CheckListsPage from './routes/checklist/CheckListsPage';
import RegisterCheckListPage from './routes/checklist/RegisterCheckListPage';
import CheckListPage from './routes/checklist/CheckListPage';
import ModifyCheckListPage from './routes/checklist/ModifyCheckListPage';
import Layout from './routes/Layout';
import PresetsPage from './routes/preset/PresetsPage';
import RegisterPresetPage from './routes/preset/RegisterPresetPage';
import ModifyPresetPage from './routes/preset/ModifyPresetPage';
import ModifyCheckListOrderPage from './routes/checklist/ModifyCheckListOrderPage';
import ModifyPresetOrderPage from './routes/preset/ModifyPresetOrderPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<CheckListsPage />} />
        <Route path="/checklist/register" element={<RegisterCheckListPage />} />
        <Route path="/checklist" element={<CheckListPage />} />
        <Route path="/checklist/modify" element={<ModifyCheckListPage />} />
        <Route path="/checklist/modify/order" element={<ModifyCheckListOrderPage />} />

        <Route path="/presets" element={<PresetsPage />} />
        <Route path="/preset/register" element={<RegisterPresetPage />} />
        <Route path="/preset/modify" element={<ModifyPresetPage />} />
        <Route path="/preset/modify/order" element={<ModifyPresetOrderPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
