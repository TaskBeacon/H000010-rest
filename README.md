# H000010 REST

HTML/browser preview of the Resting-state task (EC+EO) built with `psyflow-web`.
The condition sequence, stage order, and EO/EC semantics are aligned to local `T000010-rest`; preview duration is shortened for web use.

## Layout

- `main.ts`: task orchestration
- `config/config.yaml`: declarative config
- `src/run_trial.ts`: trial logic
- `src/utils.ts`: sequential condition generator

## Run

From `e:\xhmhc\TaskBeacon\psyflow-web`:

```powershell
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:4173/?task=H000010-rest
```
