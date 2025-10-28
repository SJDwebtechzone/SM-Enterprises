fetch('./jsondata/data.json')
  .then(response => response.json())
  .then(data => {
    const list = document.getElementById('vegetable-list');
    data.vegetables.forEach(veg => {
      const listItem = document.createElement('div');
      listItem.textContent = `${veg.name}: ₹${veg.price}`;
      list.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));
