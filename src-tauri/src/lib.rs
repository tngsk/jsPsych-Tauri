// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![json_receive])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
struct Trial {
    success: Option<bool>,
    timeout: Option<bool>,
    failed_images: Option<Vec<String>>,
    failed_audio: Option<Vec<String>>,
    failed_video: Option<Vec<String>>,
    trial_type: String,
    trial_index: u32,
    plugin_version: String,
    time_elapsed: u32,
    rt: Option<u32>,
    stimulus: Option<String>,
    response: Option<String>,
    task: Option<String>,
    correct_response: Option<String>,
    correct: Option<bool>,
}

#[tauri::command]
fn json_receive(trials: serde_json::Value) -> String {
    // 受け取った時にはArrayになっている
    let trial: Trial = serde_json::from_value(trials[0].clone()).unwrap();
    println!("{:?}", trial.success);
    format!("Ok")
}
