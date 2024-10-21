const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/characters', characterController.getAllCharacters);

router.get('/characters/:id', characterController.getCharacterById);

router.post('/characters', characterController.createCharacter);

router.get('/api/characters', characterController.getAllCharactersApi);

router.put('/characters/:id', characterController.updateCharacter);

router.delete('/characters/:id', characterController.deleteCharacter);

module.exports = router;