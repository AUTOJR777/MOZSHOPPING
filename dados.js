// ============================================
// ARQUIVO: dados.js
// FUNÇÃO: Banco de dados fictício com todos os produtos
// ============================================

// PRODUTOS - CATÁLOGO COMPLETO
const produtos = [
    // ========== PRODUTOS FÍSICOS ==========
    {
        id: 1,
        nome: "Smartphone Galaxy S24 Ultra",
        descricao: "Smartphone 5G com tela de 6.8\", câmera de 200MP, 512GB, bateria 5000mAh. O mais avançado da Samsung.",
        preco: 5299.99,
        precoAntigo: 6299.99,
        imagem: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80",
        tipo: "fisico",
        categoria: "Eletrônicos",
        parcelas: 12,
        rating: 4.8,
        reviews: 1234,
        destaque: true,
        dataCadastro: "2024-01-15",
        estoque: 50
    },
    {
        id: 2,
        nome: "Notebook Gamer Legion Pro 5",
        descricao: "Intel Core i9-13900HX, 32GB RAM, RTX 4080, 1TB SSD, Tela 240Hz. Perfeito para jogos pesados.",
        preco: 12499.99,
        precoAntigo: 14999.99,
        imagem: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
        tipo: "fisico",
        categoria: "Eletrônicos",
        parcelas: 12,
        rating: 4.9,
        reviews: 567,
        destaque: true,
        dataCadastro: "2024-01-20",
        estoque: 15
    },
    {
        id: 3,
        nome: "Tênis Nike Air Max 270",
        descricao: "Tênis masculino com amortecimento Air Max, design moderno e conforto premium para o dia a dia.",
        preco: 599.99,
        precoAntigo: 799.99,
        imagem: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
        tipo: "fisico",
        categoria: "Calçados",
        parcelas: 6,
        rating: 4.7,
        reviews: 3456,
        destaque: true,
        dataCadastro: "2024-02-01",
        estoque: 200
    },
    {
        id: 4,
        nome: "Fone de Ouvido Sony WH-1000XM5",
        descricao: "Cancelamento de ruído líder do setor, 30h de bateria, áudio de alta resolução e conforto extremo.",
        preco: 1899.99,
        precoAntigo: 2299.99,
        imagem: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
        tipo: "fisico",
        categoria: "Áudio",
        parcelas: 10,
        rating: 4.9,
        reviews: 2345,
        destaque: true,
        dataCadastro: "2024-02-05",
        estoque: 85
    },
    {
        id: 5,
        nome: "Smart TV OLED 65\" LG C3",
        descricao: "4K, HDR, WebOS 23, Processador α9 Gen6, perfeita para cinema em casa e games.",
        preco: 4599.99,
        precoAntigo: 5999.99,
        imagem: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
        tipo: "fisico",
        categoria: "Eletrônicos",
        parcelas: 12,
        rating: 4.8,
        reviews: 890,
        destaque: false,
        dataCadastro: "2024-02-10",
        estoque: 25
    },
    {
        id: 6,
        nome: "Relógio Apple Watch Series 9",
        descricao: "GPS + Cellular, 45mm, caixa de alumínio, pulseira esportiva. Monitoramento de saúde avançado.",
        preco: 3299.99,
        precoAntigo: 3899.99,
        imagem: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80",
        tipo: "fisico",
        categoria: "Eletrônicos",
        parcelas: 12,
        rating: 4.9,
        reviews: 5678,
        destaque: true,
        dataCadastro: "2024-02-15",
        estoque: 40
    },
    {
        id: 7,
        nome: "Cafeteira Nespresso Vertuo",
        descricao: "Cafeteira automática com sistema centrifusion, prepara café e espresso, design elegante.",
        preco: 699.99,
        precoAntigo: 899.99,
        imagem: "https://images.unsplash.com/photo-1572113368690-d960ec9e1dae?w=400&q=80",
        tipo: "fisico",
        categoria: "Eletrodomésticos",
        parcelas: 6,
        rating: 4.6,
        reviews: 1234,
        destaque: false,
        dataCadastro: "2024-02-20",
        estoque: 60
    },
    {
        id: 8,
        nome: "Mochila para Notebook 17\"",
        descricao: "Mochila executiva com porta notebook, resistente à água, múltiplos compartimentos.",
        preco: 199.99,
        precoAntigo: 299.99,
        imagem: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&q=80",
        tipo: "fisico",
        categoria: "Acessórios",
        parcelas: 3,
        rating: 4.5,
        reviews: 789,
        destaque: false,
        dataCadastro: "2024-02-25",
        estoque: 150
    },

    // ========== PRODUTOS DIGITAIS ==========
    {
        id: 9,
        nome: "Curso Completo de Marketing Digital",
        descricao: "Aprenda do zero como criar negócios digitais, tráfego pago e orgânico, funis de vendas e mais.",
        preco: 497.90,
        precoAntigo: 997.90,
        imagem: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
        tipo: "digital",
        categoria: "Cursos Online",
        parcelas: 12,
        rating: 4.9,
        reviews: 15234,
        destaque: true,
        dataCadastro: "2024-02-15",
        linkDownload: "https://mozshopping.com/cursos/marketing"
    },
    {
        id: 10,
        nome: "E-book: Investimentos para Iniciantes",
        descricao: "Aprenda a investir na bolsa, renda fixa e variável com segurança. Guia prático e descomplicado.",
        preco: 47.90,
        precoAntigo: 97.90,
        imagem: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80",
        tipo: "digital",
        categoria: "E-books",
        parcelas: 1,
        rating: 4.6,
        reviews: 8923,
        destaque: false,
        dataCadastro: "2024-02-20",
        linkDownload: "https://mozshopping.com/ebooks/investimentos"
    },
    {
        id: 11,
        nome: "Mentoria de Negócios Online",
        descricao: "12 semanas de mentoria em grupo para lançar seu negócio digital. Encontros ao vivo semanais.",
        preco: 1997.90,
        precoAntigo: 2997.90,
        imagem: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
        tipo: "digital",
        categoria: "Mentorias",
        parcelas: 12,
        rating: 5.0,
        reviews: 234,
        destaque: true,
        dataCadastro: "2024-02-25",
        linkDownload: "https://mozshopping.com/mentorias"
    },
    {
        id: 12,
        nome: "Curso de Fotografia Profissional",
        descricao: "Aprenda técnicas profissionais de fotografia com seu celular ou câmera. Do básico ao avançado.",
        preco: 297.90,
        precoAntigo: 597.90,
        imagem: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80",
        tipo: "digital",
        categoria: "Cursos Online",
        parcelas: 10,
        rating: 4.8,
        reviews: 3456,
        destaque: true,
        dataCadastro: "2024-03-01",
        linkDownload: "https://mozshopping.com/cursos/fotografia"
    },
    {
        id: 13,
        nome: "Software de Edição de Vídeo Pro",
        descricao: "Software profissional com licença vitalícia. Edição, efeitos, correção de cor e muito mais.",
        preco: 399.90,
        precoAntigo: 799.90,
        imagem: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
        tipo: "digital",
        categoria: "Software",
        parcelas: 6,
        rating: 4.7,
        reviews: 1234,
        destaque: false,
        dataCadastro: "2024-03-05",
        linkDownload: "https://mozshopping.com/software/edicao"
    },
    {
        id: 14,
        nome: "Curso de Programação Full Stack",
        descricao: "Aprenda HTML, CSS, JavaScript, React, Node.js e banco de dados. Projetos práticos.",
        preco: 697.90,
        precoAntigo: 1297.90,
        imagem: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80",
        tipo: "digital",
        categoria: "Cursos Online",
        parcelas: 12,
        rating: 4.9,
        reviews: 5678,
        destaque: true,
        dataCadastro: "2024-03-10",
        linkDownload: "https://mozshopping.com/cursos/programacao"
    },
    {
        id: 15,
        nome: "E-book: Receitas Saudáveis",
        descricao: "100 receitas saudáveis e práticas para o dia a dia. Inclui cardápios e dicas de nutrição.",
        preco: 29.90,
        precoAntigo: 59.90,
        imagem: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80",
        tipo: "digital",
        categoria: "E-books",
        parcelas: 1,
        rating: 4.5,
        reviews: 2345,
        destaque: false,
        dataCadastro: "2024-03-15",
        linkDownload: "https://mozshopping.com/ebooks/receitas"
    },
    {
        id: 16,
        nome: "Template de Site Profissional",
        descricao: "Template HTML/CSS/JS responsivo para empresas. Código limpo e documentado.",
        preco: 97.90,
        precoAntigo: 197.90,
        imagem: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&q=80",
        tipo: "digital",
        categoria: "Templates",
        parcelas: 1,
        rating: 4.8,
        reviews: 890,
        destaque: false,
        dataCadastro: "2024-03-20",
        linkDownload: "https://mozshopping.com/templates/site"
    },

    // ========== PRODUTOS PARCEIROS (REDIRECIONAMENTO) ==========
    {
        id: 17,
        nome: "Hospedagem de Sites - HostGator",
        descricao: "Hospedagem com SSL grátis, domínio incluso e suporte 24/7. Perfeito para iniciantes.",
        preco: 9.90,
        precoAntigo: 19.90,
        imagem: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
        tipo: "externo",
        linkExterno: "https://www.hostgator.com.br",
        categoria: "Serviços",
        parcelas: 1,
        rating: 4.7,
        reviews: 12567,
        destaque: true,
        dataCadastro: "2024-03-05",
        parceiro: "HostGator"
    },
    {
        id: 18,
        nome: "Curso de Inglês - Fluência em 6 Meses",
        descricao: "Método inovador para aprender inglês rapidamente. Parceiro Hotmart com milhares de alunos.",
        preco: 297.90,
        precoAntigo: 597.90,
        imagem: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80",
        tipo: "externo",
        linkExterno: "https://www.hotmart.com/curso-ingles",
        categoria: "Cursos Online",
        parcelas: 12,
        rating: 4.8,
        reviews: 23456,
        destaque: true,
        dataCadastro: "2024-03-10",
        parceiro: "Hotmart"
    },
    {
        id: 19,
        nome: "Software de Gestão - Bling",
        descricao: "ERP completo para pequenas e médias empresas. Controle estoque, vendas e notas fiscais.",
        preco: 49.90,
        precoAntigo: 99.90,
        imagem: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
        tipo: "externo",
        linkExterno: "https://www.bling.com.br",
        categoria: "Software",
        parcelas: 1,
        rating: 4.5,
        reviews: 789,
        destaque: false,
        dataCadastro: "2024-03-15",
        parceiro: "Bling"
    },
    {
        id: 20,
        nome: "Assinatura Kindle Unlimited",
        descricao: "Acesso ilimitado a milhares de livros digitais. Primeiro mês grátis.",
        preco: 19.90,
        precoAntigo: 39.90,
        imagem: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
        tipo: "externo",
        linkExterno: "https://www.amazon.com.br/kindle-unlimited",
        categoria: "Assinaturas",
        parcelas: 1,
        rating: 4.6,
        reviews: 4567,
        destaque: false,
        dataCadastro: "2024-03-20",
        parceiro: "Amazon"
    },
    {
        id: 21,
        nome: "Plataforma de Cursos - Udemy",
        descricao: "Acesso ilimitado a cursos de programação, dados e TI. Certificado incluso.",
        preco: 39.90,
        precoAntigo: 89.90,
        imagem: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
        tipo: "externo",
        linkExterno: "https://www.udemy.com",
        categoria: "Cursos Online",
        parcelas: 1,
        rating: 4.9,
        reviews: 34567,
        destaque: true,
        dataCadastro: "2024-03-25",
        parceiro: "Udemy"
    },
    {
        id: 22,
        nome: "Domínio .com.br - Registro.br",
        descricao: "Registre seu domínio com a melhor procedência. Inclui suporte DNS.",
        preco: 40.00,
        precoAntigo: 60.00,
        imagem: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80",
        tipo: "externo",
        linkExterno: "https://www.registro.br",
        categoria: "Serviços",
        parcelas: 1,
        rating: 4.8,
        reviews: 5678,
        destaque: false,
        dataCadastro: "2024-03-28",
        parceiro: "Registro.br"
    },
    {
        id: 23,
        nome: "Certificado SSL - Let's Encrypt",
        descricao: "Certificado SSL grátis e seguro para seu site. Instalação automatizada.",
        preco: 0.00,
        precoAntigo: 29.90,
        imagem: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
        tipo: "externo",
        linkExterno: "https://letsencrypt.org",
        categoria: "Serviços",
        parcelas: 1,
        rating: 5.0,
        reviews: 12345,
        destaque: false,
        dataCadastro: "2024-03-30",
        parceiro: "Let's Encrypt"
    },
    {
        id: 24,
        nome: "Email Profissional - Google Workspace",
        descricao: "Email profissional com seu domínio, drive, meet e muito mais. Plano empresarial.",
        preco: 24.90,
        precoAntigo: 49.90,
        imagem: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&q=80",
        tipo: "externo",
        linkExterno: "https://workspace.google.com",
        categoria: "Serviços",
        parcelas: 1,
        rating: 4.9,
        reviews: 8901,
        destaque: true,
        dataCadastro: "2024-04-01",
        parceiro: "Google"
    }
];

