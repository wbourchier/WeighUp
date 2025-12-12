import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useConfig } from '../contexts/ConfigContext';
import type { CriteriaSchema, CriteriaCategory, Criterion } from '../types/criteria';

interface CriteriaEditorProps {
    onBack: () => void;
}

const CriteriaEditor: React.FC<CriteriaEditorProps> = ({ onBack }) => {
    const { activeConfig, updateConfig } = useConfig();
    const [schema, setSchema] = useState<CriteriaSchema>(JSON.parse(JSON.stringify(activeConfig.criteria)));
    const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

    const handleSave = () => {
        updateConfig({
            ...activeConfig,
            criteria: schema
        });
        onBack();
    };

    const toggleCategory = (id: number) => {
        setExpandedCategories(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const updateCategory = (id: number, updates: Partial<CriteriaCategory>) => {
        setSchema(prev => ({
            ...prev,
            criteriaCategories: prev.criteriaCategories.map(cat =>
                cat.id === id ? { ...cat, ...updates } : cat
            )
        }));
    };

    const updateCriterion = (categoryId: number, criterionId: number, updates: Partial<Criterion>) => {
        setSchema(prev => ({
            ...prev,
            criteriaCategories: prev.criteriaCategories.map(cat =>
                cat.id === categoryId ? {
                    ...cat,
                    criteria: cat.criteria.map(crit =>
                        crit.id === criterionId ? { ...crit, ...updates } : crit
                    )
                } : cat
            )
        }));
    };

    const addCategory = () => {
        const newId = Math.max(0, ...schema.criteriaCategories.map(c => c.id)) + 1;
        const newCategory: CriteriaCategory = {
            id: newId,
            name: "New Category",
            axis: "y",
            criteria: []
        };
        setSchema(prev => ({
            ...prev,
            criteriaCategories: [...prev.criteriaCategories, newCategory]
        }));
        setExpandedCategories(prev => ({ ...prev, [newId]: true }));
    };

    const addCriterion = (categoryId: number) => {
        setSchema(prev => ({
            ...prev,
            criteriaCategories: prev.criteriaCategories.map(cat => {
                if (cat.id !== categoryId) return cat;

                // Find max criterion ID across all categories to ensure uniqueness
                const maxId = prev.criteriaCategories.reduce((max, c) => {
                    const catMax = Math.max(0, ...c.criteria.map(crit => crit.id));
                    return Math.max(max, catMax);
                }, 0);

                const newCriterion: Criterion = {
                    id: maxId + 1,
                    name: "New Criterion",
                    weight: 1,
                    examples: "",
                    exclude: "",
                    minScore: 0,
                    maxScore: 5,
                    scoringGuide: "0: Low\n5: High",
                    comments: ""
                };

                return {
                    ...cat,
                    criteria: [...cat.criteria, newCriterion]
                };
            })
        }));
    };

    const deleteCategory = (id: number) => {
        if (confirm("Are you sure you want to delete this category?")) {
            setSchema(prev => ({
                ...prev,
                criteriaCategories: prev.criteriaCategories.filter(c => c.id !== id)
            }));
        }
    };

    const deleteCriterion = (categoryId: number, criterionId: number) => {
        if (confirm("Are you sure you want to delete this criterion?")) {
            setSchema(prev => ({
                ...prev,
                criteriaCategories: prev.criteriaCategories.map(cat =>
                    cat.id === categoryId ? {
                        ...cat,
                        criteria: cat.criteria.filter(c => c.id !== criterionId)
                    } : cat
                )
            }));
        }
    };

    return (
        <div className="min-h-screen bg-background text-text-primary p-8 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex items-center justify-between border-b border-border pb-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-surface rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold">Criteria Editor</h1>
                            <p className="text-text-secondary">Customize your prioritization framework</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium shadow-sm"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </header>

                <div className="space-y-6">
                    {schema.criteriaCategories.map(category => (
                        <div key={category.id} className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
                            <div className="p-4 bg-surface/30 flex items-center justify-between border-b border-border">
                                <div className="flex items-center gap-4 flex-1">
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="p-1 hover:bg-surface rounded text-text-secondary"
                                    >
                                        {expandedCategories[category.id] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                    </button>
                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            value={category.name}
                                            onChange={(e) => updateCategory(category.id, { name: e.target.value })}
                                            className="font-semibold bg-transparent border-none focus:ring-0 p-0 text-lg w-full"
                                            placeholder="Category Name"
                                        />
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-text-secondary">Axis:</span>
                                            <select
                                                value={category.axis}
                                                onChange={(e) => updateCategory(category.id, { axis: e.target.value })}
                                                className="bg-surface border border-border rounded px-2 py-1 text-sm"
                                            >
                                                <option value="y">Value (Y)</option>
                                                <option value="-y">Cost (-Y)</option>
                                                <option value="x">Effort (X)</option>
                                                <option value="w">Risk (X/W)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteCategory(category.id)}
                                    className="p-2 text-text-tertiary hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {expandedCategories[category.id] && (
                                <div className="p-4 space-y-4">
                                    {category.criteria.map(criterion => (
                                        <div key={criterion.id} className="bg-surface/10 rounded-lg p-4 border border-border/50">
                                            <div className="grid grid-cols-12 gap-4 items-start">
                                                <div className="col-span-4">
                                                    <label className="block text-xs font-medium text-text-secondary mb-1">Name</label>
                                                    <input
                                                        type="text"
                                                        value={criterion.name}
                                                        onChange={(e) => updateCriterion(category.id, criterion.id, { name: e.target.value })}
                                                        className="w-full bg-white border border-border rounded px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label className="block text-xs font-medium text-text-secondary mb-1">Weight</label>
                                                    <input
                                                        type="number"
                                                        step="0.05"
                                                        value={criterion.weight}
                                                        onChange={(e) => updateCriterion(category.id, criterion.id, { weight: parseFloat(e.target.value) })}
                                                        className="w-full bg-white border border-border rounded px-3 py-2 text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-5">
                                                    <label className="block text-xs font-medium text-text-secondary mb-1">Description / Guide</label>
                                                    <textarea
                                                        value={criterion.scoringGuide}
                                                        onChange={(e) => updateCriterion(category.id, criterion.id, { scoringGuide: e.target.value })}
                                                        className="w-full bg-white border border-border rounded px-3 py-2 text-sm h-20 resize-none"
                                                    />
                                                </div>
                                                <div className="col-span-1 flex justify-end pt-6">
                                                    <button
                                                        onClick={() => deleteCriterion(category.id, criterion.id)}
                                                        className="text-text-tertiary hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addCriterion(category.id)}
                                        className="w-full py-2 border-2 border-dashed border-border rounded-lg text-text-secondary hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Criterion
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={addCategory}
                        className="w-full py-4 bg-surface border border-border rounded-xl text-text-secondary hover:text-primary hover:shadow-md transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CriteriaEditor;
