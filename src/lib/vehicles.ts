export type FuelType = "gasoline" | "hybrid" | "ev";

export type Vehicle = {
  id: string;
  name: string;
  category: string;
  fuelType: FuelType;
  /** Japanese source description of the dashboard/controls, fed to the AI for translation. */
  controlsJa: string;
  /** Japanese source description of fueling/charging steps, fed to the AI for translation. */
  fuelGuideJa: string;
};

export const VEHICLES: Vehicle[] = [
  {
    id: "prius",
    name: "トヨタ プリウス",
    category: "ハイブリッドセダン",
    fuelType: "hybrid",
    controlsJa: `
- パワースイッチ：ブレーキを踏みながら押すと起動。エンジン音がしなくても正常です。
- シフトレバー：一般的なP/R/N/Dの配置ではなく、ジョイスティック式。押し込んで操作します。Pボタンは別に独立しています。
- パーキングブレーキ：足踏み式ではなく、運転席右下の電動パーキングブレーキスイッチ。
- ハザードランプ：センターパネル上部の三角ボタン。
- エアコン：センターディスプレイのタッチパネルから操作。
- ワイパー：ステアリングコラム右側のレバー。
`,
    fuelGuideJa: `
ハイブリッド車のためレギュラーガソリンを使用します。給油口は運転席側後方。
給油口のフタは車内から解錠する必要はなく、外側のレバーを押すと開きます。
給油キャップは反時計回りに回して開けます。
`,
  },
  {
    id: "alphard",
    name: "トヨタ アルファード",
    category: "ミニバン",
    fuelType: "gasoline",
    controlsJa: `
- エンジンスタートボタン：ブレーキを踏みながら押します。
- シフトレバー：センターコンソールのP/R/N/D標準配置。
- 電動スライドドア：後部座席のドア外側/内側ボタン、またはリモコンキーの開閉ボタンで操作。
- パーキングブレーキ：電動式、運転席左下のスイッチ。
- ハザードランプ：センターパネル上部の三角ボタン。
- ドライブレコーダー：フロントガラス上部に設置済み。
`,
    fuelGuideJa: `
レギュラーガソリンを使用します。給油口は運転席側後方。
給油口のフタは運転席のレバーで開けるタイプです。
給油キャップは反時計回りに回して開けます。
`,
  },
  {
    id: "leaf",
    name: "日産 リーフ",
    category: "電気自動車（EV）",
    fuelType: "ev",
    controlsJa: `
- パワースイッチ：ブレーキを踏みながら押すと起動。
- シフトレバー：円形のセレクタースイッチ。D/N/R/Pの位置に回して操作します。
- e-Pedal（イーペダル）：センターコンソールのスイッチでON/OFF。ONにするとアクセルだけで加減速・停止が可能。
- パーキングブレーキ：ボタン式、シフトセレクター横に配置。
- 充電状態の確認：メーター内のバッテリー残量表示、またはセンターディスプレイ。
`,
    fuelGuideJa: `
電気自動車のため給油ではなく充電が必要です。
充電ポートは車両前方（フロントグリル部）にあります。
急速充電（CHAdeMOコネクタ）は高速道路のSAや充電スタンドで利用できます。
普通充電は宿泊施設などのコンセントで一晩かけて行うのが一般的です。
充電開始前に必ず車両の電源をOFFにしてください。
`,
  },
  {
    id: "fit",
    name: "ホンダ フィット",
    category: "コンパクトカー",
    fuelType: "gasoline",
    controlsJa: `
- エンジンスタートボタン：ブレーキを踏みながら押します。
- シフトレバー：センターコンソールのP/R/N/D標準配置。
- パーキングブレーキ：足踏み式（左足でペダルを踏み込む）。解除はレバーを引きます。
- ハザードランプ：センターパネル上部の三角ボタン。
- エアコン：センターパネルの物理ボタンとダイヤルで操作。
`,
    fuelGuideJa: `
レギュラーガソリンを使用します。給油口は運転席側後方。
給油口のフタは運転席のレバーで開けるタイプです。
給油キャップは反時計回りに回して開けます。
`,
  },
];

export function getVehicle(id: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.id === id);
}

export function fuelTypeLabelJa(fuelType: FuelType): string {
  switch (fuelType) {
    case "gasoline":
      return "レギュラーガソリン車";
    case "hybrid":
      return "ハイブリッド車（レギュラーガソリン使用）";
    case "ev":
      return "電気自動車（EV、充電が必要）";
  }
}
