const jswiremocklib = require('jswiremock');

export class Wiremock {
    jswiremock;

    constructor() {
        this.jswiremock = new jswiremocklib.jswiremock(9999);
    }

    stop() {
        this.jswiremock.stopJSWireMock();
    }

    get(url: string, response: object) {
        jswiremocklib.stubFor(
          this.jswiremock,
          jswiremocklib.get(jswiremocklib.urlEqualTo(url))
            .willReturn(jswiremocklib.a_response()
                .withStatus(200)
                .withHeader({'Content-Type': 'application/json'})
                .withBody(JSON.stringify(response)))
        );
    }

    post(url: string, request: object, response: object) {
      jswiremocklib.stubFor(
        this.jswiremock,
        jswiremocklib.post(jswiremocklib.urlEqualTo(url), request)
          .willReturn(jswiremocklib.a_response()
              .withStatus(200)
              .withHeader({'Content-Type': 'application/json'})
              .withBody(JSON.stringify(response)))
      );
  }
}
