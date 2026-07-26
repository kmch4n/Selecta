# MEMORY

このプロジェクトの共有メモリのインデックス。Claude / Codex など複数エージェントが
暗黙知を頭やセッションに留めず、ここに明文化して共有するための場所。

## 運用ルール

- **記録する**: セッションを超えて有用で、コード・`CLAUDE.md` からは自明に読み取れない
  非自明な知見（設計判断の理由、ハマりどころ、外部ツールの制約、確定した方針）を得たら、
  `.memory/` に 1 ファイル 1 事項で追加し、下のインデックスに 1 行追記する。
- **参照する**: 作業を始める前にこのファイルを読み、関連するメモリを開く。
- **書かない**: コードや `CLAUDE.md` に既にある情報、そのセッション限りの事柄、憶測。
- **手入れする**: 誤りが判明したメモリは修正・削除する。相対日付は絶対日付に直して書く。
- 各メモリファイルの先頭に 1 行の要約を置く。関連は `[[file-name]]` で緩くリンクする。

## Index

- [bom-escape-in-source](bom-escape-in-source.md) — CSV の BOM はリテラル文字でなく `\uFEFF` で書く
- [pwa-registration-wiring](pwa-registration-wiring.md) — SW 登録は Layout.astro の手動配線が前提。設定の存在を動作の証拠にしない
- [font-subset-strategy](font-subset-strategy.md) — 和文はチャンク分割版を import し、woff2 は precache しない
- [design-system-is-design-md](design-system-is-design-md.md) — 色・余白・書体の判断は `design.md` に従う
- [theme-toggle](theme-toggle.md) — ダークは data-theme + localStorage のオプトイン。既定ライト・OS 非追従
- [review-store](review-store.md) — 苦手復習は設問の内容ハッシュで localStorage に永続化する
- [shuffle-display-only](shuffle-display-only.md) — 選択肢/設問順シャッフルは表示だけ。採点・復習は canonical 順のまま
