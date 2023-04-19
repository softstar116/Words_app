import Link from 'next/link';
import { useEffect, useReducer, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Header from '../Header';
import { compress } from '../../../next.config';

const Words = () => {
    const [result, setResult] = useState([])
    const [showData, setShowData] = useState([])
    const router = useRouter()
    useEffect(() => {
        const fetchSearchData = async () => {
            try {
                const response = await fetch('/api/words', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.text();
                if (data !== '') {
                    setResult(JSON.parse(data))
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchSearchData();
    }, []);
    const handleChange = (id) => {

        const fetchSearchData = async () => {
            try {
                const response = await fetch(`/api/collections?name=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.text();
                let new_data = JSON.parse(data)
                // console.log(new_data)
                const wordsArray = new_data.words.split(',');
                const arrayOfObjects = [];

                for (const [index, word] of wordsArray.entries()) {
                    const newObject = { id: index + 1, parent: id, name: word };
                    arrayOfObjects.push(newObject);
                }
                // console.log(arrayOfObjects)
                setShowData(arrayOfObjects)
            } catch (error) {
                console.error(error);
            }
        }

        fetchSearchData();
    }
    const handleDelete = (parent, name) => {
        const fetchSearchData = async () => {
            try {
                const response = await fetch(`/api/collections?parent=${parent}&name=${name}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.text();
                let json_object = JSON.parse(data)
                setResult(json_object.data)
                let new_val = json_object.new_val


                const wordsArray = new_val.words.split(',');
                const arrayOfObjects = [];

                for (const [index, word] of wordsArray.entries()) {
                    const newObject = { id: index + 1, parent: parent, name: word };
                    arrayOfObjects.push(newObject);
                }
                setShowData(arrayOfObjects)

            } catch (error) {
                console.error(error);
            }
        }
        fetchSearchData();
    }
    // const handleEdit = (parent, name) => {
    //     router.push(`/word_edit/${parent}/${name}`)
    // }
    // const handleAdd = (parent, name) => {

    // }
    return (
        <>
            <Header />
            <div className='container'>
                <main style={{ paddingTop: 20 }}>
                    <div className='row'>
                        <div className='col-md-4'>
                            <table id="customers" style={{ borderCollapse: "collapse", width: "100%", overflowY: 100 }}>
                                <thead>
                                    <tr>
                                        <td>no</td>
                                        <td>collections name</td>
                                        <td>count</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result && result.map((val, index) => (
                                        <tr key={index} onClick={() => handleChange(val.id)}>
                                            <td>{index + 1}</td>
                                            <td>{val.name}</td>
                                            <td key={index}>{val.count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='col-md-4'>
                            <table id="customers">
                                <thead>
                                    <tr>
                                        <td>no</td>
                                        <td>words name</td>
                                        <td>delete</td>
                                        {/* <td>edit</td>
                                        <td>add</td> */}

                                    </tr>
                                </thead>
                                <tbody>
                                    {showData && showData.map((val, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td key={index} >{val.name}</td>
                                            <td><button className='btn btn-danger' onClick={() => handleDelete(val.parent, val.name)}>delete</button></td>
                                            {/* <td ><button className='btn btn-warning' onClick={() => handleEdit(val.parent, val.name)}>edit</button></td>
                                            <td><button className='btn btn-primary' onClick={() => handleAdd(val.parent, val.name)}>add</button></td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>

                </main>
            </div>
        </>

    );
}

export default Words;