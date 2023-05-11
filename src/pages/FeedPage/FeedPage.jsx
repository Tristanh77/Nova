
import { Link } from "react-router-dom";
import tokenService from "../../utils/tokenService";
import { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import Loader from "../../components/Loader/Loader";
import * as postsApi from "../../utils/postApi";
import '../FeedPage/FeedPage.css'

import { Grid } from "semantic-ui-react";

export default function FeedPage(loggedUser, handleLogout) {
    const [posts, setPosts] = useState([]); /// array of objects, the posts contain the likes
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function handleAddPost(post) {
        try {
          setLoading(true);
          const responseData = await postsApi.create(post); 
          console.log(responseData, " response from the server");
          setPosts([responseData.data, ...posts]); 
          setLoading(false);
        } catch (err) {
          setLoading(false);
          console.log(err, " error in addPost");
          setError("Error creating a post, please try again");
        }
      }

      async function getPosts() {
        try {
          const response = await postsApi.getAll();
          console.log(response, " data");
          setPosts(response.posts);
          setLoading(false);
        } catch (err) {
          console.log(err.message, " this is the error in getPosts");
          setLoading(false);
        }
      }
      useEffect(() => {
        getPosts();
      }, []);
    
    if (error) {
    return (
        <>
        <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
        </>
        );
    }
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader loggedUser={loggedUser} handleLogout={handleLogout}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Link to='/add'><div>Add Post</div></Link>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
      <Grid.Column id='feedColumn'>
        <PostDisplay
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
			// addLike={addLike}
			// removeLike={removeLike}
			loggedUser={loggedUser}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

