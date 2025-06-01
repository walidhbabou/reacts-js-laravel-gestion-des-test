import { Calculator, FileText, Image, BookOpen, Home, LogOut, BarChart3, MapPin, User, FolderOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const menuItems = [
  {
    title: "About Me",
    url: "/about",
    icon: User,
  },
  {
    title: "Mes projets",
    url: "/projects",
    icon: FolderOpen,
  }
];

export function AppSidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col">
      {/* Header de la sidebar */}
      <div className="border-b p-4 bg-gradient-to-r from-blue-900/5 to-blue-800/5 mt-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center shadow-md transition-transform hover:scale-105">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-sm text-gray-900">Université Hassan 1er</h2>
            <p className="text-xs text-gray-600">Master RSI</p>
          </div>
        </div>
      </div>

      {/* Contenu principal de la sidebar */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3">
          <div className="mb-4">
            <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Navigation
            </h3>
            <nav className="space-y-1">
              {menuItems.map((item, index) => {
                const isActive = location.pathname === item.url;
                return (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`group flex items-start gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-blue-50/50 hover:text-blue-900 ${
                      isActive 
                        ? 'bg-blue-100 text-blue-900 border-r-2 border-blue-600' 
                        : 'text-gray-700'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <span className={`inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded-full ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-600 group-hover:bg-blue-200 group-hover:text-blue-800'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <span className="truncate">{item.title}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer de la sidebar */}
      <div className="border-t p-4 bg-gray-50/50 mt-auto">
        <div className="space-y-3">
          {user && (
            <div className="text-sm p-3 rounded-lg bg-white/80 border border-gray-100 shadow-sm">
              <p className="font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-gray-600 text-xs truncate">{user.email}</p>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full justify-start gap-2 text-gray-700 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
}