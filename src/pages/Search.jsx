import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase'

export default function Search() {
  const[listings,setListings]=useState(null)
  const[searchId,setSearchId] = useState('')
  const[beds,setBeds]=useState(0)
  const[type,setType]=useState('rent')
  const[baths,setBaths]=useState(0)
  const[furnished,setFurnished]=useState(false)
  const[parking,setParking]=useState(false)
  const[loading,setLoading]=useState(false)
  const[lastFetchedListing, setLastFetchedListing] = useState(null)
/*   useEffect(()=>{
    async function fetchListings(){
      try {
        const listingRef = collection(db,'listings')
        const q = query(listingRef, where('address',' ','LIKE',' ',''%searchId%''),orderBy('timestamp','desc'),limit(8))
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisible)
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        //toast.error('Could not fetch listings')
      }
  }
  fetchListings()
},[])
 */
/*     async function onFetchMoreListings(){
        try {
        const listingRef = collection(db,'listings')
        const q = query(listingRef, where('offer','==',true),orderBy('timestamp','desc'),startAfter(lastFetchedListing),limit(4))
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisible)
        const listings = []
        querySnap.forEach((doc)=>{
            return listings.push({
            id: doc.id,
            data: doc.data()
            })
        })
        setListings((prevState)=>[...prevState,...listings])
        setLoading(false)
        } catch (error) {
        //toast.error('Could not fetch listings')
        }
    } */

  async function onSubmit(e){
    e.preventDefault()
    setLoading(true)

    try {
        const listingRef = collection(db,'listings')
        console.log(type)
        console.log(beds)
        console.log(baths)
        console.log(parking)
        console.log(furnished)
        const q = query(listingRef, where('addressArray','array-contains',searchId),where('bathrooms','==',baths),where('bedrooms','==',beds),where('parking','==',parking),where('furnished','==',furnished),where('type','==',type),orderBy('timestamp','desc'))
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisible)
        const listings = []
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }

  }

    if(loading){
        return <Spinner/>
    }

  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold mb-6'>Search For Properties</h1>
      <form onSubmit={onSubmit} >
        <div className='flex'>
            <input type="text" id ='searchId' placeholder='Eg: Chennai' value={searchId} onChange={(e)=>setSearchId(e.target.value.toLowerCase())} required className='w-full text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'/>
            <button className='ml-2 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Search</button>
        </div>

      
        <div className='mt-2 flex justify-center'>


                <button type='button' id='type' value='sale' onClick={()=>setType('sale')} className={`mr-3 px-7 py-3 font-medium text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${
                    type==='rent' ? 'bg-white text-black':'bg-slate-600 text-white'
                }`}>
                    Sale
                </button>

                <button type='button' id='type' value='rent' onClick={()=>setType('rent')} className={`mr-3 px-7 py-3 font-medium text-sm shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${
                    type==='sale' ? 'bg-white text-black':'bg-slate-600 text-white'
                }`}>
                    Rent
                </button>

                <div className='flex mr-3 items-center'>
                  <p className='font-medium text-sm mr-1'>Beds</p>
                  <input type="number" id='beds' value={beds} onChange={(e)=>setBeds(e.target.value)}  max='50' required className=' px-7 py-3 font-medium text-sm w-24 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray focus:bg-white focus:border-slate-600 text-center'/>
                </div>

                <div className='flex mr-3 items-center'>
                  <p className='font-medium text-sm mr-1'>Baths</p>
                  <input type="number" id='baths' value={baths} onChange={(e)=>setBaths(e.target.value)}  max='50' required className=' px-7 py-3 font-medium text-sm w-24 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray focus:bg-white focus:border-slate-600 text-center'/>
                </div>

                <div>
                  <button type='button' id='parking' value={parking} onClick={()=>setParking(!parking)} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${
                      !parking ? 'bg-white text-black':'bg-slate-600 text-white'
                  }`}>
                      Parking
                  </button>
                </div>

                <div>
                  <button type='button' id='furnished' value={furnished} onClick={()=>setFurnished(!furnished)} className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${
                      !furnished ? 'bg-white text-black':'bg-slate-600 text-white'
                  }`}>
                      Furnished
                  </button>
                </div>
                

        </div>


      </form>

      {loading ? (<Spinner/>) : listings && listings.length>0 ? (
      <>
        <main>
         <ul className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {listings.map((listing)=>(
            <ListingItem key={listing.id} id={listing.id} listing={listing.data}/>
          ))}
         </ul> 
        </main>
        {/* {lastFetchedListing && (
          <div className='flex justify-center items-center'>
            <button onClick = {onFetchMoreListings} className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'>Load more</button>
          </div>
        )} */}
      </>):(<p>No listings matching search criteria</p>)}
    </div>
  )
}
