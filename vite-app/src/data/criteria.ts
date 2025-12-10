export const criteriaDefinitions: any = {
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
                "4": "4-7%",
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
