-- 1. Apaga tudo para não ter erro de tabela duplicada

use barbearia_chaplin;


DROP TABLE IF EXISTS fila;
DROP TABLE IF EXISTS profissionais;
DROP TABLE IF EXISTS barbeariastatus;

-- 2. Cria as tabelas do SEU jeito
CREATE TABLE barbeariastatus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chave_manual BOOLEAN DEFAULT false,
    chave_programada BOOLEAN DEFAULT false,
    chave_automatica BOOLEAN DEFAULT true, -- Geralmente começa ligada
    -- Dados do Botão Manual
    aberto_manual BOOLEAN DEFAULT false,
    -- Dados da Programação Especial (Card de horário)
    data_programada DATE,
    inicio_programado TIME,
    fim_programado TIME
);


-- teste 
UPDATE barbeariastatus 
SET chave_manual = TRUE, 
    aberto_manual = FALSE 
WHERE id = 1;

INSERT INTO barbeariastatus (chave_manual, chave_programada, chave_automatica, aberto_manual, aberto) 
VALUES (FALSE, FALSE, TRUE, FALSE, FALSE);

CREATE TABLE profissionais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_funcionario VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    page_html VARCHAR(50) NOT NULL,
    status VARCHAR(25) DEFAULT 'DISPONIVEL'
);

CREATE TABLE fila (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cliente VARCHAR(100) NOT NULL,
    servico VARCHAR(100) NOT NULL,
    profissional VARCHAR(100) NOT NULL,
    tempo_estimado INT NOT NULL,
    status VARCHAR(20) DEFAULT 'AGUARDANDO',
    numero VARCHAR(100) NOT NULL
);

-- 3. Insere os dados iniciais
INSERT INTO barbeariastatus (id, aberto) VALUES (1, false);

INSERT INTO profissionais (id, nome_funcionario, usuario, senha, page_html, status) 
VALUES 
(1, 'Gabriel', 'gabriel', '1234', 'gabriel.html', 'DISPONIVEL'),
(2, 'Pedro', 'pedro', '1234', 'pedro.html', 'DISPONIVEL'),
(3, 'Ramon', 'ramon', '1234', 'ramon.html', 'DISPONIVEL'),
(4, 'Guilherme', 'guilherme', '1234', 'guilherme.html', 'DISPONIVEL'),
(5, 'Nenhum', 'nenhum', 'nenhum', 'nenhum.html', 'DISPONIVEL');
