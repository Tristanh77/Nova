import React, { useState } from "react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";


import { Grid } from "semantic-ui-react";

export default function FeedPage(loggedUser, handleLogout) {


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
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostDisplay />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

