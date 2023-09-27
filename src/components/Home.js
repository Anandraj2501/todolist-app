import React, { useEffect,useState } from 'react';
import "../Css/home.css";
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router';


export default function Home() {
    const [user, setUser] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [task, setTask] = useState();
    const [change, setChange] = useState(false);
    const [istask, setIstask] = useState([]);
    const[edittext,setEdittext] = useState();
    const [editindex,setindex] = useState();
    let usertask;
    const navigate = useNavigate();

    const handleaddclick = () => {
        console.log(task);
        // addtask(email, task);
        if (!localStorage.getItem(email)) {
            localStorage.setItem(email, JSON.stringify([]));
            const arr = JSON.parse(localStorage.getItem(email));
            arr.push({ tasks: task, ischecked: false });
            localStorage.setItem(email, JSON.stringify(arr));
            console.log(email);
        }

        else {
            console.log(email, task);
            const arr = JSON.parse(localStorage.getItem(email));
            arr.push({ tasks: task, ischecked: false });
            localStorage.setItem(email, JSON.stringify(arr));
        }
        usertask = JSON.parse(localStorage.getItem(email));
        const newdata = usertask.map((elem) => ({
            tasks: elem.tasks,
            ischecked: elem.ischecked
        }))
        setIstask(newdata);
        console.log(istask);
        console.log(usertask)
    }

    const handledelete = (index) => {
        usertask = JSON.parse(localStorage.getItem(email));
        console.log(index);
        usertask.splice(index, 1);
        localStorage.setItem(email, JSON.stringify(usertask));
        setIstask(usertask);
    }

    const handlecheck = (index) => {
        usertask = JSON.parse(localStorage.getItem(email));
        console.log(usertask[index].ischecked)
        usertask[index].ischecked = true;
        localStorage.setItem(email, JSON.stringify(usertask));
        setIstask(usertask);

    }
    const handleuncheck = (index) => {
        usertask = JSON.parse(localStorage.getItem(email));
        console.log(usertask[index].ischecked)
        usertask[index].ischecked = false;
        localStorage.setItem(email, JSON.stringify(usertask));
        setIstask(usertask);
    }

    const handlechange = (e, index) => {
        setChange(true);
        setEdittext(e.target.value);
        setindex(index);
        console.log(change,index);
        
        
    }
    const handleedit = ()=>{
        usertask = JSON.parse(localStorage.getItem(email));
        usertask[editindex].tasks = edittext;
        localStorage.setItem(email, JSON.stringify(usertask));
        setIstask(usertask);
        setChange(false);
    }

    const handlelogout = ()=>{
        localStorage.removeItem(email);
        navigate("/");
    }


    useEffect(() => {
        if (localStorage.getItem("logedinuser")) {
            const username = JSON.parse(localStorage.getItem("logedinuser"));
            setName(username[0].username);
            setEmail(username[0].email);
            setUser(true);
        }
        else {
            setUser(false);
        }
        if (localStorage.getItem(email)) {
            usertask = JSON.parse(localStorage.getItem(email));
            console.log(usertask);
            setIstask([...usertask]);
        }
    },)
    return (
        <>
            {user ?

                <div className='container'>
                    <div className='todo-container'>
                        <h3 style={{ color: "white", margin: "2rem 2rem" }}>Get Things Done ! <span style={{ color: "rgb(0 255 156)" }}>{name}</span></h3>
                        <div className='form-wrapper'>
                            <div className='todo-details'>
                                <div className='input-container'>
                                    <input type='text' placeholder="What's the task today" required value={task} onChange={(e) => setTask(e.target.value)} /><div className='add_btn'><button onClick={handleaddclick}>Add Task</button></div>
                                </div>{
                                    change ? 
                                <div className='input-container'>
                                    <input type='text' placeholder="What's the task today" required value={edittext} onChange={(e) => setEdittext(e.target.value)} /><div className='add_btn'><button onClick={handleedit}>Edit Task</button></div>
                                </div>:""}
                            </div>
                            <div className='list-container'>
                                <div className='list-wrapper'>
                                    {
                                        istask?.length ?
                                            istask.map((elem, index) => (
                                                <div className='task-container'>
                                                    <input className='taks' value={elem.tasks} style={{ backgroundColor: "#4848d5", border: "none" }} onClick={(e)=> handlechange(e,index)} />
                                                    <div className='icons'>
                                                        {
                                                            elem.ischecked ? <i class="ri-task-fill" onClick={() => handleuncheck(index)}></i> :
                                                                <i class="ri-square-line" onClick={() => handlecheck(index)}></i>
                                                        }
                                                        <i className="ri-delete-bin-2-fill" onClick={() => handledelete(index)}></i></div>
                                                </div>
                                            )) : <div>No task</div>
                                    }
                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className='logout'><span style={{ color: "white" }} onClick={handlelogout}>Logout</span> </div>
                    </div>

                </div>

                :




                <div className='req'>
                    <h1>Please Do Login</h1></div>
            }
        </>
    )
}
