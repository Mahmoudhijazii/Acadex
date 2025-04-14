const { Dorm } = require('../models');

const getDorms = async (req, res) => {
  try {
    const dorms = await Dorm.findAll();

    res.status(200).json(dorms);
  } catch (error) {
    console.error("Error fetching dorms:", error);
    res.status(500).json({ error: 'Failed to fetch dorms.' });
  }
};

const getDormById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const dorm = await Dorm.findByPk(id);
    if (!dorm) {
      return res.status(404).json({ error: 'Dorm not found' });
    }

    res.status(200).json(dorm);
  } catch (error) {
    console.error("Error fetching dorm:", error);
    res.status(500).json({ error: 'Failed to fetch dorm details.' });
  }
};




module.exports = { getDorms, getDormById };
