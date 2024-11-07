import { Application, Request, Response, NextFunction } from 'express';

export const setupRoutes = (
  app: Application,
  routes: any[],
  controllerInstances: any
) => {
  routes.forEach((route) => {
    const { method, route: path, controller, action } = route;
    const controllerInstance = controllerInstances[controller];

    if (
      controllerInstance &&
      typeof controllerInstance[action] === 'function'
    ) {
      app[method](path, (req: Request, res: Response, next: NextFunction) => {
        controllerInstance[action](req, res, next);
      });
    }
  });
};
