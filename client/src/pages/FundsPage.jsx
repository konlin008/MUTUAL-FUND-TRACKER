import Fund from '@/components/Fund';
import LoadingSpinner from '@/components/LoadingSpinner';
import NavBar from '@/components/NavBar';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const FundsPage = () => {
    const { query } = useParams()
    const [funds, setFunds] = useState([])
    const [loading, setLoading] = useState()
    const navigate = useNavigate()
    const getFunds = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_FUND_API}/search?q=${query}`)
            if (res?.data) {
                setFunds(res.data)

            }
        } catch (error) {
            toast.error(error?.response.data.message || "SomeThing went Wrong")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getFunds()

    }, [])
    return (
        <div className='px-5 md:px-50 pb-20  '>
            <NavBar />

            {
                loading ? <LoadingSpinner /> : <div className='mt-10 mx-7 md:mx-25'>
                    <ArrowLeft onClick={() => { navigate('/') }} className='mb-10    h-10 w-10 rounded-full   ' />
                    {
                        funds.length === 0 ? <h1 className=' font-bold text-xl'>No Fund for {`"${query}"`}</h1> : <>
                            <h1 className=' font-bold text-xl'>Results For "{query}" </h1>
                            <h2 className='mb-10 '>showing results for "{query}"</h2>
                            <div className=' flex flex-col space-y-3'>
                                {
                                    funds?.map((fund) => {
                                        return <Fund fund={fund} key={fund.schemeCode} />
                                    })
                                }
                            </div>
                        </>
                    }

                </div>
            }


        </div>
    )
}

export default FundsPage