import BaseService from '../BaseService';

class LeagueService extends BaseService {
  getLeagueData = (filters, sort) => this.getObject('/getLeagueData', filters, sort);
}