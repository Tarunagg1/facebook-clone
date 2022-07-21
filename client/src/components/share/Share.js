import "./share.css";

import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
// import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import CancelIcon from '@mui/icons-material/Cancel';

import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosinstance from '../../config/axios';

export default function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        console.log(e);
        e.preventDefault();
        console.log('hetre');

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };

        console.log(newPost);
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await axiosinstance.post("/upload", data);
            } catch (err) { }
        }
        try {
            await axiosinstance.post("/posts", newPost);
            window.location.reload();
        } catch (err) { }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            user.profilePicture
                                ? PF + user.profilePicture
                                : "/assets/person/1.jpeg"
                        }
                        alt=""
                    />
                    <input
                        placeholder={"What's in your mind " + user.username + "?"}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <CancelIcon className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaOutlinedIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <LabelImportantOutlinedIcon htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <AddLocationAltOutlinedIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <AddLocationAltOutlinedIcon htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}
