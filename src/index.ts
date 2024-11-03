import { invoke } from "@tauri-apps/api/core";

// jsPsych Example 8.0.2
// https://www.jspsych.org/latest/tutorials/rt-task/

import { initJsPsych } from "jspsych";
import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import imageKeyboardResponse from "@jspsych/plugin-image-keyboard-response";
import preload from "@jspsych/plugin-preload";

const jsPsych = initJsPsych({
  on_finish: () => {
    const trial_data = jsPsych.data.get().json();
    const trials = JSON.parse(trial_data);
    invoke("json_receive", { trials }).then((response) =>
      console.log(response),
    );
  },
});

let timeline = [];

const preloading = {
  type: preload,
  images: ["img/blue.png", "img/orange.png"],
};
timeline.push(preloading);

const welcome = {
  type: htmlKeyboardResponse,
  stimulus: "Welcome to the expriment. Press any key to begin.",
};
timeline.push(welcome);

const instructions = {
  type: htmlKeyboardResponse,
  stimulus: `
    <p>In this experiment, a circle will appear in the center
    of the screen.</p><p>If the circle is <strong>blue</strong>,
    press the letter F on the keyboard as fast as you can.</p>
    <p>If the circle is <strong>orange</strong>, press the letter J
    as fast as you can.</p>
    <div style='width: 700px;'>
    <div style='float: left;'><img src='img/blue.png'></img>
    <p class='small'><strong>Press the F key</strong></p></div>
    <div style='float: right;'><img src='img/orange.png'></img>
    <p class='small'><strong>Press the J key</strong></p></div>
    </div>
    <p>Press any key to begin.</p>
  `,
  post_trial_gap: 2000,
};
timeline.push(instructions);

const stimuli = [
  { stimulus: "img/blue.png", correct_response: "f" },
  { stimulus: "img/orange.png", correct_response: "j" },
];

const fixation = {
  type: htmlKeyboardResponse,
  stimulus: '<div class="fixation">+</div>',
  choices: "NO_KEYS",
  trial_duration: () => {
    return jsPsych.randomization.sampleWithoutReplacement(
      [100, 200, 300],
      1,
    )[0];
  },
  data: {
    task: "fixation",
  },
};

const trial = {
  type: imageKeyboardResponse,
  stimulus: jsPsych.timelineVariable("stimulus"),
  choices: ["f", "j"],
  data: {
    task: "response",
    correct_response: jsPsych.timelineVariable("correct_response"),
  },
  on_finish: (data: any) => {
    data.correct = jsPsych.pluginAPI.compareKeys(
      data.response,
      data.correct_response,
    );
  },
};

const trial_procedure = {
  timeline: [fixation, trial],
  timeline_variables: stimuli,
  repetitions: 2,
  randomize_order: true,
};
timeline.push(trial_procedure);

const debriefing = {
  type: htmlKeyboardResponse,
  stimulus: () => {
    const trials = jsPsych.data.get().filter({ task: "response" });
    const correct_trials = trials.filter({ correct: true });
    const accuracy = Math.round(
      (correct_trials.count() / trials.count()) * 100,
    );
    const rt = Math.round(correct_trials.select("rt").mean());
    return `<p>You responded correctly on ${accuracy}% of the trials.</p>
          <p>Your average response time was ${rt}ms.</p>
          <p>Press any key to complete the experiment. Thank you!</p>`;
  },
};
timeline.push(debriefing);

// Run!
jsPsych.run(timeline);
