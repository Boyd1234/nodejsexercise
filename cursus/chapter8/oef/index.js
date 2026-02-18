const mongoose = require('mongoose');
const express = require('express');
const router = express(); // Let op de hoofdletter R en de haakjes!
router.use(express.json()); //zo vertel je expresss dat me json is (bv inj testen of gwn je posts)
mongoose.connect('mongodb://localhost/vivesbib')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Could not connect to MongoDB...'));

// ✅ Concise approach
const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

//==========================================================
//==========================================================
//==========================================================
//get
router.get('/', async (req,res)=>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  
  if (!genre) 
    return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

//==========================================================
//==========================================================
//==========================================================
//post
router.post('/', async (req, res) => {
//   const { error } = validateGenre(req.body);
//   if (error) 
//     return res.status(400).send(error.details[0].message);
  
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});

//==========================================================
//==========================================================
//==========================================================
//put
router.put('/:id', async (req, res)=>{
  //   const { error } = validateGenre(req.body);
//   if (error) 
//     return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name},
    { new: true, //return updated doc
      runValidators: true //validate data
     }
  );
  if(!genre)
    return res.status(404).send('genre with given ID not found');

  res.send(genre);
});

//==========================================================
//==========================================================
//==========================================================
//delete
router.delete('/:id', async (req, res)=>{
  const genre = await Genre.findByIdAndDelete(req.params.id);

  if(!genre)
    return res.status(404).send('not found');

  res.send(genre);
});


router.listen(3000);