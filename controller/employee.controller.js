const express = require('express'),
    router = express.Router()

const service = require('../service/employee.service')

router.get('/', async (req, res) => {
    const employees = await service.getAllEmployees()
    res.send(employees)
})

router.get('/:id', async (req, res) => {
    const employee = await service.getEmployeeById(req.params.id)
    if (employee == undefined)
        res.status(404).json('employee not found with given id : ' + req.params.id)
    else
        res.send(employee)
})

router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteEmployee(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('employee not found with given id : ' + req.params.id)
    else
        res.send('employee deleted successfully.')
})

router.post('/', async (req, res) => {
    await service.addOrEditEmployee(req.body)
    res.status(201).send('employee created successfully.')
})

router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditEmployee(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('employee not found with given id : ' + req.params.id)
    else
        res.send('employee updated successfully.')
})


router.post('/login', async (req, res) => {
   const isAuth= await service.loginEmployee(req.body);
    res.status(200).send(isAuth);
})


module.exports = router;