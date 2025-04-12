import {HeroSection} from "@/app/(dashboard)/_components/HeroSection";
import {FeaturesSection} from "@/app/(dashboard)/_components/FeaturesSection";
import {ProcessSection} from './_components/ProcessSection';


export default function HomePage() {
    return (
        <main>
            <HeroSection/>
            <FeaturesSection/>
            <ProcessSection/>
        </main>
    );
}
