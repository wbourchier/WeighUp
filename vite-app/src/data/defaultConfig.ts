import type { AppConfig } from '../types/config';

export const defaultConfig: AppConfig = {
    id: 'default',
    name: 'Default Theme',
    branding: {
        appName: 'WeighUp',
        tagline: 'Strategic Prioritization Framework',
        itemName: 'Project',
        itemNamePlural: 'Projects'
    },
    theme: {
        // HSL values without 'hsl()' wrapper for easier manipulation if needed, 
        // but our CSS uses hsl(var(...)) so we should store just the channels if we want to be pure,
        // OR store the full value. 
        // Looking at index.css: --color-background: 0 0% 100%;
        // So we will store the channel values "H S% L%".

        background: '0 0% 100%',       // White
        surface: '0 0% 98%',           // Very Light Gray
        surfaceHover: '0 0% 96%',
        border: '0 0% 90%',            // Light Gray

        textPrimary: '0 0% 9%',        // Almost Black
        textSecondary: '0 0% 40%',     // Medium Gray
        textTertiary: '0 0% 60%',      // Light Gray Text

        primary: '0 0% 9%',            // Black
        primaryForeground: '0 0% 100%', // White

        accent: '0 0% 96%',
        accentForeground: '0 0% 9%'
    }
};
