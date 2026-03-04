// ============================================
// firebase-config.js
// Configuração do Firebase para Vercel
// SEM Storage (usando apenas URLs diretas)
// ============================================

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB9qSW2e1Ben8zAyEscRx4kev2OdOK9LbM",
    authDomain: "mozshopping-28146.firebaseapp.com",
    projectId: "mozshopping-28146",
    storageBucket: "mozshopping-28146.firebasestorage.app",
    messagingSenderId: "808166879841",
    appId: "1:808166879841:web:e432ca8d193a0bd11b3020"
};

// Inicializar Firebase (apenas uma vez)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Inicializar serviços (REMOVI STORAGE)
const db = firebase.firestore();
const auth = firebase.auth();

console.log('🔥 Firebase inicializado com sucesso!');
console.log('📦 Storage não utilizado - usando URLs diretas');

// ========== FUNÇÕES DE PRODUTOS ==========

// Buscar todos os produtos
async function buscarProdutos() {
    try {
        const snapshot = await db.collection('produtos').get();
        const produtos = [];
        snapshot.forEach(doc => {
            produtos.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}

// Buscar produto por ID
async function buscarProduto(id) {
    try {
        const doc = await db.collection('produtos').doc(id).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }
}

// Buscar produtos em destaque
async function getProdutosDestaque() {
    try {
        const snapshot = await db.collection('produtos').where('destaque', '==', true).get();
        const produtos = [];
        snapshot.forEach(doc => {
            produtos.push({ id: doc.id, ...doc.data() });
        });
        return produits;
    } catch (error) {
        console.error('Erro ao buscar produtos destaque:', error);
        return [];
    }
}

// Adicionar produto
async function adicionarProduto(produto) {
    try {
        if (produto.id) {
            await db.collection('produtos').doc(produto.id).set({
                ...produto,
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
            });
            return produto;
        } else {
            const docRef = await db.collection('produtos').add({
                ...produto,
                dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { id: docRef.id, ...produto };
        }
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        throw error;
    }
}

// Atualizar produto
async function atualizarProduto(id, dados) {
    try {
        await db.collection('produtos').doc(id).update({
            ...dados,
            dataAtualizacao: firebase.firestore.FieldValue.serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return false;
    }
}

// Deletar produto
async function deletarProduto(id) {
    try {
        console.log('🔥 Tentando deletar produto:', id);
        
        if (!id) {
            throw new Error('ID do produto não fornecido');
        }
        
        const docRef = db.collection('produtos').doc(id);
        const doc = await docRef.get();
        
        if (!doc.exists) {
            throw new Error('Produto não encontrado');
        }
        
        await docRef.delete();
        console.log('✅ Produto deletado com sucesso:', id);
        return true;
        
    } catch (error) {
        console.error('❌ Erro ao deletar produto:', error);
        throw error;
    }
}

// Buscar produtos por tipo
async function getProdutosByTipo(tipo) {
    try {
        if (tipo === 'todos') {
            return await buscarProdutos();
        }
        const snapshot = await db.collection('produtos').where('tipo', '==', tipo).get();
        const produtos = [];
        snapshot.forEach(doc => {
            produtos.push({ id: doc.id, ...doc.data() });
        });
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos por tipo:', error);
        return [];
    }
}

// Buscar produtos por termo (pesquisa)
async function buscarProdutosPorTermo(termo) {
    try {
        const todos = await buscarProdutos();
        if (!termo) return todos;
        
        termo = termo.toLowerCase();
        return todos.filter(p => 
            p.nome.toLowerCase().includes(termo) || 
            (p.descricao && p.descricao.toLowerCase().includes(termo)) ||
            (p.categoria && p.categoria.toLowerCase().includes(termo))
        );
    } catch (error) {
        console.error('Erro na busca:', error);
        return [];
    }
}

// ========== FUNÇÕES DE AFILIADOS ==========

// Buscar todos os afiliados
async function buscarAfiliados() {
    try {
        const snapshot = await db.collection('afiliados').get();
        const afiliados = [];
        snapshot.forEach(doc => {
            afiliados.push({ id: doc.id, ...doc.data() });
        });
        return afiliados;
    } catch (error) {
        console.error('Erro ao buscar afiliados:', error);
        return [];
    }
}

// Buscar afiliado por token
async function buscarAfiliadoPorToken(token) {
    try {
        const snapshot = await db.collection('afiliados').where('token', '==', token).limit(1).get();
        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar afiliado por token:', error);
        return null;
    }
}

// Buscar afiliado por ID
async function buscarAfiliadoPorId(id) {
    try {
        const doc = await db.collection('afiliados').doc(id).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar afiliado:', error);
        return null;
    }
}

// Criar novo afiliado
async function criarAfiliado(nome, email, userId = null, whatsapp = null) {
    try {
        const token = Math.random().toString(36).substring(2, 10).toUpperCase();
        
        const afiliado = {
            nome: nome,
            email: email,
            token: token,
            userId: userId,
            whatsapp: whatsapp,
            cliques: 0,
            vendasConfirmadas: 0,
            saldoAPagar: 0,
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        const docRef = await db.collection('afiliados').add(afiliado);
        return { id: docRef.id, ...afiliado };
    } catch (error) {
        console.error('Erro ao criar afiliado:', error);
        throw error;
    }
}

// Registrar clique de afiliado
async function registrarCliqueAfiliado(token, produtoId) {
    try {
        const afiliado = await buscarAfiliadoPorToken(token);
        if (!afiliado) {
            console.log('Token de afiliado não encontrado');
            return false;
        }
        
        await db.collection('afiliados').doc(afiliado.id).update({
            cliques: firebase.firestore.FieldValue.increment(1)
        });
        
        await db.collection('cliques').add({
            afiliadoId: afiliado.id,
            token: token,
            produtoId: produtoId,
            data: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return true;
    } catch (error) {
        console.error('Erro ao registrar clique:', error);
        return false;
    }
}

// ========== FUNÇÕES DE VENDAS / COMPRAS ==========

// Registrar venda (admin confirma)
async function registrarVenda(produtoId, quantidade, tokenAfiliado = null) {
    try {
        // Buscar produto
        const produtoRef = db.collection('produtos').doc(produtoId);
        const produtoDoc = await produtoRef.get();
        
        if (!produtoDoc.exists) {
            throw new Error('Produto não encontrado');
        }
        
        const produtoData = produtoDoc.data();
        
        // Verificar estoque (para produtos físicos)
        if (produtoData.tipo === 'fisico' && produtoData.estoque < quantidade) {
            throw new Error('Estoque insuficiente');
        }
        
        // Atualizar estoque (se for físico)
        if (produtoData.tipo === 'fisico') {
            await produtoRef.update({
                estoque: produtoData.estoque - quantidade
            });
        }
        
        // Preparar dados da venda
        const vendaData = {
            produtoId: produtoId,
            produtoNome: produtoData.nome,
            quantidade: quantidade,
            precoUnitario: produtoData.preco,
            total: parseFloat(produtoData.preco) * quantidade,
            tipo: produtoData.tipo,
            data: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'confirmada'
        };
        
        // Processar comissão de afiliado
        if (tokenAfiliado) {
            const afiliado = await buscarAfiliadoPorToken(tokenAfiliado);
            if (afiliado && produtoData.permiteAfilicao && produtoData.comissaoAfiliado > 0) {
                const precoNumerico = parseFloat(produtoData.preco) || 0;
                const comissao = (produtoData.comissaoAfiliado / 100) * (precoNumerico * quantidade);
                
                vendaData.afiliadoId = afiliado.id;
                vendaData.tokenAfiliado = tokenAfiliado;
                vendaData.comissaoPercentual = produtoData.comissaoAfiliado;
                vendaData.comissaoValor = comissao;
                
                // Atualizar saldo do afiliado
                await db.collection('afiliados').doc(afiliado.id).update({
                    vendasConfirmadas: firebase.firestore.FieldValue.increment(quantidade),
                    saldoAPagar: firebase.firestore.FieldValue.increment(comissao)
                });
            }
        }
        
        // Registrar venda
        const vendaRef = await db.collection('vendas').add(vendaData);
        
        // Registrar também na subcoleção do produto
        await produtoRef.collection('vendas').add({
            vendaId: vendaRef.id,
            quantidade: quantidade,
            data: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { id: vendaRef.id, ...vendaData };
    } catch (error) {
        console.error('Erro ao registrar venda:', error);
        throw error;
    }
}

// Buscar todas as vendas
async function buscarVendas() {
    try {
        const snapshot = await db.collection('vendas').orderBy('data', 'desc').get();
        const vendas = [];
        snapshot.forEach(doc => {
            vendas.push({ id: doc.id, ...doc.data() });
        });
        return vendas;
    } catch (error) {
        console.error('Erro ao buscar vendas:', error);
        return [];
    }
}

// Buscar vendas por produto
async function buscarVendasPorProduto(produtoId) {
    try {
        const snapshot = await db.collection('vendas')
            .where('produtoId', '==', produtoId)
            .orderBy('data', 'desc')
            .get();
        
        const vendas = [];
        snapshot.forEach(doc => {
            vendas.push({ id: doc.id, ...doc.data() });
        });
        return vendas;
    } catch (error) {
        console.error('Erro ao buscar vendas do produto:', error);
        return [];
    }
}

// Buscar vendas por afiliado
async function buscarVendasPorAfiliado(afiliadoId) {
    try {
        const snapshot = await db.collection('vendas')
            .where('afiliadoId', '==', afiliadoId)
            .orderBy('data', 'desc')
            .get();
        
        const vendas = [];
        snapshot.forEach(doc => {
            vendas.push({ id: doc.id, ...doc.data() });
        });
        return vendas;
    } catch (error) {
        console.error('Erro ao buscar vendas do afiliado:', error);
        return [];
    }
}

// ========== FUNÇÕES DE USUÁRIO ==========

// Registrar usuário
async function registrarUsuario(email, senha, nome) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
        const user = userCredential.user;
        
        await user.updateProfile({
            displayName: nome
        });
        
        await db.collection('usuarios').doc(user.uid).set({
            nome: nome,
            email: email,
            isAdmin: false,
            dataCadastro: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true, user };
    } catch (error) {
        console.error('Erro no registro:', error);
        return { success: false, error: error.message };
    }
}

// Login
async function loginUsuario(email, senha) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, senha);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Erro no login:', error);
        return { success: false, error: error.message };
    }
}

// Logout
async function logoutUsuario() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        console.error('Erro no logout:', error);
        return { success: false, error: error.message };
    }
}

// Observar mudanças no estado do usuário
function observarAuth(callback) {
    return auth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const userDoc = await db.collection('usuarios').doc(user.uid).get();
                const userData = userDoc.exists ? userDoc.data() : {};
                
                callback({
                    logado: true,
                    uid: user.uid,
                    nome: user.displayName || userData.nome || user.email.split('@')[0],
                    email: user.email,
                    isAdmin: userData.isAdmin || false
                });
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                callback({
                    logado: true,
                    uid: user.uid,
                    nome: user.displayName || user.email.split('@')[0],
                    email: user.email,
                    isAdmin: false
                });
            }
        } else {
            callback({ logado: false });
        }
    });
}

// Verificar se é admin
async function isAdmin(uid) {
    try {
        const doc = await db.collection('usuarios').doc(uid).get();
        return doc.exists && doc.data().isAdmin === true;
    } catch (error) {
        console.error('Erro ao verificar admin:', error);
        return false;
    }
}

// Buscar usuário por ID
async function buscarUsuario(uid) {
    try {
        const doc = await db.collection('usuarios').doc(uid).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return null;
    }
}

// ========== FUNÇÕES DE UPLOAD (SIMULADO - USA URL.createObjectURL) ==========

// Upload de imagem (simulado - apenas para preview)
async function uploadImagem(file, caminho) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Retorna a URL como data URL (não é armazenada permanentemente)
            resolve(e.target.result);
        };
        reader.readAsDataURL(file);
    });
}

