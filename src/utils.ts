export function generate_rest_conditions(
  n_trials: number,
  condition_labels: string[] = ["EC", "EO"]
): string[] {
  const labels = condition_labels.length > 0 ? condition_labels.map(String) : ["EC", "EO"];
  const total = Math.max(0, Math.floor(Number(n_trials)));
  const conditions: string[] = [];
  for (let index = 0; index < total; index += 1) {
    conditions.push(labels[index % labels.length] as string);
  }
  return conditions;
}
