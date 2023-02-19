const todoItems = require('../models/todoItemsModel');

const router = require('express').Router();

// create/post item
router.post('/api/item', async (req, res) => {
  try {
    const newItem = todoItems({
      item: req.body.item,
    });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (error) {
    res.json(error);
  }
});

// get all items
router.get('/api/items', async (req, res) => {
  try {
    const getAllItems = await todoItems.find({});
        res.status(200).json(getAllItems);
  } catch (error) {
    res.json(error);
  }
});


//update item
router.put('/api/item/:updateId', async (req, res) => {
  try {
    const updateItem = await todoItems.findByIdAndUpdate(req.params.updateId,{$set:req.body});
        res.status(200).json(`Item updated, ${updateItem}`);
  } catch (error) {
    res.json(error);
  }
});


//delete item
router.delete('/api/item/:deleteId',async(req,res) => {
  try {
    const deleteItem = await todoItems.findByIdAndDelete(req.params.deleteId);
        res.status(200).json(`Item deleted, ${deleteItem}`);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
