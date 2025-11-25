import { z } from 'zod';
import { GatewayClient } from '../gateway/client.js';

export const searchTool = {
  name: 'search',
  description: 'Search and discover available tools across all connected MCP servers. Returns a list of tools matching your search query.',
  inputSchema: z.object({
    query: z.string().optional().describe('Search term to filter tools by name or description. Leave empty to list all available tools.'),
  }),
  handler: async (args: any, client: GatewayClient) => {
    try {
      const tools = await client.searchTools(args.query || '');

      if (tools.length === 0) {
        return {
          content: [{
            type: 'text' as const,
            text: args.query
              ? `No tools found matching "${args.query}".`
              : 'No tools available.',
          }],
        };
      }

      // Format tools list
      const toolsList = tools.map((tool, index) => {
        const params = tool.inputSchema.properties
          ? Object.keys(tool.inputSchema.properties)
            .map(key => {
              const prop = tool.inputSchema.properties![key];
              const required = tool.inputSchema.required?.includes(key) ? ' (required)' : '';
              return `    - ${key}${required}: ${prop.description || prop.type}`;
            })
            .join('\n')
          : '    No parameters';

        return `${index + 1}. **${tool.name}**\n   ${tool.description}\n   Parameters:\n${params}`;
      }).join('\n\n');

      const summary = args.query
        ? `Found ${tools.length} tool(s) matching "${args.query}":`
        : `Available tools (${tools.length}):`;

      return {
        content: [{
          type: 'text' as const,
          text: `${summary}\n\n${toolsList}`,
        }],
      };
    } catch (error) {
      return {
        content: [{
          type: 'text' as const,
          text: `Error searching tools: ${error instanceof Error ? error.message : 'Unknown error'}`,
        }],
        isError: true,
      };
    }
  },
};
