import { useState, useEffect } from "react";
import styles from "../styles/Blog.module.css";
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import {storage,db,serverTimeStamp} from '../firebase'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createblog = ({user}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const notify = (propmessage) => {
    toast.info(`${propmessage}`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    if(url){
      try {
        db.collection(`blogs`).add({
          title,
          body,
          imageUrl:url,
          postedBy:user.uid,
          createdAt:serverTimeStamp()
        })
        notify("Blog Created");
      } catch (err) {
        console.log(err);
      }
    }
  }, [url])

  const submitDetails = () => {
    if (!title || !body || !image) {
      alert("Please fill all the fields");
      return;
    }
    var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image)
    uploadTask.on('state_changed', 
    (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    if(progress=='100'){
      notify("Image Uploaded");
    }
  }, 
  (error) => {
    console.log("Error in Uploading Image")
  }, 
  () => {
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      // console.log('File available at', downloadURL);
      setUrl(downloadURL)
    });
  }
);

  };

  return (
    <div
      className="input-field"
      style={{ justifyItems: "center", textAlign: "center" }}
    >
      <h3>Create A Blog!</h3>
      <div>
        <input
          className={styles.i}
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          className={styles.i}
          type="text"
          value={body}
          placeholder="body"
          cols="50"
          rows="10"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <div>
          <label htmlFor="img" className="button">
            Choose Image:{" "}
          </label>
          <input
            type="file"
            name="file"
            onChange={(e) => setImage(e.target.files[0])}
            id="img"
            accept="image/*"
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={()=>submitDetails()} >
            SUBMIT
          </Button>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default createblog;
