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
  },
];

const categories = ["Todas", "Infância", "Emergência", "Animais", "Educação"];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [query, setQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [donationAmount, setDonationAmount] = useState(50);
  const [donated, setDonated] = useState(false);

  const filteredCampaigns = useMemo(() => campaigns.filter((campaign) => {
    const matchesCategory = activeCategory === "Todas" || campaign.category === activeCategory;
    const matchesQuery = `${campaign.title} ${campaign.institution} ${campaign.location}`
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [activeCategory, query]);

  function openDonation(campaign: Campaign) {
    setSelectedCampaign(campaign);
    setDonated(false);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="DoaBem início"><span>+</span> DoaBem</a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#campanhas">Explorar campanhas</a>
          <a href="#como-funciona">Como funciona</a>
        </nav>
        <button className="outline-button" type="button">Entrar</button>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Pequenas escolhas. Grandes mudanças.</p>
            <h1>O bem que você faz <em>chega mais longe.</em></h1>
            <p className="hero-description">Encontre uma causa que importa para você e ajude instituições sérias a transformar realidades.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#campanhas">Encontrar uma causa <span>↗</span></a>
              <a className="text-link" href="#como-funciona">Quero criar uma campanha</a>
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
          <div className="campaign-grid">
            {filteredCampaigns.map((campaign) => {
              const percentage = Math.round((campaign.raised / campaign.goal) * 100);
              return <article className="campaign-card" key={campaign.id} style={{ "--card-accent": campaign.accent } as React.CSSProperties}>
                <div className="campaign-image" style={{ backgroundImage: `url(${campaign.image})` }}><span className="campaign-category">{campaign.category}</span></div>
                <div className="campaign-content"><p className="institution">{campaign.institution} <span>✓</span></p><h3>{campaign.title}</h3><p className="location">⌖ {campaign.location}</p><div className="progress-track"><div style={{ width: `${percentage}%` }} /></div><div className="campaign-stats"><span><strong>{formatCurrency(campaign.raised)}</strong> de {formatCurrency(campaign.goal)}</span><strong>{percentage}%</strong></div><div className="supporters">◉ {campaign.supporters} pessoas já apoiaram <button type="button" onClick={() => openDonation(campaign)}>Doar agora <span>→</span></button></div></div>
              </article>;
            })}
          </div>
          {filteredCampaigns.length === 0 && <p className="empty-state">Nenhuma campanha encontrada. Tente outra busca.</p>}
        </section>

        <section className="trust-section" id="como-funciona"><p className="eyebrow">Feito para você confiar</p><h2>Seu dinheiro com propósito,<br /><em>sem complicação.</em></h2><div className="trust-grid"><div><span className="trust-number">01</span><h3>Instituições verificadas</h3><p>Analisamos cada organização antes de ela chegar até você.</p></div><div><span className="trust-number">02</span><h3>Transparência sempre</h3><p>Acompanhe o destino da sua doação e o avanço de cada meta.</p></div><div><span className="trust-number">03</span><h3>Impacto que permanece</h3><p>Conectamos pessoas a projetos que mudam histórias de verdade.</p></div></div></section>
      </main>

      {selectedCampaign && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedCampaign(null)}><div className="donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-title" onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" aria-label="Fechar" onClick={() => setSelectedCampaign(null)}>×</button>{donated ? <div className="success-state"><span>✓</span><h2>Obrigado por fazer parte.</h2><p>Sua doação de {formatCurrency(donationAmount)} para {selectedCampaign.institution} foi registrada.</p><button className="primary-button" type="button" onClick={() => setSelectedCampaign(null)}>Voltar às campanhas</button></div> : <><p className="eyebrow">Você está apoiando</p><h2 id="donation-title">{selectedCampaign.title}</h2><p className="modal-institution">{selectedCampaign.institution}</p><div className="amount-options">{[25, 50, 100, 250].map((amount) => <button className={donationAmount === amount ? "amount active" : "amount"} type="button" key={amount} onClick={() => setDonationAmount(amount)}>{formatCurrency(amount)}</button>)}</div><label className="custom-amount">Outro valor<input type="number" min="1" value={donationAmount} onChange={(event) => setDonationAmount(Number(event.target.value))} /></label><button className="primary-button full-button" type="button" onClick={() => setDonated(true)}>Continuar com {formatCurrency(donationAmount)} <span>→</span></button></>}</div></div>}
    </div>
  );
}
