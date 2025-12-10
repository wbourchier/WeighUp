import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ScoreSliderProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    icon: React.ElementType;
    color: string;
    weight: number;
    criteriaData?: any;
    categoryKey: string;
    criteriaKey: string;
}

const ScoreSlider: React.FC<ScoreSliderProps> = ({
    label,
    value,
    onChange,
    icon: Icon,
    color,
    weight,
    criteriaData
}) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const onToggle = () => setIsExpanded(!isExpanded);

    const getScoreColor = (score: number) => {
        if (score >= 4) return 'text-success bg-success/10';
        if (score >= 3) return 'text-warning bg-warning/10';
        return 'text-danger bg-danger/10';
    };

    return (
        <div className="space-y-3 border border-border rounded-lg p-4 bg-surface/30 hover:bg-surface/50 transition-colors">
            <div className="flex items-center gap-3">
                {/* Icon - Minimal style */}
                <div className={`p-1.5 rounded-md bg-white border border-border text-text-secondary`}>
                    <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-medium text-text-primary text-sm truncate">{label}</span>
                        <span className="text-xs text-text-tertiary">({Math.round(weight * 100)}%)</span>
                    </div>
                </div>

                {/* Info Toggle */}
                {criteriaData && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                        className="text-text-tertiary hover:text-text-primary transition-colors p-1"
                    >
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                )}

                {/* Score Badge */}
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getScoreColor(value)}`}>
                    {value}
                </span>
            </div>

            {/* Expanded Details */}
            {isExpanded && criteriaData && (
                <div className="text-xs text-text-secondary space-y-3 border-t border-border pt-3 pl-1">
                    {criteriaData.description && (
                        <div>
                            <strong className="text-text-primary block mb-1">Description</strong>
                            <p className="leading-relaxed">{criteriaData.description}</p>
                        </div>
                    )}

                    {criteriaData.examples && (
                        <div>
                            <strong className="text-text-primary block mb-1">Examples</strong>
                            <ul className="list-disc pl-4 space-y-1 text-text-tertiary">
                                {criteriaData.examples.map((example: string, index: number) => (
                                    <li key={index}>{example}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {criteriaData.doNotConsider && (
                        <div className="bg-surface p-2 rounded border border-border">
                            <strong className="text-text-primary block mb-1 text-[10px] uppercase tracking-wider">Do Not Consider</strong>
                            <p className="leading-relaxed">{criteriaData.doNotConsider}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Slider Control */}
            <div className="pt-1">
                <input
                    type="range"
                    min="0"
                    max="5"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="slider"
                />
                <div className="flex justify-between text-[10px] text-text-tertiary mt-1.5 font-medium px-1">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>
        </div>
    );
};

export default ScoreSlider;
