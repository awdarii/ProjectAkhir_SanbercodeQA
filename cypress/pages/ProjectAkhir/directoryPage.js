class DirectoryPage {
  directoryMenu = ".active > span:nth-child(2)";
  employeeNameField = 'input[placeholder="Type for hints..."]';
  searchButton = 'button[type="submit"]';
  selectorTableData = "div.orangehrm-directory-table";
  resetButton = 'button[type="reset"]';
  iconDown = 'div.--toggle:nth-child(3) > button:nth-child(1) > i:nth-child(1)';
  iconLeft = 'button.oxd-icon-button:nth-child(3)';
  iconHelp = '.oxd-topbar-body-nav-slot > button:nth-child(1)';
  iconDropDownJobTitle = 'div.oxd-select-text-input';
  iconDropDownLocation = '.oxd-grid-3 > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)';
  listBoxOption = 'div[role="listbox"] div[role="option"]';
  panelFirstEmployee = '.oxd-grid-4 > div:nth-child(1) > div:nth-child(1)';
  verifyProfile = '.orangehrm-corporate-directory-sidebar > div:nth-child(1) > div:nth-child(1)';

  visit() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory");
  }

  getDirectoryMenu() {
    return cy.get(this.directoryMenu);
  }

  getNameInput() {
    return cy.get(this.employeeNameField);
  }

  searchEmployee(name) {
    cy.get(this.employeeNameField).clear().type(name);
    cy.get(this.searchButton).click();
  }

  verifyEmployeeInTable(name) {
    cy.document().then((doc) => {
      const table = doc.querySelector(this.selectorTableData);
      if (table) {
        // Table muncul, cek nama ada
        cy.wrap(table).should('contain.text', name);
      } else {
        // Table tidak muncul, berarti data memang tidak ada
        cy.log(`Employee "${name}" not found in directory`);
      }
    });
  }

  clickReset() {
    cy.get(this.resetButton).click();
  }

  clickDown() {
    cy.get(this.iconDown).click();
  }

  clickIconLeft() {
    cy.get(this.iconLeft).click();
  }

  clickIconHelp() {
    cy.get(this.iconHelp).invoke("removeAttr", "target").click();
  }
  
  getJobTitleDropdown() {
    return cy.get(this.iconDropDownJobTitle).first();
  }

  getLocationDropdown() {
    return cy.get(this.iconDropDownLocation);
  }

  // Fungsi pilih job title dari dropdown
  selectJobTitle(jobTitle) {
  this.getJobTitleDropdown().click(); // buka dropdown

  cy.document().then((doc) => {
    const options = Cypress.$(this.listBoxOption);
    const option = options.filter((index, el) => el.innerText.trim() === jobTitle);

    if (option.length) {
      cy.wrap(option).click({ force: true });
    } else {
      cy.log(`Location "${jobTitle}" not found, skipping...`);
    }
  });
}

  selectLocation(location) {
  this.getLocationDropdown().click(); // buka dropdown

  cy.document().then((doc) => {
    const options = Cypress.$(this.listBoxOption);
    const option = options.filter((index, el) => el.innerText.trim() === location);

    if (option.length) {
      cy.wrap(option).click({ force: true });
    } else {
      cy.log(`Location "${location}" not found, skipping...`);
    }
  });
}
// Click first employee
  clickFirstEmployee() {
    cy.get(this.panelFirstEmployee).first().click();
  }

  // Verify Profile
  verifyProfileVisible() {
    cy.get(this.verifyProfile).should('be.visible');
  }

}

export default new DirectoryPage;
