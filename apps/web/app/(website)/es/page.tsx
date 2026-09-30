import type { Metadata } from "next";
import HomePage from "../_components/HomePage";

export const metadata: Metadata = {
  title: "Pallas — Base de conocimiento con IA para equipos",
  description: "Convierte los documentos de tu equipo en una base de conocimiento con permisos y respuestas trazables.",
  openGraph: {
    title: "Pallas — Base de conocimiento con IA para equipos",
    description: "Ayuda a tu equipo a obtener respuestas fiables y verificables en sus fuentes.",
    type: "website",
  },
};

export default function SpanishHomePage() {
  return <HomePage locale="es" />;
}
