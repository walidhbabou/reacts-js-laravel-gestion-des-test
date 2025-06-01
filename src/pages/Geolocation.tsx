import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface EtudiantData {
  id: number;
  nom: string;
  latitude: number | null;
  longitude: number | null;
}

interface CurrentLocation {
  lat: number;
  lng: number;
}

interface UserData {
  id: number;
  name: string;
  latitude: number | null;
  longitude: number | null;
}

const center = {
  lat: 31.7917,
  lng: -7.0926
}; // Approximate center of Morocco

const GeolocationPage = () => {
  const [etudiants, setEtudiants] = useState<EtudiantData[]>([]);
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const API_URL = 'http://localhost:8000';

  useEffect(() => {
    // Get user info from localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetch(`${API_URL}/api/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setUserData({
          id: data.id,
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude
        });
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
      });
    }
  }, []);

  useEffect(() => {
    const fetchEtudiants = async () => {
      try {
        const response = await fetch(`${API_URL}/api/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setEtudiants(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student data:', err);
        setError('Erreur lors du chargement des données des étudiants');
        setLoading(false);
      }
    };

    fetchEtudiants();
  }, []);

  useEffect(() => {
    // Initialize map
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [center.lat, center.lng],
        6
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);
    }

    // Get current location
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setCurrentLocation(location);
            setLocationError(null);

            // Update map center if map is loaded
            if (mapRef.current) {
              mapRef.current.setView([location.lat, location.lng], 10);
              
              // Add current location marker
              L.marker([location.lat, location.lng], {
                icon: L.divIcon({
                  className: 'current-location-marker',
                  html: `<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
                  iconSize: [16, 16]
                })
              })
              .bindPopup(userData?.name || 'Ma position actuelle')
              .addTo(mapRef.current);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            switch(error.code) {
              case error.PERMISSION_DENIED:
                setLocationError("L'accès à la géolocalisation a été refusé.");
                break;
              case error.POSITION_UNAVAILABLE:
                setLocationError("Les informations de localisation ne sont pas disponibles.");
                break;
              case error.TIMEOUT:
                setLocationError("La demande de géolocalisation a expiré.");
                break;
              default:
                setLocationError("Une erreur inconnue s'est produite.");
                break;
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      } else {
        setLocationError("La géolocalisation n'est pas supportée par ce navigateur.");
      }
    };

    getCurrentLocation();

    // Add student markers
    if (mapRef.current) {
      etudiants.forEach((etudiant) => {
        if (etudiant.latitude !== null && etudiant.longitude !== null) {
          L.marker([etudiant.latitude, etudiant.longitude])
            .bindPopup(etudiant.nom)
            .addTo(mapRef.current!);
        }
      });
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [etudiants, userData]);

  if (loading) return <div className="flex items-center justify-center h-64">Chargement...</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Géolocalisation des Étudiants
          </CardTitle>
          <p className="text-gray-600">
            Visualisation de la répartition géographique des étudiants et votre position actuelle
          </p>
        </CardHeader>
      </Card>

      {error && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-blue-800">
              <MapPin className="h-5 w-5" />
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {locationError && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-yellow-800">
              <Navigation className="h-5 w-5" />
              <span>{locationError}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Carte des Étudiants</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapContainerRef}
            style={{ height: '400px' }}
            className="rounded-lg overflow-hidden bg-gray-100"
          />
        </CardContent>
      </Card>

      {currentLocation && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Votre Position Actuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Latitude:</span>
                <p className="text-gray-600">{currentLocation.lat.toFixed(6)}</p>
              </div>
              <div>
                <span className="font-medium">Longitude:</span>
                <p className="text-gray-600">{currentLocation.lng.toFixed(6)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GeolocationPage;