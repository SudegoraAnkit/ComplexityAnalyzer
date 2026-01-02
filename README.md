# ComplexityAnalyzer

ComplexityAnalyzer is a developer tool to measure and report code complexity across a codebase. It helps engineers and teams discover hotspots (high cyclomatic complexity, deep nesting, long functions, etc.), generate human-readable reports, and integrate complexity checks into CI to keep code maintainable.

> NOTE: This README is intentionally language- and packaging-agnostic. If you tell me which language(s)/package manager this repository uses (for example Python, JavaScript/Node, Java, Go, etc.), I will tailor the install and usage sections and add real examples and badges.

## Features

- Analyze a codebase to detect complexity hotspots:
  - Cyclomatic complexity
  - Function/method length
  - Nesting depth
  - Cognitive complexity (where applicable)
  - File- and module-level summaries
- Produce reports in multiple formats (JSON, HTML, Markdown)
- CLI for quick scans and integration in CI pipelines
- Programmatic API for embedding analysis in tooling or editors
- Configurable thresholds and ignore rules
- Exit codes suitable for CI (fail build on threshold breach)

## Quickstart

1. Clone the repository:
   ```bash
   git clone https://github.com/SudegoraAnkit/ComplexityAnalyzer.git
   cd ComplexityAnalyzer
   ```

2. Install dependencies and build
   - Replace the commands below with the correct ones for your project (npm/pip/maven/go):
     ```bash
     # Example placeholders; update for your language
     # Node.js
     npm install

     # Python
     # python -m venv .venv
     # source .venv/bin/activate
     # pip install -r requirements.txt

     # Java (Maven)
     # mvn install
     ```

3. Run a scan (example CLI):
   ```bash
   # Generic example — replace with this repo's actual CLI command if different
   ./bin/complexity-analyzer scan ./src \
     --output report.json \
     --format json \
     --threshold cyclomatic=10,function-length=200
   ```

4. Open the HTML report (if generated):
   ```bash
   # Example:
   open report.html
   ```

If you prefer to use a programmatic API, see the "Programmatic usage" section below.

## CLI Usage (example)

The repository includes a CLI that supports the following common options:

- `scan <path>` — analyze the code at `<path>`
- `--format <json|html|md>` — output format
- `--output <file>` — write report to a file
- `--threshold <key=value,...>` — set thresholds that cause non-zero exit code
- `--ignore <glob,glob,...>` — exclude files or directories
- `--config <file>` — specify a config file (JSON/YAML/TOML)

Example:
```bash
complexity-analyzer scan ./project \
  --format html \
  --output ./reports/complexity.html \
  --threshold cyclomatic=12,function-length=180 \
  --ignore "tests/**,vendor/**"
```

## Programmatic usage (example)

Below are two conceptual examples. Replace with the actual import/usage for the language implemented in this repository.

JavaScript/Node example:
```js
const analyzer = require('complexity-analyzer');

(async () => {
  const result = await analyzer.analyze({
    path: './src',
    thresholds: { cyclomatic: 10, functionLength: 200 },
    ignore: ['tests/**']
  });

  console.log(result.summary);
  // Save JSON report
  require('fs').writeFileSync('report.json', JSON.stringify(result, null, 2));
})();
```

Python example:
```py
from complexity_analyzer import analyze

result = analyze(path="./src", thresholds={'cyclomatic': 10}, ignore=['tests/**'])
print(result['summary'])
# save
import json
with open('report.json','w') as f:
    json.dump(result, f, indent=2)
```

If you tell me the project's language I will replace these placeholders with exact import paths and examples.

## Configuration

You can provide a configuration file to set defaults and CI-friendly behavior. Example file (YAML/JSON/TOML — whichever suits your repo):

```yaml
# .complexityrc.yml
paths:
  - src
exclude:
  - tests/**
thresholds:
  cyclomatic: 10
  functionLength: 200
report:
  format: html
  output: reports/complexity.html
```

The CLI will look for a config file in the project root (`.complexityrc.yml`, `.complexityrc.json`, etc.) unless `--config` is provided.

## CI Integration

Run the analyzer as part of your continuous integration pipeline and fail the build if thresholds are exceeded.

Example GitHub Actions job (generic):
```yaml
jobs:
  complexity:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: # install deps for your language
      - name: Run ComplexityAnalyzer
        run: complexity-analyzer scan ./src --format json --output report.json --threshold cyclomatic=12
      - name: Upload report
        uses: actions/upload-artifact@v4
        with:
          name: complexity-report
          path: report.json
```

## Output

- Summary: counts and averages (files scanned, functions analyzed, average and max complexity)
- Detailed list of items above thresholds (file, function/method, complexity metric, suggestion)
- Machine-readable JSON for automation
- Pretty HTML/Markdown for human review

## Contributing

Contributions are welcome. Typical contributions include:

- Add language parsers or complexity metrics
- Improve heuristics for cognitive complexity
- Add new output formats or CI integrations
- Add tests or improve test coverage
- Update docs and examples

Steps to contribute:
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-change`
3. Run and add tests
4. Open a pull request with a clear description of the change

Please follow the code style and include tests for new functionality.

## Roadmap / Ideas

- Add language-specific analyzers (if not present)
- Add visualization dashboards
- Provide editor/IDE plugins (VS Code extension)
- Granular suggestion engine (refactor suggestions)
- Baseline support to compare against previous runs

## Troubleshooting

- Large codebase runs slowly — consider scanning only changed files in CI.
- False positives — use the `ignore` configuration to exclude generated or vendor files.
- Missing parser for a language — open an issue and we can add support.

## License

This repository is available under the MIT License. Change as appropriate.

## Maintainer

- SudegoraAnkit (GitHub: @SudegoraAnkit)

---
