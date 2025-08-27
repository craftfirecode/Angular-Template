import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  // when rendering on the server, don't redirect — allow the client to handle auth
  if (!isPlatformBrowser(platformId)) return true;
  // wait for Supabase client to load session from storage
  await supabase.ready();
  if (supabase.isAuthenticated()) return true;
  return router.parseUrl('/login');
};
