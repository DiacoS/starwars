const characters = [
    { id: 1, name: 'Diaco Skywalker', description: 'Den vildeste programmør, der også er en Jedi-ridder om natten.' },
    { id: 2, name: 'Søren Vader', description: 'Sammensætning ondskab og dovenskab.' },
    { id: 3, name: 'R2-Morten', description: 'Robotten der lod verden gå under, fordi Liverpool tabte ligaen.' }
];

exports.getAllCharacters = (req, res) => {
    try {
        res.render('characters', { characters });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getAllCharactersApi = (req, res) => {
    try {
        res.json(characters);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.getCharacterById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const character = characters.find(char => char.id === id);

    if (!character) {
        return res.status(404).json({ message: 'Denne mærkelige karakter blev desværre ikke fundet.. idiot' });
    }

    res.json(character);
};

exports.createCharacter = (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Navn og beskrivelse er påkrævet' });
    }

    const newCharacter = {
        id: characters.length + 1,
        name,
        description
    };

    characters.push(newCharacter);
    res.status(201).json(newCharacter);
};

exports.updateCharacter = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;

    const character = characters.find(char => char.id === id);

    if (!character) {
        return res.status(404).json({ message: 'Karakteren blev ikke fundet' });
    }

    if (name) character.name = name;
    if (description) character.description = description;

    res.json(character);
};

exports.deleteCharacter = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = characters.findIndex(char => char.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Karakteren blev ikke fundet' });
    }

    const deletedCharacter = characters.splice(index, 1);
    res.json({ message: 'Karakter slettet', character: deletedCharacter });
};