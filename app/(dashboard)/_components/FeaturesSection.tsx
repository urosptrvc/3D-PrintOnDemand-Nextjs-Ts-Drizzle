import { CuboidIcon } from "lucide-react";
import { CardFeatures } from "@/components/CardFeatures";

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white w-full">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Everything You Need
        </h2>
        <h4 className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Our platform provides a seamless experience from upload to delivery
        </h4>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        <CardFeatures
          icon={CuboidIcon}
          heading={"3D Model Viewer"}
          plainText={
            "Interactive preview with orbit controls and zoom functionality"
          }
        />
        <CardFeatures
          icon={CuboidIcon}
          heading={"3D Model Viewer"}
          plainText={
            "Interactive preview with orbit controls and zoom functionality"
          }
        />
        <CardFeatures
          icon={CuboidIcon}
          heading={"3D Model Viewer"}
          plainText={
            "Interactive preview with orbit controls and zoom functionality"
          }
        />
      </div>
    </section>
  );
}
