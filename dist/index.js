#!/usr/bin/env node
import { UniversalGatewayServer } from './server.js';
async function main() {
    const apiKey = process.env.MCP360_API_KEY;
    const gatewayUrl = 'https://connect.mcp360.ai/v1/mcp360/mcp';
    if (!apiKey) {
        console.error('Error: MCP360_API_KEY environment variable is required');
        console.error('');
        console.error('Get your API key from: https://mcp360.com/settings/api-keys');
        console.error('');
        console.error('Usage:');
        console.error('  MCP360_API_KEY=your_key_here mcp360-gateway');
        process.exit(1);
    }
    try {
        const server = new UniversalGatewayServer(apiKey, gatewayUrl);
        await server.start();
    }
    catch (error) {
        console.error('Failed to start MCP360 Universal Gateway:', error);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=index.js.map