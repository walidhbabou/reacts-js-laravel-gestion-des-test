import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Target, BookOpen, Users, Award, Lightbulb } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-8 py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm">
            <Globe className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Plateforme Éducative</span>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Espace Académique
          </h1>
          
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Bienvenue sur votre plateforme d'apprentissage personnalisée.
            <br />
            Un environnement conçu pour favoriser l'excellence académique et le développement professionnel.
          </p>
        </div>

        {/* Objectif Principal */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 shadow-lg">
              <Target className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Notre Objectif
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <CardDescription className="text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
              Fournir une plateforme d'apprentissage moderne et interactive qui permet aux étudiants 
              de développer leurs compétences techniques et théoriques dans un environnement stimulant. 
              Notre mission est de créer un pont entre les connaissances académiques et les applications 
              pratiques du monde professionnel.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Description Détaillée */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">
                  Approche Pédagogique
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-700 leading-relaxed">
                Notre approche combine théorie et pratique à travers des projets concrets, 
                des exercices interactifs et des évaluations continues. Chaque module est 
                conçu pour développer progressivement vos compétences tout en respectant 
                votre rythme d'apprentissage.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">
                  Communauté d'Apprentissage
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-700 leading-relaxed">
                Rejoignez une communauté dynamique d'apprenants et d'experts. 
                Partagez vos expériences, collaborez sur des projets et bénéficiez 
                du soutien de vos pairs dans votre parcours de développement personnel 
                et professionnel.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">
                  Excellence Académique
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-700 leading-relaxed">
                Nous nous engageons à maintenir les plus hauts standards académiques 
                tout en innovant dans nos méthodes d'enseignement. Nos programmes sont 
                régulièrement mis à jour pour refléter les dernières avancées dans 
                chaque domaine d'étude.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-md">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">
                  Innovation & Créativité
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base text-slate-700 leading-relaxed">
                Encouragez votre créativité et votre esprit d'innovation à travers 
                des défis stimulants et des projets créatifs. Développez votre capacité 
                à résoudre des problèmes complexes et à proposer des solutions originales.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Message de Bienvenue */}
        <Card className="bg-gradient-to-r from-blue-900/5 via-indigo-900/5 to-purple-900/5 border-0 shadow-xl backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Commencez Votre Parcours d'Excellence
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto mb-8">
              Explorez un environnement d'apprentissage conçu pour votre réussite. 
              Que vous soyez débutant ou expert, notre plateforme s'adapte à vos besoins 
              et vous accompagne dans l'atteinte de vos objectifs académiques et professionnels.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
                Apprentissage Personnalisé
              </span>
              <span className="px-6 py-3 bg-green-100 text-green-800 rounded-full text-sm font-medium shadow-sm">
                Projets Pratiques
              </span>
              <span className="px-6 py-3 bg-purple-100 text-purple-800 rounded-full text-sm font-medium shadow-sm">
                Suivi de Progression
              </span>
              <span className="px-6 py-3 bg-orange-100 text-orange-800 rounded-full text-sm font-medium shadow-sm">
                Support Continu
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Homepage;