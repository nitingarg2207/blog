import { db } from "../firebase";
import Link from "next/link";
import { useState } from "react";
import Header from "../components/header";
import { Button } from "@material-ui/core";

export default function Home({ AllBlogs }) {
  const [blogs, setBlogs] = useState(AllBlogs);
  const [end, setEnd] = useState(false);
  const loadMore = async () => {

    const last = blogs[blogs.length - 1];
    const res = await db
      .collection("blogs")
      .orderBy("createdAt",'desc')
      .startAfter(new Date(last.createdAt))
      .limit(3)
      .get();
    const newBlogs = res.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id,
      };
    });
    setBlogs(blogs.concat(newBlogs));

    if(newBlogs.length<3){
      setEnd(true)
    }
  };
  return (
    <div
      style={{ textAlign: "center" }}
      style={{ display: "inline-block" }}
    >
      <Header/>
      {blogs.map((blog) => {
        return (
          <div
            className="card"
            style={{ maxWidth: "60%", margin: "22px auto",backgroundColor:'#F9F9F9' }}
            key={blog.createdAt}
          >
            <img src={blog.imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
              <h3 className="card-text">{blog.title}</h3>
              <p className="card-text">{blog.body}</p>
              <Link href={`/blogs/${blog.id}`}>
                <a style={{ color: "blueviolet" }}>Read More</a>
              </Link>
            </div>
          </div>
        );
      })}
 {end==false?
      <Button style={styles} variant="contained" color="primary" onClick={()=>loadMore()}>Load More</Button>:<h3 style={{textAlign:'center'}}>You have reached end</h3>}
      <style jsx>
        {`
          p {
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const querySnap = await db
    .collection("blogs")
    .orderBy("createdAt", "desc")
    .limit(3)
    .get();
  const AllBlogs = await querySnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });
  return {
    props: { AllBlogs }, // will be passed to the page component as props
  };
}

const styles = {
  position:'relative',
  margin:'10px auto',
  left:'50%',
  width:'50%',
  transform: 'translate(-50%,0)'
}