"use client";

import { useMemo, useState } from "react";

type Campaign = {
  id: number;
  title: string;
  institution: string;
  category: string;
  raised: number;
  goal: number;
  supporters: number;
  location: string;
  image: string;
  accent: string;
  urgency: "Alta" | "Média" | "Baixa";
  description: string;
  impact: string;
  update: string;
};

type UserRole = "doador" | "instituicao";
type AuthMode = "login" | "register";

type AuthForm = {
  name: string;
  email: string;
  password: string;
  document: string;
};

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Um recomeço para cada criança",
    institution: "Instituto Sementes do Amanhã",
    category: "Infância",
    raised: 28400,
    goal: 40000,
    supporters: 318,
    location: "São Paulo, SP",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85",
    accent: "#e8f2dc",
    urgency: "Média",
    description: "O Instituto Sementes do Amanhã acolhe crianças em situação de vulnerabilidade com alimentação, reforço escolar e atividades culturais.",
    impact: "Com esta campanha, vamos garantir seis meses de atividades para 40 crianças.",
    update: "A primeira turma já começou as oficinas de leitura e música.",
  },
  {
    id: 2,
    title: "Água limpa para o sertão",
    institution: "Águas que Transformam",
    category: "Emergência",
    raised: 15750,
    goal: 25000,
    supporters: 204,
    location: "Juazeiro, BA",
    image: "https://images.unsplash.com/photo-1541544181051-e46607a2d1a2?auto=format&fit=crop&w=900&q=85",
    accent: "#dcebef",
    urgency: "Alta",
    description: "Estamos levando cisternas e filtros para famílias que enfrentam longos períodos sem acesso à água potável no sertão.",
    impact: "A meta instala 12 cisternas e beneficia diretamente 60 famílias.",
    update: "Duas comunidades já receberam a visita técnica para instalação.",
  },
  {
    id: 3,
    title: "Cuidar também é transformar",
    institution: "Casa Pata Feliz",
    category: "Animais",
    raised: 9200,
    goal: 18000,
    supporters: 146,
    location: "Curitiba, PR",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85",
    accent: "#f6e8d5",
    urgency: "Alta",
    description: "A Casa Pata Feliz resgata animais abandonados, oferece tratamento veterinário e encontra lares responsáveis para eles.",
    impact: "A arrecadação mantém o tratamento de 25 animais resgatados este mês.",
    update: "A Mel e o Tobias estão recuperados e prontos para adoção.",
  },
];

