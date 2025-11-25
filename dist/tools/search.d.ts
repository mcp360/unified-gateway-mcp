import { z } from 'zod';
import { GatewayClient } from '../gateway/client.js';
export declare const searchTool: {
    name: string;
    description: string;
    inputSchema: z.ZodObject<{
        query: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        query?: string | undefined;
    }, {
        query?: string | undefined;
    }>;
    handler: (args: any, client: GatewayClient) => Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        isError?: undefined;
    } | {
        content: {
            type: "text";
            text: string;
        }[];
        isError: boolean;
    }>;
};
//# sourceMappingURL=search.d.ts.map