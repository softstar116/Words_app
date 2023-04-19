import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';

const WordEdit = () => {

    const router = useRouter();
    const { parent, name } = router.query;
    const [svalue, setSvalue] = useState()
    return (
        <>

            <Header />
            <div>
                <h1>User ID: {parent}</h1>
                <h2>Post ID: {name}</h2>
            </div>
            <div className='container'>
                <div className="form-inline">
                    <label htmlFor="edit_word">Edit value:</label>
                    <input type="text" placeholder="Enter Edit value..." value={svalue} onChange={handleValueChange} />

                    <button onClick={handleSubmit}>Search</button>
                </div>

            </div>

        </>
    )
}
export default WordEdit