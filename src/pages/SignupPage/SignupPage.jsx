import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Segment,
  } from "semantic-ui-react";
  
  import { useState } from "react";
  import userService from "../../utils/userService";
  import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
  
  import { useNavigate } from "react-router-dom";
  import '../SignupPage/SignupPage.css'
  export default function Signup({handleSignUpOrLogin}) {
  
    const navigate = useNavigate()
  
    const [state, setState] = useState({
      username: "",
      email: "",
      password: "",
      passwordConf: "",
      bio: "",
    });
  
    const [selectedFile, setSelectedFile] = useState('')
  
    const [error, setError] = useState("");
  
    function handleChange(e) {
      setState({
          ...state,
          [e.target.name]: e.target.value
      })
    }
  
    function handleFileInput(e) {
      console.log(e.target.files)
      setSelectedFile(e.target.files[0]);
    }
  
    async function handleSubmit(e){
      e.preventDefault();
      const formData = new FormData(); 
      formData.append('photo', selectedFile);
      for (let fieldName in state){
          formData.append(fieldName, state[fieldName])
      }
      console.log(formData.forEach((item) => console.log(item)));
  
  
      try {
  
          await userService.signup(formData); 
      handleSignUpOrLogin(); 
      navigate('/'); 
  
      } catch(err){
          console.log(err.message, ' this is the error singnup up')
          setError('Check your terminal, there was an error signing up!')
      }
  
  
    }
  
    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
            <Header id='sign' as="h2" color="purple" textAlign="center">
            <div id='plutodiv'><Image className="ui centered image" id ="pluto" src="https://i.imgur.com/M9n8NLD.jpg" /></div> Sign Up
          </Header>
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                name="username"
                placeholder="username"
                value={state.username}
                onChange={handleChange}
                required
              />
              <Form.Input
                type="email"
                name="email"
                placeholder="email"
                value={state.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                placeholder="password"
                value={state.password}
                onChange={handleChange}
                required
              />
              <Form.Input
                name="passwordConf"
                type="password"
                placeholder="Confirm Password"
                value={state.passwordConf}
                onChange={handleChange}
                required
              />
              <Form.TextArea
                label="Bio"
                name="bio"
                value={state.bio}
                placeholder="Tell us more about yourself..."
                onChange={handleChange}
              />
              <Form.Field>
                <Form.Input
                  type="file"
                  name="photo"
                  placeholder="upload image"
                  onChange={handleFileInput}
                />
              </Form.Field>
              <Button type="submit" className="btn">
                Signup
              </Button>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
  