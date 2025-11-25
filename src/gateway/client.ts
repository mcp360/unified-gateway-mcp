/**
 * JSON-RPC 2.0 Client for MCP360 Universal Gateway
 * Connects to the gateway and handles initialize, tools/list, and tools/call operations
 */

export interface JsonRpcRequest {
  jsonrpc: '2.0';
  id: number | string;
  method: string;
  params?: any;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: number | string;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface McpTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties?: Record<string, any>;
    required?: string[];
    [key: string]: any;
  };
}

export class GatewayClient {
  private gatewayUrl: string;
  private requestId: number = 1;
  private initialized: boolean = false;

  constructor(apiKey: string, gatewayUrl: string = 'https://connect.mcp360.ai/v1/mcp360/mcp') {
    // Append API key as query parameter
    this.gatewayUrl = `${gatewayUrl}?token=${apiKey}`;
  }

  /**
   * Make a JSON-RPC 2.0 request to the gateway
   */
  private async request(method: string, params?: any): Promise<any> {
    const requestBody: JsonRpcRequest = {
      jsonrpc: '2.0',
      id: this.requestId++,
      method,
      params,
    };

    try {
      const response = await fetch(this.gatewayUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`Gateway request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as JsonRpcResponse;

      if (data.error) {
        throw new Error(`Gateway error: ${data.error.message} (code: ${data.error.code})`);
      }

      return data.result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Gateway client error: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Initialize the MCP session with the gateway
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    await this.request('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: '@mcp360/universal-gateway',
        version: '1.0.0',
      },
    });

    this.initialized = true;
  }

  /**
   * List all available tools from all connected MCP servers
   */
  async listTools(): Promise<McpTool[]> {
    if (!this.initialized) {
      await this.initialize();
    }

    const result = await this.request('tools/list');
    return result.tools || [];
  }

  /**
   * Execute a specific tool with given arguments
   */
  async callTool(toolName: string, args: any): Promise<any> {
    if (!this.initialized) {
      await this.initialize();
    }

    const result = await this.request('tools/call', {
      name: toolName,
      arguments: args,
    });

    return result;
  }

  /**
   * Search tools by query string (filters tool names and descriptions)
   */
  async searchTools(query: string): Promise<McpTool[]> {
    const allTools = await this.listTools();

    if (!query || query.trim() === '') {
      return allTools;
    }

    const lowerQuery = query.toLowerCase();
    return allTools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery)
    );
  }
}
