import React from 'react';
import { Edit3, Heart, Star, DollarSign, Wrench, Cog, Zap, AlertTriangle, TrendingUp, HelpCircle } from 'lucide-react';
import CategorySection from './CategorySection';
import ScreeningQuestions from './ScreeningQuestions';
import type { CriteriaSchema } from '../types/criteria';

interface ProjectCardProps {
    project: any;
    selectedProject: number | null;
    setSelectedProject: (id: number | null) => void;
    expandedSections: any;
    toggleSection: (sectionKey: string) => void;
    criteriaDefinitions: CriteriaSchema;
    updateScore: (projectId: number, criterionId: number, value: number) => void;
    updateScreeningAnswer?: (projectId: number, questionId: number, value: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    selectedProject,
    setSelectedProject,
    expandedSections,
    toggleSection,
    criteriaDefinitions,
    updateScore,
    updateScreeningAnswer
}) => {
    const isSelected = selectedProject === project.id;

    // Calculate weighted score dynamically
    const calculateTotalScore = () => {
        let totalScore = 0;
        let totalWeight = 0;

        criteriaDefinitions.criteriaCategories.forEach(category => {
            category.criteria.forEach(criterion => {
                const score = project.scores[criterion.id] || 0;
                totalScore += score * criterion.weight;
                totalWeight += criterion.weight;
            });
        });

        // Normalize or just return weighted sum? 
        // Existing app seemed to normalize. 
        // If totalWeight is around 5 (sum of category weights * 5?), let's just return raw weighted sum for now
        // or average weighted score.
        // Let's stick to a simple sum for now, or maybe normalized to 100?
        // The previous app had specific logic. Let's try to keep it simple: Sum(Score * Weight)
        return totalScore;
    };

    const weightedScore = calculateTotalScore();

    // Helper to get icon for category (could be dynamic or mapped)
    const getCategoryIcon = (categoryName: string) => {
        if (categoryName.includes("Patient")) return Heart;
        if (categoryName.includes("Strategic")) return Star;
        if (categoryName.includes("Financial")) return DollarSign;
        if (categoryName.includes("Technical")) return Wrench;
        if (categoryName.includes("Operational")) return Cog;
        if (categoryName.includes("Risk")) return AlertTriangle;
        if (categoryName.includes("Assumption")) return TrendingUp;
        return HelpCircle;
    };

    const getCategoryColor = (categoryName: string) => {
        if (categoryName.includes("Patient")) return "text-red-500";
        if (categoryName.includes("Strategic")) return "text-purple-500";
        if (categoryName.includes("Financial")) return "text-green-500";
        if (categoryName.includes("Technical")) return "text-blue-500";
        if (categoryName.includes("Operational")) return "text-indigo-500";
        if (categoryName.includes("Risk")) return "text-red-600";
        if (categoryName.includes("Assumption")) return "text-yellow-600";
        return "text-gray-500";
    };

    return (
        <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border ${isSelected ? 'border-primary ring-1 ring-primary' : 'border-border'
            }`}>
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-text-primary mb-1">{project.name}</h3>
                        <p className="text-text-secondary text-sm">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1 rounded-full text-primary-foreground text-sm font-bold bg-primary">
                            {Math.round(weightedScore)}
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(isSelected ? null : project.id);
                            }}
                            className="p-2 hover:bg-surface rounded-lg transition-colors text-text-secondary hover:text-text-primary"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {isSelected && (
                    <div className="space-y-4 animate-in slide-in-from-top-2 duration-300 pt-4 border-t border-border">

                        {/* Screening Questions */}
                        {criteriaDefinitions.screeningQuestions && criteriaDefinitions.screeningQuestions.length > 0 && (
                            <ScreeningQuestions
                                questions={criteriaDefinitions.screeningQuestions}
                                answers={project.screeningAnswers || {}}
                                onAnswerChange={(qId, val) => updateScreeningAnswer && updateScreeningAnswer(project.id, qId, val)}
                            />
                        )}

                        {/* Dynamic Categories */}
                        {criteriaDefinitions.criteriaCategories.map(category => (
                            <CategorySection
                                key={category.id}
                                category={category}
                                scores={project.scores}
                                icon={getCategoryIcon(category.name)}
                                color={getCategoryColor(category.name)}
                                isExpanded={expandedSections[`${project.id}-${category.id}`]}
                                onToggle={() => toggleSection(`${project.id}-${category.id}`)}
                                updateScore={(criterionId, value) => updateScore(project.id, criterionId, value)}
                            />
                        ))}

                        {/* Score Breakdown Summary */}
                        <div className="bg-surface/50 rounded-lg p-4 mt-6 border border-border">
                            <div className="text-sm font-medium text-text-secondary mb-3">Score Breakdown</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {criteriaDefinitions.criteriaCategories.map(category => {
                                    const categoryScore = category.criteria.reduce((sum, c) => {
                                        return sum + ((project.scores[c.id] || 0) * c.weight);
                                    }, 0);

                                    return (
                                        <div key={category.id} className="flex justify-between">
                                            <span className="text-text-secondary truncate pr-2" title={category.name}>{category.name}:</span>
                                            <span className="font-medium">{categoryScore.toFixed(1)}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
