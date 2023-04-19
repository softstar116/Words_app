import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        //Find the absolute path of the json directory
        const jsonDirectory = path.join(process.cwd(), 'data');
        //Read the json data file data.json
        const fileContents = await fs.readFile(jsonDirectory + '/collections.json', 'utf8');

        const show_data = JSON.parse(fileContents);
        if (show_data.length > 0) {
            const result = show_data.map(item => ({
                id: item.id,
                name: item.name,
                count: item.words.split(',').length
            })).filter(item => item.count > 0);

            res.status(200).json(result);
        }

    } else if (req.method === 'POST') {



    } else {
        res.status(405).send('Method not allowed');
    }
}


