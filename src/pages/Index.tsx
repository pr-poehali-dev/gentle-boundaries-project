import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import LeadForm from '@/components/LeadForm';

const HERO_IMG = 'https://cdn.poehali.dev/projects/bd69da43-9acc-4da0-b504-686032b8d735/files/8f80d30e-3cf8-4c22-9980-5309692ee9ca.jpg';
const TEXTURE_IMG = 'https://cdn.poehali.dev/projects/bd69da43-9acc-4da0-b504-686032b8d735/files/a7616d03-254b-41e3-b85e-2a5330948452.jpg';

const nav = [
  { id: 'about', label: 'Обо мне' },
  { id: 'services', label: 'Услуги' },
  { id: 'programs', label: 'Программы' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const values = [
  { icon: 'Heart', title: 'Гуманность', text: 'Бережный подход без давления и токсичности. Только уважение к тебе и твоему темпу.' },
  { icon: 'ShieldCheck', title: 'Личные границы', text: 'Учимся говорить «нет» без вины и «да» без страха. Границы — это форма любви к себе.' },
  { icon: 'Handshake', title: 'Взаимоуважение', text: 'Отношения нового уровня, где слышат обоих. Равные, тёплые, честные.' },
  { icon: 'TrendingUp', title: 'Рост в легкости', text: 'Вложения в себя, которые окупаются: растёт чек в доходе, приходят деньги и любовь.' },
];

const services = [
  { icon: 'MessageCircleHeart', title: 'Личная консультация', desc: 'Глубокая работа один на один с фокусом на твой запрос в отношениях и границах.', tag: 'от 90 минут' },
  { icon: 'Compass', title: 'Диагностика границ', desc: 'Разбираем, где ты сливаешь энергию, деньги и себя — и выстраиваем опоры заново.', tag: 'старт' },
  { icon: 'Sparkles', title: 'Сопровождение', desc: 'Персональное ведение на протяжении месяца с поддержкой на каждом шаге.', tag: 'VIP' },
];

const programs = [
  {
    name: 'Опора на себя',
    sub: 'Базовая трансформация',
    duration: '4 недели',
    points: ['Личные границы без чувства вины', 'Любовь к себе как основа', 'Первые деньги в легкости'],
  },
  {
    name: 'Отношения нового уровня',
    sub: 'Флагман',
    duration: '8 недель',
    points: ['Глубокая работа с партнёрством', 'Больше эмоций, красок и близости', 'Высокое качество общения'],
    featured: true,
  },
  {
    name: 'Изобилие и любовь',
    sub: 'Премиум-путь',
    duration: '12 недель',
    points: ['Рост дохода и чека', 'Счастливые отношения', 'Полная личная трансформация'],
  },
];

const reviews = [
  { name: 'Анна', role: 'предприниматель', text: 'Впервые за годы разрешила себе выбирать себя. Отношения расцвели, а доход вырос почти вдвое — без надрыва.' },
  { name: 'Марина', role: 'маркетолог', text: 'Границы перестали быть страшным словом. Теперь я знаю свою ценность и спокойно её транслирую.' },
  { name: 'Ольга', role: 'дизайнер', text: 'Мягко, глубоко, по-женски бережно. Ушла тревога, пришли лёгкость и совсем другое качество отношений.' },
];

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');

  const openForm = (program = '') => {
    setSelectedProgram(program);
    setFormOpen(true);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-gold/30">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 bg-background/80 backdrop-blur-xl border-b border-gold/15' : 'py-6'
        }`}
      >
        <div className="container flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="font-display text-2xl tracking-wide">
            <span className="gold-text">Наедине</span>
            <span className="text-foreground/80"> с собой</span>
          </button>
          <nav className="hidden md:flex items-center gap-9">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm text-foreground/70 hover:text-gold transition-colors tracking-wide"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <Button
            onClick={() => openForm()}
            className="hidden md:inline-flex bg-transparent border border-gold/50 text-gold hover:bg-gold hover:text-primary-foreground rounded-none tracking-widest text-xs px-6 h-11 transition-all"
          >
            НАЧАТЬ
          </Button>
          <button className="md:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-4 container flex flex-col gap-4 pb-4 animate-fade-in">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-foreground/80 py-1">
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-24">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="fade-up flex items-center gap-3 mb-8" style={{ animationDelay: '0.1s' }}>
              <span className="h-px w-12 gold-line" />
              <span className="text-xs tracking-luxe uppercase text-gold/90">Эксперт по отношениям и границам</span>
            </div>
            <h1 className="fade-up font-display text-5xl md:text-7xl leading-[1.05] mb-8" style={{ animationDelay: '0.25s' }}>
              Полюби себя —<br />
              и <span className="gold-text italic">жизнь ответит</span><br />
              взаимностью
            </h1>
            <p className="fade-up text-lg text-foreground/70 max-w-lg mb-10 leading-relaxed" style={{ animationDelay: '0.4s' }}>
              Показываю на своём примере, как через личные границы и любовь к себе приходят
              счастливые отношения, лёгкость и деньги. Гуманно. Бережно. По-женски уверенно.
            </p>
            <div className="fade-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.55s' }}>
              <Button
                onClick={() => scrollTo('programs')}
                className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none h-14 px-9 tracking-widest text-xs hover-lift"
              >
                ВЫБРАТЬ ПРОГРАММУ
              </Button>
              <Button
                onClick={() => scrollTo('about')}
                variant="ghost"
                className="text-foreground/80 hover:text-gold rounded-none h-14 px-6 tracking-widest text-xs"
              >
                УЗНАТЬ ОБО МНЕ
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/60 animate-bounce">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* VALUES / PHILOSOPHY */}
      <section id="philosophy" className="py-28 relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs tracking-luxe uppercase text-gold/80">Философия</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">
              Вложения в себя, которые <span className="gold-text italic">окупаются</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="glass-card p-8 rounded-sm hover-lift group">
                <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gold/40 text-gold mb-6 group-hover:bg-gold group-hover:text-primary-foreground transition-all duration-500">
                  <Icon name={v.icon} size={22} />
                </div>
                <h3 className="font-display text-2xl mb-3">{v.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 relative">
        <div className="absolute inset-0 opacity-20">
          <img src={TEXTURE_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden border border-gold/20 float-slow">
              <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-sm hidden md:block">
              <p className="font-display text-4xl gold-text">7+</p>
              <p className="text-xs text-foreground/60 tracking-wide">лет в теме отношений</p>
            </div>
          </div>
          <div>
            <span className="text-xs tracking-luxe uppercase text-gold/80">Обо мне</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4 mb-8 leading-tight">
              Веду блог без лица —<br />и живу тем, чему <span className="gold-text italic">учу</span>
            </h2>
            <div className="space-y-5 text-foreground/70 leading-relaxed">
              <p>
                Я мягкая, гибкая, но уверенная. Не даю сухих техник — показываю на своём примере,
                как выстроить отношения с собой так, чтобы всё вокруг складывалось в легкости.
              </p>
              <p>
                Моя философия — это гуманность, личные границы и взаимоуважение. Когда ты вкладываешься
                в себя, растёт чек в доходе, отношения переходят на новый уровень, а в жизни становится
                больше красок, эмоций и высокого качества общения.
              </p>
            </div>
            <div className="flex gap-10 mt-10">
              {[
                { n: '500+', l: 'женщин в работе' },
                { n: '12', l: 'программ' },
                { n: '98%', l: 'доходят до результата' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl gold-text">{s.n}</p>
                  <p className="text-xs text-foreground/55 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs tracking-luxe uppercase text-gold/80">Услуги</span>
              <h2 className="font-display text-4xl md:text-5xl mt-4">Форматы работы со мной</h2>
            </div>
            <p className="text-foreground/60 max-w-sm text-sm leading-relaxed">
              Каждый формат — про бережную и глубокую трансформацию в твоём темпе.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="glass-card rounded-sm p-8 hover-lift group flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-all duration-500">
                    <Icon name={s.icon} size={24} />
                  </div>
                  <span className="text-[10px] tracking-luxe uppercase text-gold/70 border border-gold/30 px-3 py-1 rounded-full">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl mb-3">{s.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed flex-1">{s.desc}</p>
                <button
                  onClick={() => openForm(s.title)}
                  className="mt-8 flex items-center gap-2 text-gold text-xs tracking-widest hover:gap-4 transition-all"
                >
                  ПОДРОБНЕЕ <Icon name="ArrowRight" size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-28 relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs tracking-luxe uppercase text-gold/80">Программы</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">
              Комплексные <span className="gold-text italic">трансформации</span>
            </h2>
            <p className="text-foreground/60 mt-5 text-sm leading-relaxed">
              Глубокие программы развития по темам отношений — от опоры на себя до изобилия и любви.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {programs.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-sm p-9 flex flex-col hover-lift ${
                  p.featured
                    ? 'bg-gradient-to-b from-gold/15 to-transparent border border-gold/50'
                    : 'glass-card'
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-primary-foreground text-[10px] tracking-luxe uppercase px-4 py-1 rounded-full">
                    Хит
                  </span>
                )}
                <span className="text-xs tracking-luxe uppercase text-gold/70">{p.sub}</span>
                <h3 className="font-display text-3xl mt-3 mb-2">{p.name}</h3>
                <p className="text-sm text-foreground/50 mb-8 flex items-center gap-2">
                  <Icon name="Clock" size={14} /> {p.duration}
                </p>
                <ul className="space-y-4 flex-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-sm text-foreground/70">
                      <Icon name="Check" size={16} className="text-gold mt-0.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-9 rounded-none py-6 tracking-widest text-xs ${
                    p.featured
                      ? 'bg-gold text-primary-foreground hover:bg-gold/90'
                      : 'bg-transparent border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground'
                  }`}
                >
                  <a
                    href={`https://t.me/rose_alexa?text=${encodeURIComponent(`Здравствуйте! Хочу записаться на программу «${p.name}»`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ЗАПИСАТЬСЯ
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs tracking-luxe uppercase text-gold/80">Отзывы</span>
            <h2 className="font-display text-4xl md:text-5xl mt-4">Истории женщин</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="glass-card rounded-sm p-8 hover-lift flex flex-col">
                <div className="flex gap-1 text-gold mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-gold" />
                  ))}
                </div>
                <p className="text-foreground/75 leading-relaxed italic flex-1">«{r.text}»</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-display text-lg text-gold">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-foreground/50">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS / CTA */}
      <section id="contacts" className="py-28 relative">
        <div className="container">
          <div className="relative rounded-sm overflow-hidden">
            <img src={TEXTURE_IMG} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-background/80" />
            <div className="relative z-10 text-center px-6 py-20 md:py-28 max-w-2xl mx-auto">
              <span className="text-xs tracking-luxe uppercase text-gold/80">Контакты</span>
              <h2 className="font-display text-4xl md:text-6xl mt-5 mb-6 leading-tight">
                Начни путь к себе <span className="gold-text italic">сегодня</span>
              </h2>
              <p className="text-foreground/70 mb-10 leading-relaxed">
                Оставь заявку — и мы подберём формат работы, который подойдёт именно тебе.
                Всё в легкости и без давления.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-none h-14 px-9 tracking-widest text-xs hover-lift">
                  <a href="https://t.me/rose_alexa" target="_blank" rel="noopener noreferrer">
                    <Icon name="Send" size={16} className="mr-2" /> ОСТАВИТЬ ЗАЯВКУ
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-foreground/80 hover:text-gold rounded-none h-14 px-6 tracking-widest text-xs"
                >
                  <a href="https://t.me/rose_alexa" target="_blank" rel="noopener noreferrer">
                    <Icon name="MessageCircle" size={16} className="mr-2" /> НАПИСАТЬ В TELEGRAM
                  </a>
                </Button>
              </div>
              <div className="flex justify-center gap-6 mt-12 text-foreground/50">
                <a
                  href="https://t.me/rose_alexa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-gold/25 flex items-center justify-center hover:text-gold hover:border-gold/60 transition-all"
                >
                  <Icon name="Send" size={18} />
                </a>
                {['Instagram', 'Youtube'].map((ic) => (
                  <button key={ic} className="w-11 h-11 rounded-full border border-gold/25 flex items-center justify-center hover:text-gold hover:border-gold/60 transition-all">
                    <Icon name={ic} size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gold/15 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/45">
          <p className="font-display text-lg">
            <span className="gold-text">Наедине</span> с собой
          </p>
          <p>© 2026 · Отношения · Личные границы · Любовь к себе</p>
        </div>
      </footer>

      <LeadForm open={formOpen} onClose={() => setFormOpen(false)} program={selectedProgram} />
    </div>
  );
};

export default Index;