import { useState } from 'react';
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
import axios from 'axios';
import { toast } from 'sonner';

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        password: ''
    })
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handelRegister = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", formData)
            if (res?.data.success) {
                toast.success(res?.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className="flex min-h-svh flex-col items-center justify-center px-6 md:px-0">
            <Card className="w-full max-w-lg md:max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Fill in your details below to create a new account
                    </CardDescription>
                    <CardAction>
                        <Button onClick={() => { navigate("/login") }} variant="link">Sign Up</Button>
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
                                <Label htmlFor="email">First Name</Label>
                                <Input
                                    name="firstname"
                                    value={formData.firstname}
                                    type="text"
                                    placeholder="joe"
                                    onChange={(e) => {
                                        onChangeHandler(e)
                                    }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Last Name</Label>
                                <Input
                                    name="lastname"
                                    value={formData.lastname}
                                    type="text"
                                    placeholder="Den"
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
                    <Button onClick={() => handelRegister()} type="submit" className="w-full">
                        Register
                    </Button>

                </CardFooter>
            </Card>
        </div >
    )
}

export default Register