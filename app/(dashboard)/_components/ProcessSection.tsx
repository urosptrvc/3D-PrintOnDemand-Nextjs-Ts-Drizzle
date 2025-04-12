import { Upload, Settings, CreditCard, Truck } from "lucide-react";
import { CardProcess } from "@/components/CardProcess";

export function ProcessSection() {
  return (
    <section className="py-20">
      <div className="md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How It Works
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Four simple steps to get your 3D model printed and delivered
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          <CardProcess
            number={1}
            icon={Upload}
            heading={"Upload"}
            plainText={"Upload your 3D model file (STL, OBJ, or 3MF)"}
          />
          <CardProcess
            number={2}
            icon={Settings}
            heading={"Configure"}
            plainText={"Choose materials, colors, and print settings"}
          />
          <CardProcess
            number={3}
            icon={CreditCard}
            heading={"Order"}
            plainText={"Review your order and complete payment"}
          />
          <CardProcess
            number={4}
            icon={Truck}
            heading={"Receive"}
            plainText={"Get your high-quality 3D print delivered"}
          />
        </div>
      </div>
    </section>
  );
}
