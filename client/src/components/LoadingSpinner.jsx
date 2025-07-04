import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <Loader className="animate-spin h-16 w-16 text-blue-600" />
            <p className="mt-4 text-lg font-semibold text-gray-700">
                Loading, please wait...
            </p>
        </div>
    );
};

export default LoadingSpinner;
