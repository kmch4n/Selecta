# shuffle-display-only — シャッフルは表示だけ、採点と復習は canonical 順のまま

選択肢シャッフルと設問順シャッフルは**表示（出題）のためだけ**の並べ替えで、`quizData` の
`options` / `correct` / `questions` の配列順は絶対に触らない。`index.astro` の `QuizApp` が担う。

- **2 つの独立トグル**。選択肢の並び（キー `selecta.shuffle.v1`）と設問の出題順
  （キー `selecta.qshuffle.v1`）。どちらも既定 OFF、`try/catch` で localStorage 不可でも動く。
  ホーム画面の `.shuffle-group` に 2 つのスイッチを縦積み。
- **座標系を 2 つに分ける**。canonical＝JSON 上の元 index。表示位置＝画面に出す順。
  - 選択肢: `displayOrders[canonicalQ][displayPos] = canonicalOption`。
  - 設問: `questionOrder[playPos] = canonicalQ`。`currentQuestionIndex` は **play position**。
    設問データ・`userAnswers`・`displayOrders` へのアクセスは全て `canonical()` 経由に通す。
- **採点・永続化・アンサートラックは canonical 空間のまま無変更**。`userAnswers` は canonical
  index で持ち、`confirmAnswer` / 結果集計 / `ReviewStore.record` は並べ替えを一切意識しない。
  変換は DOM 境界（`displayQuestion` の描画ループ・`renderTrack`・数字キー）だけに閉じる。
- **なぜ表示だけか**: `ReviewStore.hash` は選択肢の並びに依存する（[[review-store]]）。実データで
  選択肢を並べ替えると設問の識別ハッシュがずれて復習が壊れる。**設問順**シャッフルはハッシュに
  無関係（順序非依存）なので本来安全だが、実装の対称性のため同じ「表示だけ」方式で統一した。
- **トラックは play 順で描く**。`renderTrack` は `questionOrder` を回し、各セグメントを canonical に
  引き直して正誤色を付ける。現在位置 `is-now` は `playPos === currentQuestionIndex` で判定。
- **安定と再シャッフル**: 並びはセッション内で安定（前後移動で崩さない）。生成は `startQuiz` と
  `restart`（「やり直す」で再シャッフルし、位置記憶をさらに崩す。OFF 時は恒等で no-op）。
- Fisher–Yates を使う。ロジックは scratchpad の Node スクリプトで一様性・往復整合を確認済み。

関連: [[review-store]]（順序依存ハッシュの出所）。
