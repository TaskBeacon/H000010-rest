import {
  set_trial_context,
  type StimBank,
  type TaskSettings,
  type TrialBuilder
} from "psyflow-web";

export function run_trial(
  trial: TrialBuilder,
  condition: string,
  context: {
    settings: TaskSettings;
    stimBank: StimBank;
    block_id: string;
    block_idx: number;
  }
): TrialBuilder {
  const { settings, stimBank, block_id, block_idx } = context;
  const condition_id = String(condition);
  const key_list = ((settings.key_list as string[]) ?? ["space"]).map(String);
  const rest_duration = Number(settings[`${condition_id}_duration`] ?? 0);

  const instructionUnit = trial.unit("instruction").addStim(stimBank.get(`${condition_id}_instruction`));
  if (settings.voice_enabled) {
    instructionUnit.addStim(stimBank.get(`${condition_id}_instruction_voice`));
  }
  set_trial_context(instructionUnit, {
    trial_id: trial.trial_id,
    phase: "block_instruction",
    deadline_s: null,
    valid_keys: [...key_list],
    block_id,
    condition_id,
    task_factors: {
      condition: condition_id,
      stage: "block_instruction",
      block_idx
    },
    stim_id: `${condition_id}_instruction`
  });
  instructionUnit.show({ duration: Number(settings.instruction_duration ?? 4) }).to_dict();

  const restUnit = trial.unit("rest").addStim(stimBank.get(`${condition_id}_stim`));
  set_trial_context(restUnit, {
    trial_id: trial.trial_id,
    phase: "fixation",
    deadline_s: rest_duration,
    valid_keys: [],
    block_id,
    condition_id,
    task_factors: {
      condition: condition_id,
      stage: "rest_window",
      block_idx
    },
    stim_id: `${condition_id}_stim`
  });
  restUnit
    .captureResponse({
      keys: [],
      duration: rest_duration,
      terminate_on_response: false
    })
    .to_dict();

  return trial;
}
