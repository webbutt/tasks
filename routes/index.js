const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router.get('/', async (req, res) => {
    const tasks = await Task.find()
    const ptasks = await Task.find({ status: 'pending' })
    const dtasks = await Task.find({ status: 'done' })
    const tno = tasks.length
    const pno = ptasks.length
    const dno = dtasks.length
    res.render('index.ejs', { pno: pno, dno: dno, tno: tno })
})

router.get('/add-task', (req, res) => {
    res.render('add-task.ejs')
})

router.post('/add-task', async (req, res) => {    
    let message
    let task = new Task({
        title: req.body.title,
        status: req.body.status,
        dueDate: req.body.ddate
    })
    try {    
        const newTask = await task.save()
        message = "Task successfully added"
        res.render('add-task.ejs', { message: message })
    } catch(e) {
        console.log(e)
    }
})

router.get('/all-tasks', async (req, res) => {
    let tasks = await Task.find().sort({ createdAt: -1})
    for(i=0; i< tasks.length; i++) {
        const date = tasks[i].dueDate;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        tasks[i].dueDate = day+"-"+month+"-"+year
    }
    res.render('all-tasks.ejs', { tasks: tasks })
})

router.get('/pending-tasks', async(req, res) => {
    let tasks = await Task.find({ status: 'pending' }).sort({ createdAt: 1 })
    res.render('all-tasks', { tasks: tasks })
})

router.get('/done-tasks', async(req, res) => {
    let tasks = await Task.find({ status: 'done' }).sort({ createdAt: 1 })
    res.render('all-tasks', { tasks: tasks })
})

router.get('/sortByDueDate', async(req, res) => {
    let tasks = await Task.find().sort({ dueDate: 1 })
    res.render('all-tasks', { tasks: tasks })
})

module.exports = router