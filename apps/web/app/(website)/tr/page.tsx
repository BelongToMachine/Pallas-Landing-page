import type { Metadata } from "next";
import HomePage from "../_components/HomePage";

export const metadata: Metadata = {
  title: "Pallas — Ekipler için Kurumsal Bilgi Tabanı",
  description: "Ekip belgelerinizi izinlere duyarlı, kaynakları izlenebilir bir yapay zekâ bilgi tabanına dönüştürün.",
  openGraph: {
    title: "Pallas — Ekipler için Kurumsal Bilgi Tabanı",
    description: "Ekiplerin güvenilir ve kaynağı doğrulanabilir yanıtlar almasını sağlayın.",
    type: "website",
  },
};

export default function TurkishHomePage() {
  return <HomePage locale="tr" />;
}
