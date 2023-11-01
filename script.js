document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const price = parseFloat(document.getElementById('price').value);
    const dish = document.getElementById('dish').value;
    const table = document.getElementById('table').value;

    const order = {
        price,
        dish,
        table
    };

    axios.post('https://crudcrud.com/api/dff589383e754ffba0b221fb331c10eb/appointmentData', order)
        .then(response => {
            console.log(response.data);
            document.getElementById('orderForm').reset();
        })
        .catch(err => {
            console.error(err);
        });
});
Display();


function Display() {
    const apiUrl = 'https://crudcrud.com/api/dff589383e754ffba0b221fb331c10eb/appointmentData'; 

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const dataList = document.getElementById('dataList');

            // Clear existing data
            dataList.innerHTML = '';

            // Create an object to group data by table name
            const tableData = {};

            data.forEach(item => {
                const table = item.table;

                if (!tableData[table]) {
                    tableData[table] = [];
                }

                tableData[table].push(item);
            });

            // Loop through the grouped data and add it to the UI
            for (const table in tableData) {
                const tableSection = document.createElement('section');
                tableSection.innerHTML = `<h2>${table} Bill</h2>`;
                const tableList = document.createElement('ul');

                tableData[table].forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `Price: ${item.price}, Dish: ${item.dish}`;
                    
                    // Create a delete button for each item
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        deleteData(item._id); // Call the delete function when the button is clicked
                        listItem.remove(); // Remove the item from the UI
                    });

                    listItem.appendChild(deleteButton);
                    tableList.appendChild(listItem);
                });

                tableSection.appendChild(tableList);
                dataList.appendChild(tableSection);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

Display();


function deleteData(itemId) {

    fetch( `https://crudcrud.com/api/dff589383e754ffba0b221fb331c10eb/appointmentData/${itemId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Deleted item with ID: ${itemId}`);
        })
        .catch(error => {
            console.error(`Error deleting item with ID ${itemId}:`, error);
        });
}

Display();
