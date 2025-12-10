import React from 'react';
import { Edit3, Heart, Star, DollarSign, Wrench, Cog, Zap, AlertTriangle, TrendingUp } from 'lucide-react';
import { calculateWeightedScore, calculateCategoryScore, categoryWeights, subWeights } from '../utils/scoring';
import CategorySection from './CategorySection';

interface ProjectCardProps {
    project: any;
    selectedProject: number | null;
    setSelectedProject: (id: number | null) => void;
    expandedSections: any;
    toggleSection: (sectionKey: string) => void;
    criteriaDefinitions: any;
    updateScore: (projectId: number, category: string, dimension: string, value: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    selectedProject,
    setSelectedProject,
    expandedSections,
    toggleSection,
    criteriaDefinitions,
    updateScore
}) => {
    const weightedScore = calculateWeightedScore(project.scores);
    const isSelected = selectedProject === project.id;

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
                        <CategorySection
                            title="Patient/Donor/Supporter Impact"
                            categoryKey="patientImpact"
                            project={project}
                            icon={Heart}
                            color="text-red-500"
                            isExpanded={expandedSections[`${project.id}-patientImpact`]}
                            onToggle={() => toggleSection(`${project.id}-patientImpact`)}
                            criteriaDefinitions={criteriaDefinitions}
                            categoryWeights={categoryWeights}
                            subWeights={subWeights}
                            updateScore={updateScore}
                        />

                        <CategorySection
                            title="Strategic Alignment & Business Value"
                            categoryKey="strategicAlignment"
                            project={project}
                            icon={Star}
                            color="text-purple-500"
                            isExpanded={expandedSections[`${project.id}-strategicAlignment`]}
                            onToggle={() => toggleSection(`${project.id}-strategicAlignment`)}
                            criteriaDefinitions={criteriaDefinitions}
                            categoryWeights={categoryWeights}
                            subWeights={subWeights}
                            updateScore={updateScore}
                        />

                        <CategorySection
                            title="Financial Benefits"
                            categoryKey="financialBenefits"
                            project={project}
                            icon={DollarSign}
                            color="text-green-500"
                            isExpanded={expandedSections[`${project.id}-financialBenefits`]}
                            onToggle={() => toggleSection(`${project.id}-financialBenefits`)}
                            criteriaDefinitions={criteriaDefinitions}
                            categoryWeights={categoryWeights}
                            subWeights={subWeights}
                            updateScore={updateScore}
                        />

                        <CategorySection
                            title="Technical Health"
                            categoryKey="technicalHealth"
                            project={project}
                            icon={Wrench}
                            color="text-blue-500"
                            isExpanded={expandedSections[`${project.id}-technicalHealth`]}
                            onToggle={() => toggleSection(`${project.id}-technicalHealth`)}
                            criteriaDefinitions={criteriaDefinitions}
                            categoryWeights={categoryWeights}
                            subWeights={subWeights}
                            updateScore={updateScore}
                        />

                        <CategorySection
                            title="Operational Efficiency"
                            categoryKey="operationalEfficiency"
                            project={project}
                            icon={Cog}
                            color="text-indigo-500"
                            isExpanded={expandedSections[`${project.id}-operationalEfficiency`]}
                            onToggle={() => toggleSection(`${project.id}-operationalEfficiency`)}
                            criteriaDefinitions={criteriaDefinitions}
                            categoryWeights={categoryWeights}
                            subWeights={subWeights}
                            updateScore={updateScore}
                        />

                        <div className="border-t border-border pt-6 mt-6">
                            <h4 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Effort Factors
                            </h4>

                            <div className="space-y-4">
                                <CategorySection
                                    title="Implementation Complexity"
                                    categoryKey="implementationComplexity"
                                    project={project}
                                    icon={AlertTriangle}
                                    color="text-orange-500"
                                    isExpanded={expandedSections[`${project.id}-implementationComplexity`]}
                                    onToggle={() => toggleSection(`${project.id}-implementationComplexity`)}
                                    criteriaDefinitions={criteriaDefinitions}
                                    categoryWeights={categoryWeights}
                                    subWeights={subWeights}
                                    updateScore={updateScore}
                                />

                                <CategorySection
                                    title="Risks"
                                    categoryKey="risks"
                                    project={project}
                                    icon={AlertTriangle}
                                    color="text-red-600"
                                    isExpanded={expandedSections[`${project.id}-risks`]}
                                    onToggle={() => toggleSection(`${project.id}-risks`)}
                                    criteriaDefinitions={criteriaDefinitions}
                                    categoryWeights={categoryWeights}
                                    subWeights={subWeights}
                                    updateScore={updateScore}
                                />

                                <CategorySection
                                    title="Assumptions & Confidence"
                                    categoryKey="assumptions"
                                    project={project}
                                    icon={TrendingUp}
                                    color="text-yellow-600"
                                    isExpanded={expandedSections[`${project.id}-assumptions`]}
                                    onToggle={() => toggleSection(`${project.id}-assumptions`)}
                                    criteriaDefinitions={criteriaDefinitions}
                                    categoryWeights={categoryWeights}
                                    subWeights={subWeights}
                                    updateScore={updateScore}
                                />
                            </div>
                        </div>

                        <div className="bg-surface/50 rounded-lg p-4 mt-6 border border-border">
                            <div className="text-sm font-medium text-text-secondary mb-3">Score Breakdown</div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Patient Impact:</span>
                                    <span className="font-medium">{calculateCategoryScore(project.scores.patientImpact, 'patientImpact').toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Strategic:</span>
                                    <span className="font-medium">{calculateCategoryScore(project.scores.strategicAlignment, 'strategicAlignment').toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Financial:</span>
                                    <span className="font-medium">{(() => {
                                        let financialScore = 0;
                                        financialScore += project.scores.financialBenefits.directRevenueGeneration * subWeights.financialBenefits.directRevenueGeneration;
                                        financialScore += project.scores.financialBenefits.costSavingsAvoidance * subWeights.financialBenefits.costSavingsAvoidance;
                                        financialScore -= project.scores.financialBenefits.hardwareOneOffServices * Math.abs(subWeights.financialBenefits.hardwareOneOffServices);
                                        financialScore -= project.scores.financialBenefits.ongoingTechCosts * Math.abs(subWeights.financialBenefits.ongoingTechCosts);
                                        financialScore -= project.scores.financialBenefits.personnelCosts * Math.abs(subWeights.financialBenefits.personnelCosts);
                                        return Math.max(0, financialScore).toFixed(1);
                                    })()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Technical:</span>
                                    <span className="font-medium">{calculateCategoryScore(project.scores.technicalHealth, 'technicalHealth').toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Operational:</span>
                                    <span className="font-medium">{calculateCategoryScore(project.scores.operationalEfficiency, 'operationalEfficiency').toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Effort:</span>
                                    <span className="font-medium">{(() => {
                                        const complexityScore = project.scores.implementationComplexity.engineeringTimeEffort;
                                        const risksScore = calculateCategoryScore(project.scores.risks, 'risks');
                                        const assumptionsScore = calculateCategoryScore(project.scores.assumptions, 'assumptions');
                                        return ((complexityScore * categoryWeights.implementationComplexity +
                                            risksScore * categoryWeights.risks +
                                            assumptionsScore * categoryWeights.assumptions) /
                                            (categoryWeights.implementationComplexity + categoryWeights.risks + categoryWeights.assumptions)).toFixed(1);
                                    })()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
