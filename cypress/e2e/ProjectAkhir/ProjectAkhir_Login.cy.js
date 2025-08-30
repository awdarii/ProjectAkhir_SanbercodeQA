import loginPage from "../../pages/ProjectAkhir/loginPage";
import loginData from "../../fixtures/ProjectAkhir/loginData.json";

describe("Login Feature", () => {

  beforeEach(() => {
  // daftarkan intercept untuk request login
  cy.intercept("POST", "**/auth/validate*").as("loginRequest");

  // buka halaman login sebelum setiap test
  loginPage.visit();

  cy.wait(1000);
});

  it("1. Login menggunakan fitur foreach", () => {
    //Pakai metode DDT dengan penggunaan loginData.json
    cy.fixture("ProjectAkhir/loginData").then((users) => {
    //Pakai metode parameterisasi dengan penggunaan forEach
      users.forEach((data) => {
        cy.log(`Testing dengan case: ${data.case}`);

        //Cek dulu data username nya kosong (string kosong) atau tidak? Jika kosong maka tidak perlu di isi
        if (data.username) {
          loginPage.enterUsername(data.username);
        }

        if (data.password) {
          loginPage.enterPassword(data.password);
        }

        loginPage.clickLogin();

        // validasi berhasil / gagal login
        cy.url().should("include", data.expectedUrl);
        cy.wait(1000);

        // balik ke login page supaya test berikutnya jalan
        if (data.expectedUrl.includes("dashboard")) {
          // berarti login sukses → logout dulu
          cy.get('.oxd-userdropdown-tab').click();
          cy.wait(1000);
          cy.contains('Logout').click();
        } else {
          loginPage.visit();
        }

        cy.wait(1000);
      });
    });
  });

  it('TC_001 - Pengguna dapat login menggunakan data valid', () => {
    const data = loginData[0]; // ambil dataset pertama

    if (data.username) {
      loginPage.enterUsername(data.username);
    }

    if (data.password) {
      loginPage.enterPassword(data.password);
    }

    loginPage.clickLogin();

    //Karena server OrangeHRM pakai redirect setelah login sukses, maka pakai 302 bukan langsung 200.
    //302 bukan error, tapi artinya server berhasil memproses request dan mengarahkan user ke URL lain.
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);

    loginPage.assertDashboard();

    //cy.wait(...302) → validasi backend sukses.
    //loginPage.assertDashboard(); → validasi frontend benar-benar tampil di Dashboard.
    //Kombinasi API level check + UI level check → best practice buat automation, biar test lebih kuat
  });

  it('TC_002 - username salah dan password benar', () => {
    const data = loginData[1]; 
    
    if (data.username) {
      loginPage.enterUsername(data.username);
    }

    if (data.password) {
      loginPage.enterPassword(data.password);
    }
    loginPage.clickLogin();
  
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
  
    loginPage.assertErrorMessage();
  });

  it('TC_003 - username benar dan password salah', () => {
    const data = loginData[2]; 

    if (data.username) {
        loginPage.enterUsername(data.username);
    }

    if (data.password) {
      loginPage.enterPassword(data.password);
    }

    loginPage.clickLogin();
  
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
  
    loginPage.assertErrorMessage();
  });

  it('TC_004 - username salah dan password salah', () => {
    const data = loginData[3]; 

    if (data.username) {
        loginPage.enterUsername(data.username);
    }

    if (data.password) {
      loginPage.enterPassword(data.password);
    }

    loginPage.clickLogin();
  
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
  
    loginPage.assertErrorMessage();
  });

  //request mungkin tidak terkirim ke backend sehingga validasi cukup di UI dengan assertErrorRequired() tanpa cy.wait
  it('TC_005 - username kosong', () => {
    const data = loginData[4]; 

    if (data.username) {
      loginPage.enterUsername(data.username);
    }

    if (data.password) {
      loginPage.enterPassword(data.password);
    }

    loginPage.clickLogin();  
    loginPage.assertErrorRequired();
  });

  it('TC_006 - password kosong', () => {
    const data = loginData[5]; 

    if (data.username) {
      loginPage.enterUsername(data.username);
    }

    if (data.password) {
      loginPage.enterPassword(data.password);
    }
    
    loginPage.clickLogin();  
    loginPage.assertErrorRequired();
  });

  it('TC_007 - username kosong dan password kosong', () => {
    const data = loginData[6]; 

    if (data.username) {
      loginPage.enterUsername(data.username);
    }

    if (data.password) {
      loginPage.enterPassword(data.password);
    }
    
    loginPage.clickLogin();  
    loginPage.assertErrorRequired();
  });

  it('TC_008 - spasi di depan username', () => {
    const data = loginData[7]; 

    if (data.username) {
      loginPage.enterUsername(data.username);
    }

    if (data.password) {
      loginPage.enterPassword(data.password);
    }
    
    loginPage.clickLogin();  
    loginPage.assertErrorRequired();
  });

  it('TC_010 - Pengguna dapat masuk ke fitur Reset Password', () => {
    loginPage.clickForgotPassword();
  });

  it('TC_011 - Pengguna dapat menggunakan fitur Linkedln', () => {
    loginPage.clickLinkedln();

    cy.origin("https://www.linkedin.com", () => {
    cy.location("hostname").should("include", "linkedin.com");
  });

  loginPage.visit();
  });

  it('TC_012 - Pengguna dapat menggunakan fitur Facebook', () => {
    loginPage.clickFacebook();

    cy.origin("https://www.facebook.com", () => {
    cy.location("hostname").should("include", "facebook.com");
  });

  loginPage.visit();
  });

  it('TC_013 - Pengguna dapat menggunakan fitur Twitter', () => {
    loginPage.clickTwitter();

    cy.origin("https://www.x.com", () => {
    cy.location("hostname").should("include", "x.com");
  });

  loginPage.visit();
  });
});