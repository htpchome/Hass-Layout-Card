/**
 * Simple page routing for Hass Layout Card
 * Supports multi-page layouts if needed in the future
 */

export interface Route {
  path: string;
  title: string;
  content: string;
}

export class Router {
  private routes: Route[] = [];
  private currentPath = '';
  private onChangeCallback?: (route: Route | undefined) => void;

  constructor(routes: Route[] = []) {
    this.routes = routes;
    if (routes.length > 0) {
      this.currentPath = routes[0].path;
    }
  }

  addRoute(route: Route): void {
    this.routes.push(route);
  }

  removeRoute(path: string): void {
    this.routes = this.routes.filter((r) => r.path !== path);
  }

  getRoutes(): Route[] {
    return [...this.routes];
  }

  getCurrentRoute(): Route | undefined {
    return this.routes.find((r) => r.path === this.currentPath);
  }

  navigate(path: string): void {
    const route = this.routes.find((r) => r.path === path);
    if (route) {
      this.currentPath = path;
      this.onChangeCallback?.(route);
    }
  }

  onChange(callback: (route: Route | undefined) => void): void {
    this.onChangeCallback = callback;
  }
}