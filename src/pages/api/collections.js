import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { name } = req.query
        if (name === undefined) {
            const jsonDirectory = path.join(process.cwd(), 'data');
            const fileContents = await fs.readFile(jsonDirectory + '/words.txt', 'utf8');
            const show_data = JSON.parse(fileContents);
            const result = show_data.map((value, index) => ({ id: (index + 1).toString(), value }));
            res.status(200).json(result);
        }
        else {
            const jsonDirectory = path.join(process.cwd(), 'data');
            const fileContents = await fs.readFile(jsonDirectory + '/collections.json', 'utf8');
            const show_data = JSON.parse(fileContents);
            const result = show_data.find(item => item.id === parseInt(name))
            res.status(200).json(result);
        }

    } else if (req.method === 'POST') {
        const { name } = req.query
        if (name === undefined) {
            //insert the new data to the collections.json
            const formData = await req.body;
            const new_data = JSON.parse(JSON.stringify(formData))
            const collections_dir = path.join(process.cwd(), 'data');
            const read_json = await fs.readFile(collections_dir + '/collections.json');
            let data = JSON.parse(read_json)
            const renew_data = { id: data.length + 1, ...new_data }
            if (data.length === 0) {
                fs.writeFile(path.join(process.cwd(), 'data/collections.json'), JSON.parse(renew_data), err => console.log(err));
            }
            else {
                data.push(renew_data)
                fs.writeFile(path.join(process.cwd(), 'data/collections.json'), JSON.stringify(data), err => console.log(err));
            }
            res.status(200).send('Form data received');
        }
        else {
            // const jsonDirectory = path.join(process.cwd(), 'data');
            // //Read the json data file data.json
            // const fileContents = await fs.readFile(jsonDirectory + '/collections.json', 'utf8');

            // const show_data = JSON.parse(fileContents);

            // const result = show_data.find(item => item.id === name)

            // res.status(200).json(result);
        }


    } else if (req.method === "DELETE") {
        const { parent, name } = req.query
        console.log(parent, name)
        const jsonDirectory = path.join(process.cwd(), 'data');
        const fileContents = await fs.readFile(jsonDirectory + '/collections.json', 'utf8');

        const show_data = JSON.parse(fileContents);
        const parent_id_data = show_data.find(obj => obj.id == parent);
        parent_id_data.words = parent_id_data.words.split(',').filter(word => word != name).join(',');
        console.log("parent_id_data", parent_id_data);
        const updatedData = show_data.map(obj => {
            if (obj.id == parent) {
                if (parent_id_data.words != '') {
                    return { ...obj, words: parent_id_data.words };
                }
            }

            return obj;
        });
        const final_update = updatedData.filter(item => item.words !== "")

        fs.writeFile(path.join(process.cwd(), 'data/collections.json'), JSON.stringify(final_update), err => console.log(err));


        //when data delete, update count of collections 
        const result = final_update.map(item => ({
            id: item.id,
            name: item.name,
            count: item.words.split(',').length
        })).filter(item => item.count > 0);

        const new_val = final_update.find(item => item.id === parseInt(parent))

        res.status(200).json({ data: result, new_val: new_val });
    }
    else {
        res.status(405).send('Method not allowed');
    }
}


