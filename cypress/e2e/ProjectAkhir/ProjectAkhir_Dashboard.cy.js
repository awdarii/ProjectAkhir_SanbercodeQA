import LoginPage from "../../pages/ProjectAkhir/loginPage";
import DashboardPage from "../../pages/ProjectAkhir/dashboardPage";
import DirectoryPage from "../../pages/ProjectAkhir/directoryPage";
import loginData from "../../fixtures/ProjectAkhir/loginData.json";
import dashboardData from "../../fixtures/ProjectAkhir/dashboardData.json";


describe("Dashboard Directory Feature", () => {

  beforeEach(() => {
    LoginPage.visit();
    const data = loginData[0]; // ambil dataset pertama

    if (data.username) {
      LoginPage.enterUsername(data.username);
    }

    if (data.password) {
      LoginPage.enterPassword(data.password);
    }

    LoginPage.clickLogin();
    cy.url().should("include", "/dashboard");

    cy.wait(1000);
  });

  it('TC_01 - Menampilkan halaman Dashboard', () => {
    // Verifikasi halaman Dashboard tampil
    DashboardPage.getDashboardMenu().should('be.visible');
  });

  it('TC_02 - Memverifikasi Widget yang ada', () => {
      DashboardPage.getDashboardMenu().should('be.visible');
      cy.wait(1000);
      DashboardPage.getWidgetTimeatWork().should('be.visible');
      DashboardPage.getWidgetMyActions().should('be.visible');
      DashboardPage.getWidgetQuickLaunch().should('be.visible');
      DashboardPage.getWidgetBuzzLatestPosts().should('be.visible');
      DashboardPage.getWidgetEmployeesLeaveToday().should('be.visible');
      DashboardPage.getWidgetEmployeeDistribution().should('be.visible');
      DashboardPage.getWidgetEmployeeDistributionLocation().should('be.visible');
  });

  it('TC_03 - Search Employees with Data Driven', () => {
    DirectoryPage.visit();
    cy.fixture('ProjectAkhir/dashboardData').then((data) => {
      data.employees.forEach((employee) => {
      // Aksi search dari dashboard
      DirectoryPage.searchEmployee(employee);

      // Verifikasi hasil di DirectoryPage
      DirectoryPage.verifyEmployeeInTable(employee);
      });
    });
  });

  it('TC_04 - JobTitle Filter with Data Driven', () => {
    DirectoryPage.visit();
    cy.fixture('ProjectAkhir/dashboardData').then((data) => {
      data.jobTitles.forEach((jobTitle) => {
        DirectoryPage.selectJobTitle(jobTitle);
      });
    });
  });

  it('TC_05 - Location Filter with Data Driven', () => {
    DirectoryPage.visit();
    cy.fixture('ProjectAkhir/dashboardData').then((data) => {
      data.location.forEach((location) => {
        DirectoryPage.selectLocation(location);
      });
    });
  });

  it('TC_06 - Click first employee to view profile', () => {
    DirectoryPage.visit();
    cy.wait(1000);
    DirectoryPage.clickFirstEmployee();
    DirectoryPage.verifyProfileVisible();
  });

  it('TC_07 - Click Reset', () => {
    DirectoryPage.visit();
    DirectoryPage.searchEmployee("peter");
    DirectoryPage.verifyEmployeeInTable("peter");
    DirectoryPage.clickReset();
  });

  it('TC_08 - Click icon directory down', () => {
    DirectoryPage.visit();
    DirectoryPage.clickDown();
    cy.wait(100);
    DirectoryPage.clickDown();
  });

  it('TC_09 - Click icon directory left', () => {
    DirectoryPage.visit();
    DirectoryPage.clickIconLeft();
    cy.wait(100);
    DirectoryPage.clickIconLeft();
  });

  it('TC_10 - Click icon directory Help', () => {
    DirectoryPage.visit();
    DirectoryPage.clickIconHelp();
    cy.wait(100);
    cy.origin("https://starterhelp.orangehrm.com/hc/en-us", () => {
      cy.location("hostname").should("include", "demo.orangehrmlive.com");
    });
  });
});