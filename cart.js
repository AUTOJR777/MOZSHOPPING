// ============================================
// cart.js
// Gerenciamento do carrinho (já existente, apenas incluído para completude)
// ============================================

function adicionarAoCarrinho(id) {
    // Busca produto do Firebase (ou usa dados.js como fallback)
    // Para simplificar, vamos usar a função global buscarProduto (assíncrona)
    // Mas como adicionarAoCarrinho é chamado de eventos síncronos, faremos async/await com then
    buscarProduto(id).then(produto => {
        if (!produto) return;
        if (produto.tipo === 'externo') {
            window.open(produto.linkExterno, '_blank');
            return;
        }
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
}

function atualizarCarrinhoCount() {
    const cartCount = document.getElementById('cartCount');
    if (!cartCount) return;
    const carrinho = JSON.parse(localStorage.getItem('mozshopping_carrinho')) || [];
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    cartCount.textContent = total;
    cartCount.style.display = total ? 'block' : 'none';
}

// Expor globalmente
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.atualizarCarrinhoCount = atualizarCarrinhoCount;