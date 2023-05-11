import React from 'react';
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import '../PostCard/PostCard.css'

function PostCard({ post, isProfile, removeLike, addLike, loggedUser  }) { 
    console.log(loggedUser, "<--from postCard");
    const likedIndex = post.likes.findIndex(
        (like) => like.username === loggedUser.username
      );

    const likeColor = likedIndex > -1 ? "red" : "grey";

    const clickHandler =
        likedIndex > -1
            ? () => removeLike(post.likes[likedIndex]._id)
            : () => addLike(post._id);
            console.log(post._id, likedIndex, 'like clicked')

    return (
        <Card raised>
          {isProfile ? (
            ""
          ) : (
            <Card.Content textAlign="left">
              <Card.Header>
                <Link to={`/${post.user.username}`}>
                  <Image id='profilePic'
                    avatar
                    src={
                      post.user.photoUrl
                        ? post.user.photoUrl
                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                    }
                  />
                  {post.user.username}
                </Link>
              </Card.Header>
            </Card.Content>
          )}
          <Image src={`${post?.photoUrl}`} wrapped ui={false} />
          <Card.Content>
            <Card.Description>{post.caption}</Card.Description>
          </Card.Content>
          <Card.Content extra textAlign={"right"}>
            <Icon
                name={"heart"}
                size="large"
                color={likeColor}
                onClick={clickHandler}
            />
            {post.likes.length} Likes
          </Card.Content>
        </Card>
      );
        // <div>post card</div>
    };

export default PostCard;
