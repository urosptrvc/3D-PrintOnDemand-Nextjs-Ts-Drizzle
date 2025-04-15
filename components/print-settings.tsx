"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAtom } from "jotai";
import { printOrderAtom } from "@/lib/store";

export function PrintSettings() {
  const [printOrder, setPrintOrder] = useAtom(printOrderAtom);
  return (
    <Tabs defaultValue="material" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="material">Material & Color</TabsTrigger>
        <TabsTrigger value="quality">Print Quality</TabsTrigger>
        <TabsTrigger value="support">Support & Extras</TabsTrigger>
      </TabsList>

      <TabsContent value="material" className="space-y-6 pt-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Material</h3>
            <RadioGroup
              value={printOrder.material}
              onValueChange={(value) =>
                setPrintOrder({ ...printOrder, material: value })
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                <RadioGroupItem value="pla" id="pla" />
                <div className="space-y-1">
                  <Label htmlFor="pla" className="font-medium">
                    PLA
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Standard material, good for most prints. Biodegradable and
                    easy to print.
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Properties:</span>
                    <span className="ml-2 text-muted-foreground">
                      Printing temp: 190-220°C, Medium strength
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 opacity-60">
                <RadioGroupItem value="abs" id="abs" disabled />
                <div className="space-y-1">
                  <Label htmlFor="abs" className="font-medium">
                    ABS (Coming Soon)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Durable and heat-resistant. Good for functional parts.
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Properties:</span>
                    <span className="ml-2 text-muted-foreground">
                      Printing temp: 220-250°C, High strength
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 opacity-60">
                <RadioGroupItem value="petg" id="petg" disabled />
                <div className="space-y-1">
                  <Label htmlFor="petg" className="font-medium">
                    PETG (Coming Soon)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Combines strength of ABS with ease of printing like PLA.
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Properties:</span>
                    <span className="ml-2 text-muted-foreground">
                      Printing temp: 230-250°C, High strength, Flexible
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 opacity-60">
                <RadioGroupItem value="tpu" id="tpu" disabled />
                <div className="space-y-1">
                  <Label htmlFor="tpu" className="font-medium">
                    TPU (Coming Soon)
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Flexible material, good for parts that need to bend.
                  </p>
                  <div className="flex items-center text-sm">
                    <span className="font-medium">Properties:</span>
                    <span className="ml-2 text-muted-foreground">
                      Printing temp: 210-230°C, Medium strength, Very flexible
                    </span>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-2">Color</h3>
            <RadioGroup
              value={printOrder.color}
              onValueChange={(value) =>
                setPrintOrder({ ...printOrder, color: value })
              }
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
            >
              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem
                  value="white"
                  id="white"
                  className="cursor-pointer relative h-12 w-12 bg-white border"
                />
                <Label htmlFor="white" className="text-sm">
                  White
                </Label>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem
                  value="black"
                  id="black"
                  className="cursor-pointer relative h-12 w-12 bg-black border"
                />
                <Label htmlFor="black" className="text-sm">
                  Black
                </Label>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem
                  value="red"
                  id="red"
                  className="cursor-pointer relative h-12 w-12 bg-red-500 border"
                />
                <Label htmlFor="red" className="text-sm">
                  Red
                </Label>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem
                  value="blue"
                  id="blue"
                  className="cursor-pointer relative h-12 w-12 bg-blue-500 border"
                />
                <Label htmlFor="blue" className="text-sm">
                  Blue
                </Label>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <RadioGroupItem
                  value="gray"
                  id="gray"
                  className="cursor-pointer relative h-12 w-12 bg-gray-400 border"
                />
                <Label htmlFor="gray" className="text-sm">
                  Gray
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="quality" className="space-y-6 pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-medium">Layer Height</h3>
              <span className="text-sm font-medium">
                {printOrder.layerHeight} mm
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Lower values create smoother prints but take longer. Higher values
              print faster but show more visible layers.
            </p>
            <Slider
              value={[printOrder.layerHeight * 100]}
              min={10}
              max={30}
              step={5}
              onValueChange={(value) =>
                setPrintOrder({ ...printOrder, layerHeight: value[0] / 100 })
              }
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Fine (0.1mm)</span>
              <span>Standard (0.2mm)</span>
              <span>Draft (0.3mm)</span>
            </div>
          </div>

          <div className="pt-6">
            <div className="flex justify-between mb-2">
              <h3 className="text-lg font-medium">Infill Percentage</h3>
              <span className="text-sm font-medium">{printOrder.infill}%</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Controls the density inside your print. Higher values create
              stronger parts but use more material.
            </p>
            <Slider
              value={[printOrder.infill]}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) =>
                setPrintOrder({ ...printOrder, infill: value[0] })
              }
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Light (10%)</span>
              <span>Standard (20%)</span>
              <span>Strong (50%)</span>
              <span>Solid (100%)</span>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="support" className="space-y-6 pt-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Support Structure</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Support structures help print overhanging features. They are removed
            after printing.
          </p>
          <Select
            value={printOrder.supportStructure}
            onValueChange={(value) =>
              setPrintOrder({ ...printOrder, supportStructure: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select support type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">
                None (Only for simple models)
              </SelectItem>
              <SelectItem value="auto">Auto (Recommended)</SelectItem>
              <SelectItem value="everywhere">Everywhere</SelectItem>
              <SelectItem value="buildplate">
                Touching Buildplate Only
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </TabsContent>
    </Tabs>
  );
}
