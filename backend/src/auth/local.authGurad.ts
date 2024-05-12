import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    const result1 = await super.logIn(request);

    console.log('{{{{{{{{{{{{{{{{{', result1);
    console.log('request.isAuthenticated();', request.isAuthenticated());

    return result;
  }
}
