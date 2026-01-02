# ComplexityAnalyzer — React-focused README

ComplexityAnalyzer helps you measure and report code complexity in React projects (JavaScript/TypeScript, .js/.jsx/.ts/.tsx). This README is tailored for React applications — it includes React-specific installation, examples and best-practices for CI.

Briefly, ComplexityAnalyzer finds hotspots such as high cyclomatic complexity, long functions, deep nesting and more, and generates JSON/HTML/Markdown reports for human review or automation.

> Note: Replace package/CLI names with the actual package name or local script if this repository uses a different one (for example using an internal CLI built in this repo). The examples assume the CLI name `complexity-analyzer` and an importable module `complexity-analyzer`.

## Features (React-relevant)

- Analyze React code (.js, .jsx, .ts, .tsx)
- Cyclomatic complexity, function/method length, nesting depth, cognitive complexity
- File- and component-level summaries (e.g., complexity per component)
- Reports: JSON, HTML, Markdown
- CLI for local runs and CI
- Programmatic JS/Node API for custom tooling or editor integrations
- Configurable thresholds and ignore rules for generated/vendor files
- Exit codes suitable for CI pipelines

## Installation

Install as a dev dependency in your React project:

- npm
```bash
npm install --save-dev complexity-analyzer
```

- yarn
```bash
yarn add --dev complexity-analyzer
```

Or run without installing using npx:
```bash
npx complexity-analyzer scan ./src --format json --output report.json
```

If this repo builds a local CLI, you may run it from the project root:
```bash
# If the CLI is in ./bin/complexity-analyzer
./bin/complexity-analyzer scan ./src --format html --output reports/complexity.html
```

## Quickstart (scan a React app)

1. From your React project root (where package.json lives):
```bash
# scan source directory for common React extensions
npx complexity-analyzer scan ./src \
  --extensions .js,.jsx,.ts,.tsx \
  --format html \
  --output reports/complexity.html \
  --threshold cyclomatic=12,function-length=200 \
  --ignore "node_modules/**,build/**,dist/**"
```

2. Open the HTML report:
```bash
open reports/complexity.html   # macOS
# or
xdg-open reports/complexity.html  # Linux
start reports/complexity.html  # Windows (in PowerShell)
```

## Recommended CLI options for React

- --extensions .js,.jsx,.ts,.tsx  — ensure JSX/TSX files are analyzed
- --ignore "node_modules/**,build/**,dist/**,public/**" — skip vendor and build outputs
- --threshold cyclomatic=10,function-length=150 — tune to your codebase
- --config .complexityrc.yml — centralize settings

Example package.json script:
```json
{
  "scripts": {
    "complexity:scan": "complexity-analyzer scan ./src --extensions .js,.jsx,.ts,.tsx --format html --output reports/complexity.html --threshold cyclomatic=12,function-length=200 --ignore \"node_modules/**,build/**,dist/**\""
  }
}
```

Run:
```bash
npm run complexity:scan
```

## Programmatic usage (Node / JS)

Use the analyzer from scripts or build tools to integrate with custom reporting or CI steps.

CommonJS example:
```js
const { analyze } = require('complexity-analyzer');

(async () => {
  const result = await analyze({
    path: './src',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    thresholds: { cyclomatic: 12, functionLength: 200 },
    ignore: ['node_modules/**', 'build/**'],
    // parser: 'babel' // optional: specify parser if supported
  });

  console.log(result.summary);
  require('fs').writeFileSync('reports/complexity.json', JSON.stringify(result, null, 2));
})();
```

ES Module / TypeScript import:
```ts
import { analyze } from 'complexity-analyzer';

const result = await analyze({
  path: './src',
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  thresholds: { cyclomatic: 12 }
});
```

Programmatic usage is useful to:
- Fail CI builds when thresholds exceeded
- Post results to dashboards
- Create PR comments with summarized findings
- Integrate with pre-commit or pre-push hooks

## Configuration example (.complexityrc.yml)

Place in project root to centralize settings:
```yaml
paths:
  - src
extensions:
  - .js
  - .jsx
  - .ts
  - .tsx
exclude:
  - node_modules/**
  - build/**
  - dist/**
thresholds:
  cyclomatic: 12
  functionLength: 200
report:
  format: html
  output: reports/complexity.html
parser:
  # optionally specify parser: "babel" or "typescript" depending on implementation
  name: babel
```

## CI Integration (GitHub Actions example)

Add a job to run the analyzer and upload the report artifact:

```yaml
name: Complexity Check

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  complexity:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Run ComplexityAnalyzer
        run: npm run complexity:scan
      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: complexity-report
          path: reports/complexity.html
```

To fail the job when thresholds are exceeded, the CLI should return a non-zero exit code when a threshold is breached — ensure your CI step checks that behavior (this is the default mode for CI-friendly analyzers).

## Interpreting output (React-specific tips)

- Focus on component files (files containing JSX/TSX). Complex UI logic, large render methods or big hooks can inflate complexity.
- Look for long components with many conditional render branches — consider extracting subcomponents.
- For function components using hooks, complex effect or memo logic can be refactored into custom hooks.
- Detect deeply nested callbacks or render logic — pull out helper functions or smaller components.
- Use thresholds more strict for shared components or library code, more lenient in one-off pages.

## Example suggestions (based on findings)

- Cyclomatic complexity high: extract condition branches into small functions or subcomponents
- Function length high: split into smaller functions or components
- Deep nesting: early returns, guard clauses, or split into smaller components
- Cognitive complexity: add comments or simplify logic; consider custom hooks for repeated logic

## Troubleshooting

- False positives on generated code: add patterns to `exclude` (e.g., `.generated.js`, `src/__generated__/**`).
- TypeScript parsing errors: ensure parser option is set to TypeScript if supported, or include tsconfig path if required.
- Large repos: run incremental scans in CI (changed files only) or set narrower `paths`.

## Contributing (React focus)

Contributions are welcome — especially for:
- Improving React/JSX/TSX parsing and heuristics
- Adding React-specific suggestions (hooks, memoization)
- Better component-level reporting (per-component metrics)
- Editor integrations (VS Code extension) for in-line warnings

1. Fork the repo
2. Create a branch: `git checkout -b feat/react-improvements`
3. Add tests (preferably against React sample components)
4. Open a pull request describing the change

## Roadmap / Ideas

- Add a React mode that surfaces component-specific findings (e.g., prop-count, render-size)
- Visualization of complexity over component tree
- VS Code extension to show complexity inline
- Baseline support to compare PR changes against main branch

## License

This repository is available under the MIT License.

## Maintainer

- SudegoraAnkit (GitHub: @SudegoraAnkit)

---

