import { GPT4All } from "gpt4all";
import ora from "ora";

const gpt4all = new GPT4All();

async function init() {
  const init = ora("Initializing").start();
  await gpt4all.init();
  init.stop();
}

async function open() {
  const open = ora("Opening").start();
  await gpt4all.open();
  open.stop();
}

async function ask(prompt: string) {
  console.log(`❓ ${prompt}\n`);

  const loading = ora("Loading").start();
  const response = await gpt4all.prompt(prompt);
  loading.stop();
  console.log(`💬 ${response}\n`);
}

export async function run() {
  try {
    const arguments_ = process.argv.slice(2);
    await init();
    await open();
    await ask(arguments_[0]);

    gpt4all.close();
  } catch (error) {
    console.error(error);
  }

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit();
}
