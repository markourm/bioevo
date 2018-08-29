import { browser, by, element, $ } from 'protractor';

export class LandingPage {

  isDisplayed() {
    return $('.bioevo-landing-page').isPresent();
  }

  navigateTo() {
    return browser.get('/');
  }

  getText() {
    return $('.bioevo-home-text').getText();
  }

  getLoginButton() {
    return $('.login-button');
  }
}

export class NotFoundPage {

  isDisplayed() {
    return $('.not-found-page').isPresent();
  }

  navigateTo() {
    return browser.get('/notExisting');
  }

  getText() {
    return $('p').getText();
  }

  getHomeLink() {
    return $('p a');
  }
}

export class WorldListPage {

  isDisplayed() {
    return $('.world-list-title').isPresent();
  }

  navigateTo() {
    return browser.get('/bioevo-front');
  }

  getTitle() {
    return $('.world-list-title').getText();
  }

  getWorldListHeader() {
    return $('.world-list-header');
  }

  getWorldListRows() {
    return $('.world-list-table').all(by.css('.world-list-row'));
  }

  getCreateWorldButton() {
    return $('.create-world-button');
  }
}

export class WorldDetailsPage {

  isDisplayed() {
    return $('.world-details').isPresent();
  }

  navigateTo(worldId: number) {
    return browser.get('/bioevo-front/' + worldId);
  }

  getHeaderTitle() {
    return $('.world-details-header-title').getText();
  }

  getText() {
    return $('.world-details-content').getText();
  }

  getAdvanceStepButton() {
    return $('.world-details-step-button');
  }

  getBackToListButton() {
    return $('.world-details-world-list-button');
  }
}
