/**
 * Type definitions for MCP360 Universal Gateway
 */

// JSON-RPC 2.0 Types
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

// MCP Tool Types
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

export interface McpToolResult {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
    uri?: string;
  }>;
  isError?: boolean;
}

// Gateway Client Types
export interface GatewayClientOptions {
  apiKey: string;
  gatewayUrl?: string;
}

export interface InitializeParams {
  protocolVersion: string;
  capabilities: Record<string, any>;
  clientInfo: {
    name: string;
    version: string;
  };
}

export interface ToolCallParams {
  name: string;
  arguments: Record<string, any>;
}
