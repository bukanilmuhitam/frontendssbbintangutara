import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import PageButton from '../../allpages/PageButton';
import { ConfigWeb } from '../../../configWeb';
import PageTitle from '../../allpages/PageTitle';
import FormGroup from '../../allpages/FormGroup';

const Candidate = () => {

    const [items , setItems ] = useState([]);
    const [loading , setLoading ] = useState(true);
    const [ msg , setMsg ] = useState('');
    const [ msgStatus , setMsgStatus ] = useState('');
    const [inputError , setInputError] = useState('');
    const [msgInputError , setMsgInputError] = useState('');
    const [action, setAction ] = useState('view');
    const [detail , setDetail ] = useState([]);
    const [fullname , setFullname ] = useState('');
    const [address , setAdress ] = useState('');
    const [placeOfBirth ,  setPlaceOfBirth] = useState('');
    const [dateOfBirth ,  setDateOfBirth ] = useState('');
    const [incomeParent ,  setIncomeParent ] = useState('');
    const [height , setHeight ] = useState(0);
    const [weight , setWeight ] = useState(0);

    const getData = async () => {
        axios.get(`${ConfigWeb.urlRestApi}/students` , {
            headers : {
                "x-api-key" : ConfigWeb.apiKey,
            }
        }).then(response => {
            
            setItems(response.data);
            setLoading(false);

        }).finally(() => {
            setLoading(false);
        });
    }

    function showData(id){
        axios.get(`${ConfigWeb.urlRestApi}/students/${id}` , {
            headers : {
                "x-api-key" : ConfigWeb.apiKey,
            }
        }).then(response => {
            
            setDetail(response.data);
            setFullname(response.data.fullname);
            setAdress(response.data.address);
            setPlaceOfBirth(response.data.place_of_birth);
            setDateOfBirth(response.data.date_of_birth);
            setHeight(response.data.height);
            setWeight(response.data.weight.replace('.' , ','));
            setIncomeParent(response.data.parent_income);
            // console.log(response.data);

        }).finally(() => {


        });
    }

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

        if(height === 0){
            setInputError('height');
            setMsgInputError('Tinggi tidak boleh kosong');
            setLoading(false);
            return false;
        }

        if(weight === 0){
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
            setAction('view');

        }).catch((error) => {
            
         
            alert(error.response.data.messages.error);

        }).finally(() => {
            setLoading(false);
            getData();
        });
        
    }

   function updateData(id) {

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
            setInputError('height');
            setMsgInputError('Berat badan tidak boleh kosong');
            setLoading(false);
            return false;
        }

        if(incomeParent === ''){
            setInputError('height');
            setMsgInputError('Gaji orantua tidak boleh kosong');
            setLoading(false);
            return false;
        }

        // const data = new URLSearchParams();
        const data = {
            "fullname" : fullname,
            "address" : address,
            "place_of_birth" : placeOfBirth,
            "date_of_birth" : dateOfBirth,
            "height" : height,
            "weight" : weight,
            "parent_income" : incomeParent,
        };
      
        axios.put(`${ConfigWeb.urlRestApi}/students/${id}` ,data , {
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
            setAction('view');
        }).catch((error) => {
          
           alert(error.response.data.messages.error);

        }).finally(() => {
            setLoading(false);
            getData();

        });
        
    }

    function deleteData(value){


        var r = window.confirm("Apakah anda yakin ingin hapus?");
        if (r === true) {
    
            axios.delete(`${ConfigWeb.urlRestApi}/students/${value}` , {
                headers : {
                    'x-api-key' : ConfigWeb.apiKey,
                }
            }).then(response => {
                const res = response.data;
                if(res.error !== null){
                        setMsgStatus('error');
                }else{
                        setMsgStatus('success');
                }
                setMsg(res.message);
                setLoading(false);
                setAction('view');
            }).finally(() => {
                getData();
            });

        }else{
            setLoading(false);
        }

    }

    function formatPrice(value) {
        let val = (value / 1).toFixed(0).replace('.', ',');
        let hasil = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return hasil;
    }

    function formatDateIndonesia(value){
        let date  = value.split("-");
        let bulan = parseInt(date[1]);
        var bulanArray = ['Januari', 'Februari', 'Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        
        return `${date[2]} ${bulanArray[bulan]} ${date[0]}`;
    }

    useEffect(() => {
        getData();

    } , []);

    return(
       <Fragment>
           
            <div className="my-8 lg:max-w-screen-lg lg:mx-auto lg:my-16 w-full overflow-x-scroll lg:overflow-visible">
              
                <div className={ msg !== '' ? 'flex my-6' : 'hidden' } >
                    <p className={msgStatus === 'error' ? 'uppercase text-red-400 text-md font-semibold' : 'text-green-400 text-md font-semibold uppercase'}>
                        {msg}
                    </p>
                </div>
                
                {
                    action === 'view' ?
                        <div className="mx-2">
                            <PageTitle title="Data calon siswa" />
                            <div className="flex justify-end">
                                <PageButton onClick={() => {
                                setAction('add');
                                setMsg('');
                                }} classname="bg-green-700 text-white" namebutton="tambah data" />
                            </div>
                            <div className="mt-4 hidden lg:block">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-2 text-sm border w-6">#</th>
                                            <th className="py-2 px-2 text-sm border">Nama lengkap</th>
                                            <th className="py-2 px-2 text-sm border">Tanggal Lahir</th>
                                            <th className="py-2 px-2 text-sm border ">Tinggi Badan</th>
                                            <th className="py-2 px-2 text-sm border ">Berat Badan</th>
                                            <th className="py-2 px-2 text-sm border ">Gaji Orang Tua</th>
                                            <th className="py-2 px-2 text-sm border">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {   
                                            loading ?
                                                <tr>
                                                    <td colSpan="7">Mohon tunggu...</td>
                                                </tr>
                                            :
                                            items.length === 0 ?
                                                <tr>
                                                    <td colSpan="7">Data kosong</td>
                                                </tr>
                                            :
                                            items.map(( item , index ) =>
                                                <tr key={index}>
                                                    <td className="py-2 px-2 text-sm border text-center">{index + 1}</td>
                                                    <td className="py-2 px-2 text-sm border text-left capitalize">{item.fullname}</td>
                                                    <td className="py-2 px-2 text-sm border text-center capitalize">
                                                        <p>{item.place_of_birth}, {formatDateIndonesia(item.date_of_birth)}</p>
                                                    </td>
                                                    <td className="py-2 px-2 text-sm border text-center">{item.height}cm</td>
                                                    <td className="py-2 px-2 text-sm border text-center">{item.weight}kg</td>
                                                    <td className="py-2 px-2 text-sm border text-right">Rp. {formatPrice(item.parent_income)}</td>
                                                    <td className="py-2 px-2 text-sm border text-right">
                                                        <PageButton  onClick={() => {
                                                            showData(item.id);
                                                            setAction('add');
                                                            setMsg('');
                                                        }} classname="bg-green-500 text-white" namebutton="lihat" />
                                                        &nbsp;
                                                        <PageButton  onClick={() => {
                                                            deleteData(item.id)
                                                            setMsg('');
                                                        }} classname="bg-red-500 text-white" namebutton="hapus" />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 block lg:hidden">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-2 text-sm border w-6">#</th>
                                            <th className="py-2 px-2 text-sm border">Nama lengkap</th>
                                            <th className="py-2 px-2 text-sm border">#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {   
                                            loading ?
                                                <tr>
                                                    <td colSpan="7">Mohon tunggu...</td>
                                                </tr>
                                            :
                                            items.length === 0 ?
                                                <tr>
                                                    <td colSpan="7">Data kosong</td>
                                                </tr>
                                            :
                                            items.map(( item , index ) =>
                                                <tr key={index}>
                                                    <td className="py-2 px-2 text-sm border text-center">{index + 1}</td>
                                                    <td className="py-2 px-2 text-sm border text-left capitalize">{item.fullname}</td>
                                                    <td className="py-2 px-2 text-sm border text-right">
                                                        <PageButton  onClick={() => {
                                                            showData(item.id);
                                                            setAction('add');
                                                            setMsg('');
                                                        }} classname="bg-green-500 text-white" namebutton="lihat" />
                                                        &nbsp;
                                                        <PageButton  onClick={() => {
                                                            deleteData(item.id)
                                                            setMsg('');
                                                        }} classname="bg-red-500 text-white" namebutton="hapus" />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    :
                        null
                }

                {
                    action === 'add' ?
                        <div className="mx-2">
                              {detail.length === 0 ?
                                    <h3 className="text-center text-lg uppercase font-semibold">Form Tambah Siswa Baru</h3>
                                    
                                :
                                    <h3 className="text-center text-lg uppercase font-semibold">Data Siswa {detail.fullname}</h3>
                            }
                            <div className="mt-6">
                                <FormGroup label="*Nama lengkap" placeholder="Ketik nama lengkap" value={fullname} onChange={(e) => setFullname(e.target.value)}  />
                                <div className={inputError === 'fullname' ? 'flex' : 'hidden'}>
                                    <small className="text-red-400 italic">{msgInputError}</small>
                                </div>
                                <FormGroup label="Alamat (optional)" placeholder="Ketik alamat" margin="my-4" value={address} onChange={(e) => setAdress(e.target.value)} />
                                <FormGroup label="Gaji orangtua" placeholder="Ketik gaji orangtua" margin="my-4" value={incomeParent} onChange={(e) => setIncomeParent(e.target.value)} />
                                <div className={inputError === 'parentincome' ? 'flex' : 'hidden'}>
                                    <small className="text-red-400 italic">{msgInputError}</small>
                                </div>
                                <FormGroup label="Tempat lahir" placeholder="Tempat lahir" type="text" value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} margin="my-4" />
                                <div className={inputError === 'placebirth' ? 'flex' : 'hidden'}>
                                        <small className="text-red-400 italic">{msgInputError}</small>
                                </div>
                                <div className="flex items-center">
                                   <div className="flex-1">
                                    <FormGroup label="Tanggal lahir" type="date" max="3000-01-01" onfocus="this.max=new Date().toISOString().split('T')[0]" value={dateOfBirth}  onChange={(e) => setDateOfBirth(e.target.value)} />
                                        <div className={inputError === 'datebirth' ? 'flex' : 'hidden'}>
                                                <small className="text-red-400 italic">{msgInputError}</small>
                                        </div>
                                   </div>
                                   {
                                       detail.length === 0 ?
                                            null
                                       :
                                        <div className="flex flex-col space-x-2">
                                        <label htmlFor="" className="text-sm uppercase mb-2">Umur</label>
                                        <input type="text" className="py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-700 text-sm" disabled value={detail.age} />
                                        </div>
                                   }
                                  
                                </div>
                                <FormGroup label="Tinggi badan" placeholder="Tinggi badan (Cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)}  margin="my-4" />
                                    <div className={inputError === 'height' ? 'flex' : 'hidden'}>
                                        <small className="text-red-400 italic">{msgInputError}</small>
                                    </div>
                                <FormGroup label="Berat badan" placeholder="Berat badan (Kg)" type="text" value={weight} onChange={(e) => setWeight(e.target.value)} margin="my-4" />
                                <div className={inputError === 'weight' ? 'flex' : 'hidden'}>
                                        <small className="text-red-400 italic">{msgInputError}</small>
                                </div>
                            </div>
                            
                            {detail.length === 0 ?
                                    null
                                :
                                    <div className="my-8">
                                        <hr />
                                        <h3 className="mt-2 font-semibold">INFORMASI TAMBAHAN :</h3>
                                        <ul>
                                            <li>BMI : {detail.bmi}</li>
                                            <li>Deskripsi : {detail.description_bmi}</li>
                                        </ul>
                                    </div>
                            }
                          
                           

                            <div className="mb-20">
                                    <div className="mb-16 flex space-x-4">
                                        <PageButton classname="border border-black" namebutton="kembali" onClick={() => {
                                            setDetail([]);
                                            setFullname('');
                                            setAdress('');
                                            setPlaceOfBirth('');
                                            setDateOfBirth('');
                                            setHeight('');
                                            setWeight('');
                                            setIncomeParent('');
                                            setAction('view');
                                        }} />
                                        {
                                            loading ?
                                                <button disabled className="py-2 px-4 uppercase font-semibold rounded-md bg-red-500 text-white">Mohon tunggu ...</button>
                                            :
                                                <PageButton namebutton={detail.length === 0 ? 'daftarkan' : 'update'} classname="bg-red-700 text-white" onClick={detail.length === 0 ? saveData : updateData} />
                                        }
                                    </div>
                            </div>
                        </div>
                    :
                        null
                }


            </div>
       </Fragment>
    )
}

export default Candidate;