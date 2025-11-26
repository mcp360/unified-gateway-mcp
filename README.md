# MCP360: Unified MCP Gateway

[![npm version](https://badge.fury.io/js/@mcp360ai%2Funified-gateway.svg)](https://www.npmjs.com/package/@mcp360ai/unified-gateway)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

Access all MCP servers through a single unified gateway. MCP360 provides seamless access to 100+ MCP tools from the Marketplace plus support for your custom MCPs, allowing you to discover and execute tools from any connected MCP server through one simple interface.

## Features

- 🔍 **Search & Execute** - Check available tools across all connected MCP servers and execute them dynamically
- 🌐 **Universal Access** - Single gateway to marketplace MCPs and your custom MCPs
- 🔐 **Secure** - API key authentication
- 📦 **Easy Setup** - Works with Claude Desktop and any MCP-compatible client
- ⚡ **Fast** - Instant tool discovery and execution
- 🔌 **Extensible** - Add unlimited custom MCP servers

## Quick Example

Once configured, you can interact with all your MCP tools through natural language:

```
You: "Execute verify_email with email test@example.com"
→ Returns: Email validation results

You: "can you do keyword research for "AI Agent" related keywords using MCP360"
→ Returns: Keyword research results

You: "Find cryptocurrency tools"
→ Returns: get_crypto_price, crypto_market_data...

You: "Get Bitcoin price"
→ Returns: Current BTC price and market data
```

## Installation

### Global Installation (Recommended)

```bash
npm install -g @mcp360ai/unified-gateway
```

### Local Installation

```bash
npm install @mcp360ai/unified-gateway
```

## Quick Start

### 1. Get Your API Key

1. Sign up at [mcp360.ai](https://mcp360.ai)
2. Navigate to Settings → API Keys
3. Generate a new API key

### 2. Configure Claude Desktop

Edit your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp360": {
      "command": "npx",
      "args": ["@mcp360ai/unified-gateway"],
      "env": {
        "MCP360_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

Or if installed globally:

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

### 3. Restart Claude Desktop

Restart Claude Desktop to load the gateway.
## 

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

1. **Execute the tool:**
   ```
   User: Verify email "john@example.com" is valid using MCP360
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
@mcp360ai/unified-gateway (this package)
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

For detailed API documentation, visit: [help.mcp360.ai](https://mcp360.ai/docs)

## Support

- 📚 Documentation: [help.mcp360.ai](https://mcp360.ai/docs)
- 🐛 Issues: [github.com/mcp360/unified-gateway-mcp/issues](https://github.com/mcp360/unified-gateway-mcp/issues)
- 📧 Email: support@mcp360.ai
- 💬 Discord: [discord.gg/mcp360](https://discord.gg/mcp360)

## License

MIT

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

---

Made with ❤️ by [MCP360](https://mcp360.ai)
