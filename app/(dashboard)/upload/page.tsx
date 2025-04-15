"use client";

import { useState } from "react";
import { FileUpload } from "@/components/file-upload";
import { ModelViewer } from "@/components/model-viewer";
import { PrintSettings } from "@/components/print-settings";
import { PriceCalculator } from "@/components/price-calculator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { printOrderAtom } from "@/lib/store";
import { useAtom } from "jotai";
import Link from "next/link";
import PaymentPage from "@/components/payment-page";

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [printOrder, setPrintOrder] = useAtom(printOrderAtom);

  const goToNextStep = () => {
    if (activeTab === "upload" && printOrder.uploadedFile)
      setActiveTab("preview");
    else if (activeTab === "preview") setActiveTab("settings");
    else if (activeTab === "settings") setActiveTab("checkout");
    else if (activeTab === "checkout") setActiveTab("payment");
  };

  const goToPreviousStep = () => {
    if (activeTab === "preview") setActiveTab("upload");
    else if (activeTab === "settings") setActiveTab("preview");
    else if (activeTab === "checkout") setActiveTab("settings");
    else if (activeTab === "payment") setActiveTab("checkout");
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Create Your 3D Print Order</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="preview" disabled={!printOrder.uploadedFile}>
              Preview
            </TabsTrigger>
            <TabsTrigger value="settings" disabled={!printOrder.uploadedFile}>
              Settings
            </TabsTrigger>
            <TabsTrigger value="checkout" disabled={!printOrder.uploadedFile}>
              Checkout
            </TabsTrigger>
            <TabsTrigger value="payment" disabled={!printOrder.uploadedFile}>
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-6">
            <div className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Upload Your 3D Model
                </h2>
                <p className="text-muted-foreground mb-6">
                  We accept STL, OBJ, and 3MF files up to 100MB. Your file will
                  be securely processed and prepared for printing.
                </p>
                <FileUpload />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={goToNextStep}
                  disabled={!printOrder.uploadedFile}
                >
                  Continue to Preview <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="mt-6">
            <div className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Preview Your Model
                </h2>
                <p className="text-muted-foreground mb-6">
                  Examine your 3D model from all angles. You can rotate, zoom,
                  and pan to get a better view.
                </p>
                {printOrder.uploadedFile && <ModelViewer />}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Upload
                </Button>
                <Button onClick={goToNextStep}>
                  Continue to Settings <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Configure Print Settings
                </h2>
                <p className="text-muted-foreground mb-6">
                  Choose your preferred material, color, and print settings to
                  customize your 3D print.
                </p>
                <PrintSettings />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Preview
                </Button>
                <Button onClick={goToNextStep}>
                  Continue to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="checkout" className="mt-6">
            <div className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <p className="text-muted-foreground mb-6">
                  Review your order details and pricing before proceeding to
                  payment.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {printOrder.uploadedFile && <ModelViewer height={300} />}
                  </div>
                  <div>
                    <PriceCalculator />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={goToPreviousStep}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
                </Button>
                <Button onClick={goToNextStep}>
                  Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <div className="space-y-6">
              <div className="bg-muted/50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Enter shipping details
                </h2>
                <p className="text-muted-foreground mb-6">
                  Please enter email, name, phone number and address
                </p>
                <PaymentPage />
              </div>

              <Button
                className={"relative"}
                variant="outline"
                onClick={goToPreviousStep}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Preview
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
