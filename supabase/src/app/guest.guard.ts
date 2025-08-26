import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

export const guestGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  // on the server, skip redirect decisions so the client can resolve auth
  if (!isPlatformBrowser(platformId)) return true;
  await supabase.ready();
  // allow access only when NOT authenticated
  if (!supabase.isAuthenticated()) return true;
  // otherwise redirect to protected area
  return router.parseUrl('/protected');
};
