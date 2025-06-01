import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calculator, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MatrixManipulation = () => {
  const [matrix1Rows, setMatrix1Rows] = useState(2);
  const [matrix1Cols, setMatrix1Cols] = useState(2);
  const [matrix2Rows, setMatrix2Rows] = useState(2);
  const [matrix2Cols, setMatrix2Cols] = useState(2);
  const [matrix1Values, setMatrix1Values] = useState('');
  const [matrix2Values, setMatrix2Values] = useState('');
  const [sumResult, setSumResult] = useState('');
  const [productResult, setProductResult] = useState('');

  const navigate = useNavigate();

  const generateRandomValues = (rows: number, cols: number) => {
    const values = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.floor(Math.random() * 10) + 1);
      }
      values.push(row.join(' '));
    }
    return values.join('\n');
  };

  const generateMatrix1 = () => {
    setMatrix1Values(generateRandomValues(matrix1Rows, matrix1Cols));
  };

  const generateMatrix2 = () => {
    setMatrix2Values(generateRandomValues(matrix2Rows, matrix2Cols));
  };

  const parseMatrix = (values: string): number[][] => {
    return values.split('\n').map(row => 
      row.split(' ').map(num => parseInt(num) || 0)
    );
  };

  const calculateSum = () => {
    if (matrix1Rows !== matrix2Rows || matrix1Cols !== matrix2Cols) {
      setSumResult('Erreur: Les matrices doivent avoir les mêmes dimensions pour l\'addition');
      return;
    }

    const m1 = parseMatrix(matrix1Values);
    const m2 = parseMatrix(matrix2Values);
    const result = [];

    for (let i = 0; i < matrix1Rows; i++) {
      const row = [];
      for (let j = 0; j < matrix1Cols; j++) {
        row.push((m1[i]?.[j] || 0) + (m2[i]?.[j] || 0));
      }
      result.push(row.join(' '));
    }

    setSumResult(result.join('\n'));
  };

  const calculateProduct = () => {
    if (matrix1Cols !== matrix2Rows) {
      setProductResult('Erreur: Le nombre de colonnes de la première matrice doit égaler le nombre de lignes de la seconde');
      return;
    }

    const m1 = parseMatrix(matrix1Values);
    const m2 = parseMatrix(matrix2Values);
    const result = [];

    for (let i = 0; i < matrix1Rows; i++) {
      const row = [];
      for (let j = 0; j < matrix2Cols; j++) {
        let sum = 0;
        for (let k = 0; k < matrix1Cols; k++) {
          sum += (m1[i]?.[k] || 0) * (m2[k]?.[j] || 0);
        }
        row.push(sum);
      }
      result.push(row.join(' '));
    }

    setProductResult(result.join('\n'));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Button to go back */}
      <Button onClick={() => navigate(-1)} className="mb-4">Retour</Button>

      <h1 className="text-2xl font-bold mb-4">1. Manipulation de matrice avec Javascript</h1>
      
      {/* Avant remplissage section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">a. Avant remplissage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Matrice N°1 - Avant remplissage */}
          <div className="border border-blue-400 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Matrice N°1</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="matrix1-rows">Saisie des dimensions</Label>
                <div className="flex items-center gap-2">
                  <span>Nombres de lignes :</span>
                  <Input
                    id="matrix1-rows"
                    type="number"
                    value={matrix1Rows}
                    onChange={(e) => setMatrix1Rows(parseInt(e.target.value) || 0)}
                    className="w-20"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span>Nombres de colonnes :</span>
                  <Input
                    id="matrix1-cols"
                    type="number"
                    value={matrix1Cols}
                    onChange={(e) => setMatrix1Cols(parseInt(e.target.value) || 0)}
                    className="w-20"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              <Button onClick={generateMatrix1} className="w-full">
                Générer des valeurs aléatoires
              </Button>
              <div>
                <Label htmlFor="matrix1-values">Valeurs générées :</Label>
                <Textarea
                  id="matrix1-values"
                  value={matrix1Values}
                  onChange={(e) => setMatrix1Values(e.target.value)}
                  placeholder="Les valeurs aléatoires s'afficheront ici"
                  rows={Math.max(3, matrix1Rows)}
                />
              </div>
            </div>
          </div>
          
          {/* Matrice N°2 - Avant remplissage (Structure similaire à Matrice N°1) */}
          <div className="border border-blue-400 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Matrice N°2</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="matrix2-rows">Saisie des dimensions</Label>
                <div className="flex items-center gap-2">
                  <span>Nombres de lignes :</span>
                  <Input
                    id="matrix2-rows"
                    type="number"
                    value={matrix2Rows}
                    onChange={(e) => setMatrix2Rows(parseInt(e.target.value) || 0)}
                    className="w-20"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span>Nombres de colonnes :</span>
                  <Input
                    id="matrix2-cols"
                    type="number"
                    value={matrix2Cols}
                    onChange={(e) => setMatrix2Cols(parseInt(e.target.value) || 0)}
                    className="w-20"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              <Button onClick={generateMatrix2} className="w-full">
                Générer des valeurs aléatoires
              </Button>
              <div>
                <Label htmlFor="matrix2-values">Valeurs générées :</Label>
                <Textarea
                  id="matrix2-values"
                  value={matrix2Values}
                  onChange={(e) => setMatrix2Values(e.target.value)}
                  placeholder="Les valeurs aléatoires s'afficheront ici"
                  rows={Math.max(3, matrix2Rows)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Après remplissage section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">b. Après remplissage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Résultat de la Somme */}
          <div className="border border-blue-400 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Résultat de la Somme :</h3>
            {/* Display sum result here */}
            <div className="bg-gray-100 p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-gray-800">{sumResult}</pre>
            </div>
            <Button onClick={calculateSum} className="mt-4 w-full">
              Calculer Somme
            </Button>
          </div>

          {/* Résultat du Produit */}
          <div className="border border-blue-400 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-4 text-blue-700">Résultat du Produit :</h3>
            {/* Display product result here */}
            <div className="bg-gray-100 p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-gray-800">{productResult}</pre>
            </div>
            <Button onClick={calculateProduct} className="mt-4 w-full">
              Calculer Produit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixManipulation;
