import React, { useState } from 'react';
import {ReactComponent as HeroImage } from '../../images/hero-image.svg';
import FormGroup from '../allpages/FormGroup';
import PageButton from '../allpages/PageButton';
import axios from 'axios';

import {Configweb as config, ConfigWeb } from '../../configWeb.js';


const Hero = () => {

    const [fullname , setFullname ] = useState('');
    const [address , setAdress ] = useState('');
    const [placeOfBirth ,  setPlaceOfBirth] = useState('');
    const [dateOfBirth ,  setDateOfBirth ] = useState('');
    const [incomeParent ,  setIncomeParent ] = useState('');
    const [height , setHeight ] = useState('');
    const [weight , setWeight ] = useState('');
    const [ loading , setLoading] = useState(false);
    const [ msg , setMsg ] = useState('');
    const [ msgStatus , setMsgStatus ] = useState('');
    const [inputError , setInputError] = useState('');
    const [msgInputError , setMsgInputError] = useState('');
  
    const saveData = async() => {

        setLoading(true);

        if(fullname === ''){
            setInputError('fullname');
            setMsgInputError('Nama lengkap tidak boleh kosong');
            setLoading(false);
            return false;
        }

        if(placeOfBirth === ''){
            setInputError('placebirth');
            setMsgInputError('Tempat lahir tidak boleh kosong');
            setLoading(false);
            return false;
        }

        if(dateOfBirth === ''){
            setInputError('datebirth');
            setMsgInputError('Tanggal lahir tidak boleh kosong');
            setLoading(false);
            return false;
        }

        if(height === ''){
            setInputError('height');
            setMsgInputError('Tinggi tidak boleh kosong');
            setLoading(false);
            return false;
        }

        if(weight === ''){
            setInputError('weight');
            setMsgInputError('Berat badan tidak boleh kosong');
            setLoading(false);
            return false;
        }

        if(incomeParent === ''){
            setInputError('parentincome');
            setMsgInputError('Gaji orantua tidak boleh kosong');
            setLoading(false);
            return false;
        }

        const data = new URLSearchParams();
        data.append('fullname' , fullname);
        data.append('address' , address);
        data.append('place_of_birth' , placeOfBirth);
        data.append('date_of_birth' , dateOfBirth);
        data.append('height' , height);
        data.append('weight' , weight);
        data.append('parent_income' , incomeParent);
        axios.post(`${ConfigWeb.urlRestApi}/students` ,data , {
            headers : {
                "x-api-key" : ConfigWeb.apiKey,
            }
        }).then(response => {
            const res = response.data;
            setFullname('');
            setAdress('');
            setPlaceOfBirth('');
            setDateOfBirth('');
            setHeight('');
            setWeight('');
            setIncomeParent('');
            setMsgStatus('success');
            setInputError('');
            setMsgInputError('');
            setMsg(res.message);

        }).catch((error) => {
          
            setMsgStatus('error');
            setMsg(error.response.data.messages.error);

        }).finally(() => {
            setLoading(false);
        });
        
    }

   

    return(
        <section className="mx-6 my-6 lg:mx-24 lg:my-10">
            <div className="flex">

                {/* CTA */}
                <div className="flex-1">
                    <h3 className="text-2xl font-bold uppercase"><span className="text-red-700">upgrade skillmu, raih mimpimu dan</span> berprestasilah bersama kami!</h3>
                    <p className="text-md capitalize italic mt-4">
                        "Satu-satunya batasan untuk meraih mimpi kita adalah keragu-raguan kita akan hari ini. Marilah kita maju dengan keyakinan yang aktif dan kuat" - Franklin Roosevelt
                    </p>
                    <div className="mt-6">
                      {/* FORM */}
                        <div className="w-full flex flex-col lg:flex-row lg:space-x-2">
                            <div className="w-full lg:w-1/2">
                                <FormGroup label="*Nama lengkap" placeholder="Ketik nama lengkap" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                                <div className={inputError === 'fullname' ? 'flex' : 'hidden'}>
                                    <small className="text-red-400 italic">{msgInputError}</small>
                                </div>

                                <FormGroup label="Alamat (optional)" placeholder="Ketik alamat" margin="my-4" value={address} onChange={(e) => setAdress(e.target.value)} />
                                

                                <FormGroup label="Gaji orangtua" placeholder="Ketik gaji orangtua" margin="my-4" value={incomeParent} onChange={(e) => {
                                     const re = /^[0-9 .,\b]+$/;
                                     if (e.target.value === '' || re.test(e.target.value)) {
                                       setIncomeParent(e.target.value);
                                     }
                                }}  />
                                <div className={inputError === 'parentincome' ? 'flex' : 'hidden'}>
                                    <small className="text-red-400 italic">{msgInputError}</small>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="w-full flex space-x-2">
                                    
                                    <div className="flex">
                                        <FormGroup label="Tempat lahir" placeholder="Tempat lahir" type="text" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} />
                                        <div className={inputError === 'placebirth' ? 'flex' : 'hidden'}>
                                            <small className="text-red-400 italic">{msgInputError}</small>
                                        </div>
                                    </div>


                                    <div>
                                        <FormGroup label="Tanggal lahir" type="date" max="3000-01-01" onfocus="this.max=new Date().toISOString().split('T')[0]" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}  />
                                        <div className={inputError === 'datebirth' ? 'flex' : 'hidden'}>
                                            <small className="text-red-400 italic">{msgInputError}</small>
                                        </div>
                                    </div>

                                </div>
                              
                               
                                <div className="flex space-x-2 my-4">
                                    <FormGroup label="Tinggi badan" placeholder="Tinggi badan (Cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)}  />
                                    <div className={inputError === 'height' ? 'flex' : 'hidden'}>
                                        <small className="text-red-400 italic">{msgInputError}</small>
                                    </div>

                                    <FormGroup label="Berat badan" placeholder="Berat badan (Kg)" type="text" value={weight} onChange={(e) =>  {
                                            const re = /^[0-9 .,\b]+$/;
                                            if (e.target.value === '' || re.test(e.target.value)) {
                                                setWeight(e.target.value);
                                            }
                                    }} />
                                    <div className={inputError === 'weight' ? 'flex' : 'hidden'}>
                                        <small className="text-red-400 italic">{msgInputError}</small>
                                    </div>
                                    
                                </div>
                                <div className={ msg !== '' ? 'flex' : 'hidden' } >
                                   <p className={msgStatus === 'error' ? 'text-center uppercase text-red-400 text-md font-semibold' : 'text-center text-green-400 text-md font-semibold uppercase'}>
                                       {msg}
                                   </p>
                                </div>
                                <div className="mt-4">
                                    {
                                        loading ?
                                            <button disabled className="py-2 px-4 uppercase font-semibold rounded-md bg-red-500 text-white w-full">Mohon tunggu ...</button>
                                        :
                                            <PageButton namebutton="daftar sekarang" classname="bg-red-700 text-white w-full" onClick={saveData} />
                                    }

                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* IMAGES */}
                <div className="hidden lg:flex w-2/5 justify-end">
                   <HeroImage className="bg-cover" />
                </div>

            </div>
        </section>
    )
}

export default Hero;