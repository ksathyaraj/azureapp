import { inject } from "@angular/core";
import { SessionService } from "../session.service";
import { PortalSessionService } from "../portal/session.service";

export const appInit = (): any => {
    const sessionService = inject(SessionService);
    return () =>  {
        sessionService.load()
      };
};

export const portalAppInit = (): any => {
  const portalSessionService = inject(PortalSessionService);
  return () =>  {
    portalSessionService.load()
    };
};