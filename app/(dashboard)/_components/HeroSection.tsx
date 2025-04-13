import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PrinterAnimation } from "@/app/(dashboard)/printer-animation";

export function HeroSection() {
  return (
    <section className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
              Your 3D Designs
              <span className="block text-orange-500">
                Printed to Perfection
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Upload your 3D models and get high-quality prints delivered to
              your door. Fast, reliable, and affordable.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <Link href="/upload">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg rounded-full"
                >
                  Upload your model
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-16 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="w-full h-[600px]">
              <PrinterAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
