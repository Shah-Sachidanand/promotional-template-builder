import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Partners = lazy(() => import('./pages/Partners'));
const PartnerDetail = lazy(() => import('./pages/PartnerDetail'));
const Templates = lazy(() => import('./pages/Templates'));
const TemplateBuilder = lazy(() => import('./pages/TemplateBuilder'));
const TemplateEditor = lazy(() => import('./pages/TemplateEditor'));
const Promotions = lazy(() => import('./pages/Promotions'));
const PromotionDetail = lazy(() => import('./pages/PromotionDetail'));
const PromotionCreator = lazy(() => import('./pages/PromotionCreator'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><LoadingSpinner size="lg" /></div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Add the new register route */}

            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />

              <Route path="partners">
                <Route index element={<Partners />} />
                <Route path=":id" element={<PartnerDetail />} />
              </Route>

              <Route path="templates">
                <Route index element={<Templates />} />
                <Route path="create" element={<TemplateBuilder />} />
                <Route path=":id/edit" element={<TemplateEditor />} />
              </Route>

              <Route path="promotions">
                <Route index element={<Promotions />} />/
                <Route path="create" element={<PromotionCreator />} />
                <Route path=":id" element={<PromotionDetail />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;