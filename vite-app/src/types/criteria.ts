export interface ScreeningOption {
    category?: string;
    score?: string;
    definition: string;
    example?: string | null;
    decision_impact?: string;
    framework_impact?: string;
    value_score_impact?: string | null;
    examples?: string;
}

export interface ScreeningQuestion {
    id: number;
    title: string;
    question: string;
    options: ScreeningOption[];
}

export interface Criterion {
    id: number;
    name: string;
    weight: number;
    examples: string;
    exclude: string;
    minScore: number | null;
    maxScore: number | null;
    scoringGuide: string;
    comments: string;
}

export interface CriteriaCategory {
    id: number;
    name: string;
    axis: string;
    criteria: Criterion[];
}

export interface CriteriaSchema {
    meta: {
        sourceFile: string;
        sheet: string;
        generatedAtUTC: string;
        updatedAtUTC: string;
        note: string;
    };
    screeningQuestions: ScreeningQuestion[];
    criteriaCategories: CriteriaCategory[];
}
