document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario");
    const resultado = document.getElementById("resultado");
    const nascimento = document.getElementById("nascimento");
    const campoNome = document.getElementById("nome");

    if (!formulario || !resultado || !nascimento || !campoNome) {
        console.error("Não foi possível encontrar os elementos do formulário.");
        return;
    }

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    const dataHoje = ano + "-" + mes + "-" + dia;

    nascimento.max = dataHoje;

    function calcularIdade(data) {
        const partes = data.split("-").map(Number);
        let idade = ano - partes[0];

        if (
            partes[1] > hoje.getMonth() + 1 ||
            (partes[1] === hoje.getMonth() + 1 &&
             partes[2] > hoje.getDate())
        ) {
            idade--;
        }

        return idade;
    }

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        const nome = campoNome.value.trim();
        const dataNascimento = nascimento.value;

        if (!nome) {
            resultado.textContent = "Por favor, informe seu nome.";
            return;
        }

        if (!dataNascimento || dataNascimento > dataHoje) {
            resultado.textContent =
                "Informe uma data de nascimento válida, que não seja futura.";
            return;
        }

        const idade = calcularIdade(dataNascimento);

        const ambiente = formulario.querySelector(
            'input[name="ambiente"]:checked'
        );
        const habilidade = formulario.querySelector(
            'input[name="habilidade"]:checked'
        );
        const problema = formulario.querySelector(
            'input[name="problema"]:checked'
        );
        const motivacao = formulario.querySelector(
            'input[name="motivacao"]:checked'
        );

        if (!ambiente || !habilidade || !problema || !motivacao) {
            resultado.textContent = "Responda a todas as perguntas.";
            return;
        }

        const pontos = {
            explorador: 0,
            cientista: 0,
            lider: 0
        };

        if (ambiente.value === "floresta") {
            pontos.explorador += 2;
        } else if (ambiente.value === "oceano") {
            pontos.cientista += 2;
        } else if (ambiente.value === "espaco") {
            pontos.lider += 2;
        }

        if (habilidade.value === "ciencia") {
            pontos.cientista += 2;
        } else if (habilidade.value === "lideranca") {
            pontos.lider += 2;
        } else if (habilidade.value === "criatividade") {
            pontos.explorador += 2;
        }

        if (problema.value === "analítico") {
            pontos.cientista += 2;
        } else if (problema.value === "impulsivo") {
            pontos.explorador += 2;
        } else if (problema.value === "colaborativo") {
            pontos.lider += 2;
        }

        if (motivacao.value === "descoberta") {
            pontos.explorador += 2;
        } else if (motivacao.value === "conhecimento") {
            pontos.cientista += 2;
        } else if (motivacao.value === "protecao") {
            pontos.lider += 2;
        }

        const perfis = {
            explorador: {
                nome: "Explorador de Mundos",
                descricao: "Você é corajoso, criativo e gosta de descobrir novos ambientes. Sua curiosidade impulsiona a missão!"
            },
            cientista: {
                nome: "Cientista Cósmico",
                descricao: "Você é analítico, observador e movido pelo conhecimento. Sua capacidade de investigar ajuda a desvendar mistérios."
            },
            lider: {
                nome: "Líder da Expedição",
                descricao: "Você valoriza a estratégia, a cooperação e a proteção da equipe. Sua liderança ajuda todos a avançarem juntos."
            }
        };

        const maiorPontuacao = Math.max(
            pontos.explorador,
            pontos.cientista,
            pontos.lider
        );

        const vencedores = Object.keys(pontos).filter(function (perfil) {
            return pontos[perfil] === maiorPontuacao;
        });

        let mensagem = `
            <h2>Resultado da Missão Aura</h2>
            <p>Participante: <strong>${escaparHTML(nome)}</strong></p>
            <p>Idade: <strong>${idade} anos</strong></p>
        `;

        if (vencedores.length === 1) {
            const perfil = perfis[vencedores[0]];

            mensagem += `
                <h3>Seu perfil é: ${perfil.nome}!</h3>
                <p>${perfil.descricao}</p>
                <p>Pontuação: ${maiorPontuacao} pontos</p>
            `;
        } else {
            const nomesEmpatados = vencedores.map(function (perfil) {
                return perfis[perfil].nome;
            });

            mensagem += `
                <h3>Seu perfil é uma combinação!</h3>
                <p>Você empatou entre: <strong>${nomesEmpatados.join(" e ")}</strong>.</p>
                <p>Você apresenta características de mais de um tipo de explorador espacial.</p>
                <p>Pontuação máxima: ${maiorPontuacao} pontos</p>
            `;
        }

        resultado.innerHTML = mensagem;
    });

    function escaparHTML(texto) {
        return texto.replace(/[&<>"']/g, function (caractere) {
            const caracteres = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return caracteres[caractere];
        });
    }
});