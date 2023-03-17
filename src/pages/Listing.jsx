
    import { doc, getDoc, updateDoc } from 'firebase/firestore'
    import React, { useEffect, useState } from 'react'
    import { useParams } from 'react-router-dom'
    import Spinner from '../components/Spinner'
    import { db } from '../firebase'
    import {Swiper, SwiperSlide} from 'swiper/react'
    import SwiperCore, {EffectFade, Autoplay, Navigation, Pagination} from 'swiper'
    import 'swiper/css/bundle'
    import {FaShare, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair, FaHeart} from 'react-icons/fa'
    import {getAuth} from 'firebase/auth'
    import Contact from '../components/Contact'
    import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

    export default function Listing() {
        const auth=getAuth()
        let[count,setCount] = useState(0)
        const params = useParams()
        const[listing,setListing] = useState(null)
        const[like,setLike] = useState(false)
        const[loading,setLoading] = useState(true)
        const[shareLinkCopied, setShareLinkCopied] = useState(false)
        const[contactOwner, setContactOwner] = useState(false)
        SwiperCore.use([Autoplay, Navigation, Pagination])
        useEffect(()=>{
            async function fetchListing(){
                const docRef = doc (db , 'listings', params.listingId)
                const docSnap = await getDoc (docRef)
                if(docSnap.exists()){
                    setListing(docSnap.data())
                    if(count===0){
                        //execute only on first load
                        try {
                        listing.favourite.includes(auth.currentUser.uid) ? setLike(true):setLike(false)
                        setCount(1)
                        } catch (error) {}
                        
                    }
                    
                    setLoading(false)
                }
            }
            fetchListing()

        },[params.listingId, listing])

        async function addFavourite(){
            const uid=auth.currentUser.uid
            
            const docRef = doc(db ,'listings',params.listingId)
            const docSnap = await getDoc(docRef)
            let formDataCopy=docSnap.data()

            let favourite = formDataCopy.favourite
            
            //if: id not present then add else: delete the id
            if(!favourite.includes(uid))
            {
                setLike(true)
                favourite.push(uid)
                
            } else{
                setLike(false)
                for( var i = 0; i < favourite.length; i++){
                    if ( favourite[i] === auth.currentUser.uid) {
                        favourite.splice(i, 1); 
                    }
                }
            }

            delete formDataCopy.favourite
            formDataCopy={
                ...formDataCopy,
                favourite
            }
            console.log(formDataCopy)
            await updateDoc(docRef, formDataCopy)
            setLoading(false)
        }
        if(loading){
            return <Spinner/>
        }
    return (
        <main>
            <Swiper slidesPerView={1} navigation pagination={{type:'progressbar'}} effect='fade' modules = {[EffectFade]} autoplay={{delay:3000}}>
                {listing.imgUrls.map((url,index)=>(
                    <SwiperSlide key= {index}>
                        <div className='relative w-full overflow-hidden h-[300px]' style= {{
                            background:`url(${listing.imgUrls[index]})center no-repeat`,
                            backgroundSize: 'cover',
                            }}>
                            
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper> 
            <div className='fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center'>
            <FaShare className='text-lg text-slate-500' onClick={()=>{
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(()=>{
                    setShareLinkCopied(false)
                },2000)
            }}/> 
            </div> 
            {shareLinkCopied && (
                <p className='fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2'>Link Copied</p>
            )}  

            <div className='m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5'>                         
                <div className='w-full'>
                    <p className='text-2xl font-bold mb-3 text-blue-900'>
                        {listing.name} - Rs. {listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{listing.type==='rent' ?' /month' : ''}
                    </p>
                    <p className='flex items-center mt-6 mb-3 font-semibold'><FaMapMarkerAlt className='text-green-700 mr-1'/>{listing.address}</p>
                    <div className='flex justify-start items-center space-x-4 w-[100%]'>
                        <p className='bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md'>{listing.type==='rent' ? 'Rent' : 'Sale'}</p>
                        {listing.offer && (
                            <p className='w-full  max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md'>Rs. {(+listing.regularPrice - +listing.discountedPrice).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Discount</p>   
                        )}

                        <button className={`cursor-pointer ${like ? 'text-red-600':'text-slate-400'}`}  onClick={addFavourite}><FaHeart/></button>  

                    </div>
                    <p className='mt-3 mb-3'> 
                        <span className='font-semibold'>Description - </span>
                        {listing.description}
                    </p>
                    <ul className='flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-9'>
                        <li className='flex items-center whitespace-nowrap'>
                            <FaBed className='text-lg mr-1'/>
                            {+listing.bedrooms>1 ? `${listing.bedrooms} Beds` : '1 Bed'}
                        </li>
                        <li className='flex items-center whitespace-nowrap'>
                            <FaBath className='text-lg mr-1'/>
                            {+listing.bathrooms>1 ? `${listing.bedrooms} Baths` : '1 Bath'}
                        </li>
                        <li className='flex items-center whitespace-nowrap'>
                            <FaParking className='text-lg mr-1'/>
                            {+listing.parking ? 'Parking Spot' : 'No parking'}
                        </li>
                        <li className='flex items-center whitespace-nowrap'>
                            <FaChair className='text-lg mr-1'/>
                            {+listing.furnished ? 'Furnished' : 'Not furnished'}
                        </li>
                    </ul>
                    {listing.userRef !== auth.currentUser?.uid && !contactOwner &&
                    (
                        <div className='mt-6'>
                        <button onClick={()=>setContactOwner(true)}className='px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out'>Contact Owner</button>
                        </div>
                    )}
                    {contactOwner && (<Contact userRef={listing.userRef} listing={listing}/>)}
                </div>


                <div className='w-full h-[200px] md:h-[400px] z-10 overflow-x-hidden mt-6 md:mt-0 md:ml-2'>
                <MapContainer center={[listing.geolocation.lat, listing.geolocation.lng]} zoom={13} scrollWheelZoom={false} style={{height:'100%', width:'100%'}}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
                    <Popup>
                        {listing.address}
                    </Popup>
                    </Marker>
                </MapContainer>
                </div>
            </div>
        </main>
    )
    }
