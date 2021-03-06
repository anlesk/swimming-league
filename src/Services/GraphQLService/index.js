import axios from 'axios';
import data from './mocks/data';
import statistics from './mocks/statistics';

const query = `
{
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
}
`;

const stringifiedQ = { query: "{ ageGroups { id name minAge maxAge } controlLessonResultsConnection(first:700) { totalCount pageInfo { hasNextPage hasPreviousPage endCursor } edges { cursor node { rating ratingInAgeGroup totalTime student { name gender } ageGroup { id name minAge maxAge } controlLesson { date } } } }}"};

// console.log(query, JSON.stringify({ query }), stringifiedQ);

export const run = () => axios({
    method: 'POST',
    url: 'https://api.supersport.online/graphql',
    data: { query },
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

export const runFetch = () => fetch('https://api.supersport.online/graphql', {
  // body:  JSON.stringify({ query: query.replace('\r', '') }),
  body:  JSON.stringify(stringifiedQ),
  // body:  { query },
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'text/plain;charset=UTF-8',
    // 'Content-Type': 'text/plain',
    // 'Content-Type': 'text/html',
  },
  mode: 'no-cors'
})
  .then(response => console.log(response) && response.json())
  .then(json => {
    console.log(json);
  })

export const eF = () => fetch('https://1jzxrj179.lp.gql.zone/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ posts { title } }' }),
  mode: 'no-cors',
})
  .then(res => res.json())
  .then(res => console.log(res.data));

export const loadData = (filters) => new Promise((resolve) => {
  setTimeout(resolve.bind(this, getFilteredData(filters)), 800);
});

export const loadStatistics = (personId) => new Promise((resolve) => {
  setTimeout(resolve.bind(this, getStatistics(personId)), 800);
});

const getFilteredData = filters => {
  const { size = 40, offset = 0 } = filters;
  const filteredData = data.data.controlLessonResultsConnection.edges.slice(offset, offset + size);
  const newData = {
    ...data.data,
    controlLessonResultsConnection: {
      ...data.data.controlLessonResultsConnection,
      edges: filteredData,
    }
  }

  return newData;
}
const getStatistics = personId => statistics.data;
