// ============================================
// cloudinary-config.js
// Configuração do Cloudinary para upload de imagens
// ============================================

// Configuração do Cloudinary (SUAS CREDENCIAIS)
const cloudinaryConfig = {
    cloudName: "dsciyibna",
    apiKey: "118449691397722",
    apiSecret: "uNOZ0RkOH4QbV52U8bzKK_IwlZQ",
    uploadPreset: "moz_preset", // Seu upload preset configurado
    folder: "produtos" // Pasta onde as imagens serão salvas
};

console.log('☁️ Cloudinary configurado com sucesso!');
console.log('📁 Cloud Name:', cloudinaryConfig.cloudName);
console.log('📁 Upload Preset:', cloudinaryConfig.uploadPreset);
console.log('📁 Pasta:', cloudinaryConfig.folder);

// ========== FUNÇÃO DE UPLOAD PARA CLOUDINARY ==========

/**
 * Faz upload de uma imagem para o Cloudinary
 * @param {File} file - Arquivo de imagem selecionado pelo usuário
 * @returns {Promise<string>} - URL da imagem enviada
 */
async function uploadImagemCloudinary(file) {
    return new Promise((resolve, reject) => {
        console.log('📤 Iniciando upload para Cloudinary...');
        console.log('Arquivo:', file.name, 'Tipo:', file.type, 'Tamanho:', file.size);
        
        // Validar arquivo
        if (!file) {
            reject(new Error('Nenhum arquivo selecionado'));
            return;
        }
        
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            reject(new Error('Arquivo deve ser uma imagem'));
            return;
        }
        
        // Validar tamanho (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
            reject(new Error('Imagem muito grande. Máximo 10MB'));
            return;
        }
        
        // Criar FormData para enviar ao Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        formData.append('cloud_name', cloudinaryConfig.cloudName);
        
        // Opções adicionais baseadas na sua configuração
        formData.append('folder', cloudinaryConfig.folder); // Pasta: produtos
        formData.append('use_filename', 'false'); // Não usar nome original
        formData.append('unique_filename', 'false'); // Não gerar nome único
        formData.append('overwrite', 'false'); // Não sobrescrever
        formData.append('quality', 'auto'); // Otimização automática
        formData.append('fetch_format', 'auto'); // Formato automático (WebP, AVIF)
        
        // Fazer requisição para o Cloudinary
        fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    console.error('Erro Cloudinary:', err);
                    throw new Error(err.error?.message || 'Erro no upload');
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Upload concluído!', data);
            console.log('URL da imagem:', data.secure_url);
            console.log('Public ID:', data.public_id);
            resolve(data.secure_url);
        })
        .catch(error => {
            console.error('❌ Erro no upload:', error);
            reject(new Error('Falha no upload: ' + error.message));
        });
    });
}

// ========== FUNÇÃO DE UPLOAD COM PROGRESSO ==========

/**
 * Upload com progresso (usando XMLHttpRequest)
 * @param {File} file - Arquivo de imagem
 * @param {Function} onProgress - Callback de progresso (0-100)
 * @returns {Promise<string>}
 */
async function uploadImagemComProgresso(file, onProgress) {
    return new Promise((resolve, reject) => {
        // Validar arquivo
        if (!file) {
            reject(new Error('Nenhum arquivo selecionado'));
            return;
        }
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', cloudinaryConfig.uploadPreset);
        formData.append('cloud_name', cloudinaryConfig.cloudName);
        formData.append('folder', cloudinaryConfig.folder);
        formData.append('use_filename', 'false');
        formData.append('unique_filename', 'false');
        formData.append('overwrite', 'false');
        
        // Criar XMLHttpRequest para acompanhar progresso
        const xhr = new XMLHttpRequest();
        
        // Acompanhar progresso
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable && onProgress) {
                const percent = Math.round((event.loaded / event.total) * 100);
                onProgress(percent);
            }
        });
        
        // Quando completar
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log('✅ Upload concluído!', data);
                resolve(data.secure_url);
            } else {
                try {
                    const error = JSON.parse(xhr.responseText);
                    reject(new Error(error.error?.message || 'Erro no upload'));
                } catch {
                    reject(new Error('Erro no upload: ' + xhr.statusText));
                }
            }
        });
        
        // Quando der erro
        xhr.addEventListener('error', () => {
            reject(new Error('Erro de rede ao fazer upload'));
        });
        
        // Abrir e enviar
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`);
        xhr.send(formData);
    });
}

// ========== FUNÇÕES AUXILIARES ==========

/**
 * Gera uma URL otimizada do Cloudinary
 * @param {string} url - URL original da imagem
 * @param {number} width - Largura desejada
 * @param {number} height - Altura desejada
 * @returns {string} - URL otimizada
 */
function otimizarImagemCloudinary(url, width = 400, height = 300) {
    if (!url || !url.includes('cloudinary')) return url;
    
    // Inserir transformações na URL
    // Ex: /upload/ -> /upload/w_400,h_300,c_fill,q_auto,f_auto/
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`);
}

/**
 * Gera uma URL com transformações personalizadas
 * @param {string} url - URL original
 * @param {Object} options - Opções de transformação
 * @returns {string}
 */
function transformarImagemCloudinary(url, options = {}) {
    if (!url || !url.includes('cloudinary')) return url;
    
    const {
        width = 400,
        height = 300,
        crop = 'fill',
        quality = 'auto',
        format = 'auto',
        gravity = 'auto'
    } = options;
    
    const transformations = [];
    if (width) transformations.push(`w_${width}`);
    if (height) transformations.push(`h_${height}`);
    if (crop) transformations.push(`c_${crop}`);
    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);
    if (gravity) transformations.push(`g_${gravity}`);
    
    return url.replace('/upload/', `/upload/${transformations.join(',')}/`);
}

// ========== FUNÇÃO PARA DELETAR IMAGEM (OPCIONAL) ==========

/**
 * Deleta uma imagem do Cloudinary (requer autenticação server-side)
 * @param {string} publicId - ID público da imagem
 * @returns {Promise}
 */
async function deletarImagemCloudinary(publicId) {
    // Esta função precisa ser feita no backend por segurança
    // Aqui está apenas um placeholder
    console.warn('Deleção de imagem deve ser feita no backend');
    return false;
}

// ========== EXPORTAR FUNÇÕES ==========
window.cloudinaryConfig = cloudinaryConfig;
window.uploadImagemCloudinary = uploadImagemCloudinary;
window.uploadImagemComProgresso = uploadImagemComProgresso;
window.otimizarImagemCloudinary = otimizarImagemCloudinary;
window.transformarImagemCloudinary = transformarImagemCloudinary;

console.log('✅ Funções do Cloudinary carregadas!');
console.log('💡 Use: uploadImagemCloudinary(file) para fazer upload');