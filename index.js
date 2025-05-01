import { program } from "commander";
import chalk from "chalk";
import ora from "ora";
import dotenv from "dotenv";
import { listAIs, createAI, createChat, sendMessage, queryAI } from "./api-handler.js";
import xhr from 'xhr2';

// This is not required in the browser
global.XMLHttpRequest = xhr;

dotenv.config();

program.version("1.0.0").description("AI CLI Tool");

program
  .command("list")
  .description("List all my AIs")
  .action(async () => {
    const spinner = ora("Fetching available AIs...").start();

    try {
      const models = await listAIs();
      spinner.succeed("Your AIs:");

      models.forEach((model) => {
        console.log(chalk.white(`- ${model.name}`));
        console.log(chalk.white(`  ${model.id}`));
        console.log(chalk.gray(`  ${model.description}`));
      });
    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
    }
  });

program
  .command("create-ai")
  .description("Create a new AI")
  .requiredOption("-n, --name <name>", "name of the AI")
  .requiredOption("-d, --description <description>", "description of the AI")
  .option("-i, --instructions <instructions>", "instructions for the AI")
  .option("-a, --avatar <src>", "URL for the avatar of the AI")
  .action(async (options) => {
    const spinner = ora("Creating a new AI...").start();

    try {
      const result = await createAI(
        options.name,
        options.description,
        options.instructions,
        options.src
      );
      spinner.succeed("AI created successfully:");

      console.log(chalk.white(`- ${result.name}`));
      console.log(chalk.white(`  ${result.id}`));
      console.log(chalk.gray(`  ${result.description}`));
    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
    }
  });

program
  .command("create-chat")
  .description("Create a new chat session")
  .requiredOption("-i, --id <id>", "id of the AI")
  .action(async (options) => {
    const spinner = ora("Creating a new chat thread...").start();

    try {
      const result = await createChat(options.id);
      spinner.succeed("Chat created successfully:");

      console.log(chalk.white(`- ${result.id}`));
    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
    }
  });

program
  .command("msg")
  .requiredOption("-i, --id <id>", "id of the chat")
  .argument("<message>", "message to send to AI")
  .action(async (message, options) => {
    const spinner = ora("Processing your message...").start();

    try {
      const eventSource = await sendMessage(options.id, message);
      spinner.succeed("AI is responding");

      eventSource.addEventListener("message.delta", (e) => {
        const data = JSON.parse(e.data);
        process.stdout.write(data.content.text);
      });

      eventSource.addEventListener("message.complete", () => {
        console.log(chalk.green("\nResponse completed"));
      });

      eventSource.stream();

    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
    }
  });

program
  .command("query-ai")
  .description("Query an AI directly")
  .requiredOption("-i, --id <id>", "id of the AI")
  .argument("<message>", "message to send to AI")
  .action(async (message, options) => {
    const spinner = ora("Processing your query...").start();

    try {
      const response = await queryAI(options.id, message);
      spinner.succeed("AI response:");
      console.log(chalk.white(response.text));
    } catch (error) {
      spinner.fail(chalk.red(`Error: ${error.message}`));
    }
  });

program.parse();
