class ForgotPasswordPage {
  usernameField = "input[name='username']";
  resetButton = "button[type='submit']";
  messageBox = "h6.oxd-text";
  resetBox = "span.oxd-text";
  cancelButton = "button.oxd-button:nth-child(1)";

  enterUsername(username) {
    cy.get(this.usernameField).clear().type(username);
  }

  clickResetPassword() {
    cy.get(this.resetButton).click();
  }

  clickCancel() {
    cy.get(this.cancelButton).click();
  }

  verifyMessage(message) {
    cy.get(this.messageBox)
      .should("be.visible")
      .and("contain.text", message);
  }

  verifyRequired(message) {
    cy.get(this.resetBox)
      .should("be.visible")
      .and("contain.text", message);
  }
}

export default new ForgotPasswordPage();
