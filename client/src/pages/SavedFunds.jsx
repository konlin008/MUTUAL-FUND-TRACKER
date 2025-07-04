import Fund from "@/components/Fund";
import LoadingSpinner from "@/components/LoadingSpinner";
import NavBar from "@/components/NavBar";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SavedFunds = () => {
    const navigate = useNavigate();
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState();
    const getSavedFunds = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://localhost:8080/api/v1/user/savedFunds`,
                { withCredentials: true }
            );
            if (res?.data) {
                console.log(res?.data);
                setFunds(res.data.savedFunds);
            }
        } catch (error) {
            toast.error(error?.response.data.message || "Something Went Wrong");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getSavedFunds();
    }, []);
    if (funds) {
        console.log(funds);
    }
    return (
        <div className="px-5 md:px-50 pb-20  ">
            <NavBar />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="mt-10 mx-7 md:mx-25">
                    <ArrowLeft
                        onClick={() => {
                            navigate("/");
                        }}
                        className="mb-15 h-10 w-10 rounded-full"
                    />
                    <h1 className=" font-bold text-xl mb-10">Your Saved Funds</h1>
                    <div className=" flex flex-col space-y-3">
                        {funds?.map((fund) => {
                            return <Fund fund={fund} key={fund.schemeCode} />;
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedFunds;
