const { app } = require('@azure/functions');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

app.http('random', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        let name = uniqueNamesGenerator({
            dictionaries: [adjectives, adjectives, colors, animals],
            separator: '',
            style: 'capital'
          });

        return { body: JSON.stringify({ name: name }) };
    }
});
