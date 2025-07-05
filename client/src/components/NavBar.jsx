import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useUserStore from "@/store/useUserStore"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import axios from "axios"
import { Menu } from "lucide-react"

const NavBar = () => {
    const logout = useUserStore((state) => state.logout)
    const user = useUserStore((state) => state.user)
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            const res = await axios.get("https://mutual-fund-tracker-1-29r0.onrender.com/api/v1/auth/logout", {
                withCredentials: true
            })
            if (res?.data.success) {
                navigate('/login')
                logout()
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error?.response.data.message)
        }
    }
    return (
        <div className="w-full h-20 flex justify-between items-center sticky top-0 z-50 bg-white">
            <div onClick={() => navigate('/')} className="cursor-pointer">
                <h1 className="text-blue-600 font-bold text-xl md:text-4xl ">MutualTrack</h1>
            </div>

            <div className='flex items-center justify-end ' >
                {
                    user ? (
                        <>
                            <div className="md:hidden">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Menu className="w-6 h-6" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{user.firstname} {user.lastname}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => { navigate('/saved-funds') }}> Saved Funds</DropdownMenuItem>
                                        <DropdownMenuSeparator></DropdownMenuSeparator>
                                        <DropdownMenuItem onClick={() => logoutHandler()}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="hidden md:flex justify-between items-center  space-x-4">
                                <h2 onClick={() => { navigate('/saved-funds') }} className="text-xl font-semibold hover:underline cursor-pointer">Saved Funds</h2>
                                <Button onClick={() => logoutHandler()} variant={'outline'}>Logout</Button>
                            </div>
                        </>

                    ) : (
                        <div className="flex space-x-2">
                            <Button onClick={() => navigate("/register")}>Register</Button>
                            <Button onClick={() => navigate("/login")} variant={'outline'}>Login</Button>
                        </div>
                    )
                }
            </div>
        </div >
    )
}

export default NavBar