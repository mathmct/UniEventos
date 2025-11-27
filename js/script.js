// ===================================
// DADOS DE EXEMPLO - UniEventos
// ===================================

const eventosMock = [
  {
    id: 1,
    titulo: "Inteligência Artificial na Prática",
    descricao: "Workshop sobre aplicações práticas de IA no mercado de trabalho",
    categoria: "tecnologia",
    tipo: "workshop",
    instituicao: "USP",
    data: "2024-12-15",
    horario: "14:00",
    palestrante: "Dr. João Silva",
    pontos: 100,
    icone: "🤖"
  },
  {
    id: 2,
    titulo: "Empreendedorismo Digital",
    descricao: "Palestra sobre como criar e escalar startups digitais",
    categoria: "negocios",
    tipo: "palestra",
    instituicao: "UNICAMP",
    data: "2024-12-18",
    horario: "19:00",
    palestrante: "Maria Santos",
    pontos: 80,
    icone: "💼"
  },
  {
    id: 3,
    titulo: "Saúde Mental na Universidade",
    descricao: "Seminário sobre bem-estar e saúde mental de estudantes",
    categoria: "saude",
    tipo: "seminario",
    instituicao: "UFRJ",
    data: "2024-12-20",
    horario: "10:00",
    palestrante: "Dra. Ana Costa",
    pontos: 90,
    icone: "🧠"
  },
  {
    id: 4,
    titulo: "História da Arte Contemporânea",
    descricao: "Workshop explorando movimentos artísticos modernos",
    categoria: "humanas",
    tipo: "workshop",
    instituicao: "UFMG",
    data: "2024-12-22",
    horario: "16:00",
    palestrante: "Prof. Carlos Oliveira",
    pontos: 75,
    icone: "🎨"
  },
  {
    id: 5,
    titulo: "Programação Web Moderna",
    descricao: "Curso prático de desenvolvimento web com React e Node.js",
    categoria: "tecnologia",
    tipo: "workshop",
    instituicao: "UFSCar",
    data: "2024-12-25",
    horario: "09:00",
    palestrante: "Lucas Ferreira",
    pontos: 120,
    icone: "💻"
  },
  {
    id: 6,
    titulo: "Gestão Financeira Pessoal",
    descricao: "Palestra sobre planejamento financeiro para estudantes",
    categoria: "negocios",
    tipo: "palestra",
    instituicao: "FGV",
    data: "2024-12-28",
    horario: "18:00",
    palestrante: "Paula Martins",
    pontos: 70,
    icone: "💰"
  },
  {
    id: 7,
    titulo: "Nutrição e Performance Acadêmica",
    descricao: "Seminário sobre alimentação saudável para melhor desempenho",
    categoria: "saude",
    tipo: "seminario",
    instituicao: "UFSC",
    data: "2024-12-30",
    horario: "15:00",
    palestrante: "Dra. Beatriz Lima",
    pontos: 85,
    icone: "🥗"
  },
  {
    id: 8,
    titulo: "Literatura Brasileira Contemporânea",
    descricao: "Palestra sobre autores brasileiros modernos e suas obras",
    categoria: "humanas",
    tipo: "palestra",
    instituicao: "UnB",
    data: "2025-01-05",
    horario: "17:00",
    palestrante: "Prof. Ricardo Almeida",
    pontos: 65,
    icone: "📚"
  }
];

let eventosInscritos = [];

// ===================================
// FUNÇÕES AUXILIARES
// ===================================

function formatarData(dataString) {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
}

function obterCategoriaCor(categoria) {
  const cores = {
    tecnologia: '#2563EB',
    negocios: '#F97316',
    saude: '#10B981',
    humanas: '#7C3AED'
  };
  return cores[categoria] || '#64748B';
}

// ===================================
// RENDERIZAÇÃO DE EVENTOS
// ===================================

