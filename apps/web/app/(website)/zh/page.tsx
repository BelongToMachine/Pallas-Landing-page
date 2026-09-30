import type { Metadata } from "next";
import HomePage from "../_components/HomePage";

export const metadata: Metadata = {
  title: "Pallas — 团队 AI 知识库",
  description:
    "将团队文档转化为按权限访问、答案可追溯的 AI 知识库。",
  openGraph: {
    title: "Pallas — 团队 AI 知识库",
    description: "让团队共享知识，快速获得有据可查的 AI 回答。",
    type: "website",
  },
};

export default function ChineseHomePage() {
  return <HomePage locale="zh" />;
}
