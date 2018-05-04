const loadData = async ({ sortBy, sortDirection, size, offset } = {}) => await ([
  { position: 1, name: '123', sex: 333, phone: 12345 },
  { position: 2, name: 321, sex: 542, phone: 12346 },
  { position: 3, name: 321, sex: 4321, phone: 12347 },
]);

const loadGroupedData = async id => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1000, eventDate: 10 },
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1111, eventDate: 11 },
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1234, eventDate: 12 },
  ]
};

const loadFilters = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1000, eventDate: 10 },
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1111, eventDate: 11 },
    { position: 4, name: 'Ivanov', sex: 'M', phone: 12346, result: 1234, eventDate: 12 },
  ]
};

export default {
 LeagueService: {
   getLeaderboard: loadData,
   getStatistics: loadGroupedData,
 },
}
