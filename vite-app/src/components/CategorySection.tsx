import React from 'react';
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';
import ScoreSlider from './ScoreSlider';
import type { CriteriaCategory } from '../types/criteria';

interface CategorySectionProps {
    category: CriteriaCategory;
    scores: Record<number, number>; // Map of criterion ID to score
    isExpanded: boolean;
    onToggle: () => void;
    updateScore: (criterionId: number, value: number) => void;
    icon?: React.ElementType; // Optional icon override
    color?: string; // Optional color override
}

const CategorySection: React.FC<CategorySectionProps> = ({
    category,
    scores,
    isExpanded,
    onToggle,
    updateScore,
    icon: Icon,
    color = "text-primary"
}) => {
    // Calculate category completion or average score for display
    const criteriaIds = category.criteria.map(c => c.id);
    const totalWeight = category.criteria.reduce((sum, c) => sum + c.weight, 0);
    const currentWeightedScore = category.criteria.reduce((sum, c) => {
        const score = scores[c.id] || 0;
        return sum + (score * c.weight);
    }, 0);

    // Normalize to 0-100% for display if weights sum to something other than 1
    const displayScore = totalWeight > 0 ? Math.round((currentWeightedScore / (totalWeight * 5)) * 100) : 0;

    return (
        <div className="border border-border rounded-xl bg-white overflow-hidden transition-all duration-200 hover:border-gray-300 mb-4">
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                }}
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-surface border border-border ${color}`}>
                        {Icon ? <Icon className="w-5 h-5" /> : <div className="w-5 h-5" />}
                    </div>
                    <div>
                        <h4 className="font-semibold text-text-primary text-base">
                            {category.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-text-tertiary font-medium">
                            <span>{category.criteria.length} criteria</span>
                            <span>•</span>
                            <span>Axis: {category.axis}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {/* Optional: Show score summary here */}
                    <button className="text-text-tertiary hover:text-text-primary transition-colors">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="px-4 pb-4 space-y-6 animate-in border-t border-border pt-4 bg-surface/10">
                    {category.criteria.map((criterion) => (
                        <div key={criterion.id} className="space-y-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-text-primary">{criterion.name}</span>
                                        {criterion.comments && (
                                            <div className="group relative">
                                                <HelpCircle className="w-3 h-3 text-text-tertiary cursor-help" />
                                                <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border border-border pointer-events-none">
                                                    {criterion.comments}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-text-secondary mt-1 whitespace-pre-wrap">{criterion.scoringGuide}</p>
                                </div>
                                <span className="text-xs font-mono bg-surface px-2 py-1 rounded border border-border text-text-secondary">
                                    Weight: {criterion.weight}
                                </span>
                            </div>

                            <ScoreSlider
                                label={criterion.name} // Not really used if we render label above
                                value={scores[criterion.id] || 0}
                                onChange={(newValue) => updateScore(criterion.id, newValue)}
                                icon={Icon}
                                color={color}
                                weight={criterion.weight}
                                criteriaData={{
                                    description: criterion.scoringGuide, // Mapping for tooltip/info
                                    examples: criterion.examples ? [criterion.examples] : [],
                                    scoringGuide: {} // We might need to parse the scoringGuide string if we want structured guide
                                }}
                                categoryKey={category.id.toString()}
                                criteriaKey={criterion.id.toString()}
                                hideLabel={true} // New prop to hide label in slider since we render it above
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategorySection;
