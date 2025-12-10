import React, { useState, useEffect } from 'react';
import { BarChart3, Target, Zap, TrendingUp, Eye, Star, Heart, DollarSign, Cog, Wrench, AlertTriangle, Server, Users, Clock, ChevronDown, ChevronRight, Info, Database, Lightbulb, Building, UserCheck, Plus, Minus, Edit3 } from 'lucide-react';

const PrioritizationFramework = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "AN-1: Virology",
      description: "Virology system implementation",
      scores: { 
        patientImpact: {
          directClinicalOutcomes: 3,
          patientExperienceImprovement: 2,
          populationReach: 3,
          userResponseTimeImprovement: 2
        },
        strategicAlignment: {
          organisationStrategyAlignment: 3,
          innovationCapabilityDevelopment: 4,
          dataStrategyInsights: 3,
          internalPartnerExperience: 2
        },
        financialBenefits: {
          directRevenueGeneration: 2,
          costSavingsAvoidance: 3,
          hardwareOneOffServices: 2,
          ongoingTechCosts: 2,
          personnelCosts: 3
        },
        technicalHealth: {
          maintenanceBurdenReduction: 3,
          systemsSimplification: 2,
          technicalFoundationAdaptability: 3,
          technicalStandardsCompliance: 3
        },
        operationalEfficiency: {
          staffTimeSaved: 3,
          errorReduction: 4,
          automation: 3
        },
        implementationComplexity: {
          engineeringTimeEffort: 4
        },
        risks: {
          technicalDebtImpact: 3,
          systemIntegrationComplexity: 4,
          dataMigrationComplexity: 2,
          teamFamiliarity: 3,
          timelineRisk: 4,
          organisationalCoordinationRisk: 3,
          performanceImplications: 2,
          complianceRisk: 2,
          resourceAvailabilityRisk: 4
        },
        assumptions: {
          businessMaturityDiscoveryRequirements: 3,
          technologyMaturityResearchRequirements: 2,
          likelihoodRealisingPredictedImpact: 3,
          strategicClarity: 3
        }
      },
      confidence: 3,
      confidence: 3
    },
    {
      id: 2,
      name: "AN-2: Xledger Automated POs", 
      description: "Automated purchase order system integration",
      scores: { 
        patientImpact: {
          directClinicalOutcomes: 1,
          patientExperienceImprovement: 1,
          populationReach: 1,
          userResponseTimeImprovement: 2
        },
        strategicAlignment: {
          organisationStrategyAlignment: 2,
          innovationCapabilityDevelopment: 2,
          dataStrategyInsights: 2,
          internalPartnerExperience: 4
        },
        financialBenefits: {
          directRevenueGeneration: 1,
          costSavingsAvoidance: 4,
          hardwareOneOffServices: 1,
          ongoingTechCosts: 2,
          personnelCosts: 1
        },
        technicalHealth: {
          maintenanceBurdenReduction: 3,
          systemsSimplification: 4,
          technicalFoundationAdaptability: 3,
          technicalStandardsCompliance: 3
        },
        operationalEfficiency: {
          staffTimeSaved: 5,
          errorReduction: 4,
          automation: 5
        },
        implementationComplexity: {
          engineeringTimeEffort: 2
        },
        risks: {
          technicalDebtImpact: 2,
          systemIntegrationComplexity: 3,
          dataMigrationComplexity: 1,
          teamFamiliarity: 2,
          timelineRisk: 2,
          organisationalCoordinationRisk: 2,
          performanceImplications: 1,
          complianceRisk: 1,
          resourceAvailabilityRisk: 2
        },
        assumptions: {
          businessMaturityDiscoveryRequirements: 4,
          technologyMaturityResearchRequirements: 2,
          likelihoodRealisingPredictedImpact: 4,
          strategicClarity: 3
        }
      },
      confidence: 4
    },
    {
      id: 3,
      name: "AN-3: HLA Data Capture",
      description: "HLA typing data capture system",
      scores: { 
        patientImpact: {
          directClinicalOutcomes: 4,
          patientExperienceImprovement: 3,
          populationReach: 4,
          userResponseTimeImprovement: 3
        },
        strategicAlignment: {
          organisationStrategyAlignment: 3,
          innovationCapabilityDevelopment: 3,
          dataStrategyInsights: 4,
          internalPartnerExperience: 2
        },
        financialBenefits: {
          directRevenueGeneration: 2,
          costSavingsAvoidance: 2,
          hardwareOneOffServices: 2,
          ongoingTechCosts: 2,
          personnelCosts: 2
        },
        technicalHealth: {
          maintenanceBurdenReduction: 2,
          systemsSimplification: 2,
          technicalFoundationAdaptability: 3,
          technicalStandardsCompliance: 3
        },
        operationalEfficiency: {
          staffTimeSaved: 3,
          errorReduction: 4,
          automation: 3
        },
        implementationComplexity: {
          engineeringTimeEffort: 3
        },
        risks: {
          technicalDebtImpact: 3,
          systemIntegrationComplexity: 4,
          dataMigrationComplexity: 4,
          teamFamiliarity: 3,
          timelineRisk: 3,
          organisationalCoordinationRisk: 3,
          performanceImplications: 2,
          complianceRisk: 3,
          resourceAvailabilityRisk: 3
        },
        assumptions: {
          businessMaturityDiscoveryRequirements: 2,
          technologyMaturityResearchRequirements: 3,
          likelihoodRealisingPredictedImpact: 2,
          strategicClarity: 3
        }
      },
      confidence: 2
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [view, setView] = useState('scoring');
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedCriteria, setExpandedCriteria] = useState({});

  // Main category weights
  const categoryWeights = {
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
  const subWeights = {
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

  // Complete criteria definitions from Excel spreadsheet
  const criteriaDefinitions = {
    patientImpact: {
      directClinicalOutcomes: {
        description: "Measurable improvements in patient survival, treatment success, complication rates, matching accuracy, and/or treatment safety",
        examples: [
          "1-2: Minor lab accuracy improvements, small reductions in processing errors",
          "3: Improved HLA matching resolution, moderate GvHD reduction, faster urgent matching", 
          "4-5: Major survival rate improvements, breakthrough matching accuracy, significant complication reduction"
        ],
        doNotConsider: "This criterion measures only the direct clinical outcomes. Do not include second order effects such as: Cost savings, staff time savings, operational efficiency, patient experience, partner workflows, reputation benefits, research opportunities, population size affected",
        scoringGuide: {
          "0": "No measurable clinical impact",
          "1": "Minimal improvement (expected <1% improvement in clinical metrics in 5 years)",
          "2": "Small but meaningful improvement (expected 2-3% in clinical metrics in 5 years)",
          "3": "Moderate improvement (4-5% in key metrics or clear multi-area gains in 5 years)",
          "4": "Significant improvement (5-8% in survival/safety or major quality gains in 5 years)",
          "5": "Transformative impact (Over 8% improvement in critical outcomes in 5 years)"
        },
        comments: "Speak with Ana (insight manager)"
      },
      patientExperienceImprovement: {
        description: "How the initiative enhances the experience for patients, donors, and external supporters (volunteers, fundraisers, awareness campaigners)",
        examples: [
          "Patients: Clearer transplant information and timelines, streamlined access to grants and support services, better coordination between Anthony Nolan and hospital teams, enhanced emotional support resources",
          "Donors: Simplified registration process, improved communication during donation journey, better post-donation follow-up and impact updates, streamlined medical coordination",
          "Supporters: Enhanced volunteer scheduling and training systems, improved fundraising tools and resources, streamlined partnership processes, better recognition and impact communication"
        ],
        doNotConsider: "This measures only the improvement in experience. Do not include second order effects such as: Strategic alignment from improved supporter engagement, Cost savings from reduced support calls, Staff time savings from fewer queries, Operational efficiency from streamlined supporter processes, Internal colleague experience (captured separately), Research/data collection opportunities from better engagement",
        scoringGuide: {
          "0": "No experience improvement for external users",
          "1": "Minor improvement in specific touchpoints (single process simplification, basic information updates)",
          "2": "Modest improvements across few areas (better communication in 2-3 touchpoints)",
          "3": "Noticeable improvement across several touchpoints (enhanced resources, streamlined processes, better communication systems)",
          "4": "Major improvements across most touchpoints (comprehensive experience redesign for specific user groups)",
          "5": "Transformative improvement to overall journey (end-to-end experience transformation across multiple user types)"
        }
      },
      populationReach: {
        description: "Estimated percentage of patients, donors, and supporters who will benefit from this initiative over the next 5 years",
        examples: [
          "Patients: Core matching improvements affecting all searches, rare tissue type solutions, new treatment pathways",
          "Donors: Registration process improvements for all new donors, communication enhancements for active donors, expanded donor eligibility criteria",
          "Supporters: Portal affecting some/all volunteers, fundraising platform improvements, enhanced corporate partnership tools"
        ],
        doNotConsider: "Clinical impact intensity (captured in Direct Clinical Outcomes), experience quality improvements (captured in Experience criterion), internal staff affected, operational efficiency gains, cost implications",
        scoringGuide: {
          "0": "No users affected or very limited impact (<1%)",
          "1": "Small subset (1-5% of relevant user population over 5 years)",
          "2": "Modest reach (5-10% of relevant user population over 5 years)",
          "3": "Moderate reach (10-20% of relevant user population or 100% of specific high-need groups like rare tissue types)",
          "4": "High reach (20-40% of relevant user population over 5 years)",
          "5": "Very high reach (>40% of relevant user population or improvements to core services affecting virtually everyone)"
        },
        note: "5-year window used because many improvements only affect new users joining the register/services, so current percentages would underestimate true impact as populations grow and turn over.",
        comments: "There is a dashboard (shared by Will) - (thoughput? Tim) -> Discuss with Alice - needs to align with impact measurements & reach"
      },
      userResponseTimeImprovement: {
        description: "How much the initiative reduces waiting and response times for patients, donors, and supporters (particularly for urgent/time-critical processes)",
        examples: [
          "Patients: Faster donor search results delivery, quicker support service responses, reduced waiting for grant decisions, immediate access to information and updates",
          "Donors: Faster registration confirmation, quicker communication about donation process, reduced coordination delays, streamlined medical scheduling",
          "Supporters: Improved event coordination timelines, faster feedback and recognition, quicker volunteer scheduling, enhanced communication response times"
        ],
        doNotConsider: "Do not consider: Internal processing efficiency (captured in Operational Efficiency), staff time savings, system performance improvements, laboratory workflow optimizations, maintenance time reductions",
        scoringGuide: {
          "0": "No improvement in response times",
          "1": "Minimal reduction (<3%) in user-facing response times",
          "2": "Small but meaningful reduction (3-8%) in standard processes",
          "3": "Moderate reduction (8-15%) in key processes or significant improvement in urgent/critical pathways",
          "4": "Major reduction (16-25%) in standard processes or substantial improvement in critical timelines",
          "5": "Transformative improvement (>25%) or elimination of major user-facing delays"
        }
      }
    },
    strategicAlignment: {
      organisationStrategyAlignment: {
        description: "Captures strategic value through alignment not measured elsewhere, with multiplier effect for projects spanning multiple strategic elements",
        examples: [
          "Equity-specific initiatives",
          "Multi-enabler strategic projects", 
          "Strategic positioning",
          "Donor recruitment/retention strategies",
          "Evidence-based influencing capabilities",
          "Cross-strategic-aim initiatives"
        ],
        doNotConsider: "Innovation/new capabilities (covered in Innovation & Capability Development), Data quality improvements (covered in Data Strategy & Insights), User experience enhancements (covered in Internal/Partner Experience), Direct patient outcomes (covered in Patient Impact), Operational efficiencies, Technical improvements, Cost savings",
        scoringGuide: {
          "0": "No strategic alignment",
          "1": "Minimal support for one strategic element with limited value (Example: Minor donor database update, basic research process improvement)",
          "2": "Moderate support for one strategic element OR minimal cross-element impact (Example: Targeted equity initiative for specific patient group, focused evidence-based influencing project)",
          "3": "Strong support for one strategic element OR moderate multi-element strategic impact (Example: Significant donor recruitment strategy for underrepresented communities, comprehensive evidence-based influencing platform)",
          "4": "Strong multi-element strategic impact / transformative single-element positioning (Example: Equity initiative that enhances donor recruitment AND research capabilities, strategic partnership enabling multiple treatment developments)",
          "5": "Transformative multi-element strategic impact with unique organisational positioning (Example: Platform enabling equity improvements, donor expansion, AND evidence-based influencing simultaneously)"
        },
        note: "Assessment considers breadth (spanning multiple elements), uniqueness (strategic value not captured elsewhere), and strategic positioning (strengthening Anthony Nolan's role)",
        comments: "Only the data/insight enabler is affected. Better data integrity for Pos, audit trails, status management, insight from better workflow management tools in coral"
      },
      innovationCapabilityDevelopment: {
        description: "Evaluates how the initiative creates new capabilities or innovative approaches that expand our capacity to deliver on ANs mission through clinical, technological, or service advancements",
        examples: [
          "Technology platforms enabling future innovations",
          "Rapid prototyping systems",
          "Research infrastructure development",
          "Clinical trial capabilities",
          "AI/ML experimentation platforms",
          "Data science tools",
          "Laboratory technology development"
        ],
        doNotConsider: "This criterion measures capacity to innovate. Do capture whether an initiative is innovative in itself (eg if a new API has innovative features that help us reduce technical debt but does not help us innovate, it should not be here). Do not consider future revenue potential from new capabilities, cost savings from improved methods, staff productivity gains",
        scoringGuide: {
          "1": "Minor enhancement to existing capabilities or processes",
          "3": "Significant new capabilities or innovative approaches (Example: New clinical or research capabilities supporting patient outcomes, Substantive automation or technological innovation within existing processes)",
          "5": "Transformative innovation with substantial impact (Example: Breakthrough treatment approaches or research capabilities, Innovative use of AI/ML transforming clinical or operational decision-making, Transformative processes that significantly expand organisational capacity)"
        },
        note: "Assessment prioritises innovation potential (future innovation enablement), then capability impact (expansion of what we can do), then novelty (how new/innovative this is)"
      },
      dataStrategyInsights: {
        description: "Evaluates how initiatives enhance data capabilities and analytical insights to enable better decision-making across strategic and operational activities",
        examples: [
          "Data collection improvements",
          "New data sources",
          "Data quality/integration enhancements",
          "Analytics and reporting capabilities",
          "AI/ML tools for generating insights",
          "Decision-support systems",
          "Data visualisation platforms"
        ],
        doNotConsider: "Patient outcome improvements (covered in Patient Impact), Operational efficiency gains (covered in Operational Efficiency), Innovation enabling capabilities (covered in Innovation & Capability Development), Strategic positioning (covered in Strategic Alignment), Cost savings from better decisions, Revenue generation from insights, Staff time savings",
        scoringGuide: {
          "0": "No impact on data capabilities or insights",
          "1": "Minor data quality improvements or basic reporting enhancements (Example: Small database cleanup, simple report automation)",
          "2": "Moderate data improvements OR limited analytical capabilities (Example: Data integration project, basic dashboard implementation)",
          "3": "Significant data quality/integration improvements OR substantial analytical capabilities (Example: Comprehensive data warehouse, advanced analytics platform, real-time decision-support system)",
          "4": "Major data infrastructure OR advanced insight generation capabilities (Example: Enterprise data platform with AI/ML insights, comprehensive business intelligence system)",
          "5": "Transformative data capabilities enabling organisation-wide data-informed decision-making (Example: Revolutionary data platform transforming how decisions are made across all functions, breakthrough analytical capabilities)"
        },
        note: "Assessment focuses on data capability enhancement and decision-making improvement across both strategic and operational contexts",
        comments: "'Data Strategy & Insights' might be confused with Org's data strategy -> needs clearer title"
      },
      internalPartnerExperience: {
        description: "Evaluates how initiatives enhance experience quality for internal colleagues and external partners (transplant centres, hospitals, international registries, WMDA)",
        examples: [
          "UI improvements: Partner portals, internal system interfaces, dashboard enhancements, form simplification",
          "Non-UI improvements: Communication protocols with partners, staff onboarding processes, collaboration workflows, partner coordination processes, information sharing mechanisms"
        ],
        doNotConsider: "Patient/donor/volunteer experience improvements, Time/effort savings for our team, Strategic partnership development, Data quality improvements, Process automation benefits",
        scoringGuide: {
          "0": "No experience improvement",
          "1": "Minor improvements to specific touchpoints (Example: Small UI enhancement to one system, simplified partner form)",
          "2": "Moderate improvements across few areas (Example: Better partner portal interface, improved internal communication process)",
          "3": "Noticeable improvements across several touchpoints (Example: Comprehensive partner onboarding experience, enhanced staff collaboration tools)",
          "4": "Major improvements across most touchpoints (Example: Transformed partner interaction experience, comprehensive internal workflow improvements)",
          "5": "Transformative improvement to overall journey/experience (Example: Revolutionary partner collaboration platform, completely reimagined internal user experience)"
        },
        note: "Assessment focuses on experience quality and smoothness rather than efficiency metrics or scope"
      }
    },
    financialBenefits: {
      directRevenueGeneration: {
        description: "New or increased income streams",
        examples: [
          "New service offerings",
          "Increased capacity for existing services", 
          "Improved service quality leading to higher fees"
        ],
        doNotConsider: "Over 5 year period. Score the most likely outcome, avoiding both pessimistic and optimistic extremes. Do not consider expenditure or savings, just income generation",
        scoringGuide: {
          "0": "None",
          "1": "Minimal revenue increase (<1%)",
          "2": "1-2%",
          "3": "Moderate revenue increase (2-4%) from existing or new services",
          "4": "4-7%, or creation of significant new income streams",
          "5": "Significant revenue increase (>7%) or creation of major new income streams"
        },
        comments: "Share with Alice - finance team has been doing work on this"
      },
      costSavingsAvoidance: {
        description: "Operational cost savings and future cost prevention",
        examples: [
          "Infrastructure cost reductions",
          "Licence savings",
          "Reduced external contractor costs"
        ],
        doNotConsider: "Over 5 year period. Score the most likely outcome, avoiding both pessimistic and optimistic extremes. Do not consider Staff time savings (unless direct cost reduction like redundancies), patient impact improvements, process automation benefits, optimistic best-case scenarios (score realistic expectations, not potential maximum savings but likely achievable savings)",
        scoringGuide: {
          "0": "None",
          "1": "Minimal cost savings (<1%) of yearly operational cost",
          "2": "1-2%",
          "3": "Moderate savings (2-4%) of yearly operational cost",
          "4": "4-7%",
          "5": "Significant revenue increase (>7%) of yearly operational cost"
        }
      }
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 4) return 'bg-green-500';
    if (confidence >= 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const toggleCriteria = (criteriaKey) => {
    setExpandedCriteria(prev => ({
      ...prev,
      [criteriaKey]: !prev[criteriaKey]
    }));
  };

  const calculateCategoryScore = (categoryScores, categoryKey) => {
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

  const calculateWeightedScore = (scores) => {
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

  const getTopContributors = (scores) => {
    // Calculate all individual criterion contributions to the final score
    const contributors = [];

    // Patient Impact contributions
    Object.entries(scores.patientImpact).forEach(([key, value]) => {
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
    Object.entries(scores.strategicAlignment).forEach(([key, value]) => {
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
    Object.entries(scores.financialBenefits).forEach(([key, value]) => {
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
    Object.entries(scores.technicalHealth).forEach(([key, value]) => {
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
    Object.entries(scores.operationalEfficiency).forEach(([key, value]) => {
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
    Object.entries(scores.risks).forEach(([key, value]) => {
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
    Object.entries(scores.assumptions).forEach(([key, value]) => {
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

  const updateScore = (projectId, category, dimension, value) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            scores: { 
              ...project.scores, 
              [category]: { ...project.scores[category], [dimension]: value }
            }
          }
        : project
    ));
  };

  const ScoreSlider = ({ label, value, onChange, icon: Icon, color, weight, criteriaData, categoryKey, criteriaKey }) => {
    const criteriaFullKey = `${categoryKey}-${criteriaKey}`;
    const isExpanded = expandedCriteria[criteriaFullKey];
    
    return (
      <div className="space-y-3 border rounded-lg p-4 bg-gray-50">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="font-medium text-gray-700 text-sm flex-1">{label}</span>
          <span className="text-xs text-gray-500">({Math.round(weight * 100)}%)</span>
          {criteriaData && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleCriteria(criteriaFullKey);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
            value >= 4 ? 'bg-green-100 text-green-700' :
            value >= 3 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {value}
          </span>
        </div>
        
        {isExpanded && criteriaData && (
          <div className="text-xs text-gray-600 space-y-3 border-t pt-3">
            {criteriaData.description && (
              <div>
                <strong className="text-gray-800">Description:</strong>
                <p className="mt-1">{criteriaData.description}</p>
              </div>
            )}
            
            {criteriaData.examples && (
              <div>
                <strong className="text-gray-800">Examples:</strong>
                <ul className="mt-1 ml-4 list-disc space-y-1">
                  {criteriaData.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {criteriaData.doNotConsider && (
              <div>
                <strong className="text-red-600">Do NOT Consider:</strong>
                <p className="mt-1">{criteriaData.doNotConsider}</p>
              </div>
            )}
            
            {criteriaData.scoringGuide && (
              <div>
                <strong className="text-blue-600">Scoring Guide:</strong>
                <ul className="mt-1 ml-4 list-disc space-y-1">
                  {Object.entries(criteriaData.scoringGuide).map(([score, description]) => (
                    <li key={score}><strong>{score}:</strong> {description}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {criteriaData.note && (
              <div>
                <strong className="text-blue-600">Note:</strong>
                <p className="mt-1">{criteriaData.note}</p>
              </div>
            )}
            
            {criteriaData.comments && (
              <div>
                <strong className="text-purple-600">Comments:</strong>
                <p className="mt-1">{criteriaData.comments}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max="5"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider ${color.replace('text-', 'slider-')}`}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
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

  const CategorySection = ({ title, categoryKey, project, icon: Icon, color, isExpanded, onToggle }) => {
    const categoryData = criteriaDefinitions[categoryKey];
    
    return (
      <div className="border rounded-lg bg-white">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${color}`} />
            <h4 className={`font-semibold ${color.replace('text-', 'text-')} text-lg`}>
              {title}
            </h4>
            <span className="text-sm text-gray-500">
              ({Math.round(categoryWeights[categoryKey] * 100)}% weight)
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
        
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
            {Object.entries(project.scores[categoryKey]).map(([subKey, value]) => {
              const subData = categoryData?.[subKey];
              return (
                <ScoreSlider
                  key={subKey}
                  label={subKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  value={value}
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

  const ProjectCard = ({ project }) => {
    const weightedScore = calculateWeightedScore(project.scores);
    const isSelected = selectedProject === project.id;

    return (
      <div className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 ${
        isSelected ? 'border-blue-500 shadow-xl' : 'border-transparent'
      }`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{project.name}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-full text-white text-sm font-bold bg-blue-500">
                {Math.round(weightedScore)}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(isSelected ? null : project.id);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {isSelected && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
              <CategorySection
                title="Patient/Donor/Supporter Impact"
                categoryKey="patientImpact"
                project={project}
                icon={Heart}
                color="text-red-500"
                isExpanded={expandedSections[`${project.id}-patientImpact`]}
                onToggle={() => toggleSection(`${project.id}-patientImpact`)}
              />
              
              <CategorySection
                title="Strategic Alignment & Business Value"
                categoryKey="strategicAlignment"
                project={project}
                icon={Star}
                color="text-purple-500"
                isExpanded={expandedSections[`${project.id}-strategicAlignment`]}
                onToggle={() => toggleSection(`${project.id}-strategicAlignment`)}
              />
              
              <CategorySection
                title="Financial Benefits"
                categoryKey="financialBenefits"
                project={project}
                icon={DollarSign}
                color="text-green-500"
                isExpanded={expandedSections[`${project.id}-financialBenefits`]}
                onToggle={() => toggleSection(`${project.id}-financialBenefits`)}
              />
              
              <CategorySection
                title="Technical Health"
                categoryKey="technicalHealth"
                project={project}
                icon={Wrench}
                color="text-blue-500"
                isExpanded={expandedSections[`${project.id}-technicalHealth`]}
                onToggle={() => toggleSection(`${project.id}-technicalHealth`)}
              />
              
              <CategorySection
                title="Operational Efficiency"
                categoryKey="operationalEfficiency"
                project={project}
                icon={Cog}
                color="text-indigo-500"
                isExpanded={expandedSections[`${project.id}-operationalEfficiency`]}
                onToggle={() => toggleSection(`${project.id}-operationalEfficiency`)}
              />
              
              <div className="border-t pt-4">
                <h4 className="font-semibold text-orange-600 mb-4 flex items-center gap-2">
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
                  />
                  
                  <CategorySection
                    title="Risks"
                    categoryKey="risks"
                    project={project}
                    icon={AlertTriangle}
                    color="text-red-600"
                    isExpanded={expandedSections[`${project.id}-risks`]}
                    onToggle={() => toggleSection(`${project.id}-risks`)}
                  />
                  
                  <CategorySection
                    title="Assumptions & Confidence"
                    categoryKey="assumptions"
                    project={project}
                    icon={TrendingUp}
                    color="text-yellow-600"
                    isExpanded={expandedSections[`${project.id}-assumptions`]}
                    onToggle={() => toggleSection(`${project.id}-assumptions`)}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="text-sm text-gray-600 mb-2">Score Breakdown:</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-red-500">Patient Impact:</span> {calculateCategoryScore(project.scores.patientImpact, 'patientImpact').toFixed(1)}
                  </div>
                  <div>
                    <span className="text-purple-500">Strategic:</span> {calculateCategoryScore(project.scores.strategicAlignment, 'strategicAlignment').toFixed(1)}
                  </div>
                  <div>
                    <span className="text-green-500">Financial:</span> {(() => {
                      let financialScore = 0;
                      financialScore += project.scores.financialBenefits.directRevenueGeneration * subWeights.financialBenefits.directRevenueGeneration;
                      financialScore += project.scores.financialBenefits.costSavingsAvoidance * subWeights.financialBenefits.costSavingsAvoidance;
                      financialScore -= project.scores.financialBenefits.hardwareOneOffServices * Math.abs(subWeights.financialBenefits.hardwareOneOffServices);
                      financialScore -= project.scores.financialBenefits.ongoingTechCosts * Math.abs(subWeights.financialBenefits.ongoingTechCosts);
                      financialScore -= project.scores.financialBenefits.personnelCosts * Math.abs(subWeights.financialBenefits.personnelCosts);
                      return Math.max(0, financialScore).toFixed(1);
                    })()}
                  </div>
                  <div>
                    <span className="text-blue-500">Technical:</span> {calculateCategoryScore(project.scores.technicalHealth, 'technicalHealth').toFixed(1)}
                  </div>
                  <div>
                    <span className="text-indigo-500">Operational:</span> {calculateCategoryScore(project.scores.operationalEfficiency, 'operationalEfficiency').toFixed(1)}
                  </div>
                  <div>
                    <span className="text-orange-500">Effort:</span> {(() => {
                      const complexityScore = project.scores.implementationComplexity.engineeringTimeEffort;
                      const risksScore = calculateCategoryScore(project.scores.risks, 'risks');
                      const assumptionsScore = calculateCategoryScore(project.scores.assumptions, 'assumptions');
                      return ((complexityScore * categoryWeights.implementationComplexity + 
                               risksScore * categoryWeights.risks + 
                               assumptionsScore * categoryWeights.assumptions) / 
                              (categoryWeights.implementationComplexity + categoryWeights.risks + categoryWeights.assumptions)).toFixed(1);
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const MatrixView = () => {
    const maxImpact = 5;
    const maxEffort = 5;

    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          Initiative Prioritisation Matrix
        </h2>
        
        <div className="relative" style={{ height: '500px', width: '100%' }}>
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[1, 2, 3, 4, 5].map(i => (
              <g key={i}>
                <line 
                  x1={`${(i/5) * 80 + 10}%`} 
                  y1="10%" 
                  x2={`${(i/5) * 80 + 10}%`} 
                  y2="85%" 
                  stroke="#e5e7eb" 
                  strokeWidth="1"
                />
                <line 
                  x1="10%" 
                  y1={`${90 - (i/5) * 75}%`} 
                  x2="90%" 
                  y2={`${90 - (i/5) * 75}%`} 
                  stroke="#e5e7eb" 
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
              stroke="#6b7280" 
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line 
              x1="10%" 
              y1="47.5%" 
              x2="90%" 
              y2="47.5%" 
              stroke="#6b7280" 
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>

          {/* Quadrant backgrounds */}
          <div className="absolute top-[10%] left-[10%] w-[40%] h-[37.5%] bg-green-50 rounded-lg opacity-30"></div>
          <div className="absolute top-[10%] right-[10%] w-[40%] h-[37.5%] bg-blue-50 rounded-lg opacity-30"></div>
          <div className="absolute bottom-[15%] left-[10%] w-[40%] h-[37.5%] bg-yellow-50 rounded-lg opacity-30"></div>
          <div className="absolute bottom-[15%] right-[10%] w-[40%] h-[37.5%] bg-red-50 rounded-lg opacity-30"></div>

          {/* Quadrant labels */}
          <div className="absolute top-4 left-16 text-lg font-bold text-green-700">Easy Wins</div>
          <div className="absolute top-4 right-16 text-lg font-bold text-blue-700">Big Bets</div>
          <div className="absolute bottom-20 left-16 text-lg font-bold text-yellow-700">Incremental</div>
          <div className="absolute bottom-20 right-16 text-lg font-bold text-red-700">Money Pit</div>

          {/* Axis labels */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
            Effort →
          </div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700">
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
            
            return (
              <div
                key={project.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getConfidenceColor(project.confidence)} rounded-full text-white text-xs font-bold flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}
                style={{ 
                  left: `${x}%`, 
                  top: `${y}%`,
                  width: '40px',
                  height: '40px'
                }}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {project.name.split(':')[0]}
              </div>
            );
          })}

          {/* Hover tooltip */}
          {hoveredProject && (
            <div
              className="absolute bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg text-sm z-10 pointer-events-none max-w-xs"
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
              <div className="font-bold mb-2">{hoveredProject.name}</div>
              <div className="text-xs mb-3">
                <div className="mb-1">Overall Score: <span className="font-bold">{Math.round(calculateWeightedScore(hoveredProject.scores))}</span></div>
              </div>
              <div className="text-xs">
                <div className="text-gray-300 mb-2 font-medium">Top Contributors:</div>
                {getTopContributors(hoveredProject.scores).map((contributor, index) => {
                  const IconComponent = contributor.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 mb-1">
                      <IconComponent className="w-3 h-3" />
                      <span className="flex-1">{contributor.name}</span>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const addProject = () => {
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    const newProject = {
      id: newId,
      name: `AN-${newId}: New Project`,
      description: "Enter project description",
      scores: {
        patientImpact: {
          directClinicalOutcomes: 3,
          patientExperienceImprovement: 3,
          populationReach: 3,
          userResponseTimeImprovement: 3
        },
        strategicAlignment: {
          organisationStrategyAlignment: 3,
          innovationCapabilityDevelopment: 3,
          dataStrategyInsights: 3,
          internalPartnerExperience: 3
        },
        financialBenefits: {
          directRevenueGeneration: 3,
          costSavingsAvoidance: 3,
          hardwareOneOffServices: 3,
          ongoingTechCosts: 3,
          personnelCosts: 3
        },
        technicalHealth: {
          maintenanceBurdenReduction: 3,
          systemsSimplification: 3,
          technicalFoundationAdaptability: 3,
          technicalStandardsCompliance: 3
        },
        operationalEfficiency: {
          staffTimeSaved: 3,
          errorReduction: 3,
          automation: 3
        },
        implementationComplexity: {
          engineeringTimeEffort: 3
        },
        risks: {
          technicalDebtImpact: 3,
          systemIntegrationComplexity: 3,
          dataMigrationComplexity: 3,
          teamFamiliarity: 3,
          timelineRisk: 3,
          organisationalCoordinationRisk: 3,
          performanceImplications: 3,
          complianceRisk: 3,
          resourceAvailabilityRisk: 3
        },
        assumptions: {
          businessMaturityDiscoveryRequirements: 3,
          technologyMaturityResearchRequirements: 3,
          likelihoodRealisingPredictedImpact: 3,
          strategicClarity: 3
        }
      }
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    if (selectedProject === projectId) {
      setSelectedProject(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Anthony Nolan Product Prioritization Framework
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive scoring system based on patient impact, strategic alignment, and implementation factors
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setView('scoring')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                view === 'scoring' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Scoring
            </button>
            <button
              onClick={() => setView('matrix')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                view === 'matrix' 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Matrix View
            </button>
          </div>
        </div>

        {view === 'scoring' ? (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={addProject}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Project
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1 mb-8">
              {projects
                .sort((a, b) => calculateWeightedScore(b.scores) - calculateWeightedScore(a.scores))
                .map(project => (
                  <div key={project.id} className="relative">
                    <button
                      onClick={() => removeProject(project.id)}
                      className="absolute top-2 right-2 z-10 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <ProjectCard project={project} />
                  </div>
                ))}
            </div>
          </>
        ) : (
          <MatrixView />
        )}
      </div>

      <style jsx>{`
        .slider {
          background: linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%);
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #374151;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 2px solid #374151;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        @keyframes slide-in-from-top-2 {
          from {
            transform: translateY(-8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation: slide-in-from-top-2 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PrioritizationFramework;