// 1. Importar dependencias
const express        = require('express');
const Producto       = require('../models/Producto');
const verificarToken = require('../middleware/auth');
const verificarAdmin = require('../middleware/admin');
const router         = express.Router();

// 2. GET /api/productos — público
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST /api/productos — solo admin
router.post('/', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. PUT /api/productos/:id — solo admin
router.put('/:id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 5. DELETE /api/productos/:id — solo admin
router.delete('/:id', verificarToken, verificarAdmin, async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 6. Exportar
module.exports = router;