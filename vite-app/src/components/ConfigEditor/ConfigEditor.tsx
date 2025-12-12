import React, { useState } from 'react';
import { useConfig } from '../../contexts/ConfigContext';
import { X, Plus, Trash2, RotateCcw, Check } from 'lucide-react';
import type { AppConfig } from '../../types/config';
import { defaultConfig } from '../../data/defaultConfig';

interface ConfigEditorProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConfigEditor: React.FC<ConfigEditorProps> = ({ isOpen, onClose }) => {
    const {
        configs,
        activeConfigId,
        activeConfig,
        addConfig,
        updateConfig,
        deleteConfig,
        setActiveConfig,
        resetToDefaults
    } = useConfig();

    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState('');

    if (!isOpen) return null;

    const handleCreateNew = () => {
        const newId = `custom-${Date.now()}`;
        const newConfig: AppConfig = {
            ...defaultConfig,
            id: newId,
            name: `Custom Theme ${configs.length + 1}`,
        };
        addConfig(newConfig);
    };

    // Helper to convert HSL string "0 0% 100%" to Hex for input type="color"
    // Note: This is a simplified implementation. A robust one would need full HSL->Hex conversion.
    // For now, we'll just use text inputs for HSL values to be safe and accurate to the CSS system,
    // or we could implement a proper color picker later. 
    // Let's stick to text inputs for HSL channels for now to avoid complexity with conversion logic 
    // unless we want to pull in a library.
    // Actually, for better UX, let's try to parse simple HSL to show a color preview at least.

    const handleColorChange = (key: keyof typeof activeConfig.theme, value: string) => {
        updateConfig({
            ...activeConfig,
            theme: {
                ...activeConfig.theme,
                [key]: value
            }
        });
    };

    const handleBrandingChange = (key: keyof typeof activeConfig.branding, value: string) => {
        updateConfig({
            ...activeConfig,
            branding: {
                ...activeConfig.branding,
                [key]: value
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

            {/* Sidebar Panel */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-900">Configuration</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">

                    {/* Config Selector */}
                    <div className="p-6 border-b border-gray-100">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Select Theme
                        </label>
                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                            {configs.map(config => (
                                <button
                                    key={config.id}
                                    onClick={() => setActiveConfig(config.id)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${activeConfigId === config.id
                                        ? 'bg-black text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {config.name}
                                </button>
                            ))}
                            <button
                                onClick={handleCreateNew}
                                className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                title="Create New Theme"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            {isEditingName ? (
                                <div className="flex items-center gap-2 flex-1">
                                    <input
                                        type="text"
                                        value={tempName}
                                        onChange={(e) => setTempName(e.target.value)}
                                        className="flex-1 px-2 py-1 text-sm border rounded"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => {
                                            updateConfig({ ...activeConfig, name: tempName });
                                            setIsEditingName(false);
                                        }}
                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-900">{activeConfig.name}</h3>
                                    <button
                                        onClick={() => {
                                            setTempName(activeConfig.name);
                                            setIsEditingName(true);
                                        }}
                                        className="text-xs text-gray-400 hover:text-gray-600 underline"
                                    >
                                        Rename
                                    </button>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => deleteConfig(activeConfig.id)}
                                    disabled={configs.length <= 1}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Delete Theme"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Branding Editor */}
                    <div className="p-6 border-b border-gray-100">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Branding
                        </label>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">App Name</label>
                                <input
                                    type="text"
                                    value={activeConfig.branding.appName}
                                    onChange={(e) => handleBrandingChange('appName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
                                <input
                                    type="text"
                                    value={activeConfig.branding.tagline}
                                    onChange={(e) => handleBrandingChange('tagline', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name (Singular)</label>
                                    <input
                                        type="text"
                                        value={activeConfig.branding.itemName}
                                        onChange={(e) => handleBrandingChange('itemName', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name (Plural)</label>
                                    <input
                                        type="text"
                                        value={activeConfig.branding.itemNamePlural}
                                        onChange={(e) => handleBrandingChange('itemNamePlural', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Theme Editor */}
                    <div className="p-6">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Theme Colors (HSL)
                        </label>
                        <p className="text-xs text-gray-400 mb-4">
                            Enter HSL values (e.g., "0 0% 100%" for white).
                            <br />Format: Hue (0-360) Saturation% Lightness%
                        </p>

                        <div className="space-y-4">
                            {Object.entries(activeConfig.theme).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 rounded-full border border-gray-200 shadow-sm"
                                        style={{ backgroundColor: `hsl(${value})` }}
                                    />
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-700 mb-1 capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </label>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleColorChange(key as keyof typeof activeConfig.theme, e.target.value)}
                                            className="w-full px-3 py-1.5 border border-gray-200 rounded text-xs font-mono"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                    <button
                        onClick={resetToDefaults}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset All Data
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ConfigEditor;
