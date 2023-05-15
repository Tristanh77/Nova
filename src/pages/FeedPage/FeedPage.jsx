
import { Link } from "react-router-dom";
import tokenService from "../../utils/tokenService";
import { useState, useEffect } from "react";

import PageHeader from "../../components/Header/Header";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import Loader from "../../components/Loader/Loader";
import * as postsApi from "../../utils/postApi";
import * as likesApi from '../../utils/likesApi';
import '../FeedPage/FeedPage.css'

import { Grid } from "semantic-ui-react";

export default function FeedPage({loggedUser}) {
    const [posts, setPosts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
  
    
    async function addLike(postId){
      try {
          const data = await likesApi.create(postId);
          getPosts()
      } catch(err){
          console.log(err, ' error in addLike')
      }
    }
  
    async function removeLike(likeId){
      try {

          const data = await likesApi.removeLike(likeId);
          getPosts()
  
      } catch(err){
          console.log(err, ' err in remove Like')
      }
    }
  
    useEffect(() => {
      getPosts();
    }, []);
  
    
    if (error) {
      return (
        <>
          <PageHeader loggedUser={loggedUser} />
        </>
      );
    }
    return (
      <Grid id='feedGrid' centered>
        <Grid.Row>
          <Grid.Column>
            <PageHeader loggedUser={loggedUser} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
          <Link to='/add'><div id='add'>Add Post</div></Link>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <PostDisplay
              posts={posts}
              numPhotosCol={1}
              isProfile={false}
              loading={loading}
                    addLike={addLike}
                    removeLike={removeLike}
                    loggedUser={loggedUser}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  