import LoginPage from "../../pages/ProjectAkhir/loginPage";
import ForgotPasswordPage from "../../pages/ProjectAkhir/forgotPassPage";
import forgotPassData from "../../fixtures/ProjectAkhir/forgotPasswordData.json";

describe("Forgot Password Feature", () => {

  beforeEach(() => {
    LoginPage.visit();
    LoginPage.clickForgotPassword();
  });

  it("1. Run forgot password test cases with multiple datasets", () => {
      cy.fixture("ProjectAkhir/forgotPasswordData").then((dataSet) => {
      dataSet.forEach((data) => {
        cy.log(`🔹 Running test case: ${data.case}`);

        cy.wrap(null).then(() => {
          // Set up intercept di awal setiap test case
          if (data.expectRequest !== false) {
            cy.intercept("POST", "**/auth/requestResetPassword").as("resetRequest");
          }

          // Masukkan username kalau ada
          if (data.username) {
            ForgotPasswordPage.enterUsername(data.username);
          }

          ForgotPasswordPage.clickResetPassword();

          cy.wait(1000);

          // Tunggu request hanya jika kita ekspektasi request terjadi
          if (data.expectRequest !== false) {
            cy.wait("@resetRequest")
              .its("response.statusCode")
              .should("be.oneOf", [200, 302]);

              // Verifikasi pesan muncul jika reset password benar
              ForgotPasswordPage.verifyMessage(data.expectedMessage);
          }

          LoginPage.visit();
          LoginPage.clickForgotPassword();
        });
      });
    });
  });

  it("TC_014 - Pengguna dapat reset password dengan username yang teirisi", () => {
    const data = forgotPassData[0];

    // 1. Siapkan intercept untuk request reset password
    cy.intercept("POST", "**/auth/requestResetPassword").as("resetRequest");

    ForgotPasswordPage.enterUsername(data.username);
    ForgotPasswordPage.clickResetPassword();

    cy.wait("@resetRequest").its("response.statusCode").should("eq", 302);
    ForgotPasswordPage.verifyMessage(data.expectedMessage);
  });

  it("TC_015 - Pengguna tidak dapat reset password dengan username yang kosong", () => {
    const data = forgotPassData[1];

    ForgotPasswordPage.clickResetPassword();
    ForgotPasswordPage.verifyRequired(data.expectedMessage);
  });

  it("TC_016 - Pengguna dapat klik Cancel pada fitur reset Password", () => {
    cy.intercept('POST', '/web/index.php/api/v1/reset-password').as('resetRequest');

    ForgotPasswordPage.clickCancel();

    //Tidak memakai LoginPage.visit() langsung karena 
    //Untuk memastikan aplikasi benar-benar redirect ke login page setelah klik Cancel.
    //Verifikasi behavior sebenarnya dari aplikasi.
    //Jika tetap dipakai, maka Tidak memverifikasi behavior Cancel sama sekali. Test jadi tidak menilai apakah Cancel benar-benar bekerja.
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    LoginPage.getUsernameInput().should('be.visible');
    LoginPage.getPasswordInput().should('be.visible');
    LoginPage.getButtonLogin().should('be.visible');

    //Verifikasi intercept tidak terpanggil karena Cancel tidak mengirim request
    cy.get('@resetRequest.all').should('have.length', 0);
  });
});