// ========== USUÁRIOS ==========
const usuarios = [
    {
        id: 1,
        nome: "Administrador",
        email: "admin@mozshopping.com",
        senha: "admin123",
        isAdmin: true,
        dataCadastro: "2024-01-01"
    },
    {
        id: 2,
        nome: "João Silva",
        email: "joao@email.com",
        senha: "123456",
        isAdmin: false,
        dataCadastro: "2024-02-15"
    },
    {
        id: 3,
        nome: "Maria Santos",
        email: "maria@email.com",
        senha: "123456",
        isAdmin: false,
        dataCadastro: "2024-02-20"
    }
];

// ========== FUNÇÕES UTILITÁRIAS ==========

// Formatar preço em Real brasileiro
function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Buscar produto por ID
function getProdutoById(id) {
    return produtos.find(p => p.id === parseInt(id));
}

// Buscar produtos por tipo
function getProdutosByTipo(tipo) {
    if (tipo === 'todos') return produtos;
    return produtos.filter(p => p.tipo === tipo);
}

// Buscar produtos em destaque
function getProdutosDestaque() {
    return produtos.filter(p => p.destaque);
}

// Buscar produtos por termo
function buscarProdutos(termo) {
    if (!termo) return produtos;
    termo = termo.toLowerCase();
    return produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) || 
        p.descricao.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
    );
}

