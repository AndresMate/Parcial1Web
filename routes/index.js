const routs = require('express').Router();
const cars = require('../data/cars');
const fs = require('fs');
const path = require('path');

const departments = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/departments.json'), 'utf8'));
const towns = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/towns.json'), 'utf8'));

routs.get('/', (req, res) => {
    return res.render('index', { 'title': 'Página Inicial', 'data': cars });
});

routs.get('/new-record', (req, res) => {
    return res.render('new-record', { 'title': 'Agregar carro', 'departments': departments, 'data': Array.from(cars.values()) });
});

routs.post('/new-record', (req, res) => {
    const { id, modelo, placa, department, town } = req.body;
    const dep = departments.find(dep => dep.code === department);
    const departmentName = dep ? dep.name : '';
    const townObj = towns.find(t => t.code === town);
    const townName = townObj ? townObj.name : '';
    const newCar = { id, modelo, placa, department: departmentName, town: townName };

    cars.set(id, newCar);

    res.status(200).json(newCar);
});

module.exports = routs;