// ========== FUNÇÕES DE INICIALIZAÇÃO ==========

// Inicializar banco com produtos de exemplo
async function inicializarBanco() {
    try {
        const snapshot = await db.collection('produtos').limit(1).get();
        
        if (snapshot.empty) {
            console.log('📦 Criando produtos iniciais...');
            
            const produtosIniciais = [
                {
                    id: 'IP15PM256',
                    nome: 'iPhone 15 Pro Max - 256GB',
                    descricao: 'iPhone 15 Pro Max na cor Titanium Natural. Produto novo, lacrado.',
                    preco: '89.999,99',
                    precoAntigo: '99.999,99',
                    imagens: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'],
                    tipo: 'fisico',
                    categoria: 'Eletrônicos',
                    condicao: 'novo',
                    parcelas: 12,
                    destaque: true,
                    permiteAfilicao: true,
                    comissaoAfiliado: 10,
                    estoque: 5,
                    whatsappNumero: '+258 84 123 4567',
                    whatsappMensagem: 'Olá! Tenho interesse no iPhone 15 Pro Max (ID: [ID]). Ainda está disponível?',
                    localizacao: 'Maputo'
                },
                {
                    id: 'NIKEAM90',
                    nome: 'Tênis Nike Air Max 90',
                    descricao: 'Tênis Nike Air Max 90, usado poucas vezes, estado excelente.',
                    preco: '2.999,99',
                    precoAntigo: '5.999,99',
                    imagens: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
                    tipo: 'fisico',
                    categoria: 'Calçados',
                    condicao: 'usado',
                    parcelas: 3,
                    destaque: false,
                    permiteAfilicao: true,
                    comissaoAfiliado: 8,
                    estoque: 1,
                    whatsappNumero: '+258 84 123 4567',
                    whatsappMensagem: 'Olá! Quero o Tênis Nike (ID: [ID]). Ainda está disponível?',
                    localizacao: 'Matola'
                },
                {
                    id: 'CURSO123',
                    nome: 'Curso Completo de Marketing Digital',
                    descricao: 'Aprenda marketing digital do zero ao avançado. Mais de 200 aulas.',
                    preco: '4.979,90',
                    precoAntigo: '9.979,90',
                    imagens: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=400'],
                    tipo: 'digital',
                    categoria: 'Cursos',
                    parcelas: 12,
                    destaque: true,
                    permiteAfilicao: true,
                    comissaoAfiliado: 30
                }
            ];
            
            for (const produto of produtosIniciais) {
                await db.collection('produtos').doc(produto.id).set(produto);
            }
            
            console.log('✅ Produtos iniciais criados!');
            
            await criarAfiliado('João Silva', 'joao@email.com');
            await criarAfiliado('Maria Santos', 'maria@email.com');
            
            console.log('✅ Afiliados de exemplo criados!');
        }
        
    } catch (error) {
        console.error('❌ Erro na inicialização:', error);
    }
}

