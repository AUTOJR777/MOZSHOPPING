// ============================================
// main.js - VERSÃO MODULAR
// ============================================

import { 
    buscarProdutos, 
    observarAuth 
} from './firebase-config.js';

let currentFilter = 'todos';
let currentSearch = '';
let currentSort = 'relevancia';

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();
    configurarEventListeners();
    atualizarCarrinhoCount();
    observarUsuario();
});

// Observar usuário logado
function observarUsuario() {
    observarAuth((user) => {
        const userNameSpan = document.getElementById('userName');
        const userIcon = document.getElementById('userIcon');
        
        if (user.logado && userNameSpan) {
            userNameSpan.textContent = user.nome.split(' ')[0];
            userIcon.href = 'login.html';
        } else if (userNameSpan) {
            userNameSpan.textContent = 'Entrar';
            userIcon.href = 'login.html';
        }
    });
}

// Carregar produtos
async function carregarProdutos() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = '<div class="loading">Carregando produtos...</div>';
    
    let produtos = await buscarProdutos();
    
    // Filtrar
    if (currentFilter !== 'todos') {
        produtos = produtos.filter(p => p.tipo === currentFilter);
    }
    if (currentSearch) {
        const termo = currentSearch.toLowerCase();
        produtos = produtos.filter(p => 
            p.nome.toLowerCase().includes(termo) || 
            p.descricao.toLowerCase().includes(termo)
        );
    }
    
    // Ordenar
    produtos = ordenarProdutos(produtos, currentSort);
    
    renderizarProdutos(produtos);
}

function ordenarProdutos(produtos, criterio) {
    const copy = [...produtos];
    switch(criterio) {
        case 'menor-preco': return copy.sort((a,b) => a.preco - b.preco);
        case 'maior-preco': return copy.sort((a,b) => b.preco - a.preco);
        case 'recentes': return copy.sort((a,b) => (b.dataCadastro || '').localeCompare(a.dataCadastro || ''));
        default: return copy.sort((a,b) => b.rating - a.rating);
    }
}

