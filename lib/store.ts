import { atom } from "jotai";

interface PrintOrder {
  uploadedFile: File | null;
  material: string;
  color: string;
  layerHeight: number;
  infill: number;
  supportStructure: string;
}

export const printOrderAtom = atom<PrintOrder>({
  uploadedFile: null,
  material: "pla",
  color: "white",
  layerHeight: 0.2,
  infill: 20,
  supportStructure: "auto",
});
