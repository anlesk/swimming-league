import axios from 'axios';

const query = `{
  ageGroups {
    id
    name
    minAge
    maxAge
  }
  controlLessonResultsConnection(first:700) {
      totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
    }
    edges {
      cursor
      node {
        rating
        ratingInAgeGroup
        totalTime
        student {
          name
          gender
        }
        ageGroup {
          id
          name
          minAge
          maxAge
        }
        controlLesson {
          date    
        }
      }
    }
  }
}`;


export const run = () => axios.post('https://api.supersport.online/graphql', {
  query,
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

export const runFetch = () => fetch('https://api.supersport.online/graphql', {
  body:  JSON.stringify({ query }),
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  mode: 'no-cors'
})
  .then(response => console.log(response) && response.json())
  .then(json => {
    console.log(json);
  })
