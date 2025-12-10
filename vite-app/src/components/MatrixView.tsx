import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { calculateCategoryScore, calculateWeightedScore, getTopContributors, categoryWeights, getConfidenceColor } from '../utils/scoring';

interface MatrixViewProps {
    projects: any[];
}

const MatrixView: React.FC<MatrixViewProps> = ({ projects }) => {
    const [hoveredProject, setHoveredProject] = useState<any>(null);
    const maxImpact = 5;
    const maxEffort = 5;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-border p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-primary" />
                Initiative Prioritisation Matrix
            </h2>

            <div className="relative" style={{ height: '500px', width: '100%' }}>
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full">
                    {[1, 2, 3, 4, 5].map(i => (
                        <g key={i}>
                            <line
                                x1={`${(i / 5) * 80 + 10}%`}
                                y1="10%"
                                x2={`${(i / 5) * 80 + 10}%`}
                                y2="85%"
                                stroke="hsl(var(--color-border))"
                                strokeWidth="1"
                            />
                            <line
                                x1="10%"
                                y1={`${90 - (i / 5) * 75}%`}
                                x2="90%"
                                y2={`${90 - (i / 5) * 75}%`}
                                stroke="hsl(var(--color-border))"
                                strokeWidth="1"
                            />
                        </g>
                    ))}

                    {/* Quadrant divider lines - dotted */}
                    <line
                        x1="50%"
                        y1="10%"
                        x2="50%"
                        y2="85%"
                        stroke="hsl(var(--color-text-tertiary))"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                    />
                    <line
                        x1="10%"
                        y1="47.5%"
                        x2="90%"
                        y2="47.5%"
                        stroke="hsl(var(--color-text-tertiary))"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                    />
                </svg>

                {/* Quadrant backgrounds - Subtle */}
                <div className="absolute top-[10%] left-[10%] w-[40%] h-[37.5%] bg-success/5 rounded-lg"></div>
                <div className="absolute top-[10%] right-[10%] w-[40%] h-[37.5%] bg-info/5 rounded-lg"></div>
                <div className="absolute bottom-[15%] left-[10%] w-[40%] h-[37.5%] bg-warning/5 rounded-lg"></div>
                <div className="absolute bottom-[15%] right-[10%] w-[40%] h-[37.5%] bg-danger/5 rounded-lg"></div>

                {/* Quadrant labels */}
                <div className="absolute top-4 left-16 text-lg font-bold text-success">Easy Wins</div>
                <div className="absolute top-4 right-16 text-lg font-bold text-info">Big Bets</div>
                <div className="absolute bottom-20 left-16 text-lg font-bold text-warning">Incremental</div>
                <div className="absolute bottom-20 right-16 text-lg font-bold text-danger">Money Pit</div>

                {/* Axis labels */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-text-secondary">
                    Effort →
                </div>
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-text-secondary">
                    Impact →
                </div>

                {/* Project points */}
                {projects.map(project => {
                    const impactScore = (
                        calculateCategoryScore(project.scores.patientImpact, 'patientImpact') * categoryWeights.patientImpact +
                        calculateCategoryScore(project.scores.strategicAlignment, 'strategicAlignment') * categoryWeights.strategicAlignment +
                        calculateCategoryScore(project.scores.operationalEfficiency, 'operationalEfficiency') * categoryWeights.operationalEfficiency +
                        calculateCategoryScore(project.scores.technicalHealth, 'technicalHealth') * categoryWeights.technicalHealth
                    );

                    const complexityScore = project.scores.implementationComplexity.engineeringTimeEffort;
                    const risksScore = calculateCategoryScore(project.scores.risks, 'risks');
                    const assumptionsScore = calculateCategoryScore(project.scores.assumptions, 'assumptions');

                    const effortScore = (complexityScore * categoryWeights.implementationComplexity +
                        risksScore * categoryWeights.risks +
                        assumptionsScore * categoryWeights.assumptions) /
                        (categoryWeights.implementationComplexity + categoryWeights.risks + categoryWeights.assumptions);

                    const x = (effortScore / maxEffort) * 80 + 10;
                    const y = 90 - (impactScore / maxImpact) * 75;

                    const initials = project.name.split(':')[0].substring(0, 4);

                    return (
                        <div
                            key={project.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer border-2 border-white z-10
                                ${project.confidence >= 4 ? 'bg-emerald-600' : project.confidence >= 3 ? 'bg-amber-500' : 'bg-rose-500'}
                            `}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                width: '36px',
                                height: '36px'
                            }}
                            onMouseEnter={() => setHoveredProject(project)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            {initials}
                        </div>
                    );
                })}

                {/* Hover tooltip */}
                {hoveredProject && (
                    <div
                        className="absolute bg-white text-text-primary px-4 py-3 rounded-lg shadow-xl border border-border text-sm z-20 pointer-events-none max-w-xs"
                        style={{
                            left: `${((() => {
                                const complexityScore = hoveredProject.scores.implementationComplexity.engineeringTimeEffort;
                                const risksScore = calculateCategoryScore(hoveredProject.scores.risks, 'risks');
                                const assumptionsScore = calculateCategoryScore(hoveredProject.scores.assumptions, 'assumptions');
                                return (complexityScore * categoryWeights.implementationComplexity +
                                    risksScore * categoryWeights.risks +
                                    assumptionsScore * categoryWeights.assumptions) /
                                    (categoryWeights.implementationComplexity + categoryWeights.risks + categoryWeights.assumptions);
                            })() / maxEffort) * 80 + 10}%`,
                            top: `${90 - ((
                                calculateCategoryScore(hoveredProject.scores.patientImpact, 'patientImpact') * categoryWeights.patientImpact +
                                calculateCategoryScore(hoveredProject.scores.strategicAlignment, 'strategicAlignment') * categoryWeights.strategicAlignment +
                                calculateCategoryScore(hoveredProject.scores.operationalEfficiency, 'operationalEfficiency') * categoryWeights.operationalEfficiency +
                                calculateCategoryScore(hoveredProject.scores.technicalHealth, 'technicalHealth') * categoryWeights.technicalHealth
                            ) / maxImpact) * 75 - 8}%`,
                            transform: 'translate(-50%, -100%)'
                        }}
                    >
                        <div className="font-bold mb-2 text-lg">{hoveredProject.name}</div>
                        <div className="text-xs mb-3 text-text-secondary">
                            <div className="mb-1 flex justify-between"><span>Overall Score:</span> <span className="font-bold text-text-primary">{Math.round(calculateWeightedScore(hoveredProject.scores))}</span></div>
                        </div>
                        <div className="text-xs">
                            <div className="text-text-tertiary mb-2 font-medium uppercase tracking-wider text-[10px]">Top Contributors</div>
                            {getTopContributors(hoveredProject.scores).map((contributor: any, index: number) => {
                                const IconComponent = contributor.icon;
                                return (
                                    <div key={index} className="flex items-center gap-2 mb-1.5">
                                        <div className={`p-1 rounded bg-surface ${contributor.color.replace('text-', 'text-')}`}>
                                            <IconComponent className="w-3 h-3" />
                                        </div>
                                        <span className="flex-1 font-medium">{contributor.name}</span>
                                        <span className="font-bold text-text-primary">+{Math.round(contributor.contribution)}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white drop-shadow-sm"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatrixView;