// Buscar produtos relacionados (mesma categoria)
function getProdutosRelacionados(produto, limite = 4) {
    return produtos
        .filter(p => p.id !== produto.id && p.categoria === produto.categoria)
        .slice(0, limite);
}

// Ordenar produtos
function ordenarProdutos(produtosArray, criterio) {
    const produtosCopy = [...produtosArray];
    
    switch(criterio) {
        case 'menor-preco':
            return produtosCopy.sort((a, b) => a.preco - b.preco);
        case 'maior-preco':
            return produtosCopy.sort((a, b) => b.preco - a.preco);
        case 'recentes':
            return produtosCopy.sort((a, b) => 
                new Date(b.dataCadastro) - new Date(a.dataCadastro)
            );
        case 'relevancia':
        default:
            return produtosCopy.sort((a, b) => b.rating - a.rating);
    }
}

// Autenticar usuário
function autenticarUsuario(email, senha) {
    return usuarios.find(u => u.email === email && u.senha === senha);
}

// Registrar novo usuário
function registrarUsuario(nome, email, senha) {
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: nome,
        email: email,
        senha: senha,
        isAdmin: false,
        dataCadastro: new Date().toISOString().split('T')[0]
    };
    
    usuarios.push(novoUsuario);
    return novoUsuario;
}