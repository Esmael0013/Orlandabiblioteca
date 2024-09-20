// Arrays para armazenar os dados
let emprestimos = JSON.parse(localStorage.getItem('emprestimos')) || [];
let livros = JSON.parse(localStorage.getItem('livros')) || [];

// Elementos da página
const listaPendentes = document.getElementById('lista-pendentes');
const listaDevolvidos = document.getElementById('lista-devolvidos');
const listaLivros = document.getElementById('lista-livros');
const notificacao = document.getElementById('notificacao');
const fileInput = document.getElementById('importar-json'); // Captura do input de arquivo

// Função para salvar dados no Local Storage
function salvarDados() {
    localStorage.setItem('emprestimos', JSON.stringify(emprestimos));
    localStorage.setItem('livros', JSON.stringify(livros));
}

// Função para registrar empréstimos
document.getElementById('formulario-emprestimo').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const turma = document.getElementById('turma').value;
    const livro = document.getElementById('livro').value;

    if (!emprestimos.some(emp => emp.nome === nome && emp.livro === livro)) {
        emprestimos.push({ nome, turma, livro, devolvido: false });
        salvarDados();
        atualizarListas();
        this.reset();
    } else {
        mostrarNotificacao('Empréstimo já registrado.');
    }
});

// Função para adicionar livros
document.getElementById('formulario-livro').addEventListener('submit', function(e) {
    e.preventDefault();
    const numero = document.getElementById('numero-livro').value;
    const nome = document.getElementById('nome-livro').value;
    const quantidade = document.getElementById('quantidade-livro').value;

    if (!livros.some(liv => liv.numero === numero)) {
        livros.push({ numero, nome, quantidade });
        salvarDados();
        atualizarListas();
        this.reset();
    } else {
        mostrarNotificacao('Livro já cadastrado.');
    }
});

// Atualizar listas de empréstimos e livros
function atualizarListas() {
    // Limpar listas
    listaPendentes.innerHTML = '';
    listaDevolvidos.innerHTML = '';
    listaLivros.innerHTML = '';

    // Empréstimos pendentes e devolvidos
    emprestimos.forEach((emprestimo, index) => {
        const li = document.createElement('li');
        li.textContent = `${emprestimo.nome} (Turma: ${emprestimo.turma}) - Livro: ${emprestimo.livro}`;

        if (!emprestimo.devolvido) {
            const btnDevolver = document.createElement('button');
            btnDevolver.textContent = 'Devolver';
            btnDevolver.addEventListener('click', function() {
                emprestimos[index].devolvido = true;
                salvarDados();
                atualizarListas();
            });

            // Contêiner para o texto e o botão
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.justifyContent = 'space-between';
            container.appendChild(li);
            container.appendChild(btnDevolver);
            listaPendentes.appendChild(container);
        } else {
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover do Histórico';
            btnRemover.addEventListener('click', function() {
                emprestimos.splice(index, 1); // Remove o empréstimo do array
                salvarDados();
                atualizarListas();
            });

            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.justifyContent = 'space-between';
            container.appendChild(li);
            container.appendChild(btnRemover);
            listaDevolvidos.appendChild(container);
        }
    });

    // Gerenciamento de livros
    livros.forEach((livro, index) => {
        const li = document.createElement('li');
        li.textContent = `#${livro.numero} - ${livro.nome} (Quantidade: ${livro.quantidade})`;

        // Botão de remover livro
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.addEventListener('click', function() {
            livros.splice(index, 1); // Remove o livro do array
            salvarDados(); // Salva os dados atualizados
            atualizarListas(); // Atualiza a lista
        });

        // Contêiner para o texto e o botão
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.justifyContent = 'space-between';
        container.appendChild(li);
        container.appendChild(btnRemover);
        listaLivros.appendChild(container);
    });
}

// Pesquisa dinâmica
document.getElementById('pesquisa-aluno').addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    listaPendentes.innerHTML = '';
    listaDevolvidos.innerHTML = '';

    emprestimos.forEach((emprestimo, index) => {
        if (emprestimo.nome.toLowerCase().includes(termo)) {
            const li = document.createElement('li');
            li.textContent = `${emprestimo.nome} (Turma: ${emprestimo.turma}) - Livro: ${emprestimo.livro}`;

            if (!emprestimo.devolvido) {
                const btnDevolver = document.createElement('button');
                btnDevolver.textContent = 'Devolver';
                btnDevolver.addEventListener('click', function() {
                    emprestimos[index].devolvido = true;
                    salvarDados();
                    atualizarListas();
                });

                const container = document.createElement('div');
                container.style.display = 'flex';
                container.style.justifyContent = 'space-between';
                container.appendChild(li);
                container.appendChild(btnDevolver);
                listaPendentes.appendChild(container);
            } else {
                const btnRemover = document.createElement('button');
                btnRemover.textContent = 'Remover do Histórico';
                btnRemover.addEventListener('click', function() {
                    emprestimos.splice(index, 1); // Remove o empréstimo do array
                    salvarDados();
                    atualizarListas();
                });

                const container = document.createElement('div');
                container.style.display = 'flex';
                container.style.justifyContent = 'space-between';
                container.appendChild(li);
                container.appendChild(btnRemover);
                listaDevolvidos.appendChild(container);
            }
        }
    });
});

// Pesquisa dinâmica para livros
document.getElementById('pesquisa-livro').addEventListener('input', function() {
    const termo = this.value.toLowerCase();
    listaLivros.innerHTML = '';

    livros.forEach((livro, index) => {
        if (livro.nome.toLowerCase().includes(termo)) {
            const li = document.createElement('li');
            li.textContent = `#${livro.numero} - ${livro.nome} (Quantidade: ${livro.quantidade})`;

            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.addEventListener('click', function() {
                livros.splice(index, 1); // Remove o livro do array
                salvarDados(); // Salva os dados atualizados
                atualizarListas(); // Atualiza a lista
            });

            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.justifyContent = 'space-between';
            container.appendChild(li);
            container.appendChild(btnRemover);
            listaLivros.appendChild(container);
        }
    });
});

// Função para exportar os dados em JSON
function exportarDados() {
    const data = {
        emprestimos,
        livros
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados_biblioteca.json';
    a.click();
}

// Função para importar os dados a partir de um arquivo JSON
function importarDados() {
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                // Verifica e adiciona apenas novos empréstimos e livros
                data.emprestimos.forEach(emp => {
                    if (!emprestimos.some(existingEmp => existingEmp.nome === emp.nome && existingEmp.livro === emp.livro)) {
                        emprestimos.push(emp);
                    }
                });

                data.livros.forEach(liv => {
                    if (!livros.some(existingLiv => existingLiv.numero === liv.numero)) {
                        livros.push(liv);
                    }
                });

                salvarDados();
                atualizarListas();
                mostrarNotificacao('Importação concluída com sucesso!');
            } catch (error) {
                mostrarNotificacao('Erro ao importar os dados. Verifique o formato do arquivo.');
            }
        };
        reader.readAsText(file);
        fileInput.value = ''; // Limpa o campo de entrada para permitir novas importações
    }
}

// Mostrar notificação de sucesso na importação
function mostrarNotificacao(mensagem) {
    notificacao.textContent = mensagem;
    notificacao.style.display = 'block';
    setTimeout(() => {
        notificacao.style.display = 'none';
    }, 3000);
}

// Inicializar a lista ao carregar a página
atualizarListas();

// Adiciona evento ao botão de importação
document.getElementById('importar-btn').addEventListener('click', importarDados);

// Adiciona evento ao botão de exportação
document.getElementById('exportar-btn').addEventListener('click', exportarDados);



