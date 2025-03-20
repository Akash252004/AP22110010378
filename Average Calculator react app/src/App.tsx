import React, { useState, useCallback } from 'react';
import { Calculator, Hash, Infinity, Dice1 as Dice } from 'lucide-react';
import type { NumberType, WindowState, NumberTypeOption } from './types';

const NUMBER_TYPES: NumberTypeOption[] = [
  { id: 'p', label: 'Prime', description: 'Calculate average of prime numbers' },
  { id: 'f', label: 'Fibonacci', description: 'Calculate average of Fibonacci numbers' },
  { id: 'e', label: 'Even', description: 'Calculate average of even numbers' },
  { id: 'r', label: 'Random', description: 'Calculate average of random numbers' }
];

const WINDOW_SIZE = 10;

function App() {
  const [selectedType, setSelectedType] = useState<NumberType>('p');
  const [inputNumber, setInputNumber] = useState<string>('');
  const [windowState, setWindowState] = useState<WindowState>({
    prevState: [],
    currState: [],
    newNumbers: [],
    average: 0
  });
  const [error, setError] = useState<string>('');

  const getIcon = (type: NumberType) => {
    switch (type) {
      case 'p': return <Hash className="w-5 h-5" />;
      case 'f': return <Infinity className="w-5 h-5" />;
      case 'e': return <Calculator className="w-5 h-5" />;
      case 'r': return <Dice className="w-5 h-5" />;
    }
  };

  const calculateAverage = useCallback((numbers: number[]): number => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
  }, []);

  const handleAddNumber = () => {
    const number = parseFloat(inputNumber);
    
    if (isNaN(number)) {
      setError('Please enter a valid number');
      return;
    }

    setError('');
    
    const prevState = [...windowState.currState];
    let newState: number[];

    if (prevState.length >= WINDOW_SIZE) {
      // Remove oldest number and add new one
      newState = [...prevState.slice(1), number];
    } else {
      // Add new number to existing state
      newState = [...prevState, number];
    }

    setWindowState({
      prevState,
      currState: newState,
      newNumbers: [number],
      average: calculateAverage(newState)
    });

    setInputNumber('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddNumber();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Average Calculator</h1>
          <p className="text-gray-600 mb-6">
            Calculate running averages with a sliding window of {WINDOW_SIZE} numbers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {NUMBER_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {getIcon(type.id)}
                  <span className="font-semibold">{type.label}</span>
                </div>
                <p className="text-sm text-gray-600 text-left">{type.description}</p>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex gap-4">
              <input
                type="number"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter a number"
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={handleAddNumber}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Number
              </button>
            </div>
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
          </div>
        </div>

        {windowState.currState.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Previous Window State</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {windowState.prevState.length > 0 ? (
                      windowState.prevState.join(', ')
                    ) : (
                      <span className="text-gray-400">Empty</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Current Window State</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {windowState.currState.join(', ')}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">New Numbers Added</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {windowState.newNumbers.join(', ')}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Current Average</h3>
                  <div className="bg-indigo-50 rounded-lg p-3 text-indigo-700 font-semibold">
                    {windowState.average.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;