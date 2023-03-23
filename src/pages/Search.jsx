import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ListingItem from '../components/ListingItem'
import Spinner from '../components/Spinner'
import { db } from '../firebase'

export default function Search() {
  const[listings,setListings]=useState(null)
  const[searchId,setSearchId] = useState('')
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
    console.log(searchId)

    try {
        const listingRef = collection(db,'listings')
        const q = query(listingRef, where('addressArray','array-contains',searchId),orderBy('timestamp','desc'))
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

  function onChange(e){
        let boolean = null
        if(e.target.value==='true'){
        boolean=true
        }
        if(e.target.value==='false'){
        boolean=false 
        }
        //Text or Boolean or Number
        if(!e.target.files){
            //if value exists then bool is true, then id=value. Eg: type=rent
            [e.target.id]= boolean ?? e.target.value
            setSearchId(e.target.value.toLowerCase())
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
            <input type="text" id ='searchId' placeholder='Eg: Chennai' value={searchId} onChange={onChange} required className='w-full text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'/>
            <button className='ml-2 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'>Search</button>
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
