import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image, Upload, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Assurez-vous que l'URL de votre API Laravel est correcte
const API_BASE_URL = 'http://localhost:8000/api'; // Remplacez si nécessaire

interface ImageRecord {
  id: number;
  name: string;
  mime_type: string; // MIME type
  size: number; // Size in bytes
  alt_text?: string | null; // Optional alt text
  description?: string | null; // Optional description
  created_at: string;
  updated_at: string;
  url: string; // URL to the backend endpoint serving the image binary data
  formatted_size: string; // Human-readable size
}

const ImageManagement = () => {
  const [images, setImages] = useState<ImageRecord[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to hold the selected file
  const [showAllImages, setShowAllImages] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const { toast } = useToast();

  // Function to fetch images from the backend
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/images`);
      if (response.data.success) {
        setImages(response.data.data);
        toast({
          title: "Liste des images chargée",
          description: `${response.data.data.length} image(s) trouvée(s).`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: response.data.message || "Impossible de charger la liste des images.",
        });
      }
    } catch (error: unknown) {
      console.error("Erreur lors du chargement des images:", error);
      let errorMessage = "Impossible de charger la liste des images.";
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
          errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Optional: Add frontend validation here before setting the file
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Erreur de fichier",
          description: "Veuillez sélectionner un fichier image valide",
        });
        setSelectedFile(null); // Clear selected file
        return;
      }

      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Fichier trop volumineux",
          description: "La taille du fichier ne doit pas dépasser 5MB",
        });
        setSelectedFile(null); // Clear selected file
        return;
      }

      setSelectedFile(file);
      // Update the file input label to show the selected file name (optional)
      const fileNameSpan = document.getElementById('file-name');
      if(fileNameSpan) fileNameSpan.textContent = file.name;

    } else {
       setSelectedFile(null);
       const fileNameSpan = document.getElementById('file-name');
       if(fileNameSpan) fileNameSpan.textContent = 'Aucun fichier choisi';
    }
  };

  // Handle image upload to the backend
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Aucun fichier sélectionné",
        description: "Veuillez choisir une image avant de valider.",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    // You can add alt_text and description fields here if you add inputs for them in the form
    // formData.append('alt_text', 'some alt text');
    // formData.append('description', 'some description');

    try {
      const response = await axios.post(`${API_BASE_URL}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("response.data:", response.data);

      if (response.data.success) {
        Swal.fire("Succès", response.data.message, "success");

        setSelectedFile(null); // Clear selected file after upload
        const fileNameSpan = document.getElementById('file-name');
        if(fileNameSpan) fileNameSpan.textContent = 'Aucun fichier choisi';
        // Optionally refresh the list after successful upload
        if(showAllImages) {
           fetchImages();
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erreur upload",
          description: response.data.message || "Erreur lors de l'upload de l'image",
        });
      }

    } catch (error: unknown) {
      console.error("Erreur lors de l'upload de l'image:", error);
      let errorMessage = "Une erreur est survenue lors de l'upload de l'image.";
       if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
          errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Erreur upload",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6"> {/* Added padding for better spacing */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Image className="h-8 w-8 text-primary" />
          Gestion d'images avec le backend
        </h1>
        <p className="text-muted-foreground">
          Uploadez et consultez les images via l'API Laravel.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors mb-8"> {/* Added mb-8 */}
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Manipulation d'images</CardTitle>
            <CardDescription>
              Choix d'une image à insérer :
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="space-y-4 w-full max-w-md">
                <div className="flex items-center gap-4">
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                      <Upload className="h-4 w-4" />
                      Choisir un fichier
                    </div>
                  </Label>
                  {/* Display selected file name */}
                  <span id="file-name" className="text-sm text-muted-foreground">Aucun fichier choisi</span>
                </div>
                
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <Button className="w-full" onClick={handleUpload} disabled={!selectedFile || loading}> {/* Link to upload function */}
                  {loading ? 'Upload...' : 'Insérer Image'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Liste des images */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-800">
              Images stockées
            </CardTitle>
            <CardDescription className="text-center">
              {showAllImages ? `${images.length} image(s) disponible(s)` : 'Cliquez pour voir les images'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Button to toggle list visibility */}
            <div className="flex justify-center mb-4">
              <Button 
                onClick={() => {
                  if (!showAllImages) { // If list is about to be shown, fetch data
                    fetchImages();
                  }
                  setShowAllImages(!showAllImages);
                }}
                variant="outline"
                className="flex items-center gap-2"
                disabled={loading} // Disable button during loading
              >
                <Eye className={`h-5 w-5 ${showAllImages ? 'text-blue-600' : 'text-gray-600'}`} />
                {showAllImages ? 'Masquer la liste' : 'Afficher toutes les images'}
              </Button>
            </div>

            {/* Images List Display */}
            {showAllImages && (loading ? (
              <p className="text-center text-gray-500">Chargement de la liste...</p>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="aspect-video relative bg-gray-100">
                      <img
                        src={image.url} // Use the URL from the backend
                        alt={image.alt_text || image.name} // Use alt_text or name
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold truncate mb-2">{image.name}</h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Type: {image.mime_type}</p>
                        <p>Taille: {image.formatted_size} {/* Use formatted_size from backend */}</p>
                        <p>Uploadé le: {new Date(image.created_at).toLocaleString('fr-FR')} {/* Display upload date */}</p>
                         {image.description && <p>Description: {image.description}</p>} {/* Display description if exists */}
                         {image.alt_text && <p>Alt Text: {image.alt_text}</p>} {/* Display alt text if exists */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <Image className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Aucune image uploadée pour le moment</p>
                <p className="text-sm">Uploadez une image pour commencer</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Note section */}
      <Card className="bg-cyan-50 border-cyan-200">
        <CardContent className="p-4">
          <p className="text-cyan-800 font-medium">
            NB. Le projet est accompagné d'une vidéo explicative montrant le travail demandé pour cette partie 3.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageManagement;