function renderizarEvento(evento, destaque = false) {
  const estaInscrito = eventosInscritos.includes(evento.id);
  
  return `
    <div class="card-evento" onclick="visualizarEvento(${evento.id})">
      <div class="imagem-evento" style="background: linear-gradient(135deg, ${obterCategoriaCor(evento.categoria)}, ${obterCategoriaCor(evento.categoria)}aa);">
        ${evento.icone}
      </div>
      <div class="conteudo-evento">
        <div class="cabecalho-evento">
          <span class="badge-categoria">${evento.categoria}</span>
          <span class="badge-pontos">+${evento.pontos} pts</span>
        </div>
        <h3 class="titulo-evento">${evento.titulo}</h3>
        <p class="info-evento">📍 ${evento.instituicao}</p>
        <p class="info-evento">📅 ${formatarData(evento.data)} às ${evento.horario}</p>
        <p class="descricao-evento">${evento.descricao}</p>
        <div class="rodape-evento">
          <span class="info-evento">👤 ${evento.palestrante}</span>
          <button 
            class="botao-inscrever ${estaInscrito ? 'botao-inscrito' : ''}" 
            onclick="event.stopPropagation(); inscreverEvento(${evento.id})"
          >
            ${estaInscrito ? '✓ Inscrito' : 'Inscrever'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function carregarEventosDestaque() {
  const container = document.getElementById('eventosDestaque');
  if (!container) return;
  
  const eventosDestaque = eventosMock.slice(0, 3);
  container.innerHTML = eventosDestaque.map(e => renderizarEvento(e, true)).join('');
}

function carregarTodosEventos() {
  const container = document.getElementById('listaEventos');
  if (!container) return;
  
  container.innerHTML = eventosMock.map(e => renderizarEvento(e)).join('');
  atualizarTextoResultados(eventosMock.length);
}

// ===================================
// FILTROS E BUSCA
// ===================================

function filtrarEventos() {
  const busca = document.getElementById('campoBusca')?.value.toLowerCase() || '';
  const categoria = document.getElementById('filtroCategoria')?.value || 'todas';
  const tipo = document.getElementById('filtroTipo')?.value || 'todos';
  const data = document.getElementById('filtroData')?.value || 'todos';
  
  let eventosFiltrados = eventosMock.filter(evento => {
    const correspondeTexto = evento.titulo.toLowerCase().includes(busca) || 
                            evento.descricao.toLowerCase().includes(busca);
    const correspondeCategoria = categoria === 'todas' || evento.categoria === categoria;
    const correspondeTipo = tipo === 'todos' || evento.tipo === tipo;
    
    // Filtro de data simplificado (apenas exemplo)
    let correspondeData = true;
    if (data === 'hoje') {
      const hoje = new Date().toISOString().split('T')[0];
      correspondeData = evento.data === hoje;
    } else if (data === 'semana') {
      const dataEvento = new Date(evento.data);
      const hoje = new Date();
      const diasDiferenca = (dataEvento - hoje) / (1000 * 60 * 60 * 24);
      correspondeData = diasDiferenca >= 0 && diasDiferenca <= 7;
    }
    
    return correspondeTexto && correspondeCategoria && correspondeTipo && correspondeData;
  });
  
  const container = document.getElementById('listaEventos');
  if (container) {
    container.innerHTML = eventosFiltrados.map(e => renderizarEvento(e)).join('');
    atualizarTextoResultados(eventosFiltrados.length);
  }
}

function atualizarTextoResultados(quantidade) {
  const texto = document.getElementById('textoResultados');
  if (texto) {
    texto.textContent = `Mostrando ${quantidade} evento(s)`;
  }
}

// ===================================
// INSCRIÇÃO EM EVENTOS
// ===================================

function inscreverEvento(eventoId) {
  const evento = eventosMock.find(e => e.id === eventoId);
  if (!evento) return;
  
  const indice = eventosInscritos.indexOf(eventoId);
  
  if (indice === -1) {
    eventosInscritos.push(eventoId);
    mostrarNotificacao(`✓ Inscrito em "${evento.titulo}"! +${evento.pontos} pontos`);
  } else {
    eventosInscritos.splice(indice, 1);
    mostrarNotificacao(`Inscrição cancelada em "${evento.titulo}"`);
  }
  
  // Atualizar visualização
  carregarTodosEventos();
  carregarEventosDestaque();
  carregarEventosInscritos();
  atualizarEstatisticasPerfil();
}

function visualizarEvento(eventoId) {
  const evento = eventosMock.find(e => e.id === eventoId);
  if (!evento) return;
  
  alert(`
📌 ${evento.titulo}

${evento.descricao}

📍 Instituição: ${evento.instituicao}
📅 Data: ${formatarData(evento.data)}
⏰ Horário: ${evento.horario}
👤 Palestrante: ${evento.palestrante}
🎯 Pontos: +${evento.pontos}
📚 Tipo: ${evento.tipo}
🏷️ Categoria: ${evento.categoria}
  `);
}

// ===================================
// PERFIL E RECOMPENSAS
// ===================================

function carregarEventosInscritos() {
  const container = document.getElementById('eventosInscritos');
  if (!container) return;
  
  const eventos = eventosMock.filter(e => eventosInscritos.includes(e.id));
  
  if (eventos.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: var(--cor-texto-claro);">Você ainda não está inscrito em nenhum evento. Explore a <a href="eventos.html" style="color: var(--cor-primaria);">página de eventos</a>!</p>';
    return;
  }
  
  container.innerHTML = eventos.map(evento => `
    <div class="evento-inscrito">
      <div class="icone-evento-inscrito">${evento.icone}</div>
      <div class="info-evento-inscrito">
        <div class="titulo-evento-inscrito">${evento.titulo}</div>
        <div class="data-evento-inscrito">📅 ${formatarData(evento.data)} às ${evento.horario}</div>
        <div class="data-evento-inscrito">📍 ${evento.instituicao}</div>
      </div>
    </div>
  `).join('');
}

function atualizarEstatisticasPerfil() {
  const totalEventosEl = document.getElementById('totalEventos');
  const totalPontosEl = document.getElementById('totalPontos');
  const totalConquistasEl = document.getElementById('totalConquistas');
  
  if (totalEventosEl) {
    const eventos = eventosMock.filter(e => eventosInscritos.includes(e.id));
    const pontos = eventos.reduce((sum, e) => sum + e.pontos, 0);
    
    totalEventosEl.textContent = eventos.length;
    if (totalPontosEl) totalPontosEl.textContent = 850 + pontos;
    if (totalConquistasEl) totalConquistasEl.textContent = 8 + Math.floor(eventos.length / 2);
  }
}

// ===================================
// NOTIFICAÇÕES
// ===================================

function mostrarNotificacao(mensagem) {
  // Criar elemento de notificação
  const notificacao = document.createElement('div');
  notificacao.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: deslizarEntrada 0.3s ease;
  `;
  notificacao.textContent = mensagem;
  
  document.body.appendChild(notificacao);
  
  // Remover após 3 segundos
  setTimeout(() => {
    notificacao.style.animation = 'deslizarSaida 0.3s ease';
    setTimeout(() => notificacao.remove(), 300);
  }, 3000);
}

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  // Carregar eventos na página inicial
  carregarEventosDestaque();
  
  // Carregar todos os eventos na página de eventos
  carregarTodosEventos();
  
  // Carregar eventos inscritos no perfil
  carregarEventosInscritos();
  
  // Atualizar estatísticas do perfil
  atualizarEstatisticasPerfil();
  
  console.log('🎓 UniEventos carregado com sucesso!');
});