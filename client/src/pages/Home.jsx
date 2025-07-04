import LoadingSpinner from '@/components/LoadingSpinner'
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Home = () => {
    const [query, setQuery] = useState()
    const navigate = useNavigate()
    const searchHandler = async () => {
        if (!query) {
            return toast.error("Search Field is Empty")
        }
        navigate(`/funds/${query}`)
    }
    return (
        <div className='px-5 md:px-27 h-screen'>
            <NavBar />

            <div className='h-fit w-full  flex justify-center items-center'>
                <div className='mt-70 md:mt-50 flex flex-col space-y-7'>
                    <h1 className='text-7xl font-semibold '>Search Mutual Funds</h1>
                    <div className='flex '>
                        <Input
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value)
                            }}
                            placeholder="Enter fund name or code"
                            className="h-15  text-xl flex-grow focus-visible:ring-0 placeholder:text-lg placeholder:font-normal rounded-r-xs " />
                        <Button
                            onClick={() => searchHandler()}
                            className={'h-15 text-2xl font-normal px-5 rounded-l-xs'}>Search
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home 