const categories = ["Todas", "Infância", "Emergência", "Animais", "Educação"];
const cities = ["Todas as cidades", "São Paulo, SP", "Juazeiro, BA", "Curitiba, PR"];
const urgencies = ["Todas as urgências", "Alta", "Média", "Baixa"];
const goalRanges = [
  { label: "Todas as metas", value: "todas" },
  { label: "Até R$ 20 mil", value: "small" },
  { label: "R$ 20 mil a R$ 40 mil", value: "medium" },
  { label: "Acima de R$ 40 mil", value: "large" },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeCity, setActiveCity] = useState("Todas as cidades");
  const [activeUrgency, setActiveUrgency] = useState("Todas as urgências");
  const [activeGoalRange, setActiveGoalRange] = useState("todas");
  const [query, setQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [detailCampaign, setDetailCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState(50);
  const [donated, setDonated] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authRole, setAuthRole] = useState<UserRole>("doador");
  const [currentUser, setCurrentUser] = useState<{ name: string; role: UserRole } | null>(null);
  const [authForm, setAuthForm] = useState<AuthForm>({ name: "", email: "", password: "", document: "" });

  const filteredCampaigns = useMemo(() => campaigns.filter((campaign) => {
    const matchesCategory = activeCategory === "Todas" || campaign.category === activeCategory;
    const matchesCity = activeCity === "Todas as cidades" || campaign.location === activeCity;
    const matchesUrgency = activeUrgency === "Todas as urgências" || campaign.urgency === activeUrgency;
    const matchesGoal = activeGoalRange === "todas"
      || (activeGoalRange === "small" && campaign.goal <= 20000)
      || (activeGoalRange === "medium" && campaign.goal > 20000 && campaign.goal <= 40000)
      || (activeGoalRange === "large" && campaign.goal > 40000);
    const matchesQuery = `${campaign.title} ${campaign.institution} ${campaign.location}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesCategory && matchesCity && matchesUrgency && matchesGoal && matchesQuery;
  }), [activeCategory, activeCity, activeGoalRange, activeUrgency, query]);

  const hasActiveFilters = activeCity !== "Todas as cidades" || activeUrgency !== "Todas as urgências" || activeGoalRange !== "todas";

  function clearFilters() {
    setActiveCity("Todas as cidades");
    setActiveUrgency("Todas as urgências");
    setActiveGoalRange("todas");
  }

  function openDonation(campaign: Campaign) {
    if (!currentUser) {
      setAuthMode("login");
      setAuthRole("doador");
      setAuthOpen(true);
      return;
    }
    setSelectedCampaign(campaign);
    setDonated(false);
  }

  function openDetails(campaign: Campaign) {
    setDetailCampaign(campaign);
  }

  function openAuth(mode: AuthMode, role: UserRole) {
    setAuthMode(mode);
    setAuthRole(role);
    setAuthOpen(true);
  }

  function handleAuthSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCurrentUser({
      name: authForm.name || authForm.email.split("@")[0] || "Pessoa", 
      role: authRole,
    });
    setAuthOpen(false);
    setAuthForm({ name: "", email: "", password: "", document: "" });
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="DoaBem início"><span>+</span> DoaBem</a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#campanhas">Explorar campanhas</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>
        {currentUser ? <button className="account-button" type="button" onClick={() => setCurrentUser(null)}><span>{currentUser.name.charAt(0).toUpperCase()}</span>Sair</button> : <button className="outline-button" type="button" onClick={() => openAuth("login", "doador")}>Entrar</button>}
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Pequenas escolhas. Grandes mudanças.</p>
            <h1>O bem que você faz <em>chega mais longe.</em></h1>
            <p className="hero-description">Encontre uma causa que importa para você e ajude instituições sérias a transformar realidades.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#campanhas">Encontrar uma causa <span>↗</span></a>
              <button className="text-link" type="button" onClick={() => openAuth("register", "instituicao")}>Quero criar uma campanha</button>
            </div>
          </div>
          <div className="hero-art" aria-label="Pessoas ajudando em uma horta comunitária">
            <div className="hero-image" />
            <div className="impact-badge"><strong>R$ 1,2 mi</strong><span>doados pela comunidade</span></div>
            <div className="scribble">fazer o bem<br />faz bem</div>
          </div>
        </section>

        <section className="campaign-section" id="campanhas">
          <div className="section-heading"><div><p className="eyebrow">Causas em destaque</p><h2>Escolha onde seu gesto<br />pode florescer.</h2></div><p className="section-note">Projetos verificados, impacto real<br />e transparência em cada passo.</p></div>
          <div className="discovery-bar">
            <div className="search-wrap"><span aria-hidden="true">⌕</span><input aria-label="Buscar campanhas" placeholder="Buscar por causa, instituição ou cidade" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
            <div className="category-list" role="group" aria-label="Filtrar por categoria">{categories.map((category) => <button className={activeCategory === category ? "category active" : "category"} key={category} type="button" onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          </div>
          <div className="advanced-filters" aria-label="Filtros avançados">
            <label className="filter-control"><span>Cidade</span><select value={activeCity} onChange={(event) => setActiveCity(event.target.value)}>{cities.map((city) => <option key={city}>{city}</option>)}</select></label>
            <label className="filter-control"><span>Urgência</span><select value={activeUrgency} onChange={(event) => setActiveUrgency(event.target.value)}>{urgencies.map((urgency) => <option key={urgency}>{urgency}</option>)}</select></label>
            <label className="filter-control"><span>Meta da campanha</span><select value={activeGoalRange} onChange={(event) => setActiveGoalRange(event.target.value)}>{goalRanges.map((range) => <option key={range.value} value={range.value}>{range.label}</option>)}</select></label>
            {hasActiveFilters && <button className="clear-filters" type="button" onClick={clearFilters}>Limpar filtros ×</button>}
          </div>
          <div className="campaign-grid">
            {filteredCampaigns.map((campaign) => {
              const percentage = Math.round((campaign.raised / campaign.goal) * 100);
              return <article className="campaign-card" key={campaign.id} style={{ "--card-accent": campaign.accent } as React.CSSProperties}>
                <div className="campaign-image" style={{ backgroundImage: `url(${campaign.image})` }}><span className="campaign-category">{campaign.category}</span><span className={`urgency-badge urgency-${campaign.urgency.toLowerCase()}`}>{campaign.urgency === "Alta" ? "Precisa de atenção" : `Urgência ${campaign.urgency.toLowerCase()}`}</span></div>
                <div className="campaign-content"><p className="institution">{campaign.institution} <span>✓</span></p><h3>{campaign.title}</h3><p className="location">⌖ {campaign.location}</p><div className="progress-track"><div style={{ width: `${percentage}%` }} /></div><div className="campaign-stats"><span><strong>{formatCurrency(campaign.raised)}</strong> de {formatCurrency(campaign.goal)}</span><strong>{percentage}%</strong></div><div className="supporters">◉ {campaign.supporters} pessoas já apoiaram <span className="card-actions"><button type="button" onClick={() => openDetails(campaign)}>Ver detalhes</button><button type="button" onClick={() => openDonation(campaign)}>Doar agora <span>→</span></button></span></div></div>
              </article>;
            })}
          </div>
          {filteredCampaigns.length === 0 && <p className="empty-state">Nenhuma campanha encontrada. Tente outra busca.</p>}
        </section>

        <section className="trust-section" id="como-funciona"><p className="eyebrow">Feito para você confiar</p><h2>Seu dinheiro com propósito,<br /><em>sem complicação.</em></h2><div className="trust-grid"><div><span className="trust-number">01</span><h3>Instituições verificadas</h3><p>Analisamos cada organização antes de ela chegar até você.</p></div><div><span className="trust-number">02</span><h3>Transparência sempre</h3><p>Acompanhe o destino da sua doação e o avanço de cada meta.</p></div><div><span className="trust-number">03</span><h3>Impacto que permanece</h3><p>Conectamos pessoas a projetos que mudam histórias de verdade.</p></div></div></section>
      </main>

      {detailCampaign && <div className="modal-backdrop" role="presentation" onClick={() => setDetailCampaign(null)}><div className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" aria-label="Fechar detalhes" onClick={() => setDetailCampaign(null)}>×</button><div className="detail-image" style={{ backgroundImage: `url(${detailCampaign.image})` }}><span className="campaign-category">{detailCampaign.category}</span></div><div className="detail-body"><p className="institution">{detailCampaign.institution} <span>✓</span></p><h2 id="detail-title">{detailCampaign.title}</h2><p className="detail-location">⌖ {detailCampaign.location}</p><p className="detail-description">{detailCampaign.description}</p><div className="detail-impact"><strong>O impacto</strong><p>{detailCampaign.impact}</p></div><div className="detail-update"><span>Última atualização</span><p>{detailCampaign.update}</p></div><div className="detail-footer"><div><strong>{formatCurrency(detailCampaign.raised)}</strong><span> de {formatCurrency(detailCampaign.goal)} · {detailCampaign.supporters} apoiadores</span></div><button className="primary-button" type="button" onClick={() => { setDetailCampaign(null); openDonation(detailCampaign); }}>Apoiar esta causa <span>→</span></button></div></div></div></div>}
      {selectedCampaign && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedCampaign(null)}><div className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-title" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" aria-label="Fechar" onClick={() => setSelectedCampaign(null)}>×</button>{donated ? <div className="success-state"><span>✓</span><h2>Obrigado por fazer parte.</h2><p>Sua doação de {formatCurrency(donationAmount)} para {selectedCampaign.institution} foi registrada.</p><button className="primary-button" type="button" onClick={() => setSelectedCampaign(null)}>Voltar às campanhas</button></div> : <><p className="eyebrow">Você está apoiando</p><h2 id="donation-title">{selectedCampaign.title}</h2><p className="modal-institution">{selectedCampaign.institution}</p><div className="amount-options">{[25, 50, 100, 250].map((amount) => <button className={donationAmount === amount ? "amount active" : "amount"} type="button" key={amount} onClick={() => setDonationAmount(amount)}>{formatCurrency(amount)}</button>)}</div><label className="custom-amount">Outro valor<input type="number" min="1" value={donationAmount} onChange={(event) => setDonationAmount(Number(event.target.value))} /></label><button className="primary-button full-button" type="button" onClick={() => setDonated(true)}>Continuar com {formatCurrency(donationAmount)} <span>→</span></button></>}</div></div>}
      {authOpen && <div className="modal-backdrop" role="presentation" onClick={() => setAuthOpen(false)}><div className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" aria-label="Fechar" onClick={() => setAuthOpen(false)}>×</button><p className="eyebrow">Comunidade DoaBem</p><h2 id="auth-title">{authMode === "login" ? "Que bom ter você de volta." : "Vamos fazer o bem juntos."}</h2><div className="auth-tabs"><button type="button" className={authMode === "login" ? "auth-tab active" : "auth-tab"} onClick={() => setAuthMode("login")}>Entrar</button><button type="button" className={authMode === "register" ? "auth-tab active" : "auth-tab"} onClick={() => setAuthMode("register")}>Criar conta</button></div><div className="role-switch" role="group" aria-label="Tipo de conta"><button type="button" className={authRole === "doador" ? "role-option active" : "role-option"} onClick={() => setAuthRole("doador")}>Sou doador</button><button type="button" className={authRole === "instituicao" ? "role-option active" : "role-option"} onClick={() => setAuthRole("instituicao")}>Sou instituição</button></div><form className="auth-form" onSubmit={handleAuthSubmit}>{authMode === "register" && <label>Nome completo<input required value={authForm.name} onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })} placeholder={authRole === "instituicao" ? "Nome da instituição" : "Seu nome"} /></label>}<label>E-mail<input required type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} placeholder="voce@email.com" /></label>{authMode === "register" && authRole === "instituicao" && <label>CNPJ<input required value={authForm.document} onChange={(event) => setAuthForm({ ...authForm, document: event.target.value })} placeholder="00.000.000/0000-00" /></label>}<label>Senha<input required type="password" minLength={6} value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} placeholder="Mínimo de 6 caracteres" /></label><button className="primary-button full-button" type="submit">{authMode === "login" ? "Entrar na minha conta" : "Criar minha conta"}<span>→</span></button></form><p className="auth-helper">{authRole === "instituicao" ? "Instituições podem criar campanhas e acompanhar seu impacto." : "Doadores acompanham suas contribuições e apoiam novas causas."}</p></div></div>}
    </div>
  );
}
