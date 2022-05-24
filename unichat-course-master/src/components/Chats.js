import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";


const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();

        history.push("/");
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: "image/jpeg" })
    }

    useEffect(() => {
        if (!user) {
            history.push("/");

            return;
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "512cf5e5-c7fb-4b5a-aa03-5d5622a5a445",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })

            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append("email", user.email);
                formdata.append("username", user.email);
                formdata.append("secret", user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append("avatar", avatar, avatar.name)

                        axios.post("https://api.chatengine.io/users",
                            formdata,
                            { headers: { "private-key": "3b8cdb2e-e6ff-4039-a5e3-d471a48b4bae" } }
                        )
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    })
            })
    }, [user, history]);

    if (!user || loading) return "Loading..."

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Chatting App
                </div>
                <div onClick={'handlelogout'} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="512cf5e5-c7fb-4b5a-aa03-5d5622a5a445"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;