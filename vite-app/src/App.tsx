import React, { useState } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import MatrixView from './components/MatrixView';
import { criteriaDefinitions } from './data/criteria';

const App = () => {
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

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [view, setView] = useState<'scoring' | 'matrix'>('scoring');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const updateScore = (projectId: number, category: string, dimension: string, value: number) => {
    setProjects(projects.map(project =>
      project.id === projectId
        ? {
          ...project,
          scores: {
            ...project.scores,
            [category]: { ...project.scores[category as keyof typeof project.scores], [dimension]: value }
          }
        }
        : project
    ));
  };

  const addNewProject = () => {
    const newId = Math.max(...projects.map(p => p.id)) + 1;
    const newProject = {
      id: newId,
      name: `New Project ${newId}`,
      description: "New project description",
      scores: JSON.parse(JSON.stringify(projects[0].scores)), // Deep copy structure
      confidence: 3
    };
    // Reset scores to 0 or default
    // For simplicity, we'll just clone the first project's structure but maybe we should zero it out.
    // Let's keep it simple and just clone for now as per prototype behavior usually.
    setProjects([...projects, newProject]);
    setSelectedProject(newId);
  };

  return (
    <div className="min-h-screen bg-background text-text-primary p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">WeighUp</h1>
            <p className="text-text-secondary mt-1">Strategic Prioritization Framework</p>
          </div>

          <div className="flex items-center gap-3 bg-surface p-1 rounded-lg border border-border">
            <button
              onClick={() => setView('scoring')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${view === 'scoring'
                  ? 'bg-white text-text-primary shadow-sm font-medium'
                  : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              <List className="w-4 h-4" />
              Scoring
            </button>
            <button
              onClick={() => setView('matrix')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${view === 'matrix'
                  ? 'bg-white text-text-primary shadow-sm font-medium'
                  : 'text-text-secondary hover:text-text-primary'
                }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Matrix
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {view === 'scoring' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Projects</h2>
                <button
                  onClick={addNewProject}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                    criteriaDefinitions={criteriaDefinitions}
                    updateScore={updateScore}
                  />
                ))}
              </div>
            </div>
          ) : (
            <MatrixView projects={projects} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
