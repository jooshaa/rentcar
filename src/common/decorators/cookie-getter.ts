import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CookieGetter = createParamDecorator(
    async (key: string, contex: ExecutionContext): Promise<string> => {
        const require = contex.switchToHttp().getRequest()
        const refresh_token = require.cookies?.[key]

        console.log(refresh_token);
        
        if (!refresh_token) {
            throw new BadRequestException("Token is not found");
        }
        return refresh_token
    }
)