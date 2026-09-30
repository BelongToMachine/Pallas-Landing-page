import type { Metadata } from "next";
import HomePage from "../_components/HomePage";

export const metadata: Metadata = {
  title: "Pallas — チーム向け AI ナレッジベース",
  description: "チームのドキュメントを、権限に配慮した出典確認可能な AI ナレッジベースに変えます。",
  openGraph: {
    title: "Pallas — チーム向け AI ナレッジベース",
    description: "信頼でき、根拠を確認できる回答をチームに届けます。",
    type: "website",
  },
};

export default function JapaneseHomePage() {
  return <HomePage locale="ja" />;
}
