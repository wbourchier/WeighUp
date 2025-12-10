import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ScoreSlider from './ScoreSlider';

interface CategorySectionProps {
    title: string;
    categoryKey: string;
    project: any;
    icon: React.ElementType;
    color: string; // Legacy prop, used for icon color
    isExpanded: boolean;
    onToggle: () => void;
    criteriaDefinitions: any;
    categoryWeights: any;
    subWeights: any;
    updateScore: (projectId: number, category: string, dimension: string, value: number) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
    title,
    categoryKey,
    project,
    icon: Icon,
    color,
    isExpanded,
    onToggle,
    criteriaDefinitions,
    categoryWeights,
    subWeights,
    updateScore
}) => {
    const categoryData = criteriaDefinitions[categoryKey];

    return (
        <div className="border border-border rounded-xl bg-white overflow-hidden transition-all duration-200 hover:border-gray-300">
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-surface border border-border ${color}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-text-primary text-base">
                            {title}
                        </h4>
                        <span className="text-xs text-text-tertiary font-medium">
                            {Math.round(categoryWeights[categoryKey] * 100)}% weight
                        </span>
                    </div>
                </div>
                <button className="text-text-tertiary hover:text-text-primary transition-colors">
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
            </div>

            {isExpanded && (
                <div className="px-4 pb-4 space-y-4 animate-in border-t border-border pt-4 bg-surface/10">
                    {Object.entries(project.scores[categoryKey]).map(([subKey, value]) => {
                        const subData = categoryData?.[subKey];
                        return (
                            <ScoreSlider
                                key={subKey}
                                label={subKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                value={value as number}
                                onChange={(newValue) => updateScore(project.id, categoryKey, subKey, newValue)}
                                icon={Icon}
                                color={color}
                                weight={subWeights[categoryKey]?.[subKey] || 0}
                                criteriaData={subData}
                                categoryKey={categoryKey}
                                criteriaKey={subKey}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CategorySection;
