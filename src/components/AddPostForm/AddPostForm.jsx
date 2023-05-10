// import { useState } from 'react'

// import { Button, Form, Segment} from 'semantic-ui-react'

// export default function AddPostForm({handleAddPost}){

// 	const [caption, setCaption] = useState('')

// 	const [selectedFile, setSelectedFile] = useState('')

// 	function handleChange(e){
// 		setCaption(e.target.value)
// 	}

// 	function handleFileInput(e){
// 		setSelectedFile(e.target.files[0])
// 	}

// 	function handleSubmit(e){
// 		e.preventDefault();
// 		const formData = new FormData();
// 		formData.append('caption', caption);
// 		formData.append('photo', selectedFile);

// 		handleAddPost(formData);

// 	}

// 	return (
// 		<Segment>
// 			<Form onSubmit={handleSubmit}>
// 				<Form.Input 
// 					placeholder='Add Post'
// 					required
// 					name="caption"
// 					onChange={handleChange}
// 				/>
// 				<Form.Input 
// 					type='file'
// 					placeholder="upload image"
// 					onChange={handleFileInput}
// 				/>
// 				<Button type="submit">Add Post</Button>
// 			</Form>
// 		</Segment>
// 	)
// }
import React, { useState } from 'react';

const AddPostForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const API_KEY = '8pFeuVJ1uZecQFD1COzwzfXo5cweGlqOdEQ3RaRT';
  console.log(imageUrl)
  const fetch_url = "https://images-api.nasa.gov/search?q=";


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${searchQuery}`);
        const data = await response.json();
      console.log(data);
      if (data.collection.items.length > 0) {
        setImageUrl(data.collection.items[0].links[0].href);
        console.log(imageUrl)
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search Query:
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Nasa Library Image" />}
    </div>
  );
};

export default AddPostForm;

