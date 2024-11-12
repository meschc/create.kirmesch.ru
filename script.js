function generateContract() {
    const company = document.getElementById("company").value;
    const clientName = document.getElementById("client-name").value;
    const contractDate = document.getElementById("contract-date").value;

    const contractContent = `
        <p>Договор между ${company} и ${clientName}, заключённый ${contractDate}.</p>
        <p>Настоящий договор регулирует права и обязанности сторон...</p>
    `;

    document.getElementById("contract-content").innerHTML = contractContent;
}

function downloadPDF() {
    alert("Функция скачивания будет добавлена позже");
}
