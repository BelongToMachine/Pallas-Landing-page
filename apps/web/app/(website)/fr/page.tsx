import type { Metadata } from "next";
import HomePage from "../_components/HomePage";

export const metadata: Metadata = {
  title: "Pallas — Base de connaissances IA pour les équipes",
  description: "Transformez les documents de votre équipe en une base de connaissances IA respectueuse des permissions et vérifiable à la source.",
  openGraph: {
    title: "Pallas — Base de connaissances IA pour les équipes",
    description: "Aidez votre équipe à obtenir des réponses fiables et vérifiables à la source.",
    type: "website",
  },
};

export default function FrenchHomePage() {
  return <HomePage locale="fr" />;
}
