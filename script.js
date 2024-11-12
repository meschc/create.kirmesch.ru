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

document.getElementById("file-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (file && file.name.endsWith(".docx")) {
        // Читаем файл с использованием FileReader
        const reader = new FileReader();
        reader.onload = function(event) {
            // Обрабатываем файл через mammoth.js
            mammoth.extractRawText({ arrayBuffer: event.target.result })
                .then(displayText)
                .catch(handleError);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Пожалуйста, выберите файл в формате DOCX.");
    }
});

function displayText(result) {
    // Отображаем текст документа в блоке для предпросмотра
    const previewElement = document.getElementById("document-content");
    previewElement.innerHTML = `<p>${result.value}</p>`;
    document.getElementById("preview").style.display = "block";
}

function handleError(error) {
    console.error("Ошибка при обработке файла:", error);
    alert("Произошла ошибка при загрузке файла.");
}
