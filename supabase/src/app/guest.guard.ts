import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

export const guestGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  await supabase.ready();
  // allow access only when NOT authenticated
  if (!supabase.isAuthenticated()) return true;
  // otherwise redirect to protected area
  return router.parseUrl('/protected');
};
