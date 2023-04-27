import { db, serverTimeStamp } from "../../firebase";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function blogpage({ blog, user, allComments }) {
  const [myComment, setMyComment] = useState("");
  const [allCommentsBlog, setAllComments] = useState(allComments);
  const [commentsCount, setCommentsCount] = useState(0);
  const router = useRouter();
  const { blogid } = router.query;

  useEffect(() => {
    let count = 0;
    for (var _i in allCommentsBlog) {
      count++;
    }
    setCommentsCount(count);
  }, [allCommentsBlog]);

  // notify
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

  // function for making comments
  const makeComment = async () => {
    if (myComment.trim() == "") {
      return;
    }
    await db.collection("blogs").doc(blogid).collection("comments").add({
      text: myComment,
      name: user.displayName,
      createdAt: serverTimeStamp(),
    });
    const commentQuery = await db
      .collection("blogs")
      .doc(blogid)
      .collection("comments")
      .get();
    setAllComments(commentQuery.docs.map((docSnap) => docSnap.data()));
    notify("✔ Comment Added");
    setMyComment("");
  };
  return (
    <div className="container" style={styles}>
      <h1 style={{ color: "orange", marginTop: "20px" }}>{blog.title}</h1>
      <h5 style={{ color: "gray" }}>
        Created on- {new Date(blog.createdAt).toDateString()}
      </h5>
      <img
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
        src={blog.imageUrl}
        alt={blog.title}
      />
      <p style={styles2}>{blog.body}</p>
      {/* add comments */}
      {user ? (
        <>
          <div className="mb-3">
            <textarea
              className="form-control"
              style={styles2}
              value={myComment}
              onChange={(e) => setMyComment(e.target.value)}
              rows="3"
            ></textarea>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => makeComment()}
          >
            Add Comment
          </Button>
        </>
      ) : (
        <h3>Please login to make comments</h3>
      )}
      <hr />
      <div className="comments" style={{ textAlign: "left" }}>
        <div className="commentHeading">COMMENTS {commentsCount}</div>
        {allCommentsBlog.map((item) => {
          return (
            <div>
              <h6 className="comment" key={item.text}>
                <span className="commentTitle">{item.name}</span>
                <span className="commentDescription">{item.text}</span>
                {/* <span className="ctime">
                  <span className="commentTime">
                    {new Date(item.createdAt).toDateString()}
                  </span>
                  <span className="commentTime">
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </span> */}
              </h6>
            </div>
          );
        })}
      </div>
      {/* taost */}
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
      {/* styling the components */}
      <style jsx>
        {`
          * {
            box-sizing: border-box;
          }
          img,
          p {
            width: 70%;
          }
          .commentTitle {
            font-weight: 500;
            color: green;
            font-size: 1.2rem;
            display: block;
          }
          .commentDescription {
            margin-top: 6px;
            text-indent: 1em;
          }
          .commentHeading {
            font-size: 1.5rem;
            margin: 10px;
            color: orange;
          }
          .commentTime {
            font-size: 0.8rem;
            text-align: right;
          }
          .comment {
            display: inline-block;
            padding: 5px;
            border-radius: 5px;
            width: auto;
            min-width: 300px;
            max-width: 70vw;
            margin: 10px 10px;
            border: 2px solid black;
            margin-bottom: 15px;
            background-color: #eff8ff;
          }
          span {
            display: block;
          }
          .form-control {
            width: 70%;
          }
          .form-control:focus {
            border-color: #28a745;
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
          }
          @media (max-width: 1092px) {
            img,
            p {
              width: 90%;
            }
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps({ params: { blogid } }) {
  const result = await db.collection("blogs").doc(blogid).get();
  const allCommentsSnap = await db
    .collection("blogs")
    .doc(blogid)
    .collection("comments")
    .get();
  const allComments = allCommentsSnap.docs.map((comDocSnap) =>
    comDocSnap.data()
  );
  for (var i = 0, l = allComments.length; i < l; i++) {
    allComments[i].createdAt = allComments[i].createdAt.toMillis();
  }
  return {
    props: {
      blog: {
        ...result.data(),
        createdAt: result.data().createdAt.toMillis(),
      },
      allComments,
      // allComments:{
      // ...allComments,
      // createdAt:allComments.map(doc=>doc.createdAt.toMillis())
      // }
    },
  };
}

const styles = {
  height: "100%",
  textAlign: "center",
};

const styles2 = {
  marginTop: "2em",
  color: "#333",
  textAlign: "justify",
  fontSize: "1.2rem",
  position: "relative",
  left: "50%",
  transform: "translate(-50%,0)",
  letterSpacing: "3px",
  lineHeight: "2rem",
  fontFamily: 'charter, Georgia, Cambria, "Times New Roman", Times, serif',
};
