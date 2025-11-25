import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { GatewayClient } from './gateway/client.js';

/**
 * Universal Gateway Server - Transparent Proxy
 *
 * This server acts as a transparent proxy to the MCP360 Universal Gateway.
 * It dynamically fetches tools from the gateway and forwards all tool calls.
 */
export class UniversalGatewayServer {
  private server: Server;
  private gatewayClient: GatewayClient;

  constructor(apiKey: string, gatewayUrl?: string) {
    this.server = new Server(
      {
        name: '@mcp360/universal-gateway',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.gatewayClient = new GatewayClient(apiKey, gatewayUrl);

    this.setupHandlers();
  }

  private setupHandlers() {
    // Handle tool listing - fetch directly from gateway
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      try {
        const tools = await this.gatewayClient.listTools();

        // Return tools in MCP format
        return {
          tools: tools.map(tool => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
          })),
        };
      } catch (error) {
        console.error('Error listing tools from gateway:', error);
        throw error;
      }
    });

    // Handle tool calls - forward directly to gateway
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        // Forward the tool call to the gateway
        const result = await this.gatewayClient.callTool(name, args || {});

        // Return the result as-is from the gateway
        return result;
      } catch (error) {
        if (error instanceof Error) {
          return {
            content: [{
              type: 'text' as const,
              text: `Error executing tool "${name}": ${error.message}`,
            }],
            isError: true,
          };
        }
        throw error;
      }
    });
  }

  async start() {
    // Initialize gateway connection
    try {
      await this.gatewayClient.initialize();
      console.error('✅ Connected to MCP360 Universal Gateway');
    } catch (error) {
      console.error('❌ Failed to connect to gateway:', error);
      throw error;
    }

    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    console.error('🚀 MCP360 Universal Gateway running on stdio');
  }
}
