import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { GraduationCap, Menu, X } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header académique */}
      <header className="fixed top-0 left-0 right-0 bg-blue-900 text-white border-b border-blue-800 shadow-lg z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white hover:bg-blue-800 p-2 rounded-md lg:hidden transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <GraduationCap size={28} className="text-blue-200" />
              <div>
                <h1 className="text-xl font-bold">Plateforme Académique</h1>
                <p className="text-sm text-blue-200 hidden sm:block">
                  Système de Gestion Éducative
                </p>
              </div>
            </div>
          </div>
          
          {/* Zone utilisateur */}
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">Année Académique</p>
              <p className="text-xs text-blue-200">2024-2025</p>
            </div>
            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Corps principal */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <AppSidebar />
        </div>
        
        <main className="flex-1 lg:ml-64">
          {/* Breadcrumb ou navigation secondaire */}
    
          
          {/* Contenu principal */}
          <div className="p-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Footer académique */}
      <footer className="bg-white border-t border-gray-200 mt-auto lg:ml-64">
        <div className="px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-600">
              © 2024 Université/École - Tous droits réservés
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Support Technique
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Guide d'utilisation
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 text-center md:text-left">
            Version 1.0 - Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;