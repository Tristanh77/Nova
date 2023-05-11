import React from 'react';
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import '../PostCard/PostCard.css'

function PostCard({ post, isProfile, loggedUser }) { 
    // console.log(loggedUser, "<--from postCard");

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
            //   color={likeColor}
            //   onClick={clickHandler}
            />
            {/* {post.likes.length} Likes */}
          </Card.Content>
        </Card>
      );
        // <div>post card</div>
    };

export default PostCard;
