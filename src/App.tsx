import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Bot, Code, GraduationCap, TrendingUp, Briefcase, Mail, Phone, Linkedin, Instagram, ChevronDown, Menu, X } from 'lucide-react';

// Componente para efeito de digitação (Typewriter)
const Typewriter = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentText = texts[index];
      setText(isDeleting ? currentText.substring(0, text.length - 1) : currentText.substring(0, text.length + 1));
      if (!isDeleting && text === currentText) setTimeout(() => setIsDeleting(true), 2000);
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex((index + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, texts]);

  return <span className="text-[#4A9EFF]">{text}<span className="animate-pulse">|</span></span>;
};

// Componente de Contador (Count-up)
const Counter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(entry.target);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center p-6 bg-[#16161E] rounded-2xl border border-white/10">
      <h3 className="text-4xl font-display text-[#FFB800]">{count}+</h3>
      <p className="text-sm text-gray-400 mt-2">{label}</p>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 backdrop-blur-md bg-[#0A0A0F]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-display text-[#4A9EFF]">RAY SOUZA</h1>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['Sobre', 'Trajetória', 'Skills', 'Projetos', 'Contato'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#FFB800] transition">{item}</a>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://i.ibb.co/G4WGGZGs/Generated-Image-March-14-2026-9-02-AM.png")',
          }}
        >
          <div className="absolute inset-0 bg-[#0A0A0F]/40 backdrop-blur-[1px]"></div>
        </div>

        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1 rounded-full bg-[#FFB800]/10 text-[#FFB800] text-xs font-bold mb-6 inline-block">🔥 +15 ANOS EM TECNOLOGIA</span>
          <h1 className="text-7xl md:text-9xl font-display mb-6 bg-clip-text text-transparent bg-linear-to-r from-[#4A9EFF] to-[#FFB800]">RAY SOUZA</h1>
          <h2 className="text-2xl md:text-4xl font-display mb-10">
            <Typewriter texts={["Instrutor de Inteligência Artificial", "Especialista em Web No-Code", "Educador em Tecnologia", "Co-criador da Imersão Vendas Sem Limites"]} />
          </h2>
          <a href="#sobre" className="px-8 py-4 bg-[#4A9EFF] text-white rounded-full font-bold hover:bg-[#357ABD] transition">Conheça minha trajetória</a>
        </motion.div>
      </section>

      {/* Sobre Mim */}
      <section id="sobre" className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-display mb-10 text-center">Sobre Mim</h2>
        <div className="bg-[#16161E] p-8 rounded-3xl border border-white/10 backdrop-blur-lg">
          <div className="text-lg text-gray-300 leading-relaxed mb-6 space-y-4">
            <p>Desde criança, tive uma relação de pura paixão com a tecnologia. Em 2010, essa paixão virou propósito — e por uma década como <strong className="text-[#4A9EFF]">Professor de Informática Avançada</strong>, formei centenas de alunos e aprendi que tecnologia só faz sentido quando transforma vidas.</p>
            <p>Com o tempo, percebi que precisava de mais propósito e impacto real. Foi assim que mergulhei na <strong className="text-[#4A9EFF]">Inteligência Artificial</strong> — não como tendência, mas como convicção. Autodidata por natureza, desenvolvi especialidade em <strong className="text-[#4A9EFF]">desenvolvimento Web No-Code com IA</strong> e descobri meu maior diferencial: não só dominar a tecnologia, mas saber traduzir isso para quem está começando.</p>
            <p>Hoje sou <strong className="text-[#4A9EFF]">Instrutor de IA</strong> pela Imperium Digital e co-criador da <strong className="text-[#4A9EFF]">Imersão Vendas Sem Limites</strong>, movido por uma missão clara: formar profissionais que não serão substituídos pela IA — porque saberão usá-la melhor do que ninguém.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {['32 anos', 'Florianópolis-SC', 'Tech & Educação', '🎓 Bacharel em Serviço Social — UNISUL', '📚 Processos Gerenciais — Uniasselvi (em curso)'].map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Trajetória Profissional */}
      <section id="trajetória" className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-5xl font-display mb-10 text-center">Trajetória Profissional</h2>
        <div className="space-y-8">
          {[
            { year: '2010–2014', title: 'Início na área de Tecnologia' },
            { year: '2014–2024', title: 'Professor de Informática Avançada', company: 'Prepara Cursos' },
            { year: 'Atual', title: 'Instrutor de Inteligência Artificial', company: 'Imperium Digital' },
            { year: 'Atual', title: 'Co-criador da Imersão Vendas Sem Limites' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="bg-[#16161E] p-6 rounded-2xl border border-white/10 flex gap-6">
              <div className="text-[#FFB800] font-display text-xl w-32 shrink-0">{item.year}</div>
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                {item.company && <p className="text-[#4A9EFF]">{item.company}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Especialidades */}
      <section id="skills" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-display mb-10 text-center">Especialidades</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Bot, title: 'Inteligência Artificial', desc: 'ChatGPT, Gemini, Midjourney, Vibe Coding' },
            { icon: Code, title: 'Web No-Code', desc: 'Wix, Webflow, Framer' },
            { icon: GraduationCap, title: 'Educação & Didática', desc: 'Metodologia ativa, ensino prático' },
            { icon: TrendingUp, title: 'Vendas com IA', desc: 'Automação comercial, funis' },
            { icon: Briefcase, title: 'Gestão', desc: 'Processos Gerenciais, Liderança' },
          ].map((skill, i) => (
            <div key={i} className="bg-[#16161E] p-8 rounded-2xl border border-white/10 hover:border-[#4A9EFF] transition">
              <skill.icon className="w-10 h-10 text-[#4A9EFF] mb-4" />
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-gray-400 text-sm">{skill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-5xl font-display mb-10 text-center">Projetos No-Code</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: 'HumanZap', desc: 'Disparador de mensagens com IA.', url: 'https://humanzap.vercel.app/' },
            { title: 'Imersão Google Ads', desc: 'Landing page para imersão em Google Ads.', url: 'https://imersaogoogleads.vercel.app/' },
            { title: 'Imperium CRM', desc: 'Sistema completo de CRM e ERP.', url: 'https://imperiumcrm.vercel.app/' },
            { title: 'Psidara Beppler', desc: 'Sistema de agendamento para psicóloga.', url: 'https://psidarabeppler.vercel.app/' },
          ].map((proj, i) => (
            <a key={i} href={proj.url} target="_blank" rel="noopener noreferrer" className="bg-[#16161E] p-8 rounded-3xl border border-white/10 hover:border-[#4A9EFF] transition block">
              <h3 className="text-2xl font-display mb-2">{proj.title}</h3>
              <p className="text-gray-300 mb-4">{proj.desc}</p>
              <span className="text-[#4A9EFF] font-bold text-sm">Acessar Projeto →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Números */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
        <Counter end={15} label="Anos em Tecnologia" />
        <Counter end={10} label="Anos como Professor" />
        <Counter end={500} label="Alunos Formados" />
        <Counter end={50} label="Cursos Ministrados" />
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 px-6 text-center">
        <h2 className="text-5xl font-display mb-10">Vamos construir algo incrível juntos?</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="https://wa.me/5548988752971" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full hover:bg-[#4A9EFF] transition">
            <Phone size={20} /> WhatsApp
          </a>
          <a href="mailto:contato@raysouza.com" className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full hover:bg-[#4A9EFF] transition">
            <Mail size={20} /> E-mail
          </a>
          <a href="#" className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full hover:bg-[#4A9EFF] transition">
            <Linkedin size={20} /> LinkedIn
          </a>
          <a href="https://instagram.com/ray_souza.26" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full hover:bg-[#4A9EFF] transition">
            <Instagram size={20} /> Instagram
          </a>
        </div>
        <p className="mt-16 text-gray-500">Tecnologia com propósito. Educação que transforma.</p>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-white/10 text-sm text-gray-500">
        © {new Date().getFullYear()} Ray Souza. Desenvolvido com IA & propósito.
      </footer>
    </div>
  );
}
