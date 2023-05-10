
import React, { useState } from 'react';
import '../AddPostForm/AddPostForm.css'
import { Button, Form, Segment} from 'semantic-ui-react'
import * as postsApi from '../../utils/postApi'

const AddPostForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [image2Url, setImage2Url] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [caption, setCaption] = useState('')
  const API_KEY = '8pFeuVJ1uZecQFD1COzwzfXo5cweGlqOdEQ3RaRT';
  
  const handleClick = (imgUrl) => {
    setSelectedImage(imgUrl);
  };
  function handleChange(e){
    setCaption(e.target.value)
}



  const handleSearch = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${searchQuery}`);
        const data = await response.json();
        console.log(data);
        

      if (data.collection.items.length > 0) {
        setImageUrl(data.collection.items[0].links[0].href);        
        console.log(imageUrl)
        console.log(data.collection.items[1].links[0].href, '<--- second in array');
        setImage2Url(data.collection.items[1].links[0].href)
        console.log(image2Url, 'image 2')
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function handleAddPost(post) {
    try {
      const responseData = await postsApi.create(post); 
      console.log(responseData, " response from the server");
    //   setPosts([responseData.data, ...posts]); 
        console.log(post.append, 'post no error')
    } catch (err) {
        console.log(post, 'post error')
      console.log(err, " error in addPost");
    }
  }
  function handleSubmit(e){
    e.preventDefault();
    const formData = {
        caption: caption,
        photoUrl: selectedImage,
    }

    handleAddPost(formData); 
    console.log(selectedImage, 'submit working')

}


  

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Search Nasa's Image Library:
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <button type="submit">Search</button>
        <div>
        {imageUrl && <img src={imageUrl} className='returnImage' alt="Nasa Library Image" onClick={() => handleClick(imageUrl)} />}
        {image2Url && <img src={image2Url} className='returnImage' alt="Nasa Library Image2" onClick={() => handleClick(image2Url)}/>}
        {selectedImage && <img src={selectedImage} className='returnImage' alt="Selected Image" />}</div>

      </form>
     <form onSubmit={handleSubmit}>
        <Form.Input 
		    placeholder='Caption for this Image'
		    name="caption"
		    onChange={handleChange}/>
        <Button type="submit">Add Post</Button>
     </form>

    </div>
  );
};

export default AddPostForm;

