import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import type { CriteriaSchema } from '../types/criteria';

interface MatrixViewProps {
    projects: any[];
    criteriaDefinitions: CriteriaSchema;
}

const MatrixView: React.FC<MatrixViewProps> = ({ projects, criteriaDefinitions }) => {
    const [hoveredProject, setHoveredProject] = useState<any>(null);

    // Determine max scores for normalization
    // Assuming max score per criterion is 5
    // Max Y = Sum of max scores of all Y-axis criteria
    // Max X = Sum of max scores of all X-axis criteria

    const calculateMaxScores = () => {
        let maxY = 0;
        let maxX = 0;

        criteriaDefinitions.criteriaCategories.forEach(cat => {
            const catMaxScore = cat.criteria.reduce((sum, c) => sum + (5 * c.weight), 0);
            if (cat.axis === 'y') maxY += catMaxScore;
            else if (cat.axis === '-y') maxY += catMaxScore; // We subtract the value, but the range is still relevant
            else if (cat.axis === 'x' || cat.axis === 'w') maxX += catMaxScore;
        });

        return { maxX: maxX || 1, maxY: maxY || 1 };
    };

    const { maxX, maxY } = calculateMaxScores();

    const calculateCoordinates = (project: any) => {
        let yScore = 0;
        let xScore = 0;

        criteriaDefinitions.criteriaCategories.forEach(cat => {
            const catScore = cat.criteria.reduce((sum, c) => {
                return sum + ((project.scores[c.id] || 0) * c.weight);
            }, 0);

            if (cat.axis === 'y') yScore += catScore;
            else if (cat.axis === '-y') yScore -= catScore;
            else if (cat.axis === 'x' || cat.axis === 'w') xScore += catScore;
        });

        // Normalize to 0-100%
        // For Y, we might have negative values if costs outweigh benefits. 
        // Let's assume the chart range is 0 to MaxY (or maybe -MaxCost to MaxBenefit?)
        // The previous chart was 0-100%. 
        // Let's normalize X to 0-100% of MaxX.
        // Let's normalize Y to 0-100% of MaxY (treating -y as just reducing the positive score).
        // If Y < 0, clamp to 0? Or allow negative? The chart drawing assumes 0-100%.

        const xPercent = Math.min(100, Math.max(0, (xScore / maxX) * 100));
        const yPercent = Math.min(100, Math.max(0, (yScore / maxY) * 100)); // Simplified

        return { x: xPercent, y: yPercent, rawX: xScore, rawY: yScore };
    };

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
                    Effort / Risk →
                </div>
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-text-secondary">
                    Value / Impact →
                </div>

                {/* Project points */}
                {projects.map(project => {
                    const { x: xPercent, y: yPercent } = calculateCoordinates(project);

                    // Map percent to chart coordinates
                    // Chart area: X from 10% to 90%, Y from 85% to 10%
                    const x = (xPercent / 100) * 80 + 10;
                    const y = 90 - (yPercent / 100) * 75;

                    const initials = project.name.substring(0, 4);

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
                            left: `${(() => {
                                const { x: xPercent } = calculateCoordinates(hoveredProject);
                                return (xPercent / 100) * 80 + 10;
                            })()}%`,
                            top: `${(() => {
                                const { y: yPercent } = calculateCoordinates(hoveredProject);
                                return 90 - (yPercent / 100) * 75 - 8;
                            })()}%`,
                            transform: 'translate(-50%, -100%)'
                        }}
                    >
                        <div className="font-bold mb-2 text-lg">{hoveredProject.name}</div>
                        <div className="text-xs mb-3 text-text-secondary">
                            <div className="mb-1 flex justify-between">
                                <span>Value:</span>
                                <span className="font-bold text-text-primary">{calculateCoordinates(hoveredProject).rawY.toFixed(1)}</span>
                            </div>
                            <div className="mb-1 flex justify-between">
                                <span>Effort:</span>
                                <span className="font-bold text-text-primary">{calculateCoordinates(hoveredProject).rawX.toFixed(1)}</span>
                            </div>
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white drop-shadow-sm"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatrixView;
