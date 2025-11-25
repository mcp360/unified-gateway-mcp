/**
 * Universal Gateway Server - Transparent Proxy
 *
 * This server acts as a transparent proxy to the MCP360 Universal Gateway.
 * It dynamically fetches tools from the gateway and forwards all tool calls.
 */
export declare class UniversalGatewayServer {
    private server;
    private gatewayClient;
    constructor(apiKey: string, gatewayUrl?: string);
    private setupHandlers;
    start(): Promise<void>;
}
//# sourceMappingURL=server.d.ts.map