import Link from 'next/link';
import { Sparkles, BookOpen, Brain, Activity, Play, ChevronRight, Stethoscope } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030305] text-slate-100 font-sans selection:bg-teal-500/30">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-sm font-semibold mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Mise à jour Réforme 6 Ans — CNOM</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
            MedEdu Morocco <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-500">
              La Plateforme Médicale N°1 au Maroc 🇲🇦
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            La plateforme d'apprentissage médicale la plus complète du Maroc. Cours S1-S12, Atlas Anatomique 3D WebGL, Annales des 6 Facultés de Médecine et IA FLAKKAI multilingue.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/auth/login" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-teal-500 text-slate-950 font-bold text-lg hover:bg-teal-400 transition-colors flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-current" />
              Commencer Gratuitement
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-white font-bold text-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
              Explorer le Dashboard
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="relative z-20 border-y border-slate-800 bg-slate-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Semestres Couverts', value: '12' },
              { label: 'Facultés Marocaines', value: '6' },
              { label: 'QCMs Interactifs', value: '200+' },
              { label: 'IA Multilingue', value: 'FLAKKAI' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center">
                <div className="text-4xl font-extrabold text-white mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-teal-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Un écosystème complet pour réussir</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Tout ce dont vous avez besoin pour exceller dans vos études médicales, réuni sur une seule plateforme intelligente.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Activity className="w-8 h-8 text-teal-400" />,
                title: 'Atlas 3D WebGL',
                description: 'Explorez l\'anatomie humaine avec notre moteur 3D interactif. Zoomez, pivotez et isolez des structures avec une précision clinique.'
              },
              {
                icon: <BookOpen className="w-8 h-8 text-cyan-400" />,
                title: 'Annales Authentiques',
                description: 'Accédez aux annales corrigées des 6 facultés de médecine du Maroc (FMPR, FMPC, FMPF, FMPM, FMPO, FMPT).'
              },
              {
                icon: <Brain className="w-8 h-8 text-purple-400" />,
                title: 'IA FLAKKAI',
                description: 'Votre assistant médical personnel multilingue (Darija, Français, Arabe, Anglais) disponible 24/7 pour répondre à vos questions.'
              },
              {
                icon: <Stethoscope className="w-8 h-8 text-rose-400" />,
                title: 'Simulation Clinique',
                description: 'Exercez-vous avec nos cas cliniques interactifs et notre jeu d\'arcade médical pour développer vos réflexes d\'urgence.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center text-white mb-20">Approuvé par les étudiants</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Youssef B.',
                role: 'Externe FMPC',
                text: 'L\'atlas 3D et les QCMs m\'ont sauvé pour mes partiels d\'anatomie. La meilleure plateforme médicale au Maroc, sans hésiter.'
              },
              {
                name: 'Sara M.',
                role: 'Interne FMPR',
                text: 'FLAKKAI est incroyable pour m\'expliquer des concepts complexes en français et en darija. Un gain de temps monumental.'
              },
              {
                name: 'Amine K.',
                role: 'Étudiant FMPM',
                text: 'Les annales classées par faculté et par module sont exactement ce dont on avait besoin pour préparer le PFE sereinement.'
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 relative">
                <div className="text-4xl text-teal-500/20 absolute top-6 right-6 font-serif">"</div>
                <p className="text-slate-300 mb-8 relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-slate-900 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-sm text-teal-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-500/10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8">Prêt à transformer vos études ?</h2>
          <p className="text-xl text-slate-300 mb-10">Rejoignez des milliers d'étudiants en médecine marocains sur MedEdu Morocco.</p>
          <Link href="/auth/login" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-white text-teal-900 font-bold text-lg hover:bg-slate-100 transition-colors gap-2">
            Créer un compte gratuit
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-[#020203]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-teal-500" />
            <span className="text-xl font-bold text-white">MedEdu Morocco</span>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-teal-400 transition-colors">Mentions Légales</Link>
            <Link href="#" className="hover:text-teal-400 transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-teal-400 transition-colors">Contact</Link>
          </div>
          
          <div className="text-sm text-slate-500">
            © 2024 MedEdu Morocco. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
