import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Save, Eye } from 'lucide-react';

interface Student {
  nom: string;
  prenom: string;
  cne: string;
  note1: string;
  note2: string;
  moyenne: number;
  longitude: number;
  latitude: number;
  dateCreation: string;
}

const FormManagement = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    cne: '',
    note1: '',
    note2: '',
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [showList, setShowList] = useState(false);
  const [notifications, setNotifications] = useState<string>('');

  // Charger les données depuis le localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem('master_rsi2020_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setStudents(parsedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotifications(message);
    setTimeout(() => setNotifications(''), 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { nom, prenom, cne, note1, note2 } = formData;
    
    if (!nom || !prenom || !cne || !note1 || !note2) {
      showNotification("Tous les champs sont obligatoires", 'error');
      return false;
    }

    const n1 = parseFloat(note1);
    const n2 = parseFloat(note2);

    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n1 > 20 || n2 < 0 || n2 > 20) {
      showNotification("Les notes doivent être entre 0 et 20", 'error');
      return false;
    }

    // Vérifier si le CNE existe déjà
    if (students.some(student => student.cne === cne)) {
      showNotification("Un étudiant avec ce CNE existe déjà", 'error');
      return false;
    }

    return true;
  };

  // Fonction pour générer des coordonnées aléaoires (Maroc)
  const generateRandomCoordinates = () => {
    // Coordonnées approximatives du Maroc
    const latMin = 27.66;
    const latMax = 35.92;
    const lngMin = -13.17;
    const lngMax = -1.12;
    
    return {
      latitude: Math.random() * (latMax - latMin) + latMin,
      longitude: Math.random() * (lngMax - lngMin) + lngMin
    };
  };

  // Sauvegarder dans le fichier texte
  const saveToFile = (updatedStudents: Student[]) => {
    // Sauvegarder dans localStorage pour persistance
    localStorage.setItem('master_rsi2020_data', JSON.stringify(updatedStudents));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const coordinates = generateRandomCoordinates();
    const moyenne = (parseFloat(formData.note1) + parseFloat(formData.note2)) / 2;
    
    const newStudent: Student = {
      nom: formData.nom,
      prenom: formData.prenom,
      cne: formData.cne,
      note1: formData.note1,
      note2: formData.note2,
      moyenne: moyenne,
      longitude: coordinates.longitude,
      latitude: coordinates.latitude,
      dateCreation: new Date().toLocaleString('fr-FR')
    };

    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    
    // Sauvegarder dans le fichier (maintenant seulement localStorage)
    saveToFile(updatedStudents);

    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      prenom: '',
      cne: '',
      note1: '',
      note2: '',
    });

    showNotification(`${newStudent.prenom} ${newStudent.nom} a été ajouté avec succès. Les données ont été sauvegardées localement.`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          Gestion de Formulaire - Fichier Local
        </h1>
        <p className="text-muted-foreground">
          Les données saisies sont stockées dans le fichier "master_rsi2020.txt"
        </p>
      </div>

      {/* Notifications */}
      {notifications && (
        <div className={`max-w-2xl mx-auto p-4 rounded-lg text-center font-medium ${
          notifications.includes('Erreur') || notifications.includes('obligatoires') || notifications.includes('existe déjà') || notifications.includes('Aucune donnée')
            ? 'bg-red-100 text-red-800 border border-red-300'
            : 'bg-green-100 text-green-800 border border-green-300'
        }`}>
          {notifications}
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {/* Section Gestion de formulaire */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-cyan-300">
              Gestion de formulaire
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-slate-700/50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-cyan-300">1. Informations</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4">
                  <Label className="w-20 text-gray-300">Nom :</Label>
                  <Input
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    placeholder="Nom"
                    className="bg-slate-600/50 border-slate-500 text-white placeholder-gray-400"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <Label className="w-20 text-gray-300">Prénom :</Label>
                  <Input
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    placeholder="Prénom"
                    className="bg-slate-600/50 border-slate-500 text-white placeholder-gray-400"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <Label className="w-20 text-gray-300">CNE :</Label>
                  <Input
                    value={formData.cne}
                    onChange={(e) => handleInputChange('cne', e.target.value)}
                    placeholder="Code national étudiant"
                    className="bg-slate-600/50 border-slate-500 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-cyan-300">2. Notes des modules</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4">
                  <Label className="w-20 text-gray-300">Module 1</Label>
                  <Input
                    value={formData.note1}
                    onChange={(e) => handleInputChange('note1', e.target.value)}
                    placeholder="Note module 1"
                    type="number"
                    min="0"
                    max="20"
                    step="0.01"
                    className="bg-slate-600/50 border-slate-500 text-white placeholder-gray-400"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <Label className="w-20 text-gray-300">Module 2</Label>
                  <Input
                    value={formData.note2}
                    onChange={(e) => handleInputChange('note2', e.target.value)}
                    placeholder="Note module 2"
                    type="number"
                    min="0"
                    max="20"
                    step="0.01"
                    className="bg-slate-600/50 border-slate-500 text-white placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={handleSubmit} 
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <Save className="h-5 w-5" /> Valider
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section Liste des étudiants */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">
              Liste des étudiants enregistrés ({students.length})
            </CardTitle>
          </CardHeader>
          <CardContent>            <div className="flex justify-center gap-4 mb-4">
              <Button 
                onClick={() => setShowList(!showList)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye className={`h-5 w-5 ${showList ? 'text-blue-600' : 'text-gray-600'}`} />
                {showList ? 'Masquer la liste' : 'Consulter liste'}
              </Button>
            </div>

            {/* Students List Table */}
            {showList && (
              students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">CNE</th>
                        <th className="py-3 px-6 text-left">Nom</th>
                        <th className="py-3 px-6 text-left">Prénom</th>
                        <th className="py-3 px-6 text-left">Module 1</th>
                        <th className="py-3 px-6 text-left">Module 2</th>
                        <th className="py-3 px-6 text-left">Moyenne</th>
                        <th className="py-3 px-6 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                      {students.map((student, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">{student.cne}</td>
                          <td className="py-3 px-6 text-left">{student.nom}</td>
                          <td className="py-3 px-6 text-left">{student.prenom}</td>
                          <td className="py-3 px-6 text-left">{student.note1}</td>
                          <td className="py-3 px-6 text-left">{student.note2}</td>
                          <td className="py-3 px-6 text-left font-semibold">{student.moyenne.toFixed(2)}</td>
                          <td className="py-3 px-6 text-left text-xs">{student.dateCreation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-gray-500">Aucun étudiant enregistré pour le moment.</p>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormManagement;