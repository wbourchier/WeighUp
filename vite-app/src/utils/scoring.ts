import { Heart, Star, DollarSign, Wrench, Cog, AlertTriangle, TrendingUp } from 'lucide-react';

// Main category weights
export const categoryWeights: Record<string, number> = {
    patientImpact: 0.25,
    strategicAlignment: 0.20,
    financialBenefits: 0.20,
    technicalHealth: 0.15,
    operationalEfficiency: 0.20,
    implementationComplexity: 1.0,
    risks: 0.5,
    assumptions: 0.5
};

// Sub-category weights within each main category
export const subWeights: Record<string, Record<string, number>> = {
    patientImpact: {
        directClinicalOutcomes: 0.3,
        patientExperienceImprovement: 0.25,
        populationReach: 0.25,
        userResponseTimeImprovement: 0.2
    },
    strategicAlignment: {
        organisationStrategyAlignment: 0.35,
        innovationCapabilityDevelopment: 0.3,
        dataStrategyInsights: 0.2,
        internalPartnerExperience: 0.15
    },
    financialBenefits: {
        directRevenueGeneration: 0.5,
        costSavingsAvoidance: 0.5,
        hardwareOneOffServices: -0.33,
        ongoingTechCosts: -0.33,
        personnelCosts: -0.33
    },
    technicalHealth: {
        maintenanceBurdenReduction: 0.5,
        systemsSimplification: 0.25,
        technicalFoundationAdaptability: 0.25,
        technicalStandardsCompliance: 0
    },
    operationalEfficiency: {
        staffTimeSaved: 0.35,
        errorReduction: 0.3,
        automation: 0.35
    },
    risks: {
        technicalDebtImpact: 0.1,
        systemIntegrationComplexity: 0.1,
        dataMigrationComplexity: 0.1,
        teamFamiliarity: 0.15,
        timelineRisk: 0.1,
        organisationalCoordinationRisk: 0.1,
        performanceImplications: 0.1,
        complianceRisk: 0.1,
        resourceAvailabilityRisk: 0.15
    },
    assumptions: {
        businessMaturityDiscoveryRequirements: 0.25,
        technologyMaturityResearchRequirements: 0.25,
        likelihoodRealisingPredictedImpact: 0.4,
        strategicClarity: 0.1
    }
};

