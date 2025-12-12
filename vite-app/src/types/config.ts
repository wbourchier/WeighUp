import type { CriteriaSchema } from './criteria';

export interface ThemeColors {
    primary: string;
    primaryForeground: string;
    background: string;
    surface: string;
    surfaceHover: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    accent: string;
    accentForeground: string;
}

export interface BrandingConfig {
    appName: string;
    tagline: string;
    itemName: string; // e.g., "Project"
    itemNamePlural: string; // e.g., "Projects"
}

export interface AppConfig {
    id: string;
    name: string; // Display name of the config (e.g., "Default", "Dark Mode")
    branding: BrandingConfig;
    theme: ThemeColors;
    criteria: CriteriaSchema;
}
