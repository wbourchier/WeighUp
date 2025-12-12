import React, { useState, useEffect } from 'react';
import { Plus, LayoutGrid, List, Settings } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import MatrixView from './components/MatrixView';
import { ConfigProvider, useConfig } from './contexts/ConfigContext';
import ConfigEditor from './components/ConfigEditor/ConfigEditor';
import CriteriaEditor from './pages/CriteriaEditor';
import type { CriteriaSchema } from './types/criteria';

const WeighUpApp = () => {
  const { activeConfig, updateConfig } = useConfig();
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isCriteriaEditorOpen, setIsCriteriaEditorOpen] = useState(false);

  // Initialize projects with flat scores based on criteria IDs
  // In a real app, we'd migrate existing data. Here we'll just reset or try to map if possible.
  // For simplicity, let's start with empty projects or a default one that matches the schema.
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    // Initialize a default project if none exist, using the active criteria
    if (projects.length === 0 && activeConfig.criteria) {
      const initialScores: Record<number, number> = {};
      activeConfig.criteria.criteriaCategories.forEach(cat => {
        cat.criteria.forEach(crit => {
          initialScores[crit.id] = 0; // Default score
        });
      });

      setProjects([
        {
          id: 1,
          name: `Example ${activeConfig.branding.itemName}`,
          description: "Example description",
          scores: initialScores,
          screeningAnswers: {},
          confidence: 3
        }
      ]);
    }
  }, [activeConfig.criteria, projects.length]);

  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [view, setView] = useState<'scoring' | 'matrix'>('scoring');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const updateScore = (projectId: number, criterionId: number, value: number) => {
    setProjects(projects.map(project =>
      project.id === projectId
        ? {
          ...project,
          scores: {
            ...project.scores,
            [criterionId]: value
          }
        }
        : project
    ));
  };

  const updateScreeningAnswer = (projectId: number, questionId: number, value: string) => {
    setProjects(projects.map(project =>
      project.id === projectId
        ? {
          ...project,
          screeningAnswers: {
            ...project.screeningAnswers,
            [questionId]: value
          }
        }
        : project
    ));
  };

  const addNewProject = () => {
    const newId = Math.max(0, ...projects.map(p => p.id)) + 1;
    const initialScores: Record<number, number> = {};
    activeConfig.criteria.criteriaCategories.forEach(cat => {
      cat.criteria.forEach(crit => {
        initialScores[crit.id] = 0;
      });
    });

    const newProject = {
      id: newId,
      name: `New ${activeConfig.branding.itemName} ${newId}`,
      description: `New ${activeConfig.branding.itemName} description`,
      scores: initialScores,
      screeningAnswers: {},
      confidence: 3
    };
    setProjects([...projects, newProject]);
    setSelectedProject(newId);
  };

  if (isCriteriaEditorOpen) {
    return (
      <CriteriaEditor
        onBack={() => setIsCriteriaEditorOpen(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-text-primary p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">{activeConfig.branding.appName}</h1>
            <p className="text-text-secondary mt-1">{activeConfig.branding.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
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

            <button
              onClick={() => setIsCriteriaEditorOpen(true)}
              className="px-4 py-2 rounded-lg border border-border bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
            >
              Edit Criteria
            </button>

            <button
              onClick={() => setIsConfigOpen(true)}
              className="p-3 rounded-lg border border-border bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {view === 'scoring' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{activeConfig.branding.itemNamePlural}</h2>
                <button
                  onClick={addNewProject}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  <Plus className="w-4 h-4" />
                  New {activeConfig.branding.itemName}
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
                    criteriaDefinitions={activeConfig.criteria}
                    updateScore={updateScore}
                    updateScreeningAnswer={updateScreeningAnswer}
                  />
                ))}
              </div>
            </div>
          ) : (
            <MatrixView projects={projects} criteriaDefinitions={activeConfig.criteria} />
          )}
        </main>
      </div>

      <ConfigEditor isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
    </div>
  );
};

const App = () => (
  <ConfigProvider>
    <WeighUpApp />
  </ConfigProvider>
);

export default App;
