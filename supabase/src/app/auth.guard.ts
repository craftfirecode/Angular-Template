import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  // wait for Supabase client to load session from storage
  await supabase.ready();
  if (supabase.isAuthenticated()) return true;
  return router.parseUrl('/login');
};
