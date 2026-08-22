export type GenevaStatus = "yes" | "no" | "bilateral";

export type NationalityInfo = {
  code: string;
  flag: string;
  labelJa: string;
  geneva: GenevaStatus;
  /** Japanese source text explaining license/passport requirements for this nationality. */
  noteJa: string;
  requiresPassport: boolean;
};

export const NATIONALITIES: NationalityInfo[] = [
  {
    code: "CN",
    flag: "🇨🇳",
    labelJa: "中国",
    geneva: "no",
    noteJa:
      "ジュネーブ条約非加盟国です。国際運転免許証は使用できません。日本国内で運転するには、運転免許センターで学科・技能試験を受けて日本の運転免許に切り替える（外免切替）必要があります。パスポートと本国の運転免許証原本をご準備ください。",
    requiresPassport: true,
  },
  {
    code: "KR",
    flag: "🇰🇷",
    labelJa: "韓国",
    geneva: "yes",
    noteJa:
      "ジュネーブ条約加盟国です。韓国発行の国際運転免許証とパスポートがあれば運転できます。国際運転免許証の有効期間は日本入国から1年間です。",
    requiresPassport: true,
  },
  {
    code: "US",
    flag: "🇺🇸",
    labelJa: "アメリカ",
    geneva: "yes",
    noteJa:
      "ジュネーブ条約加盟国です。米国発行の国際運転免許証とパスポートがあれば運転できます。国際運転免許証の有効期間は日本入国から1年間です。",
    requiresPassport: true,
  },
  {
    code: "VN",
    flag: "🇻🇳",
    labelJa: "ベトナム",
    geneva: "no",
    noteJa:
      "ジュネーブ条約非加盟国です。国際運転免許証は使用できません。運転免許センターでの外免切替が必要です。あわせてベトナム運転免許証の日本語翻訳文（JAF発行など）をご準備ください。",
    requiresPassport: true,
  },
  {
    code: "BR",
    flag: "🇧🇷",
    labelJa: "ブラジル",
    geneva: "yes",
    noteJa:
      "ジュネーブ条約加盟国です。ブラジル発行の国際運転免許証とパスポートがあれば運転できます。国際運転免許証の有効期間は日本入国から1年間です。",
    requiresPassport: true,
  },
  {
    code: "PH",
    flag: "🇵🇭",
    labelJa: "フィリピン",
    geneva: "yes",
    noteJa:
      "ジュネーブ条約加盟国です。フィリピン発行の国際運転免許証とパスポートがあれば運転できます。国際運転免許証の有効期間は日本入国から1年間です。",
    requiresPassport: true,
  },
  {
    code: "NP",
    flag: "🇳🇵",
    labelJa: "ネパール",
    geneva: "no",
    noteJa:
      "ジュネーブ条約非加盟国です。国際運転免許証は使用できません。運転免許センターでの外免切替が必要です。",
    requiresPassport: true,
  },
  {
    code: "TW",
    flag: "🇹🇼",
    labelJa: "台湾",
    geneva: "bilateral",
    noteJa:
      "ジュネーブ条約には非加盟ですが、日本との二国間取決めにより運転が認められています。JAF発行の台湾運転免許証日本語翻訳文、台湾運転免許証、パスポートの3点をご準備ください。",
    requiresPassport: true,
  },
  {
    code: "OTHER",
    flag: "🌐",
    labelJa: "その他の国籍",
    geneva: "no",
    noteJa:
      "国・地域により必要書類が異なります。ジュネーブ条約加盟国であれば国際運転免許証とパスポート、非加盟国であれば運転免許センターでの外免切替が必要です。ご不明な場合は店舗スタッフにお問い合わせください。",
    requiresPassport: true,
  },
];

export function getNationality(code: string): NationalityInfo {
  return NATIONALITIES.find((n) => n.code === code) ?? NATIONALITIES[NATIONALITIES.length - 1];
}
