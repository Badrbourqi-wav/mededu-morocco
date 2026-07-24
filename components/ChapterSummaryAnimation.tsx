import React from 'react';

interface ChapterSummaryAnimationProps {
  keyPoints: string[];
  disciplineTag: string;
}

const getDisciplineColor = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('cardio')) return 'text-red-600 bg-red-100 border-red-200';
  if (t.includes('pneumo') || t.includes('pulmonaire')) return 'text-blue-600 bg-blue-100 border-blue-200';
  if (t.includes('neuro')) return 'text-purple-600 bg-purple-100 border-purple-200';
  if (t.includes('hemato') || t.includes('hématologie')) return 'text-red-800 bg-red-100 border-red-200';
  if (t.includes('endocrino')) return 'text-teal-600 bg-teal-100 border-teal-200';
  if (t.includes('anatomie')) return 'text-cyan-600 bg-cyan-100 border-cyan-200';
  if (t.includes('pharmaco')) return 'text-green-600 bg-green-100 border-green-200';
  if (t.includes('gastro')) return 'text-amber-600 bg-amber-100 border-amber-200';
  return 'text-slate-600 bg-slate-100 border-slate-200';
};

export const ChapterSummaryAnimation: React.FC<ChapterSummaryAnimationProps> = ({ keyPoints, disciplineTag }) => {
  const themeClass = getDisciplineColor(disciplineTag);

  const animations = `
    @keyframes slideInFade {
      0% { opacity: 0; transform: translateX(-30px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .animate-slide-in {
      opacity: 0;
      animation: slideInFade 0.6s ease-out forwards;
    }
  `;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <style>{animations}</style>
      <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Chapitre Résumé</h3>
      <div className="space-y-4">
        {keyPoints.slice(0, 5).map((point, index) => (
          <div 
            key={index} 
            className="flex items-start animate-slide-in p-4 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow"
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold mr-4 ${themeClass}`}>
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed pt-1">
              <span className="font-semibold text-teal-600">{point}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
