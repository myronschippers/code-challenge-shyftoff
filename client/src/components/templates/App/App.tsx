import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Layout } from '@components/templates/Layout';
import { Agents } from '@/routes/Agents';
import { Campaigns } from '@/routes/Campaigns';
import { Home } from '@/routes/Home';
import { NotFound } from '@/routes/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
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
    </QueryClientProvider>
  );
}

export default App;
