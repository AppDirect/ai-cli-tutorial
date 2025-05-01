# AI CLI Tutorial Project

This is a tutorial project that follows the [devs.ai API Tutorial](https://docs.devs.ai/docs/api-tutorial). The project demonstrates how to build a command-line interface for interacting with the devs.ai API, showcasing features like creating AI instances, managing chat sessions, and handling streaming responses.

## Tutorial Overview

This project is built following the devs.ai tutorial and demonstrates:
- Basic API integration with devs.ai
- Building a CLI tool using Node.js
- Handling streaming responses from AI models
- Managing API authentication and sessions

## Prerequisites

Before running this project, ensure you have:
- Node.js installed on your system
- A devs.ai account and API key
- Basic knowledge of JavaScript/Node.js

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with your devs.ai API credentials:
```
API_URL=https://devs.ai/api/v1
API_KEY=your_api_key
```

## Tutorial Commands

### List Your AIs
```bash
node index.js list
```
Lists all your available AI models from devs.ai with their IDs, names, and descriptions.

### Create a New AI
```bash
node index.js create-ai -n "AI Name" -d "AI Description" [-i "Instructions"] [-a "Avatar URL"]
```
Options:
- `-n, --name`: Name of the AI (required)
- `-d, --description`: Description of the AI (required)
- `-i, --instructions`: Custom instructions for the AI (optional)
- `-a, --avatar`: URL for the AI's avatar image (optional)

### Query an AI Directly
```bash
node index.js query-ai -i "AI_ID" "Your message here"
```
Send a one-off query to an AI without creating a chat session. This uses a direct query endpoint and returns the response immediately.
Options:
- `-i, --id`: ID of the AI to query (required)
- Message: Your message to send to the AI (required)

### Create a Chat Session
```bash
node index.js create-chat -i "AI_ID"
```
Options:
- `-i, --id`: ID of the AI to chat with (required)

### Send a Message
```bash
node index.js msg -i "CHAT_ID" "Your message here"
```
Options:
- `-i, --id`: ID of the chat session (required)
- Message: Your message to send to the AI (required)

## Project Dependencies

The tutorial uses these npm packages:
- commander: CLI framework
- chalk: Terminal string styling
- ora: Elegant terminal spinners
- dotenv: Environment variable management
- axios: HTTP client
- sse.js: Server-Sent Events client
- xhr2: XMLHttpRequest for Node.js

## Learning Resources

- [Original Tutorial](https://docs.devs.ai/docs/api-tutorial)
- [devs.ai API Documentation](https://docs.devs.ai/docs)

## Contributing

This is a tutorial project meant for learning purposes. Feel free to fork it and experiment with the code as you follow along with the tutorial.
