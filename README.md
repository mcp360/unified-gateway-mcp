# MCP360 Universal Gateway

[![npm version](https://badge.fury.io/js/@mcp360%2Funiversal-gateway.svg)](https://www.npmjs.com/package/@mcp360/universal-gateway)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

> **Access 100+ MCP tools through a single unified interface. Transform days of API integration into a 2-minute setup.**

The MCP360 Universal Gateway provides **2 powerful meta-tools** that let you discover and execute tools from any connected MCP server - both marketplace services and your custom MCPs.

## Tags

`mcp` `model-context-protocol` `ai-agents` `claude` `api-gateway` `automation` `seo` `web-scraping` `email-verification` `cryptocurrency` `keyword-research` `google-trends` `workflow-automation` `no-code` `developer-tools` `unified-api`

## Features

- 🔍 **Search** - Discover available tools across all connected MCP servers
- ⚡ **Execute** - Run any tool from any MCP server dynamically
- 🌐 **Universal Access** - Single gateway to marketplace MCPs and your custom MCPs
- 🔐 **Secure** - API key authentication
- 📦 **Easy Setup** - Works with Claude Desktop and any MCP-compatible client

## Installation

### Get Your API Key

1. Sign up at [mcp360.com](https://mcp360.com)
2. Navigate to Settings → API Keys
3. Generate a new API key

### Quick Setup

Choose your preferred platform:

<details>
<summary><strong>Claude Desktop</strong></summary>

Edit your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp360": {
      "command": "npx",
      "args": ["-y", "@mcp360/universal-gateway"],
      "env": {
        "MCP360_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Restart Claude Desktop to load the gateway.

</details>

<details>
<summary><strong>Cursor</strong></summary>

1. Open Cursor Settings (`Cmd/Ctrl + Shift + J`)
2. Go to **MCP** section
3. Add new server configuration:

```json
{
  "mcpServers": {
    "mcp360": {
      "command": "npx",
      "args": ["-y", "@mcp360/universal-gateway"],
      "env": {
        "MCP360_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Restart Cursor to activate the gateway.

</details>

<details>
<summary><strong>Claude Code</strong></summary>

Add to your MCP settings file:

**macOS/Linux**: `~/.config/claude-code/mcp_settings.json`
**Windows**: `%APPDATA%\claude-code\mcp_settings.json`

```json
{
  "mcpServers": {
    "mcp360": {
      "command": "npx",
      "args": ["-y", "@mcp360/universal-gateway"],
      "env": {
        "MCP360_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Restart Claude Code to load the gateway.

</details>

<details>
<summary><strong>Windsurf</strong></summary>

Edit Windsurf MCP config:

**macOS**: `~/Library/Application Support/Windsurf/mcp_config.json`
**Windows**: `%APPDATA%\Windsurf\mcp_config.json`

```json
{
  "mcpServers": {
    "mcp360": {
      "command": "npx",
      "args": ["-y", "@mcp360/universal-gateway"],
      "env": {
        "MCP360_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Restart Windsurf to activate the gateway.

</details>

<details>
<summary><strong>VS Code (Cline Extension)</strong></summary>

1. Install the [Cline extension](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)
2. Open Cline settings
3. Add MCP server configuration:

```json
{
  "mcpServers": {
    "mcp360": {
      "command": "npx",
      "args": ["-y", "@mcp360/universal-gateway"],
      "env": {
        "MCP360_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Reload VS Code to activate the gateway.

</details>

### Alternative: Global Installation

For faster startup, install globally:

```bash
npm install -g @mcp360/universal-gateway
```

Then use `mcp360-gateway` as the command:

```json
{
  "mcpServers": {
    "mcp360": {
      "command": "mcp360-gateway",
      "env": {
        "MCP360_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

## Available Tools

### 1. `search` - Discover Available Tools

Search and discover tools across all connected MCP servers.

**Parameters:**
- `query` (optional): Search term to filter tools by name or description

**Examples:**

```
User: Search for email tools
User: Show me all available tools
User: Find tools for SEO
User: What tools can help with keyword research?
```

**Output:** List of matching tools with their names, descriptions, and required parameters.

### 2. `execute` - Run Any Tool

Execute any tool from any connected MCP server.

**Parameters:**
- `tool_name` (required): Name of the tool to execute
- `arguments` (optional): Tool-specific parameters as an object

**Examples:**

```
User: Execute the verify_email tool with email "test@example.com"
User: Run keyword_research with keyword "AI tools"
User: Execute get_crypto_price for Bitcoin
```

**Output:** Tool-specific results (varies by tool).

## Available MCP Services

The Universal Gateway provides access to:

### MCP360 Marketplace Services

1. **Keyword Research** - SEO keyword research and search volumes
2. **OnPage SEO Checker** - Analyze website SEO elements
3. **Email Verification** - Validate email addresses
4. **Web Scraping** - Extract content from websites
5. **Google Trends** - Search trends and interest data
6. **Cryptocurrency** - Real-time crypto prices and market data

### Your Custom MCPs

All custom MCP servers you've created in your MCP360 account.

## Typical Workflow

1. **Discover tools:**
   ```
   User: Search for email tools
   ```

2. **See what parameters are needed:**
   The search results show tool names, descriptions, and required parameters.

3. **Execute the tool:**
   ```
   User: Execute verify_email with email "john@example.com"
   ```

## Environment Variables

- `MCP360_API_KEY` (required): Your MCP360 API key
- `MCP360_GATEWAY_URL` (optional): Custom gateway URL (defaults to `https://connect.mcp360.ai/v1/mcp360/mcp`)

## Development

### Clone and Build

```bash
git clone <repository-url>
cd mcp360-package
npm install
npm run build
```

### Development Mode

```bash
npm run dev
```

### Type Checking

```bash
npm run type-check
```

## How It Works

```
Claude Desktop
      ↓
@mcp360/universal-gateway (this package)
      ↓
MCP360 Universal Gateway API
      ↓
┌─────────────────────────────────┐
│  Marketplace MCPs               │
│  - Keyword Research             │
│  - Email Verification           │
│  - Web Scraping                 │
│  - etc.                         │
└─────────────────────────────────┘
      +
┌─────────────────────────────────┐
│  Your Custom MCPs               │
│  - Custom integrations          │
│  - Private tools                │
└─────────────────────────────────┘
```

The gateway:
1. Authenticates with your API key
2. Aggregates all available tools from marketplace and custom MCPs
3. Exposes them through 2 simple meta-tools: `search` and `execute`

## Troubleshooting

### Gateway Not Appearing

1. Check that your `claude_desktop_config.json` is valid JSON
2. Verify your API key is correct
3. Restart Claude Desktop completely
4. Check Claude Desktop logs for errors

### Authentication Errors

1. Verify your API key is valid and not expired
2. Ensure you have the correct permissions in your MCP360 account
3. Check that the API key hasn't been revoked

### Tool Execution Errors

- Use `search` first to discover the correct tool name
- Check that all required parameters are provided
- Verify parameter types match what the tool expects
- Review Claude Desktop logs for detailed error messages

## API Reference

For detailed API documentation, visit: [docs.mcp360.com](https://docs.mcp360.com)

## Support

- 📚 Documentation: [docs.mcp360.com](https://docs.mcp360.com)
- 🐛 Issues: [github.com/mcp360/universal-gateway/issues](https://github.com/mcp360/universal-gateway/issues)
- 📧 Email: support@mcp360.com
- 💬 Discord: [discord.gg/mcp360](https://discord.gg/mcp360)

## License

MIT

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

---

Made with ❤️ by [MCP360](https://mcp360.com)