function renderizarProdutos(produtos) {
    const grid = document.getElementById('productsGrid');
    if (produtos.length === 0) {
        grid.innerHTML = '<div class="empty-state"><i class="fas fa-box-open"></i><h3>Nenhum produto encontrado</h3><button class="btn btn-primary" onclick="limparFiltros()">Limpar Filtros</button></div>';
        return;
    }
    
    const favoritos = JSON.parse(localStorage.getItem('mozshopping_favoritos')) || [];
    
    grid.innerHTML = produtos.map(p => {
        const badge = {
            fisico: 'badge-fisico', digital: 'badge-digital', externo: 'badge-externo'
        }[p.tipo];
        const badgeText = {
            fisico: '📦 Físico', digital: '💻 Digital', externo: '🔗 Parceiro'
        }[p.tipo];
        const isFav = favoritos.includes(p.id);
        const estrelas = gerarEstrelas(p.rating);
        
        let botao = p.tipo === 'externo' 
            ? `<a href="${p.linkExterno}" target="_blank" class="btn btn-external" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i> Comprar no Parceiro</a>`
            : `<button class="btn btn-primary" onclick="comprarProduto('${p.id}')"><i class="fas fa-shopping-cart"></i> Comprar Agora</button>`;
        
        return `
            <div class="product-card" onclick="verDetalhesProduto('${p.id}')">
                <div class="product-badge ${badge}">${badgeText}</div>
                <img src="${p.imagem}" alt="${p.nome}" class="product-image" loading="lazy">
                <div class="product-info">
                    <span class="product-category">${p.categoria}</span>
                    <h3 class="product-title">${p.nome}</h3>
                    <p class="product-description">${p.descricao}</p>
                    <div class="product-price-wrapper">
                        ${p.precoAntigo ? `<span class="product-old-price">${formatarPreco(p.precoAntigo)}</span>` : ''}
                        <span class="product-price">${formatarPreco(p.preco)}</span>
                    </div>
                    ${p.parcelas > 1 ? `<div class="product-installments">ou ${p.parcelas}x de ${formatarPreco(p.preco/p.parcelas)} sem juros</div>` : ''}
                    <div class="product-meta">
                        <div class="product-rating">${estrelas} <span>(${p.reviews})</span></div>
                    </div>
                    <div class="product-actions">
                        ${botao}
                        <button class="btn btn-outline" onclick="toggleFavorito('${p.id}'); event.stopPropagation();" style="color:${isFav ? '#ef4444' : ''}">
                            <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function gerarEstrelas(rating) {
    let html = '';
    for (let i=1; i<=5; i++) {
        if (i <= Math.floor(rating)) html += '<i class="fas fa-star"></i>';
        else if (i === Math.floor(rating)+1 && rating%1 >= 0.5) html += '<i class="fas fa-star-half-alt"></i>';
        else html += '<i class="far fa-star"></i>';
    }
    return html;
}

// Favoritos
function toggleFavorito(id) {
    let fav = JSON.parse(localStorage.getItem('mozshopping_favoritos')) || [];
    if (fav.includes(id)) {
        fav = fav.filter(f => f !== id);
    } else {
        fav.push(id);
    }
    localStorage.setItem('mozshopping_favoritos', JSON.stringify(fav));
    atualizarFavoritosCount();
    carregarProdutos();
}

function atualizarFavoritosCount() {
    const el = document.getElementById('favoritosCount');
    if (!el) return;
    const fav = JSON.parse(localStorage.getItem('mozshopping_favoritos')) || [];
    el.textContent = fav.length;
    el.style.display = fav.length ? 'block' : 'none';
}

// Carrinho
function adicionarAoCarrinho(id) {
    import('./firebase-config.js').then(({ buscarProduto }) => {
        buscarProduto(id).then(produto => {
            if (!produto) return;
            let carrinho = JSON.parse(localStorage.getItem('mozshopping_carrinho')) || [];
            const existente = carrinho.find(item => item.id === id);
            if (existente) {
                existente.quantidade++;
            } else {
                carrinho.push({
                    id: produto.id,
                    nome: produto.nome,
                    preco: produto.preco,
                    imagem: produto.imagem,
                    quantidade: 1,
                    tipo: produto.tipo
                });
            }
            localStorage.setItem('mozshopping_carrinho', JSON.stringify(carrinho));
            atualizarCarrinhoCount();
            alert(`${produto.nome} adicionado ao carrinho!`);
        });
    });
}

function atualizarCarrinhoCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;
    const carrinho = JSON.parse(localStorage.getItem('mozshopping_carrinho')) || [];
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    cartCount.textContent = total;
    cartCount.style.display = total ? 'block' : 'none';
}

// Utilitários
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function verDetalhesProduto(id) {
    window.location.href = `produto.html?id=${id}`;
}

function comprarProduto(id) {
    adicionarAoCarrinho(id);
}

function limparFiltros() {
    currentFilter = 'todos';
    currentSearch = '';
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filtro === 'todos') btn.classList.add('active');
    });
    carregarProdutos();
}

function configurarEventListeners() {
    document.getElementById('searchBtn')?.addEventListener('click', () => {
        currentSearch = document.getElementById('searchInput').value;
        carregarProdutos();
    });
    document.getElementById('searchInput')?.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            currentSearch = e.target.value;
            carregarProdutos();
        }
    });
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filtro;
            carregarProdutos();
        });
    });
    document.getElementById('sortSelect')?.addEventListener('change', function() {
        currentSort = this.value;
        carregarProdutos();
    });
}

// Exportar funções globais (para onclick no HTML)
window.verDetalhesProduto = verDetalhesProduto;
window.comprarProduto = comprarProduto;
window.toggleFavorito = toggleFavorito;
window.limparFiltros = limparFiltros;