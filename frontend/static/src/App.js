import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  // # the name attribute will match up the model fiels
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      image: null,
      preview: null,
      recipes: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // #this takes care of the text input
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleImageChange(e) {
    let file = e.target.files[0]
    // #this setState will save this to state until render.
    this.setState({image: file});
    // This gives user a preview of what image they select.FiileReader is a built in javascript mehtod
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({preview: reader.result});
    };
    // This is asyncronous. THIS gives us the visual in react browser.
    // readAsDataURL is built into javascript method
    reader.readAsDataURL(file);
  }

  handleSubmit(e) {
    e.preventDefault();
    // FormData.append is a built in javascript method. form data appends our key models.
    let formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('image', this.state.image);
    // post request and send formData
    axios.post('/api/v1/recipes/', formData, {
      headers:{
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      let recipes = [...this.state.recipes];
      recipes.push(res.data);
      this.setState({recipes: recipes, title: '', preview: null, image: null});
    })
    .catch(error => {
      console.log(error)
    });
  }

  componentDidMount() {
  axios.get('/api/v1/recipes/')
  .then(res => {

    this.setState({recipes: res.data});
  })
  .catch(error => {
    console.log(error);
  });
}
  // conditional rendering. we put null since we dont wont anything to render. if this.state.image is
  render() {
    let recipes = this.state.recipes.map(recipe => (
      <li key={recipe.id}>
        <p>{recipe.title}</p>
        <p>{recipe.created_by}</p>
        <img src={recipe.image} alt='' />
      </li>
    ))
    return (
      <React.Fragment>
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='title' value={this.state.title} onChange={this.handleChange}/>
        <input type='file' name='image' onChange={this.handleImageChange}/>
        {this.state.image ? (
          <img src={this.state.preview} alt='preview'/>
        ) : (
          null
        )}
        <button>Upload</button>
      </form>
      <ul>{recipes}</ul>
      </React.Fragment>
    )
  }
}

export default App;
