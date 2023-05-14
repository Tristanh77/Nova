import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Grid } from "semantic-ui-react";

import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostDisplay from "../../components/PostDisplay/PostDisplay";
import PageHeader from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";

import userService from "../../utils/userService";
import * as likesApi from '../../utils/likesApi'

export default function ProfilePage({loggedUser, handleLogout}) {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");


  const { username } = useParams();
  console.log(username, " <- Username from params");

  useEffect(() => {
 
    getProfile();
  }, []);

  async function getProfile() {
	try {
	  const data = await userService.getProfile(username);
	  setLoading(false);
	  setPosts(data.posts);
	  setProfileUser(data.user);
	} catch (err) {
	  console.log("error from get profile ->", err);
	  setError("Profile does not exist");
	}
  }


  async function addLike(postId){
	try {
		const data = await likesApi.create(postId);
		getProfile()


	} catch(err){
		console.log(err, ' error in addLike')
	}
  }

  async function removeLike(likeId){
	try {
		const data = await likesApi.removeLike(likeId);
		getProfile()
	} catch(err){
		console.log(err, ' err in remove Like')
	}
  }

  if (error) {
    return (
      <>
        <PageHeader loggedUser={user} handleLogout={handleLogout} />
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader loggedUser={loggedUser} handleLogout={handleLogout} />
        <Loader />
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader loggedUser={loggedUser} handleLogout={handleLogout}  />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={profileUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
		<PostDisplay
            posts={posts}
            numPhotosCol={3}
            isProfile={true}
			loggedUser={loggedUser}
			addLike={addLike}
			removeLike={removeLike}
			/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
