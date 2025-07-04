import React from 'react'
import { Card, CardTitle } from './ui/card'
import { useNavigate } from 'react-router-dom'

const Fund = ({ fund }) => {
    const navigate = useNavigate()
    console.log(fund);

    return (
        <div key={fund.schemeCode} onClick={() => { navigate(`/${fund.schemeCode}`) }} >
            <Card className={'py-5 px-10'}>
                <CardTitle className={'text-xl text-gray-600 font-semibold'}>{fund?.schemeName || fund?.schemeTitle}</CardTitle>
            </Card>
        </div>
    )
}

export default Fund