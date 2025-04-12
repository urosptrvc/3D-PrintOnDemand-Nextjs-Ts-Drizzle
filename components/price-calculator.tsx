"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PriceCalculatorProps {
  file: File | null
  settings: {
    material: string
    color: string
    layerHeight: number
    infill: number
    supportStructure: string
  }
}

// Mock function to calculate volume - in a real app, this would analyze the 3D model
const calculateVolume = (file: File | null) => {
  // This is a placeholder - in a real app, you would parse the 3D model file
  // and calculate its actual volume
  if (!file) return 0

  // For demo purposes, we'll use the file size as a rough approximation
  // In a real app, you'd analyze the actual 3D model geometry
  const fileSizeInMB = file.size / (1024 * 1024)
  return fileSizeInMB * 10 // Rough approximation for demo
}

// Mock function to estimate print time
const estimatePrintTime = (volume: number, layerHeight: number, infill: number) => {
  // This is a simplified calculation for demo purposes
  // In a real app, you'd use a more sophisticated algorithm
  const baseTime = volume * 5 // Base time in minutes
  const layerFactor = 0.2 / layerHeight // Thinner layers take longer
  const infillFactor = infill / 20 // Higher infill takes longer

  return Math.round(baseTime * layerFactor * infillFactor)
}

export function PriceCalculator({ file, settings }: PriceCalculatorProps) {
  const [volume, setVolume] = useState(0)
  const [printTime, setPrintTime] = useState(0)
  const [materialCost, setMaterialCost] = useState(0)
  const [machineCost, setMachineCost] = useState(0)
  const [baseFee, setBaseFee] = useState(5)
  const [totalCost, setTotalCost] = useState(0)

  // Material costs per cm³
  const materialCosts = {
    pla: 0.05,
    abs: 0.06,
    petg: 0.07,
    tpu: 0.09,
  }

  // Machine cost per hour
  const MACHINE_COST_PER_HOUR = 2.5

  useEffect(() => {
    if (file) {
      const calculatedVolume = calculateVolume(file)
      setVolume(calculatedVolume)

      const estimatedPrintTime = estimatePrintTime(calculatedVolume, settings.layerHeight, settings.infill)
      setPrintTime(estimatedPrintTime)

      // Calculate costs
      const material = settings.material as keyof typeof materialCosts
      const materialCostValue = calculatedVolume * materialCosts[material]
      setMaterialCost(materialCostValue)

      const machineCostValue = (estimatedPrintTime / 60) * MACHINE_COST_PER_HOUR
      setMachineCost(machineCostValue)

      // Calculate total
      setTotalCost(materialCostValue + machineCostValue + baseFee)
    }
  }, [file, settings])

  if (!file) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Calculation</CardTitle>
          <CardDescription>Upload a file to see pricing</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Calculation</CardTitle>
        <CardDescription>Based on your model and selected settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">File Name</p>
              <p className="font-medium truncate">{file.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Volume</p>
              <p className="font-medium">{volume.toFixed(2)} cm³</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Material</p>
              <p className="font-medium capitalize">{settings.material}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Color</p>
              <p className="font-medium capitalize">{settings.color}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Layer Height</p>
              <p className="font-medium">{settings.layerHeight} mm</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Infill</p>
              <p className="font-medium">{settings.infill}%</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm">Material Cost</p>
              <p className="font-medium">${materialCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Machine Cost</p>
              <p className="font-medium">${machineCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Base Fee</p>
              <p className="font-medium">${baseFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Estimated Print Time</p>
              <p className="font-medium">
                {printTime > 60 ? `${Math.floor(printTime / 60)}h ${printTime % 60}m` : `${printTime}m`}
              </p>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">Total</p>
            <p className="text-xl font-bold">${totalCost.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
