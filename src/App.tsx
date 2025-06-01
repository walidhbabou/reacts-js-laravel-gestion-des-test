import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Home";
import MatrixManipulation from "./pages/MatrixManipulation";
import FormManagement from "./pages/FormManagement";
import ImageManagement from "./pages/ImageManagement";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutMePage from "./pages/AboutMePage";
import Mesprojet from "./pages/Mesprojet";
import StatisticsPage from "./pages/Statistics";
import GeolocationPage from "./pages/Geolocation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="min-h-screen flex w-full">
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/matrix" element={<MatrixManipulation />} />
                        <Route path="/forms" element={<FormManagement />} />
                        <Route path="/images" element={<ImageManagement />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/about" element={<AboutMePage />} />
                        <Route path="/projects" element={<Mesprojet/>} />
                        <Route path="/statistics" element={<StatisticsPage />} />
                        <Route path="/geolocation" element={<GeolocationPage />} />
                      </Routes>
                    </Layout>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;