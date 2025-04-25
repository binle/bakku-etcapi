import { HttpStatusCodes, IApplicationFilter, newBakkuHttpError } from '@bakku/etcapi';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IJWTUser } from 'src/definitions';

export class DetectUserFilter implements IApplicationFilter {
  getHandler(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      req.user = { id: 'anonymous', role: '' };
      if (req.headers.authorization) {
        const jwt = req.headers.authorization.replace('Bearer ', '').replace('JWT', '');
        if (jwt) {
          req.user = this.decodeJWT(jwt);
        }
      }
      next();
    };
  }

  private decodeJWT(jwtString: string): IJWTUser {
    // TODO
    return { id: 'TODO', role: 'TODO' };
  }
}

export class AuthorizedUserFilter implements IApplicationFilter {
  getAppliedPath(): string | string[] {
    return ['/api/user/*'];
  }
  getHandler(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user?.id) {
        throw newBakkuHttpError(HttpStatusCodes.UNAUTHORIZED);
      }
      next();
    };
  }
}
