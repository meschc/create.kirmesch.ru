function generateContract() {
    const company = document.getElementById("company").value;
    const clientName = document.getElementById("client-name").value;
    const contractDate = document.getElementById("contract-date").value;

    const contractContent = `
        <p>Договор между ${company} и ${clientName}, заключённый ${contractDate}.</p>
        <p>Настоящий договор регулирует права и обязанности сторон в соответствии с действующим законодательством.</p>
        <p>Подробности условий договора будут дополнены по мере необходимости.</p>
    `;

    document.getElementById("contract-content").innerHTML = contractContent;
    document.getElementById("output").style.display = "block";
}

function downloadPDF() {
    const contractElement = document.getElementById("contract-content");

    html2pdf()
        .from(contractElement)
        .set({
            margin: 1,
            filename: 'Договор.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait' }
        })
        .save();
}
