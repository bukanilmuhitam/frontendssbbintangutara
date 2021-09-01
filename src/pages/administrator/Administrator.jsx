import React, { Fragment } from 'react';
import Candidate from '../../component/administrator/content/Candidate';

const Administrator = () => {

    return(
        <Fragment>
            
            <header className="bg-white p-6 bg-red-700">
                <div className="mx-8 flex justify-between">
                    <h3 className="font-semibold text-lg uppercase text-white">Admin Panel</h3>
                </div>
            </header>
            <Candidate />
        </Fragment>
    )
}

export default Administrator;