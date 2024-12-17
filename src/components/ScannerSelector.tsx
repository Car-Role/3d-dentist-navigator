"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScanIcon as Scan3D, ScanFace, ScanIcon as Scanner, ScanSearch, ChevronRight } from 'lucide-react'

interface ScannerContent {
  [key: string]: {
    title: string
    icon: React.ReactNode
    instructions: React.ReactNode
  }
}

const scannerTypes: ScannerContent = {
  "itero": {
    title: "iTero",
    icon: <Scanner className="w-4 h-4" />,
    instructions: (
      <ul className="list-disc pl-6 mt-4 [&>li]:text-gray-900 marker:text-gray-300">
        <li>Power on iTero scanner and launch software</li>
        <li>Select "New Scan" and enter patient information</li>
        <li>Follow guided scanning process for full arch</li>
        <li>Export scan in STL format for 3D printing</li>
      </ul>
    )
  },
  "trios": {
    title: "TRIOS",
    icon: <Scan3D className="w-4 h-4" />,
    instructions: (
      <ul className="list-disc pl-6 mt-4 [&>li]:text-gray-900 marker:text-gray-300">
        <li>Initialize TRIOS scanner and select "New Case"</li>
        <li>Complete patient details and select scan type</li>
        <li>Follow color-coded scanning guide</li>
        <li>Process and export final scan file</li>
        <li>Verify scan quality and coverage in preview mode</li>
        <li>Check occlusal clearance using digital articulation</li>
        <li>Review margin lines if applicable for restorations</li>
        <li>Validate tissue retraction in subgingival areas</li>
        <li>Ensure proper scan of interproximal contacts</li>
        <li>Confirm bite registration alignment</li>
        <li>Remove any artifacts or unwanted data</li>
        <li>Apply any necessary scan refinements</li>
        <li>Generate and review analysis report</li>
        <li>Save case with appropriate labeling</li>
      </ul>
    )
  },
  "primescan": {
    title: "Primescan",
    icon: <ScanSearch className="w-4 h-4" />,
    instructions: (
      <ul className="list-disc pl-6 mt-4 [&>li]:text-gray-900 marker:text-gray-300">
        <li>Start Primescan Connect software</li>
        <li>Create new patient case and select restoration type</li>
        <li>Use recommended scanning sequence</li>
        <li>Review and export digital impression</li>
      </ul>
    )
  },
  "medit": {
    title: "Medit",
    icon: <ScanFace className="w-4 h-4" />,
    instructions: (
      <ul className="list-disc pl-6 mt-4 [&>li]:text-gray-900 marker:text-gray-300">
        <li>Launch Medit Link software and create new case</li>
        <li>Select scan type and enter patient information</li>
        <li>Follow guided scanning workflow</li>
        <li>Process and export scan data</li>
      </ul>
    )
  }
}

const STORAGE_KEY = 'selectedScanner'

export default function ScannerSelector() {
  const [selectedScanner, setSelectedScanner] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY) || "itero"
    }
    return "itero"
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(STORAGE_KEY, selectedScanner)
    }
  }, [selectedScanner, isMounted])

  if (!isMounted) {
    return null
  }

  const handleScannerChange = (value: string) => {
    setSelectedScanner(value)
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold text-primary mb-4">Scanner Selection</h3>
      <p className="mb-4">Select your scanner type to view specific instructions for your device.</p>
      <div className="space-y-4">
        <RadioGroup
          value={selectedScanner}
          onValueChange={handleScannerChange}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2"
        >
          {Object.entries(scannerTypes).map(([value, scanner]) => (
            <div key={value} className="relative">
              <RadioGroupItem
                value={value}
                id={value}
                className="peer sr-only"
              />
              <Label
                htmlFor={value}
                className="flex items-center justify-center rounded-md border-2 border-gray-200 bg-white px-3 py-2 hover:bg-gray-50 hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
              >
                {scanner.icon}
                <span className="ml-2 text-sm font-medium">{scanner.title}</span>
                <ChevronRight className="w-4 h-4 ml-1 opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200 transition-all">
          <div className="flex items-center gap-2 mb-3">
            {scannerTypes[selectedScanner].icon}
            <h4 className="text-lg font-medium text-gray-900">{scannerTypes[selectedScanner].title} Scanning Instructions</h4>
          </div>
          {scannerTypes[selectedScanner].instructions}
        </div>
      </div>
    </div>
  )
} 