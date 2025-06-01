import { useState } from "react";
import { Mail, Phone, MapPin, Calendar, GraduationCap, Briefcase, Code, Award, User, Download, ExternalLink } from "lucide-react";

const AboutMePage = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const sections = [
    { id: "profile", label: "Profil", icon: User },
    { id: "formation", label: "Formation", icon: GraduationCap },
    { id: "experience", label: "Expérience", icon: Briefcase },
    { id: "projets", label: "Projets", icon: Code },
    { id: "competences", label: "Compétences", icon: Award }
  ];

  const projets = [
    {
      titre: "Application Web de Gestion de Médias",
      technologies: "Bootstrap, Ajax, Spring Boot",
      description: "Application web pour la gestion de contenu média avec design responsive"
    },
    {
      titre: "Application de Chat en Temps Réel",
      technologies: "Socket.io, Express.js, MongoDB",
      description: "Application de chat en temps réel avec WebSocket"
    },
    {
      titre: "Application IA avec Flask",
      technologies: "Flask, NGINX, Docker",
      description: "Développement d'une application d'intelligence artificielle"
    },
    {
      titre: "Simulation Microprocesseur",
      technologies: "Java, JavaFX, Assembleur",
      description: "Simulation du microprocesseur Motorola 6809"
    },
    {
      titre: "App Mobile de Gestion de Projets",
      technologies: "Flutter, Firebase, Dart",
      description: "Application mobile pour création et suivi de projets"
    },
    {
      titre: "Chatbot Intelligent pour Service Client",
      technologies: "React.js (TypeScript), Python Flask, RASA, NLP",
      description: "Chatbot conversationnel avec compréhension du langage naturel, frontend en React/TypeScript, backend Python Flask avec intégration RASA"
    },
    {
      titre: "Projet DevOps: Infrastructure et CI/CD automatisés",
      technologies: "Docker, GitHub Actions, NGINX, Jenkins, AWS EC2",
      description: "Mise en place d'un pipeline CI/CD complet avec automatisation des tests et infrastructure déployée sur AWS"
    }
  ];

  const competences = {
    "Langages": "C++, C, Java, Python, PHP, JavaScript, SQL, CSS, React, Dart",
    "Frameworks": "Laravel, Spring Boot, JavaFX, Bootstrap, Flutter, Docker",
    "Langues": "Arabe: Courant, Français: Courant, Anglais: Avancé",
    "Gestion de Projet": "Scrum, GitHub, Trello",
    "Analyse & Conception": "UML"
  };

  const certifications = [
    "OCP Java SE 8",
    "OCA Java SE 8",
    "Oracle Foundations Java SE 17",
    "OCI DevOps Professional"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header avec photo et infos principales */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Photo de profil */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                  <img
                    src="/walid_hbabou_MST_RSI.png"
                    alt="Walid Hbabou"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
              
              {/* Informations personnelles */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">WALID HBABOU</h1>
                <p className="text-xl text-blue-200 mb-4">Étudiant en Master Réseaux et Systèmes d'Information</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    <span>walid.hbabou1999@gmail.com</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+212 607040821</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Annajah GH 28 MM 188 Appt 2, Tamessna</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <a href="https://www.linkedin.com/in/walid-hbabou-41a8a4201/" className="hover:underline">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <a 
                  href="/cv_walid_fr.pdf" 
                  download
                  className="bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Télécharger CV
                </a>
                <a 
                  href="https://github.com/walidhbabou" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white/30 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation des sections */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 min-w-[120px] px-4 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-900'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des sections */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {activeSection === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profil Professionnel</h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Développeur full-stack passionné, actuellement à la recherche d'un stage de Projet de Fin d'Année (PFA) dans les domaines du développement web et des pratiques DevOps. Fort d'une expérience en Laravel, Java, Spring Boot, React et MySQL, ainsi que dans la mise en place d'infrastructures cloud et de pipelines CI/CD.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 rounded-lg bg-blue-50">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Développement</h3>
                  <p className="text-gray-600 text-sm">Full-Stack Web & Mobile</p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-green-50">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">DevOps</h3>
                  <p className="text-gray-600 text-sm">CI/CD & Infrastructure</p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-purple-50">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">IA & ML</h3>
                  <p className="text-gray-600 text-sm">Intelligence Artificielle</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "formation" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Formation</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg">Master en Réseaux et Systèmes d'Information</h3>
                  <p className="text-gray-600">Faculté des Sciences et Techniques, Settat</p>
                  <p className="text-sm text-gray-500">2024 - Présent</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg">Licence en Génie Informatique</h3>
                  <p className="text-gray-600">Faculté des Sciences et Techniques, Settat</p>
                  <p className="text-sm text-gray-500">2023 - 2024</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg">Diplôme en Mathématiques, Informatique et Physique</h3>
                  <p className="text-gray-600">Faculté des Sciences et Techniques, Settat</p>
                  <p className="text-sm text-gray-500">2020 - 2023</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "experience" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Expérience</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg">Développeur Full Stack</h3>
                  <p className="text-gray-600">Ministère de l'Éducation Nationale, Rabat</p>
                  <p className="text-sm text-gray-500">Juin 2024</p>
                  <div className="mt-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2">Bootstrap</span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2">Laravel</span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">MySQL</span>
                  </div>
                  <ul className="list-disc list-inside mt-2 text-gray-700">
                    <li>Conception et développement d'une application de gestion de projets pour le ministère</li>
                    <li>Utilisation de Laravel, Bootstrap et MySQL pour le backend, l'interface utilisateur et la gestion de base de données</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "projets" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Projets</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projets.map((projet, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="font-semibold text-lg mb-2">{projet.titre}</h3>
                    <div className="mb-3">
                      {projet.technologies.split(', ').map((tech, i) => (
                        <span key={i} className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-2 mb-2">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{projet.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "competences" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Compétences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(competences).map(([category, skills]) => (
                  <div key={category} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-3">{category}</h3>
                    <p className="text-gray-700">{skills}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Compétences Personnelles</h3>
                <div className="flex flex-wrap gap-2">
                  {['Adaptabilité', 'Travail d\'équipe', 'Autonomie', 'Curiosité technique', 'Résolution de problèmes'].map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMePage; 