import { Injectable, signal, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal(false);
  sidebarOpen = signal(false);

  private defaultLightColors: ThemeColors = {
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.145 0 0)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.145 0 0)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.145 0 0)',
    primary: 'oklch(0.205 0 0)',
    primaryForeground: 'oklch(0.985 0 0)',
    secondary: 'oklch(0.97 0 0)',
    secondaryForeground: 'oklch(0.205 0 0)',
    muted: 'oklch(0.97 0 0)',
    mutedForeground: 'oklch(0.556 0 0)',
    accent: 'oklch(0.97 0 0)',
    accentForeground: 'oklch(0.205 0 0)',
    destructive: 'oklch(0.577 0.245 27.325)',
    border: 'oklch(0.922 0 0)',
    input: 'oklch(0.922 0 0)',
    ring: 'oklch(0.708 0 0)'
  };

  private defaultDarkColors: ThemeColors = {
    background: 'oklch(0.145 0 0)',
    foreground: 'oklch(0.985 0 0)',
    card: 'oklch(0.205 0 0)',
    cardForeground: 'oklch(0.985 0 0)',
    popover: 'oklch(0.205 0 0)',
    popoverForeground: 'oklch(0.985 0 0)',
    primary: 'oklch(0.922 0 0)',
    primaryForeground: 'oklch(0.205 0 0)',
    secondary: 'oklch(0.269 0 0)',
    secondaryForeground: 'oklch(0.985 0 0)',
    muted: 'oklch(0.269 0 0)',
    mutedForeground: 'oklch(0.708 0 0)',
    accent: 'oklch(0.269 0 0)',
    accentForeground: 'oklch(0.985 0 0)',
    destructive: 'oklch(0.704 0.191 22.216)',
    border: 'oklch(1 0 0 / 10%)',
    input: 'oklch(1 0 0 / 15%)',
    ring: 'oklch(0.556 0 0)'
  };

  lightColors = signal<ThemeColors>({ ...this.defaultLightColors });
  darkColors = signal<ThemeColors>({ ...this.defaultDarkColors });

  constructor(private router: Router) {
    // Check system preference on init
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode.set(prefersDark);

    // Apply theme on mode change
    effect(() => {
      this.applyTheme();
    });
  }

  toggleDarkMode() {
    this.isDarkMode.update(mode => !mode);
  }

  toggleSidebar() {
    this.sidebarOpen.update(open => !open);
  }

  updateColor(colorKey: keyof ThemeColors, value: string, isDark: boolean) {
    if (isDark) {
      this.darkColors.update(colors => ({ ...colors, [colorKey]: value }));
    } else {
      this.lightColors.update(colors => ({ ...colors, [colorKey]: value }));
    }
    this.applyTheme();
    this.updateUrlParams();
  }

  private applyTheme() {
    const root = document.documentElement;
    const colors = this.isDarkMode() ? this.darkColors() : this.lightColors();

    if (this.isDarkMode()) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply CSS variables
    Object.entries(colors).forEach(([key, value]) => {
      const cssVarName = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
      root.style.setProperty(cssVarName, value);
    });
  }

  private updateUrlParams() {
    const params: any = {};
    const lightColors = this.lightColors();
    const darkColors = this.darkColors();

    // Add light colors
    Object.entries(lightColors).forEach(([key, value]) => {
      if (value !== this.defaultLightColors[key as keyof ThemeColors]) {
        params[`light-${key}`] = value;
      }
    });

    // Add dark colors
    Object.entries(darkColors).forEach(([key, value]) => {
      if (value !== this.defaultDarkColors[key as keyof ThemeColors]) {
        params[`dark-${key}`] = value;
      }
    });

    this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: 'merge'
    });
  }

  loadFromUrlParams(params: any) {
    const lightColors = { ...this.lightColors() };
    const darkColors = { ...this.darkColors() };

    Object.keys(params).forEach(key => {
      if (key.startsWith('light-')) {
        const colorKey = key.replace('light-', '') as keyof ThemeColors;
        lightColors[colorKey] = params[key];
      } else if (key.startsWith('dark-')) {
        const colorKey = key.replace('dark-', '') as keyof ThemeColors;
        darkColors[colorKey] = params[key];
      }
    });

    this.lightColors.set(lightColors);
    this.darkColors.set(darkColors);
    this.applyTheme();
  }

  getCurrentColors(): ThemeColors {
    return this.isDarkMode() ? this.darkColors() : this.lightColors();
  }

  getColorKeys(): (keyof ThemeColors)[] {
    return Object.keys(this.lightColors()) as (keyof ThemeColors)[];
  }

  resetToDefaults() {
    this.lightColors.set({ ...this.defaultLightColors });
    this.darkColors.set({ ...this.defaultDarkColors });
    this.applyTheme();
    
    // Clear URL parameters
    this.router.navigate([], {
      queryParams: {},
      queryParamsHandling: ''
    });
  }
}
