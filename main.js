const ham = document.querySelector("#ham");
ham.addEventListener("click", () => {
  ham.classList.toggle("active");
  document.querySelector(".mid").classList.toggle("show");
});

document.querySelector("#lightBtn").addEventListener("click", () => {
  let theme = document.body.classList.toggle("light");
  console.log(theme);
  const btn = document.getElementById("lightBtn");
  if (theme === true) btn.innerHTML = "🔆";
  else btn.innerHTML = "🌙";
});

AOS.init({
  duration: 800,
  once: true,
});
