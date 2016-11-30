import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class MainPage extends React.Component {
  constructor(props, context) {
    super(props);
  }

  render() {
    const author = this.props.data.author;
    console.log(this.props.data);
    if (!author) {
      return <h1>Loading</h1>;
    }
    return (
      <div>
        <h1>WELCOME TO APOLLO TESTING</h1>
        <h3>Posts</h3>
        {author.posts && author.posts.map((post, idx) => (
          <div key={idx} >
            <ul>
              <li><b>Title:</b> {post.title}</li>
              <li><b>Views:</b> {post.views}</li>
              <li><b>Content:</b> {post.text}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

MainPage.propTypes = {
  data: PropTypes.object.isRequired
};

// FOR NORMAL QUERY
const mapQueriesToProps = gql`
  query mapQueriesToProps {
    author(firstName: "Edmond") {
      firstName
      lastName
      posts {
        title
        text
        views
      }
    }
  }
`;

export default graphql(
  mapQueriesToProps
  // mapQueriesToProps, {options: { pollInterval: 200 }}
)(MainPage);
