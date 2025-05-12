document.addEventListener('DOMContentLoaded', function () {
  // Get buttons and list
  const sortButton = document.getElementById('sortButton');
  const resetButton = document.getElementById('resetButton');
  const namesList = document.getElementById('namesList');

  // Save the original list of names
  const originalNames = [];
  const listItems = namesList.querySelectorAll('li');
  listItems.forEach(item => {
    originalNames.push(item.textContent);
  });

  // When Sort button is clicked
  sortButton.addEventListener('click', function () {
    // Get current list items
    const currentItems = Array.from(namesList.children);
    
    // Sort them by name
    const sortedItems = currentItems.slice().sort((a, b) => {
      return a.textContent.localeCompare(b.textContent);
    });

    // Check which items moved
    for (let i = 0; i < currentItems.length; i++) {
      if (currentItems[i] !== sortedItems[i]) {
        sortedItems[i].classList.add('highlight');
        // Remove highlight after 1.5 seconds
        setTimeout(() => {
          sortedItems[i].classList.remove('highlight');
        }, 1500);
      }
    }

    // Clear and add sorted items back to the list
    namesList.innerHTML = '';
    sortedItems.forEach(item => {
      namesList.appendChild(item);
    });
  });

  // When Reset button is clicked
  resetButton.addEventListener('click', function () {
    // Clear list
    namesList.innerHTML = '';
    // Add original names back
    originalNames.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      namesList.appendChild(li);
    });
  });
});
