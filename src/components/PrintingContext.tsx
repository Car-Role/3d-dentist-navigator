import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from './ui/card';

const scanners = [
  { value: 'Medit i500', label: 'Medit i500' },
  { value: 'Medit i700', label: 'Medit i700' },
  { value: 'iTero Element 5D', label: 'iTero Element 5D' },
  { value: 'TRIOS 4', label: 'TRIOS 4' },
];

const resins = [
  { value: 'NextDent Model 2.0', label: 'NextDent Model 2.0' },
  { value: 'NextDent Cast', label: 'NextDent Cast' },
  { value: 'NextDent Surgical Guide', label: 'NextDent Surgical Guide' },
];

const problemTypes = [
  { value: 'Print Failure', label: 'Print Failure' },
  { value: 'Calibration Issue', label: 'Calibration Issue' },
  { value: 'Material Issue', label: 'Material Issue' },
  { value: 'Software Issue', label: 'Software Issue' },
];

export interface PrintingContextData {
  scanner: string;
  resin: string;
  currentPage: string;
  problemType: string;
}

interface PrintingContextProps {
  context: PrintingContextData;
  onChange: (context: PrintingContextData) => void;
}

const PrintingContext = ({ context, onChange }: PrintingContextProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasInitialMessage, setHasInitialMessage] = useState(false);

  // Check if there are any messages in localStorage
  useEffect(() => {
    const sessions = localStorage.getItem('chatSessions');
    if (sessions) {
      const parsedSessions = JSON.parse(sessions);
      setHasInitialMessage(parsedSessions.length > 0);
      // Auto-collapse if there are messages
      setIsExpanded(!parsedSessions.length);
    }
  }, []);

  if (!isExpanded && hasInitialMessage) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <ChevronDown className="h-4 w-4" />
        Show equipment selection
      </button>
    );
  }

  return (
    <Card className="p-4 bg-white shadow-sm border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Help us provide better assistance</h3>
          <p className="text-sm text-gray-500">Select your equipment and issue type</p>
        </div>
        {hasInitialMessage && (
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronUp className="h-4 w-4" />
            Hide
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Scanner Model</label>
          <Select
            value={context.scanner}
            onValueChange={(value) => onChange({ ...context, scanner: value })}
          >
            <SelectTrigger className="w-full bg-white border-gray-200 hover:bg-gray-50/50 transition-colors">
              <SelectValue placeholder="Select scanner" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {scanners.map((scanner) => (
                <SelectItem 
                  key={scanner.value} 
                  value={scanner.value}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {scanner.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Resin Type</label>
          <Select
            value={context.resin}
            onValueChange={(value) => onChange({ ...context, resin: value })}
          >
            <SelectTrigger className="w-full bg-white border-gray-200 hover:bg-gray-50/50 transition-colors">
              <SelectValue placeholder="Select resin" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {resins.map((resin) => (
                <SelectItem 
                  key={resin.value} 
                  value={resin.value}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {resin.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Issue Type</label>
          <Select
            value={context.problemType}
            onValueChange={(value) => onChange({ ...context, problemType: value })}
          >
            <SelectTrigger className="w-full bg-white border-gray-200 hover:bg-gray-50/50 transition-colors">
              <SelectValue placeholder="Select issue" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {problemTypes.map((problem) => (
                <SelectItem 
                  key={problem.value} 
                  value={problem.value}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  {problem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default PrintingContext; 