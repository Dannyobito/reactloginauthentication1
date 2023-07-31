import { useState, useEffect, useContext } from "react";
// import AuthContext from "./context/AuthProvider"
// import axios from "./api/axios";

const Login = () => {
    // const LOGIN_URL = "/users"
    // const {setAuth} = useContext(AuthContext);

    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loginDetails, setLoginDetails] = useState([]);
    const [success, setSuccess] = useState('false');

    useEffect(()=>{
        fetch("http://localhost:8000/users").then((response)=>{
                return response.json();
            }).then((response)=>{
                console.log(response);
                setLoginDetails(response);
            }).catch((error)=>{
                console.log(error);
            })
    },[])
    

    const handleSubmit = (e) => {
        e.preventDefault();
        loginDetails.forEach(detail => {
            if(detail.user=== user && detail.pwd===pwd){
                setSuccess(true);
                alert("success")
            }
            else{
                setErrMsg("Invalid username / password");
            }
        });
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(user,pwd);
    //     try {
    //         const response = await axios.post(LOGIN_URL,
    //             JSON.stringify({user,pwd}),
    //             {
    //                 headers: {'Content-Type' : 'application/json'},
    //                 withCredentials: true
    //             }
    //         );
    //         console.log(JSON.stringify(response));
    //         setPwd('');
    //         setUser('');
    //         setSuccess(true); 
    //     } catch (error) {
            
    //     }
        
    // }

    return(
        <section>
            <p className= {errMsg ? "errmsg" :"offscreen"}>{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor= "username">
                    Username: 
                </label>
                <input
                    type="text"
                    value={user}
                    id= "username"
                    required
                    onChange={e=>setUser(e.target.value)}
                />
                <label htmlFor= "pwd">
                    Password: 
                </label>
                <input
                    type="password"
                    value={pwd}
                    id= "pwd"
                    required
                    onChange={e=>setPwd(e.target.value)}
                />
                <button>Sign In</button>
                <div>
                    <p>Don't have an account?</p>
                    <a href="#">Sign Up</a>
                </div>
            </form>
        </section>
    )

}
export default Login;