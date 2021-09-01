import React, { Fragment } from 'react';
import PageTitle from '../component/allpages/PageTitle';
import HeaderPage from '../component/homepage/HeaderPage';
import Hero from '../component/homepage/Hero';

const HomePage = () => {
    return(
        <Fragment>
            <PageTitle title="Sekolah Sepak Bola Bintang Utara - Meraih Mimpi Bersama" />
            <HeaderPage />
            <Hero />
        </Fragment>
    )
}

export default HomePage;