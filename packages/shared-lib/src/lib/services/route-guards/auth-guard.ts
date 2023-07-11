import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

export const authGuard = () => {

  
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (authService.isAuthenticated()) {
        return true;
      } 
    
    // Redirect to the login page
    return router.parseUrl('/login');
};

export const portalAuthGuard = () => {
  const authService = inject(AuthService);
    const router = inject(Router);
    
    if (authService.isPortalAuthenticated()) {
        return true;
      } 
    
    // Redirect to the login page
    return router.parseUrl('/login');
}