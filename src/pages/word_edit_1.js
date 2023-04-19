import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';

const WordEdit = () => {

    const router = useRouter();
    const { parent, name } = router.query;

    return (
        <>

            <Header />
            <div>
                <h1>User ID: {parent}</h1>
                <h2>Post ID: {name}</h2>
            </div>
            <div className='container'>
                <div className="form-inline">
                    {/* <label htmlFor="search_value">search value:</label>
          <input type="text" placeholder="Enter search value..." value={svalue} onChange={handleValueChange} />
          <label htmlFor="search_count">search count:</label>
          <input type="number" placeholder="Enter search count..." value={scount} onChange={handleCountChange} />
          <button onClick={handleSubmit}>Search</button> */}
                </div>

            </div>

        </>
    )
}
export default WordEdit