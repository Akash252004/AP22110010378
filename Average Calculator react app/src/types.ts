export interface CalculatorResponse {
  windowPrevState: number[];
  windowCurrState: number[];
  numbers: number[];
  avg: number;
}

export type NumberType = 'p' | 'f' | 'e' | 'r';

export interface NumberTypeOption {
  id: NumberType;
  label: string;
  description: string;
}

export interface WindowState {
  prevState: number[];
  currState: number[];
  newNumbers: number[];
  average: number;
}