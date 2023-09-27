import React, { useEffect } from 'react';
import { createContext } from "react";

export const authentication = createContext(null);

export default function Auth({ children }) {
    let array;



    const SignIn = async (email, password) => {
        array = JSON.parse(localStorage.getItem("credentials"));
        console.log(array, "sara");
        for (let i = 0; i < array.length; i++) {
            console.log(array[i]);
            if (array[i].email === email && array[i].password === password) {
                console.log("success", array[i]);
                localStorage.setItem("logedinuser", JSON.stringify([]));
                const arr = JSON.parse(localStorage.getItem("logedinuser"));
                console.log(array[i].username);
                arr.push({ username: array[i].username, email: array[i].email });
                localStorage.setItem("logedinuser", JSON.stringify(arr));
                console.log("setted");
                break;
            }
            else {
                localStorage.setItem("logedinuser", JSON.stringify(false));

            }
        }
    }

    const addtask = (email, task) => {
        if (!localStorage.getItem(email)) {
            localStorage.setItem(email);
            console.log(email);
        }

        else {
            console.log(email, task);
            const arr = JSON.parse(localStorage.getItem(email));
            arr.push({ tasks: task, ischecked: false });
            localStorage.setItem(email, JSON.stringify(arr));
        }
    }
    return (
        <authentication.Provider value={{ SignIn, addtask }}>
            {children}
        </authentication.Provider>

    )
}
