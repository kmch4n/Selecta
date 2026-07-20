# CSV の BOM はソースにリテラル文字で書かず `\uFEFF` で書く

`src/pages/convert.astro` の Excel 用 CSV 出力（`downloadExcelCsv` / `generateSampleExcelCsv`）は
先頭に UTF-8 BOM を付ける。この BOM を**リテラルの BOM 文字**としてソースに埋め込むと、
不可視・文字化けの原因になり、grep や差分でも扱いづらい。必ず `const bom = "\uFEFF";` の
エスケープ表記を使うこと。

**背景**: 実際にリテラル BOM を埋めてしまい、エディタ・ツール間で文字が壊れて修正に手間取った。
ソース全体のエンコードは UTF-8（BOM なし）/ LF が契約（[[../.claude/CLAUDE.md]] 参照）。
