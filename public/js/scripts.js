document.querySelector('#btnSend').addEventListener('click', () => {
    const idCar = document.querySelector('#idCar').value;
    const modeloCar = document.querySelector('#modeloCar').value;
    const placaCar = document.querySelector('#placaCar').value;
    const department = document.querySelector('#departmentSelect').value;
    const town = document.querySelector('#townSelect').value;

    const data = { id: idCar, modelo: modeloCar, placa: placaCar, department, town };

    fetch('http://localhost:3000/new-record', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(newRecord => {
            const tableBody = document.querySelector('#recordsTableBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td>${newRecord.id}</td>
            <td>${newRecord.modelo}</td>
            <td>${newRecord.placa}</td>
            <td>${newRecord.department}</td>
            <td>${newRecord.town}</td>
        `;
            tableBody.appendChild(newRow);
        })
        .catch(err => console.log(err));
});

document.addEventListener('DOMContentLoaded', function () {
    const departmentSelect = document.getElementById('departmentSelect');
    const townSelect = document.getElementById('townSelect');

    fetch('http://localhost:3000/new-record')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Towns data:', data); // Log the towns data
            window.towns = data;

            departmentSelect.addEventListener('change', function () {
                console.log('Change event triggered'); // Log when the change event is triggered
                const departmentCode = this.value;
                console.log('Selected department:', departmentCode); // Log the selected department
                const filteredTowns = window.towns.filter(town => town.department === departmentCode);
                filteredTowns.sort((a, b) => a.name.localeCompare(b.name));

                townSelect.innerHTML = '<option value="">Selecciona un municipio</option>';
                filteredTowns.forEach(town => {
                    const option = document.createElement('option');
                    option.value = town.code;
                    option.textContent = town.name;
                    townSelect.appendChild(option);
                });
            });
        })
        .catch(error => console.error('Error al cargar municipios:', error));
});