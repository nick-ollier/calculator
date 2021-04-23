describe("Calculator", () => {
  before(() => {
    cy.visit("/");
  });

  describe("actions", () => {
    /* Clear the calculators state before each test */
    beforeEach(() => cy.findByRole("button", { name: /clear/i }).click());

    describe("button click", () => {
      it('should display "1" When entering "2 / 2" and clicking equals', () => {
        cy.findByRole("button", { name: /2/ }).click();
        cy.findByRole("button", { name: /divide/i }).click();
        cy.findByRole("button", { name: /2/ }).click();
        cy.findByRole("button", { name: /equals/i }).click();

        cy.findByTestId("display").invoke("text").should("match", /1/);
      });

      it('should display the current sum total upon subsequent operator clicks, and then display the final sum value, "16", upon clicking equals', () => {
        cy.findByRole("button", { name: /2/ }).click();
        cy.findByRole("button", { name: /multiply/i }).click();
        cy.findByRole("button", { name: /2/ }).click();
        cy.findByRole("button", { name: /multiply/i }).click();

        cy.findByTestId("display").invoke("text").should("match", /4/);

        cy.findByRole("button", { name: /2/ }).click();
        cy.findByRole("button", { name: /multiply/i }).click();

        cy.findByTestId("display").invoke("text").should("match", /8/);

        cy.findByRole("button", { name: /2/ }).click();
        cy.findByRole("button", { name: /equals/i }).click();

        cy.findByTestId("display").invoke("text").should("match", /16/);
      });
    });

    describe("key press", () => {
      it('should display "4" when typing "2 + 2 ="', () => {
        cy.get("body").type("2+2=");
        cy.findByTestId("display").invoke("text").should("match", /4/);
      });

      it('should display "15,625" when typing "5 * 5" and then entering the "=" key 5 consecutive times', () => {
        cy.get("body").type("5*5=====");
        cy.findByTestId("display")
          .invoke("text")
          .should("match", /15,625/);
      });
    });
  });

  describe("local storage", () => {
    /* Restore the previous localStorage before each test */
    beforeEach(() => {
      cy.restoreLocalStorage();
      cy.visit("/");
    });

    /* Save the current localStorage after each test */
    afterEach(() => cy.saveLocalStorage());

    describe("theme toggle", () => {
      it("should toggle the darkMode theme value item in local storage on click of theme toggle button", () => {
        cy.getLocalStorage("darkMode").should("equal", "true");

        cy.findByRole("button", {
          name: /theme toggle/i,
        }).click();

        cy.getLocalStorage("darkMode").should("equal", "false");
      });

      it("should remember theme when refreshing the page", () => {
        cy.getLocalStorage("darkMode").should("equal", "false");
      });
    });

    describe("orientation toggle", () => {
      it("should toggle the portrait theme value item in local storage on click of theme toggle button", () => {
        cy.getLocalStorage("portrait").should("equal", "true");

        cy.findByRole("button", {
          name: /orientation toggle/i,
        }).click();

        cy.getLocalStorage("portrait").should("equal", "false");
      });

      it("should remember orientation when refreshing the page", () => {
        cy.getLocalStorage("portrait").should("equal", "false");
      });
    });

    describe("history", () => {
      it("should update the history upon completing a sum", () => {
        cy.getLocalStorage("history").should("equal", "[]");

        cy.get("body").type("2+2=");

        cy.getLocalStorage("history").should('contain', '"expression":"2+2","value":4');

        cy.get("body").type("133.7*10=");

        cy.getLocalStorage("history").should('contain', '"expression":"2+2","value":4');
        cy.getLocalStorage("history").should('contain', '"expression":"133.7*10","value":1337');
      });

      it("should retain the previous history when refreshing the page", () => {
        cy.getLocalStorage("history").should('contain', '"expression":"2+2","value":4');
        cy.getLocalStorage("history").should('contain', '"expression":"133.7*10","value":1337');
      });

      it("should display the history panel along with correct history when clicking the history toggle", () => {
        cy.findByRole("button", {
          name: /history toggle/i,
        }).click();

        cy.findByTestId("history").should("be.visible");
        cy.findByTestId("history")
          .invoke("text")
          .should("match", /2 \+ 2 =/);
        cy.findByTestId("history").invoke("text").should("match", /1337/);
      });

      it("should clear the history on click of the clear button", () => {
        cy.getLocalStorage("history").should('contain', '"expression":"2+2","value":4');
        cy.getLocalStorage("history").should('contain', '"expression":"133.7*10","value":1337');

        cy.findByRole("button", {
          name: /history toggle/i,
        }).click();

        cy.wait(1000);

        cy.findByRole("button", {
          name: /clear history/i,
        }).click();

        cy.getLocalStorage("history").should("equal", "[]");

        cy.findByRole("button", {
          name: /history toggle/i,
        }).should("not.exist");
      });
    });
  });
});
