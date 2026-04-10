const supabaseUrl = "https://jhmasrtapcjpcrvtpuki.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpobWFzcnRhcGNqcGNydnRwdWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNjEyMjYsImV4cCI6MjA4OTgzNzIyNn0.Ju0V8ECY2eBuspflyI8PwIjem0cASjbl3_LbtqwKc6o";
const banco = window.supabase.createClient(supabaseUrl, supabaseKey);

// Alterna entre texto escondido e visível
function mostrarSenha() {
  let inputSenha = document.getElementById("password");
  let btnOlho = document.getElementById("btn-olho");

  if (inputSenha.type === "password") {
    inputSenha.type = "text";
    btnOlho.innerText = "🙈"; // Troca o emoji
  } else {
    inputSenha.type = "password";
    btnOlho.innerText = "👁️";
  }
}

async function fazerLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("mensagem");
  const btn = document.getElementById("btn-entrar");

  // Efeito de carregamento (Feedback visual)
  btn.innerText = "Verificando...";
  btn.disabled = true;

  // Comando que tenta logar no Supabase
  const { data, error } = await banco.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    msg.innerText = "Acesso Negado: " + error.message;
    msg.style.color = "red";
    btn.innerText = "Entrar no Painel";
    btn.disabled = false; // Libera o botão novamente
  } else {
    msg.innerText = "Acesso concedido! Carregando painel...";
    msg.style.color = "green";
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);
  }
}

const enter = document.getElementById("password");

enter.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    fazerLogin();
  }
});
