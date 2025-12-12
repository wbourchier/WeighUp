import React from 'react';
import { HelpCircle, AlertCircle } from 'lucide-react';
import type { ScreeningQuestion } from '../types/criteria';

interface ScreeningQuestionsProps {
    questions: ScreeningQuestion[];
    answers: Record<number, string>;
    onAnswerChange: (questionId: number, value: string) => void;
}

const ScreeningQuestions: React.FC<ScreeningQuestionsProps> = ({
    questions,
    answers,
    onAnswerChange
}) => {
    if (!questions || questions.length === 0) return null;

    return (
        <div className="space-y-6 mb-8 border-b border-border pb-6">
            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent-foreground" />
                Screening Questions
            </h3>

            <div className="grid gap-6">
                {questions.map((question) => (
                    <div key={question.id} className="bg-surface/30 rounded-lg p-4 border border-border/50">
                        <div className="flex items-start justify-between mb-3">
                            <label className="text-sm font-medium text-text-primary block">
                                {question.title}
                            </label>
                            <div className="group relative">
                                <HelpCircle className="w-4 h-4 text-text-tertiary cursor-help" />
                                <div className="absolute right-0 w-64 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border border-border">
                                    {question.question}
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-text-secondary mb-3">{question.question}</p>

                        <div className="space-y-2">
                            {question.options.length > 0 ? (
                                <select
                                    value={answers[question.id] || ''}
                                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                                    className="w-full p-2 rounded-md border border-border bg-background text-text-primary text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                >
                                    <option value="">Select an option...</option>
                                    {question.options.map((option, idx) => (
                                        <option key={idx} value={option.category || option.score || idx}>
                                            {option.category || option.score} - {option.definition}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <div className="text-sm text-text-tertiary italic">
                                    No options available (Yes/No implied or text input needed?)
                                </div>
                            )}

                            {answers[question.id] && (
                                <div className="mt-2 text-xs text-text-secondary bg-surface p-2 rounded">
                                    {(() => {
                                        const selectedOption = question.options.find(
                                            (o, idx) => (o.category || o.score || idx.toString()) === answers[question.id]
                                        );
                                        return selectedOption ? (
                                            <>
                                                <span className="font-medium">Impact: </span>
                                                {selectedOption.decision_impact || selectedOption.framework_impact || selectedOption.value_score_impact || "N/A"}
                                            </>
                                        ) : null;
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScreeningQuestions;
