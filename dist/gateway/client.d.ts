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
export declare class GatewayClient {
    private gatewayUrl;
    private requestId;
    private initialized;
    constructor(apiKey: string, gatewayUrl?: string);
    /**
     * Make a JSON-RPC 2.0 request to the gateway
     */
    private request;
    /**
     * Initialize the MCP session with the gateway
     */
    initialize(): Promise<void>;
    /**
     * List all available tools from all connected MCP servers
     */
    listTools(): Promise<McpTool[]>;
    /**
     * Execute a specific tool with given arguments
     */
    callTool(toolName: string, args: any): Promise<any>;
    /**
     * Search tools by query string (filters tool names and descriptions)
     */
    searchTools(query: string): Promise<McpTool[]>;
}
//# sourceMappingURL=client.d.ts.map