class DashboardPage {
  directoryMenu = "a[href*='dashboard']";
  pageTitle = ".oxd-topbar-header-breadcrumb h6";
  widgetTimeatWork = ".orangehrm-dashboard-grid > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)";
  widgetMyActions = ".orangehrm-dashboard-widget:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)";
  widgetQuickLaunch = ".orangehrm-dashboard-widget:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)";
  widgetBuzzLatestPosts = ".orangehrm-dashboard-widget:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)";
  widgetEmployeesLeaveToday = ".orangehrm-dashboard-widget:nth-child(5) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)";
  widgetEmployeeDistribution = ".orangehrm-dashboard-widget:nth-child(6) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)";
  widgetEmployeeDistributionLocation = ".orangehrm-dashboard-widget:nth-child(7) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)";
  
  getDashboardMenu() {
    return cy.get(this.directoryMenu);
  }
  
  clickDashboardMenu() {
    cy.get(this.directoryMenu).click();
  }

  getWidgetTimeatWork(widgetTimeatWork) {
    return cy.get(this.widgetTimeatWork);
  }

  getWidgetMyActions(widgetMyActions) {
    return cy.get(this.widgetMyActions);
  }

  getWidgetQuickLaunch(widgetQuickLaunch) {
    return cy.get(this.widgetQuickLaunch);
  }

  getWidgetBuzzLatestPosts(widgetBuzzLatestPosts) {
    return cy.get(this.widgetBuzzLatestPosts);
  }

  getWidgetEmployeesLeaveToday(widgetEmployeesLeaveToday) {
    return cy.get(this.widgetEmployeesLeaveToday);
  }

  getWidgetEmployeeDistribution(widgetEmployeeDistribution) {
    return cy.get(this.widgetEmployeeDistribution);
  }

  getWidgetEmployeeDistributionLocation(widgetEmployeeDistributionLocation) {
    return cy.get(this.widgetEmployeeDistributionLocation);
  }

  verifyPageTitle(expectedTitle) {
    cy.get(this.pageTitle).should("contain.text", expectedTitle);
  }
}

export default new DashboardPage();