export const calculateCategoryScore = (categoryScores: Record<string, number>, categoryKey: string) => {
    const weights = subWeights[categoryKey];
    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(categoryScores).forEach(([subKey, score]) => {
        const weight = weights[subKey];
        if (weight !== 0) {
            totalScore += score * Math.abs(weight);
            totalWeight += Math.abs(weight);
        }
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0;
};

export const calculateWeightedScore = (scores: any) => {
    // Calculate positive impact categories
    const patientScore = calculateCategoryScore(scores.patientImpact, 'patientImpact');
    const strategicScore = calculateCategoryScore(scores.strategicAlignment, 'strategicAlignment');
    const operationalScore = calculateCategoryScore(scores.operationalEfficiency, 'operationalEfficiency');
    const technicalScore = calculateCategoryScore(scores.technicalHealth, 'technicalHealth');

    // Calculate financial benefits (including negative costs)
    let financialScore = 0;
    financialScore += scores.financialBenefits.directRevenueGeneration * subWeights.financialBenefits.directRevenueGeneration;
    financialScore += scores.financialBenefits.costSavingsAvoidance * subWeights.financialBenefits.costSavingsAvoidance;
    financialScore -= scores.financialBenefits.hardwareOneOffServices * Math.abs(subWeights.financialBenefits.hardwareOneOffServices);
    financialScore -= scores.financialBenefits.ongoingTechCosts * Math.abs(subWeights.financialBenefits.ongoingTechCosts);
    financialScore -= scores.financialBenefits.personnelCosts * Math.abs(subWeights.financialBenefits.personnelCosts);
    financialScore = Math.max(0, financialScore);

    // Calculate effort (implementation complexity + risks + assumptions - all inverted)
    const complexityScore = scores.implementationComplexity.engineeringTimeEffort;
    const risksScore = calculateCategoryScore(scores.risks, 'risks');
    const assumptionsScore = calculateCategoryScore(scores.assumptions, 'assumptions');

    const effortScore = (complexityScore * categoryWeights.implementationComplexity +
        risksScore * categoryWeights.risks +
        assumptionsScore * categoryWeights.assumptions) /
        (categoryWeights.implementationComplexity + categoryWeights.risks + categoryWeights.assumptions);

    // Final weighted calculation
    const impactScore = (
        patientScore * categoryWeights.patientImpact +
        strategicScore * categoryWeights.strategicAlignment +
        financialScore * categoryWeights.financialBenefits +
        technicalScore * categoryWeights.technicalHealth +
        operationalScore * categoryWeights.operationalEfficiency
    );

    // Invert effort (lower effort = higher score)
    const invertedEffortScore = (6 - effortScore);

    // Combine impact and effort (70% impact, 30% effort)
    return (impactScore * 0.7 + invertedEffortScore * 0.3) * 20;
};

export const getTopContributors = (scores: any) => {
    // Calculate all individual criterion contributions to the final score
    const contributors: any[] = [];

    // Patient Impact contributions
    Object.entries(scores.patientImpact).forEach(([key, value]: [string, any]) => {
        const weight = subWeights.patientImpact[key] * categoryWeights.patientImpact * 0.7; // 70% for impact
        const displayName = {
            directClinicalOutcomes: 'Direct Clinical Outcomes',
            patientExperienceImprovement: 'Patient Experience Improvement',
            populationReach: 'Population Reach',
            userResponseTimeImprovement: 'User Response Time Improvement'
        }[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

        contributors.push({
            name: displayName,
            category: 'Patient Impact',
            value: value,
            weight: weight,
            contribution: value * weight * 20,
            icon: Heart,
            color: 'text-red-500'
        });
    });

    // Strategic Alignment contributions  
    Object.entries(scores.strategicAlignment).forEach(([key, value]: [string, any]) => {
        const weight = subWeights.strategicAlignment[key] * categoryWeights.strategicAlignment * 0.7;
        const displayName = {
            organisationStrategyAlignment: 'Organisation Strategy Alignment',
            innovationCapabilityDevelopment: 'Innovation Capability Development',
            dataStrategyInsights: 'Data Strategy Insights',
            internalPartnerExperience: 'Internal Partner Experience'
        }[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

        contributors.push({
            name: displayName,
            category: 'Strategic',
            value: value,
            weight: weight,
            contribution: value * weight * 20,
            icon: Star,
            color: 'text-purple-500'
        });
    });

    // Financial Benefits contributions
    Object.entries(scores.financialBenefits).forEach(([key, value]: [string, any]) => {
        const weight = Math.abs(subWeights.financialBenefits[key]) * categoryWeights.financialBenefits * 0.7;
        const isNegative = subWeights.financialBenefits[key] < 0;
        const effectiveValue = isNegative ? (6 - value) : value; // Invert costs
        const displayName = {
            directRevenueGeneration: 'Direct Revenue Generation',
            costSavingsAvoidance: 'Cost Savings Avoidance',
            hardwareOneOffServices: 'Hardware One Off Services',
            ongoingTechCosts: 'Ongoing Tech Costs',
            personnelCosts: 'Personnel Costs'
        }[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

        contributors.push({
            name: displayName,
            category: 'Financial',
            value: effectiveValue,
            weight: weight,
            contribution: effectiveValue * weight * 20,
            icon: DollarSign,
            color: 'text-green-500'
        });
    });

    // Technical Health contributions
    Object.entries(scores.technicalHealth).forEach(([key, value]: [string, any]) => {
        const weight = subWeights.technicalHealth[key] * categoryWeights.technicalHealth * 0.7;
        if (weight > 0) { // Skip zero weights
            const displayName = {
                maintenanceBurdenReduction: 'Maintenance Burden Reduction',
                systemsSimplification: 'Systems Simplification',
                technicalFoundationAdaptability: 'Technical Foundation Adaptability',
                technicalStandardsCompliance: 'Technical Standards Compliance'
            }[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

            contributors.push({
                name: displayName,
                category: 'Technical',
                value: value,
                weight: weight,
                contribution: value * weight * 20,
                icon: Wrench,
                color: 'text-blue-500'
            });
        }
    });

    // Operational Efficiency contributions
    Object.entries(scores.operationalEfficiency).forEach(([key, value]: [string, any]) => {
        const weight = subWeights.operationalEfficiency[key] * categoryWeights.operationalEfficiency * 0.7;
        const displayName = {
            staffTimeSaved: 'Staff Time Saved',
            errorReduction: 'Error Reduction',
            automation: 'Automation'
        }[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

        contributors.push({
            name: displayName,
            category: 'Operational',
            value: value,
            weight: weight,
            contribution: value * weight * 20,
            icon: Cog,
            color: 'text-indigo-500'
        });
    });

    // Implementation Complexity (inverted - lower complexity contributes more to score)
    const complexityWeight = categoryWeights.implementationComplexity * 0.3 /
        (categoryWeights.implementationComplexity + categoryWeights.risks + categoryWeights.assumptions);
    contributors.push({
        name: 'Engineering Time Effort',
        category: 'Effort',
        value: 6 - scores.implementationComplexity.engineeringTimeEffort,
        weight: complexityWeight,
        contribution: (6 - scores.implementationComplexity.engineeringTimeEffort) * complexityWeight * 20,
        icon: AlertTriangle,
        color: 'text-orange-500'
    });

    // Individual Risk factors
    Object.entries(scores.risks).forEach(([key, value]: [string, any]) => {
        const weight = subWeights.risks[key] * categoryWeights.risks * 0.3 /
            (categoryWeights.implementationComplexity + categoryWeights.risks + categoryWeights.assumptions);
        const displayName = {
            technicalDebtImpact: 'Technical Debt Impact',
            systemIntegrationComplexity: 'System Integration Complexity',
            dataMigrationComplexity: 'Data Migration Complexity',
            teamFamiliarity: 'Team Familiarity',
            timelineRisk: 'Timeline Risk',
            organisationalCoordinationRisk: 'Organisational Coordination Risk',
            performanceImplications: 'Performance Implications',
            complianceRisk: 'Compliance Risk',
            resourceAvailabilityRisk: 'Resource Availability Risk'
        }[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

        contributors.push({
            name: displayName,
            category: 'Risk',
            value: 6 - value, // Invert risk (lower risk = higher contribution)
            weight: weight,
            contribution: (6 - value) * weight * 20,
            icon: AlertTriangle,
            color: 'text-red-600'
        });
    });

    // Individual Assumption factors
    Object.entries(scores.assumptions).forEach(([key, value]: [string, any]) => {
        const weight = subWeights.assumptions[key] * categoryWeights.assumptions * 0.3 /
            (categoryWeights.implementationComplexity + categoryWeights.risks + categoryWeights.assumptions);
        const displayName = {
            businessMaturityDiscoveryRequirements: 'Business Maturity Discovery Requirements',
            technologyMaturityResearchRequirements: 'Technology Maturity Research Requirements',
            likelihoodRealisingPredictedImpact: 'Likelihood Realising Predicted Impact',
            strategicClarity: 'Strategic Clarity'
        }[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

        contributors.push({
            name: displayName,
            category: 'Assumptions',
            value: 6 - value, // Invert assumptions (lower uncertainty = higher contribution)
            weight: weight,
            contribution: (6 - value) * weight * 20,
            icon: TrendingUp,
            color: 'text-yellow-600'
        });
    });

    // Sort by contribution and return top 3
    return contributors
        .sort((a, b) => b.contribution - a.contribution)
        .slice(0, 3);
};

export const getConfidenceColor = (confidence: number) => {
    if (confidence >= 4) return 'bg-success';
    if (confidence >= 3) return 'bg-warning';
    return 'bg-danger';
};
