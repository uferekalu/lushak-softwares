import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import ContactForm from "@/components/ContactForm";
import AnimatedSection from "@/components/AnimatedSection";

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <AnimatedSection className="container mx-auto py-8">
        <ServicesOverview />
      </AnimatedSection>
      <ContactForm />
    </main>
  );
}