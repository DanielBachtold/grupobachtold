// Menu mobile
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu ao clicar em um link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

// Ano dinâmico no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// ===================== Cadastro -> WhatsApp + Planilha Google =====================
const WHATS_NUMBER = "5545991056719";
// URL do app da Web do Google Apps Script (termina em /exec) que grava os cadastros
// numa Planilha Google. Se ficar vazio, o cadastro só vai pro WhatsApp.
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbxzR83uo1OODaGCikFMXykXllza3uFBTibcFPvSCMcgY0v3ksxlfFn63N5QUI--ZHZhQA/exec";
const form = document.getElementById("cadastro-form");

if (form) {
  const submitBtn = form.querySelector('button[type="submit"]');

  // Campos lidos por id — os inputs não têm "name", para o envio sem-JS
  // (GET nativo) não jogar dados pessoais na URL; só o campo oculto "text" é enviado.
  const FIELD_IDS = {
    nome: "f-nome", responsavel: "f-resp", whatsapp: "f-whats",
    formato: "f-form", quem: "f-quem",
    nivel: "f-nivel", objetivo: "f-msg",
  };

  // Lê o valor de um campo: para <select> usa o texto da opção, ignora vazios
  function val(name) {
    const el = document.getElementById(FIELD_IDS[name]);
    if (!el) return "";
    if (el.tagName === "SELECT") return el.value ? el.options[el.selectedIndex].text.trim() : "";
    return (el.value || "").trim();
  }

  // Salva o cadastro numa Planilha Google (em paralelo ao WhatsApp), se configurado.
  // URLSearchParams = requisição "simples" (sem preflight CORS); fire-and-forget.
  function saveToSheet() {
    if (!SHEET_ENDPOINT) return;
    const data = new URLSearchParams({
      data: new Date().toLocaleString("pt-BR"),
      nome: val("nome"),
      responsavel: val("responsavel"),
      whatsapp: val("whatsapp"),
      formato: val("formato"),
      quem: val("quem"),
      nivel: val("nivel"),
      objetivo: val("objetivo").replace(/\s*\n+\s*/g, " "),
      consentimento: document.getElementById("f-consent").checked ? "Sim" : "Não",
      origem: "site bachtold-educacao",
    });
    fetch(SHEET_ENDPOINT, { method: "POST", body: data }).catch(() => {});
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Mostra as validações nativas (em pt-BR) e interrompe se inválido
    if (!form.reportValidity()) return;

    const lines = ["Olá! Quero fazer meu cadastro na Bächtold Educação.", ""];
    const push = (label, value) => { if (value) lines.push("*" + label + ":* " + value); };

    push("Nome", val("nome"));
    push("Responsável", val("responsavel"));
    push("WhatsApp", val("whatsapp"));
    push("Formato", val("formato"));
    push("Quem vai estudar", val("quem"));
    push("Série/nível/objetivo", val("nivel"));
    push("Mensagem", val("objetivo").replace(/\s*\n+\s*/g, " "));

    lines.push("", "Enviado pelo formulário do site.");

    // Grava na planilha em paralelo (não bloqueia a abertura do WhatsApp)
    saveToSheet();

    const url = "https://wa.me/" + WHATS_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));

    // Abre de forma síncrona (evita bloqueio de pop-up); fallback para navegação direta.
    const w = window.open(url, "_blank");
    if (!w) window.location.href = url;

    // Evita envio duplo
    submitBtn.disabled = true;
    setTimeout(() => { submitBtn.disabled = false; }, 2000);
  });
}

// Pré-seleciona o formato ao clicar nos CTAs dos cards de preço
document.querySelectorAll("a[data-formato]").forEach((a) => {
  a.addEventListener("click", () => {
    const sel = document.getElementById("f-form");
    if (!sel) return;
    const target = a.getAttribute("data-formato");
    for (const opt of sel.options) {
      if (opt.text.trim() === target) { opt.selected = true; break; }
    }
  });
});
