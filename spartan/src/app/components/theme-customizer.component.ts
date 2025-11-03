import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX, lucidePalette, lucideChevronDown } from '@ng-icons/lucide';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-customizer',
  standalone: true,
  imports: [
    CommonModule,
    HlmAccordionImports,
    HlmButtonImports,
    HlmIconImports,
    HlmIcon,
    NgIcon,
    FormsModule
  ],
  providers: [provideIcons({ lucideX, lucidePalette, lucideChevronDown })],
  template: `
    <div class="fixed inset-0 pointer-events-none z-50">
      <!-- Theme Toggle Button - Top Right -->
      <button
        hlmBtn
        variant="outline"
        size="icon"
        class="pointer-events-auto absolute top-4 right-4 rounded-full"
        (click)="themeService.toggleDarkMode()"
      >
        @if (themeService.isDarkMode()) {
          <span class="text-lg">🌙</span>
        } @else {
          <span class="text-lg">☀️</span>
        }
      </button>

      <!-- Customizer Open Button - Bottom Left -->
      <button
        hlmBtn
        variant="outline"
        size="icon"
        class="pointer-events-auto absolute bottom-4 left-4 rounded-full shadow-lg"
        (click)="themeService.toggleSidebar()"
      >
        <ng-icon hlm name="lucidePalette" size="lg" />
      </button>

      <!-- Sidebar -->
      <div
        class="pointer-events-auto fixed top-0 right-0 h-full w-130 bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
        [class.translate-x-0]="themeService.sidebarOpen()"
        [class.translate-x-full]="!themeService.sidebarOpen()"
      >
        <!-- Header -->
        <div class="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-[999]">
          <h2 class="text-lg font-semibold">Theme Anpassung</h2>
          <button
            hlmBtn
            variant="ghost"
            size="icon"
            (click)="themeService.toggleSidebar()"
          >
            <ng-icon hlm name="lucideX" />
          </button>
        </div>

        <!-- Content -->
        <div class="p-4">
          <hlm-accordion>
            <!-- Light Mode Colors -->
            <hlm-accordion-item>
              <h3 class="contents">
                <button hlmAccordionTrigger>
                  <span class="flex items-center gap-2">
                    <span class="text-lg">☀️</span>
                    <span>Light Mode</span>
                  </span>
                  <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
                </button>
              </h3>
              <hlm-accordion-content>
                <div class="space-y-3 py-2">
                  @for (colorKey of colorKeys; track colorKey) {
                    <div class="flex items-center justify-between gap-2">
                      <label class="text-sm font-medium capitalize">
                        {{ formatLabel(colorKey) }}
                      </label>
                      <div class="flex items-center gap-2">
                        <div class="relative">
                          <div
                            class="w-8 h-8 rounded border border-border shadow-sm cursor-pointer hover:ring-2 hover:ring-ring transition-all"
                            [style.background]="themeService.lightColors()[colorKey]"
                            (click)="openColorPicker($event, colorKey, false)"
                          ></div>
                          <input
                            type="color"
                            class="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
                            [value]="oklchToHex(themeService.lightColors()[colorKey])"
                            (input)="updateColorFromPicker($event, colorKey, false)"
                          />
                        </div>
                        <input
                          type="text"
                          class="w-32 px-2 py-1 text-xs border rounded bg-background"
                          [value]="themeService.lightColors()[colorKey]"
                          (change)="updateColor(colorKey, $event, false)"
                        />
                      </div>
                    </div>
                  }
                </div>
              </hlm-accordion-content>
            </hlm-accordion-item>

            <!-- Dark Mode Colors -->
            <hlm-accordion-item>
              <h3 class="contents">
                <button hlmAccordionTrigger>
                  <span class="flex items-center gap-2">
                    <span class="text-lg">🌙</span>
                    <span>Dark Mode</span>
                  </span>
                  <ng-icon name="lucideChevronDown" hlm hlmAccIcon />
                </button>
              </h3>
              <hlm-accordion-content>
                <div class="space-y-3 py-2">
                  @for (colorKey of colorKeys; track colorKey) {
                    <div class="flex items-center justify-between gap-2">
                      <label class="text-sm font-medium capitalize">
                        {{ formatLabel(colorKey) }}
                      </label>
                      <div class="flex items-center gap-2">
                        <div class="relative">
                          <div
                            class="w-8 h-8 rounded border border-border shadow-sm cursor-pointer hover:ring-2 hover:ring-ring transition-all"
                            [style.background]="themeService.darkColors()[colorKey]"
                            (click)="openColorPicker($event, colorKey, true)"
                          ></div>
                          <input
                            type="color"
                            class="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
                            [value]="oklchToHex(themeService.darkColors()[colorKey])"
                            (input)="updateColorFromPicker($event, colorKey, true)"
                          />
                        </div>
                        <input
                          type="text"
                          class="w-32 px-2 py-1 text-xs border rounded bg-background"
                          [value]="themeService.darkColors()[colorKey]"
                          (change)="updateColor(colorKey, $event, true)"
                        />
                      </div>
                    </div>
                  }
                </div>
              </hlm-accordion-content>
            </hlm-accordion-item>
          </hlm-accordion>

          <!-- Share URL Section -->
          <div class="mt-6 p-3 bg-muted rounded-lg">
            <p class="text-sm font-medium mb-2">Share URL</p>
            <div class="flex gap-2">
              <input
                type="text"
                readonly
                class="flex-1 px-2 py-1 text-xs border rounded bg-background"
                [value]="shareUrl"
                #urlInput
              />
              <button
                hlmBtn
                variant="outline"
                size="sm"
                (click)="copyUrl(urlInput)"
              >
                Copy
              </button>
            </div>
          </div>

          <!-- Export Section -->
          <div class="mt-4">
            <button
              hlmBtn
              variant="outline"
              class="w-full"
              (click)="exportTheme()"
            >
              Export CSS (Zwischenablage)
            </button>
          </div>

          <!-- Reset Button -->
          <div class="mt-4">
            <button
              hlmBtn
              variant="destructive"
              class="w-full"
              (click)="resetTheme()"
            >
              Reset zu Standard-Farben
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class ThemeCustomizerComponent {
  themeService = inject(ThemeService);

  get colorKeys() {
    return this.themeService.getColorKeys();
  }

  get shareUrl(): string {
    return window.location.href;
  }

  formatLabel(key: string): string {
    // Show the CSS variable name as it appears in styles.scss
    return '--' + key;
  }

  updateColor(colorKey: string, event: Event, isDark: boolean) {
    const input = event.target as HTMLInputElement;
    this.themeService.updateColor(colorKey as any, input.value, isDark);
  }

  copyUrl(input: HTMLInputElement) {
    input.select();
    document.execCommand('copy');
    // Optional: Add toast notification here
  }

  resetTheme() {
    this.themeService.resetToDefaults();
  }

  openColorPicker(event: Event, colorKey: string, isDark: boolean) {
    // Trigger the hidden color input
    const target = event.currentTarget as HTMLElement;
    const colorInput = target.nextElementSibling as HTMLInputElement;
    if (colorInput && colorInput.type === 'color') {
      colorInput.click();
    }
  }

  updateColorFromPicker(event: Event, colorKey: string, isDark: boolean) {
    const input = event.target as HTMLInputElement;
    const hexColor = input.value;
    
    // Convert HEX to OKLCH (simplified approximation)
    const oklchValue = this.hexToOklch(hexColor);
    this.themeService.updateColor(colorKey as any, oklchValue, isDark);
  }

  oklchToHex(oklch: string): string {
    // Extract OKLCH values - handle both percentage and decimal notation
    const match = oklch.match(/oklch\(([\d.]+%?)\s+([\d.]+)\s+([\d.]+)/);
    if (!match) return '#808080';

    let l = parseFloat(match[1]);
    const c = parseFloat(match[2]);
    const h = parseFloat(match[3]);
    
    // Convert percentage to decimal if needed
    if (match[1].includes('%')) {
      l = l / 100;
    }
    
    // Convert OKLCH to linear RGB (simplified)
    const hueRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hueRad);
    const b_val = c * Math.sin(hueRad);
    
    // Simple Lab to RGB conversion
    let r = l + 0.3963 * a + 0.2158 * b_val;
    let g = l - 0.1055 * a - 0.0638 * b_val;
    let b = l - 0.0894 * a - 1.2914 * b_val;
    
    // Clamp and convert to 0-255
    r = Math.round(Math.min(255, Math.max(0, r * 255)));
    g = Math.round(Math.min(255, Math.max(0, g * 255)));
    b = Math.round(Math.min(255, Math.max(0, b * 255)));

    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }

  hexToOklch(hex: string): string {
    // Convert HEX to RGB (0-1 range)
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    // Convert RGB to linear RGB
    const linearR = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    const linearG = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    const linearB = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    // Simplified RGB to Lab conversion
    const l = 0.4122214708 * linearR + 0.5363325363 * linearG + 0.0514459929 * linearB;
    const m = 0.2119034982 * linearR + 0.6806995451 * linearG + 0.1073969566 * linearB;
    const s = 0.0883024619 * linearR + 0.2817188376 * linearG + 0.6299787005 * linearB;

    const L = Math.cbrt(l);
    const A = Math.cbrt(m);
    const B = Math.cbrt(s);

    const lightness = 0.2104542553 * L + 0.7936177850 * A - 0.0040720468 * B;
    const a = 1.9779984951 * L - 2.4285922050 * A + 0.4505937099 * B;
    const b_val = 0.0259040371 * L + 0.7827717662 * A - 0.8086757660 * B;

    // Calculate chroma and hue
    const chroma = Math.sqrt(a * a + b_val * b_val);
    let hue = Math.atan2(b_val, a) * 180 / Math.PI;
    if (hue < 0) hue += 360;

    return `oklch(${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(3)})`;
  }

  exportTheme() {
    const lightColors = this.themeService.lightColors();
    const darkColors = this.themeService.darkColors();

    // Generate CSS in the exact format of styles.scss
    let cssOutput = ':root {\n';
    cssOutput += 'color-scheme: light;\n\n';
    
    Object.entries(lightColors).forEach(([key, value]) => {
      cssOutput += `--${key}: ${value};\n`;
    });
    
    cssOutput += '--radius: 0.625rem;\n'; // Add radius as it's not in ThemeColors
    cssOutput += '}\n\n';
    
    cssOutput += ':root.dark {\n';
    cssOutput += 'color-scheme: dark;\n\n';
    
    Object.entries(darkColors).forEach(([key, value]) => {
      cssOutput += `--${key}: ${value};\n`;
    });
    
    cssOutput += '}';

    // Copy to clipboard
    navigator.clipboard.writeText(cssOutput).then(() => {
      alert('CSS wurde in die Zwischenablage kopiert! Sie können es jetzt in Ihre styles.scss einfügen.');
    }).catch(err => {
      console.error('Fehler beim Kopieren:', err);
      alert('Fehler beim Kopieren in die Zwischenablage.');
    });
  }
}
