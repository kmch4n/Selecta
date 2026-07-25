色・余白・書体・モーションの判断は、ルートの `design.md` が唯一の決定権を持つ。

デザインを触る前に必ず `design.md` を読む。ページごとにテーマを選び直すのは
（各ページが単体では成立していても）このプロジェクトでは劣化とみなす。

## 現在のテーマ: modern-minimal / custom-quiet（ライト既定・ダークはオプトイン）

2026-07-24 に、Hum（暖色クリーム・pear 黄・playful・丸ゴシック・light/dark）から
**静か・ミニマル（近白 `#fbfcfd` / 濃紺 `#1a2432` / 藍一色 `#2b4570`）**へ全面転換した。
理由: Hum が「AI っぽい」と評価され、特にダークが汎用的な見た目に落ちていたため。

2026-07-26 に**トグル式ダークを追加**（旧「ライト専用」ロックは撤回）。ライトは既定・
アプリのアイデンティティのまま。ダークは反転ではなく設計値で、light と同じ三原則を守る。
運用の詳細は [[theme-toggle]]。

## 特に効いてくる決めごと

- **リテラル値は `src/styles/tokens.css` にしか書かない。** `main.css` や `.astro` に
  生の色・長さ・`font-family` を書くと、3回の編集でトークン体系が崩れる。
- **ライト既定・ダークはオプトイン。** ダーク値は `:root[data-theme="dark"]` にだけ足し、
  light の `:root` は触らない。**`prefers-color-scheme` には追従しない**（OS 追従ブロックを
  足さない）。既定 `:root` の `color-scheme: light` と dark ブロックの `color-scheme: dark` で
  UA 部品を現在テーマに合わせる。詳細は [[theme-toggle]]。
- **アクセントは藍一色で、対話の意図（リンク・フォーカス・進行中・選択枠）だけに使う。**
  主ボタンは accent ではなく **ink 塗り**（濃紺地＋白文字）。accent が大面積を持たない。
- **意味論を装飾より先に予約する。** 緑=正解、赤=誤答。accent はどちらでもない。
- **セマンティック色には fill 版と ink 版がある。** テキストは ink 版（`--color-ok-ink` /
  `--color-ng-ink`）を使う。fill 版（`--color-ok` / `--color-ng`）は枠線・キー背景・トラック用。
- **角丸は小さい**（ボタン/入力 8px・カード 14px・チップ 6px）。pill は track だけ。
- **playful シグネチャは撤去済み**（ワードマークの点滅ドット、正解時の star-burst）。復活させない。
- **2ページは別マクロ構造**（`/` = Marquee Hero、`/convert` = Workbench）。

## 日本語の改行

- `html` に `line-break: strict`（禁則）を置き、全テキストで行頭 `。、`・小書き仮名割れを防ぐ。
- 見出しは `overflow-wrap: anywhere` を残す（ユーザー JSON の長い英字トークンで横溢れさせない）。
- ヒーロー見出しは `word-break: keep-all` ＋ 句境界の `<wbr>` でフレーズ単位に折る。

## reduced-motion は「動きを止める」ではない

スコアのカウンターは reduced-motion でも hidden タブ（rAF 停止）でも**最終値に着地**させる。
0 のまま固めるとスコアの誤表示になる（`tickUp` に安全網の `setTimeout` あり）。

（2026-07-24 の静か・ミニマル転換で確定。監査記録は `design.md` と `main.css` 冒頭スタンプ。）
