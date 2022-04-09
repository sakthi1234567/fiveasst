import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Celebration } from '@mui/icons-material';

export default function Crud(){
    const [input,setInput]=useState({
        user:[],
        id:'',
        name:'',
        age:'',
        email:''

    });

    const handleSubmit=async (e)=>{
        e.preventDefault();
        //console.log(input);
        if(input.id){
            //Update
            var res=await axios.put(`https://6249738f831c69c687cde72c.mockapi.io/users/${input.id}`,
                {name:input.name,
                age:input.age,
                email:input.email,});
                
            var index=input.user.findIndex(row=>row.id==res.data.id);
            var user=[...input.user]
            user[index]=res.data;
            setInput({user,name:'',age:'',email:'',id:''})
        }
        else{
            //create
            var res=await axios.post('https://6249738f831c69c687cde72c.mockapi.io/users',
                {name:input.name,
                age:input.age,
                email:input.email,});
            //console.log(res)
            var user=[...input.user]
            user.push(res.data);
            setInput({user,name:'',age:'',email:''})
        }
        
    }
    const handleDelete= async (id)=>{
        await axios.delete(`https://6249738f831c69c687cde72c.mockapi.io/users/${id}`)
        var user=input.user.filter((row)=>row.id!=id)
        setInput({user})
    }
    const onPopulateData=(id)=>{
        const selectedData=input.user.filter((row)=>row.id==id)[0]
        setInput({...input,name:selectedData.name,
                age:selectedData.age,
                email:selectedData.email,
                id:selectedData.id,
            })
            
    }

    useEffect(async () => {
        var res=await axios.get('https://6249738f831c69c687cde72c.mockapi.io/users');
        setInput({user:res.data});
        }, []);
    
    return(
        <div style={{padding:'15px',margin:'15px'}}>
            <div>
                <h3>Crud Application</h3><br/>
                <form onSubmit={handleSubmit}>
                    <label>Name: </label> &nbsp;
                    <input type="text" value={input.name} onChange={(e)=>setInput({...input,name:e.target.value})}/> <br/> <br/>
                    <label>Age: </label>  &nbsp;
                    <input type="text" value={input.age} onChange={(e)=>setInput({...input,age:e.target.value})}/> <br/> <br/>
                    <label>Email: </label>  &nbsp;
                    <input type="text" value={input.email} onChange={(e)=>setInput({...input,email:e.target.value})}/> <br/> <br/>
                    <button type="submit" class="btn btn-outline-dark">Submit</button> &nbsp; &nbsp;
                    <button class="btn btn-outline-dark">Reset</button>
                </form>
                

            </div> <br/> <br/>
            <div className='table'>
                <h3>Table</h3><br/>
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Age</td>
                            <td>Email Id</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {input.user.map((row=>{
                            return(
                                <tr>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.age}</td>
                                <td>{row.email}</td>
                                <td><button onClick={()=>onPopulateData(row.id)}>Edit</button> &nbsp; 
                                <button onClick={()=>handleDelete(row.id)}>Delete</button></td>
                            </tr>
                            )
                            
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}