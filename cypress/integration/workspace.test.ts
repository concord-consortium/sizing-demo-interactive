context("Test the overall app", () => {
  beforeEach(() => {
    cy.visit("");
  });

  describe("Desktop functionalities", () => {
    it("renders with text", () => {
      cy.get(".app").should("contain", "Width: ");
      cy.get(".app").should("contain", "Height: ");
      cy.get(".app").should("contain", "Aspect Ratio");
    });
  });
});
