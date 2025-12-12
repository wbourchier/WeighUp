import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AppConfig } from '../types/config';
import { defaultConfig as localDefaultConfig } from '../data/defaultConfig';

interface ConfigContextType {
    configs: AppConfig[];
    activeConfigId: string;
    activeConfig: AppConfig;
    addConfig: (config: AppConfig) => void;
    updateConfig: (config: AppConfig) => void;
    deleteConfig: (id: string) => void;
    setActiveConfig: (id: string) => void;
    resetToDefaults: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

const STORAGE_KEY_CONFIGS = 'weighup_configs';
const STORAGE_KEY_ACTIVE_ID = 'weighup_active_config_id';

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    console.log('ConfigProvider: Initializing...');
    const [configs, setConfigs] = useState<AppConfig[]>([localDefaultConfig]);
    const [activeConfigId, setActiveConfigId] = useState<string>(localDefaultConfig.id);

    // Load from local storage on mount
    useEffect(() => {
        console.log('ConfigProvider: Mounting...');
        const storedConfigs = localStorage.getItem(STORAGE_KEY_CONFIGS);
        const storedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE_ID);

        if (storedConfigs) {
            try {
                const parsed = JSON.parse(storedConfigs);
                console.log('ConfigProvider: Loaded configs', parsed);
                // Validate that parsed is an array
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setConfigs(parsed);
                } else {
                    console.warn('ConfigProvider: Invalid config format, resetting');
                    localStorage.removeItem(STORAGE_KEY_CONFIGS);
                }
            } catch (e) {
                console.error("Failed to parse stored configs, clearing storage", e);
                localStorage.removeItem(STORAGE_KEY_CONFIGS);
            }
        } else {
            console.log('ConfigProvider: No stored configs, using default');
        }

        if (storedActiveId) {
            console.log('ConfigProvider: Loaded active ID', storedActiveId);
            setActiveConfigId(storedActiveId);
        }
    }, []);

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY_CONFIGS, JSON.stringify(configs));
        localStorage.setItem(STORAGE_KEY_ACTIVE_ID, activeConfigId);
    }, [configs, activeConfigId]);

    // Apply theme to CSS variables
    const activeConfig = configs.find(c => c.id === activeConfigId) || localDefaultConfig;

    useEffect(() => {
        const root = document.documentElement;
        const theme = activeConfig?.theme || localDefaultConfig.theme;

        if (!theme) {
            console.error("ConfigProvider: Theme is missing!", activeConfig);
            return;
        }

        // Helper to set CSS variable
        const setVar = (name: string, value: string) => {
            root.style.setProperty(`--color-${name}`, value);
        };

        setVar('background', theme.background);
        setVar('surface', theme.surface);
        setVar('surface-hover', theme.surfaceHover);
        setVar('border', theme.border);
        setVar('text-primary', theme.textPrimary);
        setVar('text-secondary', theme.textSecondary);
        setVar('text-tertiary', theme.textTertiary);
        setVar('primary', theme.primary);
        setVar('primary-foreground', theme.primaryForeground);
        setVar('accent', theme.accent);
        setVar('accent-foreground', theme.accentForeground);

    }, [activeConfig]);

    const addConfig = (config: AppConfig) => {
        setConfigs(prev => [...prev, config]);
        setActiveConfigId(config.id);
    };

    const updateConfig = (updatedConfig: AppConfig) => {
        setConfigs(prev => prev.map(c => c.id === updatedConfig.id ? updatedConfig : c));
    };

    const deleteConfig = (id: string) => {
        if (configs.length <= 1) {
            alert("Cannot delete the last configuration.");
            return;
        }

        const newConfigs = configs.filter(c => c.id !== id);
        setConfigs(newConfigs);

        if (activeConfigId === id) {
            setActiveConfigId(newConfigs[0].id);
        }
    };

    const resetToDefaults = () => {
        if (confirm("Are you sure you want to reset all configurations? This cannot be undone.")) {
            setConfigs([localDefaultConfig]);
            setActiveConfigId(localDefaultConfig.id);
            localStorage.removeItem(STORAGE_KEY_CONFIGS);
            localStorage.removeItem(STORAGE_KEY_ACTIVE_ID);
        }
    };

    return (
        <ConfigContext.Provider value={{
            configs,
            activeConfigId,
            activeConfig,
            addConfig,
            updateConfig,
            deleteConfig,
            setActiveConfig: setActiveConfigId,
            resetToDefaults
        }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
