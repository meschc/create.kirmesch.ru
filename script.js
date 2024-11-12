// Слушаем загрузку файла
document.getElementById("file-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];

    // Проверка на формат файла
    if (file && file.name.endsWith(".docx")) {
        const reader = new FileReader();
        reader.onload = function(event) {
            mammoth.extractRawText({ arrayBuffer: event.target.result })
                .then(displayContract)
                .catch(handleError);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Пожалуйста, выберите файл в формате DOCX.");
    }
});

// Функция для отображения текста договора и замены токенов
function displayContract(result) {
    // Сохраняем текст документа с токенами
    window.contractTemplate = result.value;
    // Обновляем текст в блоке предпросмотра
    updatePreview();
}

// Функция для замены токенов в тексте договора и обновления предпросмотра
function updatePreview() {
    // Получаем значения из инпутов
    const companyName = document.getElementById("company").value;
    const clientName = document.getElementById("client-name").value;

    // Копируем шаблон и заменяем токены значениями из инпутов
    let updatedContent = window.contractTemplate || "";
    updatedContent = updatedContent.replace(/\[CompanyName\]/g, companyName);
    updatedContent = updatedContent.replace(/\[ClientName\]/g, clientName);

    // Отображаем обновлённый текст в блоке предпросмотра
    document.getElementById("contract-content").innerText = updatedContent;
}

// Функция для обработки ошибок
function handleError(error) {
    console.error("Ошибка при обработке файла:", error);
    alert("Произошла ошибка при загрузке файла.");
}

// Слушаем изменения в инпутах и обновляем предпросмотр
document.getElementById("company").addEventListener("input", updatePreview);
document.getElementById("client-name").addEventListener("input", updatePreview);
