# クイズデータ形式

Selecta のクイズは JSON ファイル。`meta` ブロックと `questions` 配列を持つ。
完全な定義は [`../quiz-schema.json`](../quiz-schema.json)（JSON Schema draft-07）、
動作するサンプルは [`../public/sample-quiz.json`](../public/sample-quiz.json) にある。

## 構造

### `meta`

| キー | 必須 | 説明 |
| --- | --- | --- |
| `title` | ✓ | クイズセットのタイトル |
| `description` | | クイズセットの説明 |
| `version` | | データのバージョン |
| `created` | | 作成日時（`date-time`） |

### `questions[]`

| キー | 必須 | 説明 |
| --- | --- | --- |
| `id` | ✓ | 設問の一意識別子 |
| `question` | ✓ | 設問文（Anki の front 相当） |
| `options` | ✓ | 選択肢の配列。**2 要素以上** |
| `correct` | ✓ | 正解のインデックス。**0 始まり**で `options.length` 未満 |
| `explanation` | | 解説（Anki の back 相当） |
| `deck` | | 所属デッキ名 |
| `tags` | | タグ配列 |
| `difficulty` | | `easy` / `medium` / `hard` |

## 例

```json
{
    "meta": { "title": "サンプルクイズ" },
    "questions": [
        {
            "id": "q-1",
            "question": "HTML でリンクを作るタグはどれ？",
            "options": ["<link>", "<a>", "<href>", "<url>"],
            "correct": 1,
            "explanation": "<a> タグの href 属性がリンク先を指す。"
        }
    ]
}
```

## 選択肢の数

プレイヤーは可変選択肢に対応する。`options` は 2 要素以上なら数に制限はない。
キーボードは `1`–`9` が 1〜9 番目、`0` が 10 番目に対応し、11 個以上ある選択肢は
クリック / タップでのみ選べる。

## URL から配布するときの CORS

URL 読み込み（URL タブ・`?source=`）は、そのファイルをホストするサーバーが
**別オリジンからの読み込みを許可**していないと失敗する。ブラウザの CORS 制限で
`fetch` がブロックされ、`Failed to fetch` になる（クライアント側では回避できない）。

- アプリと**同じオリジン**に置いたファイルは追加設定なしで読める。
- **別ドメイン**（ローカル開発中の `localhost`、他人の Selecta など）から読ませたいなら、
  ファイルを返すサーバーで `Access-Control-Allow-Origin` を付ける。Apache なら:

  ```apache
  <FilesMatch "\.json$">
      Header set Access-Control-Allow-Origin "*"
      Header set Access-Control-Allow-Methods "GET, OPTIONS"
      Header append Vary "Origin"
  </FilesMatch>
  ```

  付いているかは `curl -I -H "Origin: https://example.com" <URL>` で
  `access-control-allow-origin` が返るか確認する。

## CSV / Anki 変換は 4 択固定

変換ツール（`/convert`）だけは **4 択固定**。CSV は
`question,option1,option2,option3,option4,correct,explanation,deck,tags` の列を持ち、
Anki 取り込みも 4 択を前提とする。可変選択肢はプレイヤー側だけの仕様。
