--> Project Akhir
Membuat Automation Testing using Cypress pada fitur login, forgot password, menu dashboard (Directory) pada website orangeHRM demo.

## Test case fitur login dan forgot password
saya memakai test case dari tugas sebelumnya, yaitu ada pada link:
https://docs.google.com/spreadsheets/d/1dtsGzPpfZt2rq4fv086pIjUAEvL0fU01iGAHuoTy3qo/edit?gid=0#gid=0

## Teknologi yang digunakan:
Cypress → framework test automation end-to-end
POM (Page Object Model) → Memisahkan struktur halaman web (locator dan method) dari script pengujian. Tujuannya untuk memudahkan maintenance & reusable
Intercept → Menangkap dan memanipulasi request & response API selama pengujian. Kelebihannya bisa mock response tanpa tergantung backend dan bisa cek status API (200, 400, 401)
DDT (Data-Driven Testing) → Menjalankan satu test case dengan banyak data input. Kelebihannya dapat memastikan aplikasi bekerja dengan berbagai skenario dan tidak perlu menulis test case berulang
Parameterisasi → Memberikan parameter/variable ke test case sehingga lebih fleksibel

## Struktur folder POM
QUIZ3/
 ├─ cypress/
 │    ├─ e2e/ProjectAkhir/
 │    │    ├─ ProjectAkhir_Dashboard.cy.js
 │    │    ├─ ProjectAkhir_ForgotPass.cy.js
 │    │    └─ ProjectAkhir_Login.cy.js
 │    ├─ fixtures/ProjectAkhir/
 │    |    ├─ dashboardData.json
 │    |    ├─ forgotPasswordData.json
 │    |    └─ loginData.json
 |    └─ pages/ProjectAkhir/
 |         ├─ dashboardPage.js
 |         ├─ directoryPage.js
 |         ├─ forgotPassPage.js
 |         └─ loginPage.js
 |    
 ├─ cypress.config.js
 └─ package.json

## Keterangan:
cypress/e2e/ → semua file test case .cy.js berada di sini.
cypress/pages/ → semua Page Object Model, menyimpan locator & fungsi halaman.
cypress/fixtures/ → semua data untuk Data-Driven Testing (DDT) dan parameterisasi.
cypress.config.js → konfigurasi Cypress 
package.json → dependency project
