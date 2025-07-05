import LoadingSpinner from '@/components/LoadingSpinner'
import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const FundDetails = () => {
    const { schemeCode } = useParams()
    const [fundDetails, setFundDetails] = useState({})
    const [fundData, setFundData] = useState()
    const [loading, setLoading] = useState()
    const [isLoading, setIsLoading] = useState()

    const fetchFundDetails = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_FUND_API}/${schemeCode}/latest`)
            if (res?.data) {
                setFundDetails(res.data.meta)
                setFundData(res.data.data)

            }
        } catch (e) {
            toast.error(e?.response.data.message || "Something Went Wrong")
        } finally {
            setLoading(false)
        }
    }
    useState(() => {
        fetchFundDetails()
    }, [])
    const saveFundHandler = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post(`https://mutual-fund-tracker-1-29r0.onrender.com/api/v1/user/saveFund`, { schemeCode, schemeTitle: fundDetails?.scheme_name }, { withCredentials: true })
            if (res?.data) {
                toast.success(res.data.message)

            }

        } catch (error) {
            toast.error(error?.response.data.message || "Something Went Wrong")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='px-5 md:px-50 pb-20 h-screen'>
            <NavBar />
            {
                loading ? <LoadingSpinner /> : <div className='  mt-20 flex flex-col space-y-10'>
                    <h1 className='md:w-[70%] font-semibold text-5xl'> {fundDetails?.scheme_name}</h1>
                    <Card className={'bg-gray-100'}>
                        <CardContent className='text-xl flex flex-col space-y-5'>
                            <CardTitle >
                                <span className='text-2xl'>Fund House:</span><span className='text-xl font-normal'> {fundDetails?.fund_house}</span>
                            </CardTitle>
                            <p >  <span className='text-2xl font-semibold'>Scheme Type: </span> {fundDetails?.scheme_type} </p>
                            <p >  <span className='text-2xl font-semibold'>Scheme Category: </span> {fundDetails?.scheme_category} </p>
                            <p >  <span className='text-2xl font-semibold'>ISIN(Growth): </span> {fundDetails?.isin_growth ? fundDetails?.isin_growth : 'NA'} </p>
                            <p >  <span className='text-2xl font-semibold'>ISIN(Dividend Reinvestment): </span> {fundDetails?.isin_div_reinvestment ? fundDetails?.isin_div_reinvestment : 'NA'} </p>
                        </CardContent>
                        <CardFooter className={'flex flex-col'}>
                            <h2 className='text-xl'> <span className='text-2xl font-semibold'>Net Asset Value:</span> ₹{parseFloat(fundData?.[0].nav).toFixed(1)}</h2>
                            <span> Last updated: {fundData?.[0].date} </span>
                            <Button disabled={isLoading} onClick={() => { saveFundHandler() }} className={'mt-3'}>{
                                isLoading ? (<>
                                    <Loader2 className='h-4 w-4 animate-spin' /> Please Wait
                                </>) : 'Save Fund '
                            }</Button>
                        </CardFooter>
                    </Card>

                </div >
            }

        </div >
    )
}

export default FundDetails