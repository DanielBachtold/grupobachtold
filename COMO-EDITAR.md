# Como editar o site da Bächtold Educação

Este site é **estático** (HTML/CSS/JavaScript). Você edita os arquivos nesta pasta, vê o resultado no navegador e publica. Sem nada complicado.

> Pasta do projeto: `~/Desktop/Claude/bachtold-educacao/`

---

## Os arquivos

| Arquivo | O que tem |
|---|---|
| **`index.html`** | Todo o **texto e a estrutura** (títulos, parágrafos, preços, perguntas do FAQ). É aqui que você mexe quase sempre. |
| **`styles.css`** | As **cores e o visual**. As cores principais ficam no topo, em `:root`. |
| **`script.js`** | A lógica do **formulário** (WhatsApp + planilha). Mexer só com cuidado. |

> 💡 No VS Code: **Cmd + F** procura um texto no arquivo aberto; **Cmd + Shift + F** procura em todos.

---

## "Eu quero trocar..."

### ...um texto
1. Abra `index.html`, **Cmd + F** por um pedaço do texto atual.
2. Troque o que está **entre `>` e `<`**. Ex.: em `<h2>Preço justo</h2>`, mude só `Preço justo`.

### ...um preço
1. Em `index.html`, **Cmd + F** por `R$ 120` (ou `150`, `200`, `420`, `500`). Troque o número.

### ...uma cor
1. Em `styles.css`, no topo (`:root`):
   ```css
   --navy-900: #0f2a4a;   /* azul marinho principal */
   --blue-600: #245aa6;   /* azul de destaque */
   ```
   Troque o código da cor.

### ...o número do WhatsApp
1. **Cmd + Shift + F** por `5545991056719` e troque em todas as ocorrências.

---

## Ver o resultado
- **Rápido:** dois cliques no `index.html` → abre no navegador.
- **Melhor:** instale a extensão **Live Server** (o VS Code sugere) → botão **"Go Live"** → atualiza ao salvar.

> Sempre **salve** (Cmd + S) antes de ver/publicar.

---

## Publicar (colocar no ar) — pelo VS Code

1. Aperte **Cmd + Shift + B**
   *(ou menu **Terminal → Run Build Task…** → "🚀 Publicar site na internet")*
2. Espere aparecer **✅ No ar em https://bachtold-educacao.vercel.app**.
3. Pronto.

---

## 🚫 NÃO mexa nestes pontos (quebram o formulário)
- Nos botões de preço, o trecho **`data-formato="..."`** — tem que bater **exatamente** com as opções do formulário (incluindo o traço longo "—"). Mude só o texto do botão.
- No `script.js`: a linha **`SHEET_ENDPOINT`** (link da sua planilha) e o número do WhatsApp.
- Os **`id="..."`** das seções.

---

## 🛟 Se algo der errado
A Vercel guarda o histórico. Em [vercel.com](https://vercel.com) → projeto **bachtold-educacao** → **Deployments** → escolha uma versão boa → **"…" → Promote to Production**.
