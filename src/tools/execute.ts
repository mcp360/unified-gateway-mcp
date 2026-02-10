import { z } from 'zod';
import { GatewayClient } from '../gateway/client.js';

export const executeTool = {
  name: 'execute',
  description: 'Execute any tool from any connected MCP server. First use the "search" tool to discover available tools and their parameters.',
  inputSchema: z.object({
    tool_name: z.string().describe('Name of the tool to execute (use the search tool to discover available tools)'),
    arguments: z.record(z.any()).optional().describe('Tool-specific parameters as a JSON object. Each tool has different required and optional parameters.'),
  }),
  handler: async (args: any, client: GatewayClient) => {
    try {
      // Execute the tool directly - let gateway handle validation
      // This avoids fetching all 100+ tools just to check existence
      const result = await client.callTool(args.tool_name, args.arguments || {});

      // Format the result
      if (result.content) {
        // MCP standard response format
        return result;
      } else if (typeof result === 'object') {
        // Convert object result to text
        return {
          content: [{
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          }],
        };
      } else {
        // Simple value result
        return {
          content: [{
            type: 'text' as const,
            text: String(result),
          }],
        };
      }
    } catch (error) {
      return {
        content: [{
          type: 'text' as const,
          text: `Error executing tool "${args.tool_name}": ${error instanceof Error ? error.message : 'Unknown error'}`,
        }],
        isError: true,
      };
    }
  },
};