// ========== EXPORTAR FUNÇÕES ==========
window.db = db;
window.auth = auth;

// Produtos
window.buscarProdutos = buscarProdutos;
window.buscarProduto = buscarProduto;
window.getProdutosDestaque = getProdutosDestaque;
window.adicionarProduto = adicionarProduto;
window.atualizarProduto = atualizarProduto;
window.deletarProduto = deletarProduto;
window.getProdutosByTipo = getProdutosByTipo;
window.buscarProdutosPorTermo = buscarProdutosPorTermo;

// Afiliados
window.buscarAfiliados = buscarAfiliados;
window.buscarAfiliadoPorToken = buscarAfiliadoPorToken;
window.buscarAfiliadoPorId = buscarAfiliadoPorId;
window.criarAfiliado = criarAfiliado;
window.registrarCliqueAfiliado = registrarCliqueAfiliado;

// Vendas
window.registrarVenda = registrarVenda;
window.buscarVendas = buscarVendas;
window.buscarVendasPorProduto = buscarVendasPorProduto;
window.buscarVendasPorAfiliado = buscarVendasPorAfiliado;

// Usuários
window.registrarUsuario = registrarUsuario;
window.loginUsuario = loginUsuario;
window.logoutUsuario = logoutUsuario;
window.observarAuth = observarAuth;
window.isAdmin = isAdmin;
window.buscarUsuario = buscarUsuario;

// Utilitários
window.uploadImagem = uploadImagem;
window.inicializarBanco = inicializarBanco;

console.log('📦 Todas as funções Firebase exportadas com sucesso!');
console.log('✅ Storage removido - usando URLs diretas');