import { by } from 'protractor';

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

  beforeEach(() => {
    home = new LandingPage();
    notFound = new NotFoundPage();
    worldList = new WorldListPage();
    details = new WorldDetailsPage();
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
    home.getLoginButton().click();
    worldList.getCreateWorldButton().click();

    // const rows = worldList.getWorldListRows();
    // expect(rows.count()).toBeGreaterThan(0);

    // let lastRow = rows.last();
    // const worldId = lastRow.findElement(by.css('.world-id')).getText();

    // lastRow.findElement(by.css('.view-world-button')).click();
    // expect(details.isDisplayed()).toBe(true);
    // expect(details.getHeaderTitle()).toEqual('World ' + worldId);

    // details.getBackToListButton().click();
    // expect(worldList.isDisplayed()).toBe(true);
  });

});
