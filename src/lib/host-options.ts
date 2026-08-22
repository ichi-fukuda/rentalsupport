export type HostOption = {
  id: string;
  labelJa: string;
  descJa: string;
};

export const HOST_OPTIONS: HostOption[] = [
  {
    id: "multilingual_manual",
    labelJa: "多言語マニュアル解説",
    descJa: "貸出マニュアルをAIが多言語で説明します。",
  },
  {
    id: "accident_ai",
    labelJa: "事故対応AIサポート",
    descJa: "事故発生時、AIがヒアリングし構造化レポートを店舗に共有します。",
  },
  {
    id: "fuel_guide",
    labelJa: "給油・充電ガイド",
    descJa: "車種の燃料タイプに応じた給油・充電方法をAIが説明します。",
  },
];

export function parseOptions(csv: string): string[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
