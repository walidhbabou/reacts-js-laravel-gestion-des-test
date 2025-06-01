import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, FileText, Image, BookOpen, TrendingUp, Code, Sparkles, Globe, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom'; 

const Mesprojet = () => {
  const modules = [
    {
      title: "Manipulation de matrices avec JavaScript",
      description: "Calculer la somme et le produit de matrices avec des algorithmes optimisés",
      icon: Calculator,
      url: "/matrix",
      color: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      progress: 0,
    },
    {
      title: "Manipulation de formulaires avec PHP",
      description: "Gestion avancée de formulaires et sauvegarde sécurisée dans des fichiers",
      icon: FileText,
      url: "/forms",
      color: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      progress: 0,
    },
    {
      title: "Gestion d'images en base de données",
      description: "Upload, stockage et affichage optimisés d'images avec validation",
      icon: Image,
      url: "/images",
      color: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      progress: 0,
    },
    {
      title: "Quiz Interactif",
      description: "Tests de connaissances approfondis en JavaScript et PHP avec scoring",
      icon: BookOpen,
      url: "/quiz",
      color: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      progress: 0,
    },
    {
      title: "Statistiques Étudiantes",
      description: "Visualisation des moyennes et performances des étudiants avec Chart.js",
      icon: BarChart,
      url: "/statistics",
      color: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-50 to-pink-100",
      progress: 0,
    },
    {
      title: "Géolocalisation",
      description: "Visualisation de la répartition géographique des étudiants sur une carte interactive",
      icon: Globe,
      url: "/geolocation",
      color: "from-red-500 to-red-600",
      bgGradient: "from-red-50 to-red-100",
      progress: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm">
            <Globe className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Langage du Web</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Espace de Travail
          </h1>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Découvrez les différents modules du cours de développement web moderne.
            <br />
            Chaque module contient des exercices pratiques et des projets innovants à réaliser.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">4</h3>
                  <p className="text-slate-600">Modules Disponibles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">0%</h3>
                  <p className="text-slate-600">Progression Globale</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Débutant</h3>
                  <p className="text-slate-600">Niveau Actuel</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modules.map((module, index) => (
            <Link key={index} to={module.url} className="group cursor-pointer">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-1 h-full overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${module.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <module.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                        {module.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-base text-slate-600 leading-relaxed">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Progress Section */}
        <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-0 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Votre Parcours d'Apprentissage
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 text-lg leading-relaxed">
              Explorez chaque module pour développer vos compétences en développement web moderne.
              Votre progression sera sauvegardée automatiquement et la soumission finale contiendra 
              tous les travaux demandés avec une évaluation personnalisée.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">JavaScript</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">PHP</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Base de données</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">Quiz interactif</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Mesprojet;