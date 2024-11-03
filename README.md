# jsPsych-Tauri

A minimal project demonstrating the integration of jsPsych with Tauri, combining web technologies for psychological experiments with native desktop capabilities.

## Overview

This project serves as a proof of concept for running jsPsych experiments as desktop applications using Tauri. It combines:
- jsPsych for creating behavioral experiments
- Tauri for desktop application functionality
- TailwindCSS and DaisyUI for styling

## Prerequisites

- Node.js and npm/bun
- Rust (for Tauri)
- Required system dependencies for Tauri development

## Setup

Install dependencies:

```bash
bun install
bun add -D tailwindcss
bunx tailwindcss init
bun add -D daisyui
```

## Development

To run the application in development mode:

```bash
bun run tauri dev
```

## Project Structure

The project follows a standard Tauri + Web application structure:
- `/src` - Web application source code
- `/src-tauri` - Rust/Tauri backend code
- `/public` - Static assets

## Features

- Desktop application wrapper for jsPsych experiments
- Native system integration through Tauri
- Modern UI styling with TailwindCSS and DaisyUI

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Tomohiro Nagasaki
