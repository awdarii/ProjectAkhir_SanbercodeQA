class LoginPage {
  usernameField = "input[name='username']";
  passwordField = "input[name='password']";
  loginButton = "button[type='submit']";
  forgotPasswordLink = ".orangehrm-login-forgot-header";
  errorMessage = ".oxd-alert-content-text, .oxd-input-field-error-message";
  dashboardHeader = ".oxd-topbar-header-breadcrumb > h6";
  iconLinkedln = ".orangehrm-login-footer-sm > a:nth-child(1)";
  iconFacebook = ".orangehrm-login-footer-sm > a:nth-child(2)";
  iconTwitter = ".orangehrm-login-footer-sm > a:nth-child(3)";
  iconYoutube = ".orangehrm-login-footer-sm > a:nth-child(4)";

  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  }

  getUsernameInput() {
      return cy.get(this.usernameField);
  }
  
  enterUsername(username) {
    cy.get(this.usernameField).clear().type(username);
  }

  getPasswordInput() {
    return cy.get(this.passwordField);
  }

  enterPassword(password) {
    cy.get(this.passwordField).clear().type(password);
  }

  getButtonLogin() {
    return cy.get(this.loginButton);
  }

  clickLogin() {
    cy.get(this.loginButton).click();
  }

  clickForgotPassword() {
    cy.get(this.forgotPasswordLink).click();
  }

  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should("contain.text", message);
  }

  assertDashboard() {
    cy.get(this.dashboardHeader).should("contain.text", "Dashboard");
  }

  assertErrorMessage() {
    cy.get(".oxd-alert-content-text").should("be.visible");
  }

  assertErrorRequired() {
    cy.get("span.oxd-text").should("be.visible");
  }

  clickLinkedln() {
    cy.get(this.iconLinkedln).invoke("removeAttr", "target").click();
  }

  clickTwitter() {
    cy.get(this.iconTwitter).invoke("removeAttr", "target").click();
  }

  clickFacebook() {
    cy.get(this.iconFacebook).invoke("removeAttr", "target").click();
  }

  clickYoutube() {
    cy.get(this.iconYoutube).invoke("removeAttr", "target").click();
  }

}

export default new LoginPage();
