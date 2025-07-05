import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";

import { Label } from "../components/ui/label";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import useUserStore from '@/store/useUserStore';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const loginHandler = async () => {
        setLoading(true)
        try {
            const res = await axios.post("https://mutual-fund-tracker-1-29r0.onrender.com/api/v1/auth/login", formData, {
                withCredentials: true
            })
            if (res?.data.success) {
                useUserStore.getState().setUser(res.data.user)
                toast.success(res.data.message)
                navigate('/')
            }
        } catch (error) {
            toast.error(error?.response.data.message)
        } finally {
            false
        }
    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center px-6 md:px-0">
            <Card className="w-full max-w-lg md:max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your Username and Password below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button onClick={() => { navigate('/register') }} variant="link">Sign In</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    value={formData.username}
                                    name='username'
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    onChange={(e) => {
                                        onChangeHandler(e)
                                    }}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>

                                <Input
                                    name="password"
                                    value={formData.password}
                                    type="password"
                                    onChange={(e) => {
                                        onChangeHandler(e)
                                    }}
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button disabled={loading} type="submit" className="w-full" onClick={() => loginHandler()}>
                        {
                            loading ? (<><Loader2 className='h-4 w-4 animate-spin' />Please Wait </>) : 'Login'
                        }
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login