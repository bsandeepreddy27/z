import express from 'express';
import { pool } from '../index.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all tasks for a user
router.get('/', auth, async (req, res) => {
  try {
    const [tasks] = await pool.query(
      `SELECT t.*, u.name as assignee_name 
       FROM tasks t 
       LEFT JOIN users u ON t.assignee_id = u.id 
       WHERE t.user_id = ?`,
      [req.user.id]
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a task
router.post('/', auth, async (req, res) => {
  try {
    const { title, status, priority, assignee_id, due_date } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tasks (title, status, priority, assignee_id, due_date, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, status, priority, assignee_id, due_date, req.user.id]
    );
    
    const [newTask] = await pool.query(
      `SELECT t.*, u.name as assignee_name 
       FROM tasks t 
       LEFT JOIN users u ON t.assignee_id = u.id 
       WHERE t.id = ?`,
      [result.insertId]
    );
    
    res.status(201).json(newTask[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, status, priority, assignee_id, due_date } = req.body;
    await pool.query(
      'UPDATE tasks SET title = ?, status = ?, priority = ?, assignee_id = ?, due_date = ? WHERE id = ? AND user_id = ?',
      [title, status, priority, assignee_id, due_date, req.params.id, req.user.id]
    );
    
    const [updatedTask] = await pool.query(
      `SELECT t.*, u.name as assignee_name 
       FROM tasks t 
       LEFT JOIN users u ON t.assignee_id = u.id 
       WHERE t.id = ?`,
      [req.params.id]
    );
    
    res.json(updatedTask[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;