export type LangCode = "ja" | "en" | "zh" | "ko";

export const LANGUAGES: { code: LangCode; label: string }[] = [
  { code: "ja", label: "日本語" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ko", label: "한국어" },
];

export function isLangCode(value: string): value is LangCode {
  return LANGUAGES.some((l) => l.code === value);
}

export function languageLabel(code: LangCode): string {
  return LANGUAGES.find((l) => l.code === code)?.label ?? code;
}

type Dict = Record<string, string>;

export const UI_TEXT: Record<LangCode, Dict> = {
  ja: {
    siteTitle: "レンタカー多言語サポート",
    navHome: "ホーム",
    navManual: "マニュアル解説",
    navVehicles: "車種ガイド",
    navAccident: "事故対応",
    homeHeading: "外国人のお客様にも安心のレンタカー体験を。",
    homeSubheading:
      "AIが貸出マニュアル・車の操作方法・事故対応を多言語でサポートします。",
    cardManualTitle: "マニュアルAI解説",
    cardManualDesc:
      "貸出マニュアルを入力するだけで、AIが要点を整理し多言語で説明します。",
    cardVehiclesTitle: "車種別 運転席ガイド",
    cardVehiclesDesc: "車種ごとの運転席まわりの操作を多言語で確認できます。",
    cardAccidentTitle: "事故時のAIサポート",
    cardAccidentDesc:
      "事故が起きた際、AIが落ち着いて対応手順を多言語で案内します。",
    goButton: "開く",
    manualPageTitle: "マニュアルAI解説",
    manualPageDesc:
      "レンタカーの貸出マニュアル（日本語）を貼り付けると、選択した言語で分かりやすく要約・説明します。",
    manualInputLabel: "貸出マニュアルのテキスト",
    manualInputPlaceholder:
      "例：ご利用前に、燃料の種類とレベルをご確認ください。返却時は満タン返却でお願いします。...",
    manualSubmit: "AIで解説する",
    manualLoading: "AIが解析しています…",
    manualResultTitle: "AIによる解説",
    vehiclesPageTitle: "車種別 運転席ガイド",
    vehiclesPageDesc:
      "車種を選択すると、運転席まわりの操作方法をAIが多言語で説明します。",
    vehicleExplainButton: "運転席の説明を見る",
    vehicleFuelButton: "給油・充電方法を見る",
    vehicleBack: "車種一覧に戻る",
    accidentPageTitle: "事故時のAIサポート",
    accidentPageDesc:
      "状況を入力すると、AIが落ち着いて対応手順を案内します。緊急時はまず110番（警察）・119番（消防・救急）へ連絡してください。",
    accidentInputPlaceholder: "例：他の車と接触しました。ケガ人はいません。",
    accidentSend: "送信",
    accidentThinking: "AIが回答を作成しています…",
    controlsHeading: "運転席まわりの操作",
    fuelHeading: "給油・充電ガイド",
    errorGeneric: "エラーが発生しました。もう一度お試しください。",
    errorMissingKey:
      "サーバーにAnthropic APIキーが設定されていません。管理者に連絡してください。",
  },
  en: {
    siteTitle: "Rental Car Multilingual Support",
    navHome: "Home",
    navManual: "Manual Explainer",
    navVehicles: "Vehicle Guide",
    navAccident: "Accident Support",
    homeHeading: "A worry-free rental car experience for international guests.",
    homeSubheading:
      "AI supports rental manuals, in-car controls, and accident response in multiple languages.",
    cardManualTitle: "AI Manual Explainer",
    cardManualDesc:
      "Paste your rental manual and AI will summarize and explain it in the customer's language.",
    cardVehiclesTitle: "Vehicle Dashboard Guide",
    cardVehiclesDesc: "Check driver's seat controls for each vehicle, translated.",
    cardAccidentTitle: "AI Accident Support",
    cardAccidentDesc:
      "If an accident happens, AI calmly guides the renter through next steps in their language.",
    goButton: "Open",
    manualPageTitle: "AI Manual Explainer",
    manualPageDesc:
      "Paste the rental manual (any language) and AI will summarize it clearly in the selected language.",
    manualInputLabel: "Rental manual text",
    manualInputPlaceholder:
      "e.g. Please check the fuel type and level before use. Please return the car with a full tank...",
    manualSubmit: "Explain with AI",
    manualLoading: "AI is analyzing…",
    manualResultTitle: "AI Explanation",
    vehiclesPageTitle: "Vehicle Dashboard Guide",
    vehiclesPageDesc:
      "Select a vehicle and AI will explain the driver's seat controls in your language.",
    vehicleExplainButton: "View driver's seat explanation",
    vehicleFuelButton: "View fueling/charging guide",
    vehicleBack: "Back to vehicle list",
    accidentPageTitle: "AI Accident Support",
    accidentPageDesc:
      "Describe the situation and AI will calmly guide you through next steps. In an emergency, call 110 (police) or 119 (fire/ambulance) first.",
    accidentInputPlaceholder: "e.g. I hit another car. No one is injured.",
    accidentSend: "Send",
    accidentThinking: "AI is composing a response…",
    controlsHeading: "Driver's seat controls",
    fuelHeading: "Fueling / Charging Guide",
    errorGeneric: "Something went wrong. Please try again.",
    errorMissingKey:
      "The server is missing an Anthropic API key. Please contact the administrator.",
  },
  zh: {
    siteTitle: "租车多语言支持",
    navHome: "首页",
    navManual: "手册解读",
    navVehicles: "车型指南",
    navAccident: "事故支持",
    homeHeading: "为外国客户提供安心的租车体验。",
    homeSubheading: "AI以多语言支持租车手册、车辆操作和事故处理。",
    cardManualTitle: "AI手册解读",
    cardManualDesc: "粘贴租车手册，AI会整理要点并用多语言进行说明。",
    cardVehiclesTitle: "车型驾驶座指南",
    cardVehiclesDesc: "可以用多语言确认各车型驾驶座周围的操作方法。",
    cardAccidentTitle: "事故时的AI支持",
    cardAccidentDesc: "发生事故时，AI会冷静地用多语言引导应对步骤。",
    goButton: "打开",
    manualPageTitle: "AI手册解读",
    manualPageDesc: "粘贴租车手册文本，AI会用所选语言清晰地总结说明。",
    manualInputLabel: "租车手册文本",
    manualInputPlaceholder: "例如：使用前请确认燃料种类和油量。还车时请加满油。...",
    manualSubmit: "用AI解读",
    manualLoading: "AI正在解析…",
    manualResultTitle: "AI解读结果",
    vehiclesPageTitle: "车型驾驶座指南",
    vehiclesPageDesc: "选择车型，AI会用您的语言说明驾驶座周围的操作方法。",
    vehicleExplainButton: "查看驾驶座说明",
    vehicleFuelButton: "查看加油/充电方法",
    vehicleBack: "返回车型列表",
    accidentPageTitle: "事故时的AI支持",
    accidentPageDesc:
      "输入情况后，AI会冷静地引导您应对。紧急情况请先拨打110（警察）或119（消防/急救）。",
    accidentInputPlaceholder: "例如：与其他车辆发生了碰撞，没有人受伤。",
    accidentSend: "发送",
    accidentThinking: "AI正在生成回复…",
    controlsHeading: "驾驶座周围的操作",
    fuelHeading: "加油/充电指南",
    errorGeneric: "发生错误，请重试。",
    errorMissingKey: "服务器未设置Anthropic API密钥，请联系管理员。",
  },
  ko: {
    siteTitle: "렌터카 다국어 지원",
    navHome: "홈",
    navManual: "매뉴얼 AI 해설",
    navVehicles: "차종 가이드",
    navAccident: "사고 대응",
    homeHeading: "외국인 고객도 안심할 수 있는 렌터카 경험을.",
    homeSubheading: "AI가 대여 매뉴얼, 차량 조작, 사고 대응을 다국어로 지원합니다.",
    cardManualTitle: "AI 매뉴얼 해설",
    cardManualDesc: "대여 매뉴얼을 입력하면 AI가 요점을 정리해 다국어로 설명합니다.",
    cardVehiclesTitle: "차종별 운전석 가이드",
    cardVehiclesDesc: "차종별 운전석 조작 방법을 다국어로 확인할 수 있습니다.",
    cardAccidentTitle: "사고 시 AI 지원",
    cardAccidentDesc: "사고 발생 시 AI가 차분하게 대응 절차를 다국어로 안내합니다.",
    goButton: "열기",
    manualPageTitle: "AI 매뉴얼 해설",
    manualPageDesc:
      "대여 매뉴얼 텍스트를 붙여넣으면 선택한 언어로 알기 쉽게 요약·설명합니다.",
    manualInputLabel: "대여 매뉴얼 텍스트",
    manualInputPlaceholder:
      "예: 이용 전 연료 종류와 잔량을 확인해 주세요. 반납 시 연료를 가득 채워주세요...",
    manualSubmit: "AI로 해설하기",
    manualLoading: "AI가 분석 중입니다…",
    manualResultTitle: "AI 해설",
    vehiclesPageTitle: "차종별 운전석 가이드",
    vehiclesPageDesc: "차종을 선택하면 AI가 운전석 조작 방법을 언어로 설명합니다.",
    vehicleExplainButton: "운전석 설명 보기",
    vehicleFuelButton: "주유/충전 방법 보기",
    vehicleBack: "차종 목록으로 돌아가기",
    accidentPageTitle: "사고 시 AI 지원",
    accidentPageDesc:
      "상황을 입력하면 AI가 차분하게 대응 절차를 안내합니다. 긴급 시에는 먼저 110(경찰) 또는 119(소방/구급)에 연락하세요.",
    accidentInputPlaceholder: "예: 다른 차와 접촉했습니다. 부상자는 없습니다.",
    accidentSend: "전송",
    accidentThinking: "AI가 답변을 작성 중입니다…",
    controlsHeading: "운전석 주변 조작",
    fuelHeading: "주유/충전 가이드",
    errorGeneric: "오류가 발생했습니다. 다시 시도해 주세요.",
    errorMissingKey: "서버에 Anthropic API 키가 설정되어 있지 않습니다. 관리자에게 문의하세요.",
  },
};

export function t(lang: LangCode, key: string): string {
  return UI_TEXT[lang]?.[key] ?? UI_TEXT.ja[key] ?? key;
}
