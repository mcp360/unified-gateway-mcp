import { z } from 'zod';
import { GatewayClient } from '../gateway/client.js';
export declare const executeTool: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        tool_name: z.ZodString;
        arguments: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        tool_name: string;
        arguments?: Record<string, any> | undefined;
    }, {
        tool_name: string;
        arguments?: Record<string, any> | undefined;
    }>;
    handler: (args: any, client: GatewayClient) => Promise<any>;
};
//# sourceMappingURL=execute.d.ts.map