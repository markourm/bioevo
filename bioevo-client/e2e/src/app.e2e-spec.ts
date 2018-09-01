import { Wiremock } from './wiremock';

import {
  LandingPage,
  NotFoundPage,
  WorldListPage,
  WorldDetailsPage
 } from './app.po';

describe('BioEvo user journeys', () => {
  let home: LandingPage;
  let notFound: NotFoundPage;
  let worldList: WorldListPage;
  let details: WorldDetailsPage;

  let wiremock: Wiremock;

  beforeEach(() => {
    home = new LandingPage();
    notFound = new NotFoundPage();
    worldList = new WorldListPage();
    details = new WorldDetailsPage();
    wiremock = new Wiremock();
  });

  afterEach(() => {
    wiremock.stop();
  });

  it('should display welcome message in landing page', () => {
    home.navigateTo();
    expect(home.isDisplayed()).toBe(true);
    expect(home.getText()).toEqual('Welcome to BioEvo!');
  });

  it('should display Not Found Page given unknown path', () => {
    notFound.navigateTo();
    expect(notFound.isDisplayed()).toBe(true);
    expect(notFound.getText()).toEqual('This page doesn\'t exist. Go back to home.');

    notFound.getHomeLink().click();
    expect(home.isDisplayed()).toBe(true);
  });

  it('should navigate to World List', () => {
    home.navigateTo();
    home.getLoginButton().click();
    expect(worldList.isDisplayed()).toBe(true);
  });

  it('should navigate to World Details', () => {
    home.navigateTo();

    wiremock.get('/v1/report/world', [{ id: 3, currentStepId: 60 }, { id: 5, currentStepId: 30 }]);
    home.getLoginButton().click();

    const newWorldId = 6;
    wiremock.post('/v1/world', null, {worldId: newWorldId});
    worldList.getCreateWorldButton().click();

    worldList.getWorldListRows().then(
      rows => {
        expect(rows.length).toEqual(3);
      }
    );

    wiremock.get('/v1/report/world/' + newWorldId, {id: newWorldId, currentStepId: 1});
    worldList.getLastViewDetailsButton().click();

    expect(details.isDisplayed()).toBe(true);
    expect(details.getHeaderTitle()).toEqual('World ' + newWorldId);

    details.getBackToListButton().click();
    expect(worldList.isDisplayed()).toBe(true);
  });

});
