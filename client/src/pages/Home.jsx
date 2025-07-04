import NavBar from '@/components/NavBar'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        const fetchFunds = async () => {
            if (query.length < 1) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await fetch(`https://api.mfapi.in/mf/search?q=${query}`);
                const data = await res.json();
                setSuggestions(data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchFunds();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSelectFund = (fund) => {
        navigate(`/${fund.schemeCode}`)
    };

    return (
        <div className='px-5 md:px-27 h-screen'>
            <NavBar />

            <div className='h-fit w-full flex justify-center items-center'>
                <div className='mt-70 md:mt-50 flex flex-col space-y-7 w-full max-w-3xl'>
                    <h1 className='text-4xl md:text-6xl font-semibold text-center'>Search Mutual Funds</h1>

                    <div className='relative'>
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Enter fund name or code"
                            className="h-15 text-xl w-full focus-visible:ring-0 placeholder:text-lg placeholder:font-normal"
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute z-50 bg-white border rounded shadow w-full mt-1 max-h-64 overflow-y-auto">
                                {suggestions.map((fund) => (
                                    <li
                                        key={fund.schemeCode}
                                        onClick={() => handleSelectFund(fund)}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {fund.schemeName}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home 