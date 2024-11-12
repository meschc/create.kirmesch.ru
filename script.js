// Добавляем прослушиватель на выбор файла
document.getElementById("file-upload").addEventListener("change", function(event) {
    const file = event.target.files[0];

    // Проверка формата файла
    if (file && file.name.endsWith(".docx")) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // Чтение и обработка файла через mammoth
            mammoth.extractRawText({ arrayBuffer: event.target.result })
                .then(displayContract)
                .catch(handleError);
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert("Пожалуйста, выберите файл в формате DOCX.");
    }
});

// Функция для отображения текста договора
function displayContract(result) {
    window.contractTemplate = result.value; // Сохраняем шаблон текста
    updatePreview(); // Запуск функции обновления предпросмотра
}

// Функция для замены токенов и обновления предпросмотра
function updatePreview() {
    const companyName = document.getElementById("company").value;
    const clientName = document.getElementById("client-name").value;

    // Подставляем значения из инпутов в текст договора
    let updatedContent = window.contractTemplate || "";
    updatedContent = updatedContent.replace(/\[CompanyName\]/g, companyName);
    updatedContent = updatedContent.replace(/\[ClientName\]/g, clientName);

    // Находим элемент предпросмотра
    const previewElement = document.getElementById("contract-content");

    // Проверка на случай отсутствия элемента
    if (previewElement) {
        previewElement.innerHTML = updatedContent; // Меняем на innerHTML
    } else {
        console.error("Элемент 'contract-content' не найден в DOM.");
    }
}

// Обработка ошибок
function handleError(error) {
    console.error("Ошибка при обработке файла:", error);
    alert("Произошла ошибка при загрузке файла.");
}

// Добавляем обработчик событий на инпуты
document.getElementById("company").addEventListener("input", updatePreview);
document.getElementById("client-name").addEventListener("input", updatePreview);
