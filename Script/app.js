// Кнопка Add
document.getElementById('addButton').addEventListener('click', function() {
  const inputField = document.getElementById('inputField'); // Поле введення
  const inputValue = inputField.value.trim(); // Забирає пробіли
  const regex = /^([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)$/; // Перевіряє "Name = Value"

  // Перевірка інформації
  if (regex.test(inputValue)) {
    const [_, name, value] = inputValue.match(regex); // Розподіляємо на 'name' та 'value'
    const list = document.getElementById('list'); // Отримуємо список з елементами
    const listItem = document.createElement('li'); // Створює новий пункт

    // Значення для нового елемента
    listItem.innerHTML = `
            <span>${name} = ${value}</span>
            <input type="checkbox" class="select-item"> <!-- Галочка -->
        `;
    list.appendChild(listItem); // Створюю елемент для значення
    inputField.value = ''; // Очищуєм поле
  } else {
    // Висвітлюю попередження якщо інформація написанна невірно
    alert('Invalid format. Please enter in the format: Name = Value');
  }
});

// для кнопки "Sort by Name" обробник подій
document.getElementById('sortByName').addEventListener('click', function() {
  sortList('name'); // Сортування за Name
});

// для кнопки "Sort by Value" обробник подій
document.getElementById('sortByValue').addEventListener('click', function() {
  sortList('value'); // Сортування за Value
});

// За допомогою кнопки "Delete" видаляємо вибрану пару Name=Value
document.getElementById('deleteSelected').addEventListener('click', function() {
  const listItems = document.querySelectorAll('#list li'); // Отримуємо елементи списку
  listItems.forEach(item => {
    const checkbox = item.querySelector('.select-item'); // Знаходимо галочку в усіх елементах
    if (checkbox.checked) {
      item.remove(); // видаляємо елемент якщо він виділений галочкою
    }
  });
});

// Сортування елементів у списку
function sortList(criteria) {
  const list = document.getElementById('list'); // Беремо список
  const listItems = Array.from(list.children); // Перетворюємо HTML у масив
  const sortedItems = listItems.sort((a, b) => {
    const [nameA, valueA] = a.querySelector('span').textContent.split(' = '); // Розділяємо сам текст елемента на name і value
    const [nameB, valueB] = b.querySelector('span').textContent.split(' = ');

    // Сортуємо 'name' або 'value'
    if (criteria === 'name') {
      return nameA.localeCompare(nameB); // Сортування за Name
    } else if (criteria === 'value') {
      return valueA.localeCompare(valueB); // Сортування за Value
    }
  });

  list.innerHTML = ''; // Обнуляєм список
  sortedItems.forEach(item => list.appendChild(item)); // Додаємо уже відсортовані елементи
}

