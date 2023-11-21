# Bet-Back

<details>
  <summary>O Projeto é uma API projetada para simplificar o processo de apostas em resultados de jogos de futebol cadastrados...
  </summary>

#### Ela se concentra em três processos fundamentais: 
* registro de participantes
* cadastro de jogos
* criação de apostas. 
#### Quando um jogo chega ao fim, os resultados podem ser atualizados através da rota `/games/:id/finish.` Esta rota é responsável por verificar os vencedores e distribuir os ganhos. Esta API é uma ferramenta eficiente e intuitiva para gerenciar apostas em jogos de futebol.

</details>

#### Deploy: https://bet-back-oahk.onrender.com

---

Crie um `.env.development` & `.env.test` seguindo o `.env.example`

---

#### Instale as Dependências:

```bash
npm i
```

---

#### Rode a Migration:

```bash
npm run dev:migration:run
```

---

<details>
  <summary>Sobre os Testes</summary>

#### Para rodar os testes automatizados:

```bash
npm run test
```

#### Para rodar os testes de uma feature específica:

```bash
npm run test feature-name
```

#### Para rodar o coverage:

```bash
npm run coverage
```

```bash
npm run test:coverage
```

</details>

---

#### Para iniciar o Servidor local:

```bash
npm run dev
```

---
