import { BrowserRouter as Router, Routes, Route } from 'react-router';

import { Layout } from '@components/templates/Layout';
import { Agents } from '@/routes/Agents';
import { Campaigns } from '@/routes/Campaigns';
import { Home } from '@/routes/Home';
import { NotFound } from '@/routes/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
