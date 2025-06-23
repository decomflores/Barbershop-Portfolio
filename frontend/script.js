const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
});

const diasDisponiveis = {
    "2025-06-24": ["09:00", "10:00", "11:00", "14:00", "15:00"],
    "2025-06-25": ["10:00", "11:00", "13:00", "16:00"],
    "2025-06-26": ["09:00", "11:00", "15:00", "17:00"]
};

const daySelect = document.getElementById("day-select");
const hourSelect = document.getElementById("hour-select");
const form = document.getElementById("booking-form");

const numeroBarbearia = "5551998284206"; // Substitua pelo número da barbearia (apenas números, com DDI)

function preencherDias() {
    daySelect.innerHTML = "";
    for (let dia in diasDisponiveis) {
        const option = document.createElement("option");
        option.value = dia;
        option.textContent = new Date(dia).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        daySelect.appendChild(option);
    }
}

function preencherHoras() {
    hourSelect.innerHTML = "";
    const diaSelecionado = daySelect.value;
    const horarios = diasDisponiveis[diaSelecionado] || [];

    horarios.forEach(hora => {
        const option = document.createElement("option");
        option.value = hora;
        option.textContent = hora;
        hourSelect.appendChild(option);
    });
}

daySelect.addEventListener("change", preencherHoras);

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("client-name").value;
    const telefone = document.getElementById("client-phone").value;
    const dia = daySelect.value;
    const hora = hourSelect.value;

    if (!nome || !telefone || !dia || !hora) {
        alert("Please fill out all fields.");
        return;
    }

    const dataFormatada = new Date(dia).toLocaleDateString("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const mensagem = `Hello! I'd like to know if this time is still available:\n\nName: ${nome}\nPhone: ${telefone}\nDate: ${dataFormatada}\nTime: ${hora}`;
    const linkWhatsapp = `https://wa.me/${numeroBarbearia}?text=${encodeURIComponent(mensagem)}`;

    // Apenas envia a mensagem sem remover horário
    window.open(linkWhatsapp, "_blank");
});

preencherDias();
preencherHoras();