// End-to-end tests for user flows
describe('User Flow E2E Tests', () => {
  
  beforeEach(() => {
    // Visit the application before each test
    cy.visit('http://localhost:3000');
  });

  describe('User Registration Flow', () => {
    it('should complete user registration successfully', () => {
      // Navigate to registration page
      cy.contains('Sign Up').click();
      cy.url().should('include', '/register');
      
      // Fill in registration form
      cy.get('[data-testid="email-input"]').type('newuser@example.com');
      cy.get('[data-testid="name-input"]').type('New User');
      cy.get('[data-testid="password-input"]').type('SecureP@ss123');
      cy.get('[data-testid="confirm-password-input"]').type('SecureP@ss123');
      
      // Submit form
      cy.get('[data-testid="register-button"]').click();
      
      // Verify successful registration
      cy.contains('Registration successful').should('be.visible');
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome, New User').should('be.visible');
    });

    it('should show validation errors for invalid input', () => {
      cy.contains('Sign Up').click();
      
      // Try to submit empty form
      cy.get('[data-testid="register-button"]').click();
      
      // Check for validation errors
      cy.contains('Email is required').should('be.visible');
      cy.contains('Name is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
      
      // Enter invalid email
      cy.get('[data-testid="email-input"]').type('invalid-email');
      cy.get('[data-testid="register-button"]').click();
      cy.contains('Invalid email format').should('be.visible');
      
      // Enter weak password
      cy.get('[data-testid="email-input"]').clear().type('user@example.com');
      cy.get('[data-testid="name-input"]').type('Test User');
      cy.get('[data-testid="password-input"]').type('weak');
      cy.get('[data-testid="register-button"]').click();
      cy.contains('Password must be at least 8 characters').should('be.visible');
    });

    it('should prevent duplicate email registration', () => {
      // First registration
      cy.contains('Sign Up').click();
      cy.get('[data-testid="email-input"]').type('existing@example.com');
      cy.get('[data-testid="name-input"]').type('First User');
      cy.get('[data-testid="password-input"]').type('SecureP@ss123');
      cy.get('[data-testid="confirm-password-input"]').type('SecureP@ss123');
      cy.get('[data-testid="register-button"]').click();
      
      // Logout
      cy.get('[data-testid="logout-button"]').click();
      
      // Try to register with same email
      cy.contains('Sign Up').click();
      cy.get('[data-testid="email-input"]').type('existing@example.com');
      cy.get('[data-testid="name-input"]').type('Second User');
      cy.get('[data-testid="password-input"]').type('AnotherP@ss123');
      cy.get('[data-testid="confirm-password-input"]').type('AnotherP@ss123');
      cy.get('[data-testid="register-button"]').click();
      
      // Check for error
      cy.contains('Email already registered').should('be.visible');
    });
  });

  describe('User Login Flow', () => {
    beforeEach(() => {
      // Create a test user via API
      cy.request('POST', 'http://localhost:3000/api/users', {
        email: 'testuser@example.com',
        name: 'Test User',
        password: 'TestP@ss123'
      });
    });

    it('should login with valid credentials', () => {
      cy.contains('Login').click();
      cy.url().should('include', '/login');
      
      cy.get('[data-testid="email-input"]').type('testuser@example.com');
      cy.get('[data-testid="password-input"]').type('TestP@ss123');
      cy.get('[data-testid="login-button"]').click();
      
      // Verify successful login
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome back, Test User').should('be.visible');
      cy.get('[data-testid="user-menu"]').should('be.visible');
    });

    it('should show error for invalid credentials', () => {
      cy.contains('Login').click();
      
      cy.get('[data-testid="email-input"]').type('testuser@example.com');
      cy.get('[data-testid="password-input"]').type('WrongPassword');
      cy.get('[data-testid="login-button"]').click();
      
      cy.contains('Invalid email or password').should('be.visible');
      cy.url().should('include', '/login');
    });

    it('should redirect to login when accessing protected routes', () => {
      cy.visit('http://localhost:3000/dashboard');
      cy.url().should('include', '/login');
      cy.contains('Please login to continue').should('be.visible');
    });

    it('should remember user with "Remember Me" option', () => {
      cy.contains('Login').click();
      
      cy.get('[data-testid="email-input"]').type('testuser@example.com');
      cy.get('[data-testid="password-input"]').type('TestP@ss123');
      cy.get('[data-testid="remember-me-checkbox"]').check();
      cy.get('[data-testid="login-button"]').click();
      
      // Close and reopen browser (simulated)
      cy.reload();
      
      // Should still be logged in
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome back, Test User').should('be.visible');
    });
  });

  describe('User Profile Management', () => {
    beforeEach(() => {
      // Login as test user
      cy.request('POST', 'http://localhost:3000/api/auth/login', {
        email: 'admin@example.com',
        password: 'admin123'
      }).then((response) => {
        window.localStorage.setItem('authToken', response.body.token);
      });
      cy.visit('http://localhost:3000/dashboard');
    });

    it('should view user profile', () => {
      cy.get('[data-testid="user-menu"]').click();
      cy.contains('Profile').click();
      
      cy.url().should('include', '/profile');
      cy.get('[data-testid="profile-email"]').should('contain', 'admin@example.com');
      cy.get('[data-testid="profile-name"]').should('contain', 'Admin User');
    });

    it('should update user profile', () => {
      cy.visit('http://localhost:3000/profile');
      
      cy.get('[data-testid="edit-profile-button"]').click();
      
      // Update profile information
      cy.get('[data-testid="name-input"]').clear().type('Updated Admin');
      cy.get('[data-testid="phone-input"]').type('123-456-7890');
      cy.get('[data-testid="bio-textarea"]').type('This is my bio');
      
      cy.get('[data-testid="save-profile-button"]').click();
      
      // Verify update
      cy.contains('Profile updated successfully').should('be.visible');
      cy.get('[data-testid="profile-name"]').should('contain', 'Updated Admin');
      cy.get('[data-testid="profile-phone"]').should('contain', '123-456-7890');
    });

    it('should change password', () => {
      cy.visit('http://localhost:3000/profile');
      
      cy.get('[data-testid="change-password-button"]').click();
      
      cy.get('[data-testid="current-password-input"]').type('admin123');
      cy.get('[data-testid="new-password-input"]').type('NewP@ss456');
      cy.get('[data-testid="confirm-password-input"]').type('NewP@ss456');
      
      cy.get('[data-testid="update-password-button"]').click();
      
      cy.contains('Password updated successfully').should('be.visible');
      
      // Verify can login with new password
      cy.get('[data-testid="logout-button"]').click();
      cy.contains('Login').click();
      cy.get('[data-testid="email-input"]').type('admin@example.com');
      cy.get('[data-testid="password-input"]').type('NewP@ss456');
      cy.get('[data-testid="login-button"]').click();
      
      cy.url().should('include', '/dashboard');
    });
  });

  describe('User Search and List', () => {
    beforeEach(() => {
      // Create multiple test users
      const users = [
        { email: 'john.doe@example.com', name: 'John Doe' },
        { email: 'jane.smith@example.com', name: 'Jane Smith' },
        { email: 'bob.johnson@example.com', name: 'Bob Johnson' },
        { email: 'alice.williams@example.com', name: 'Alice Williams' }
      ];
      
      users.forEach(user => {
        cy.request('POST', 'http://localhost:3000/api/users', user);
      });
      
      // Login as admin
      cy.request('POST', 'http://localhost:3000/api/auth/login', {
        email: 'admin@example.com',
        password: 'admin123'
      }).then((response) => {
        window.localStorage.setItem('authToken', response.body.token);
      });
    });

    it('should display list of users', () => {
      cy.visit('http://localhost:3000/users');
      
      cy.get('[data-testid="user-list"]').should('be.visible');
      cy.get('[data-testid="user-card"]').should('have.length.at.least', 4);
      
      // Verify user information is displayed
      cy.contains('John Doe').should('be.visible');
      cy.contains('jane.smith@example.com').should('be.visible');
    });

    it('should search users by name', () => {
      cy.visit('http://localhost:3000/users');
      
      cy.get('[data-testid="search-input"]').type('john');
      cy.get('[data-testid="search-button"]').click();
      
      // Should show matching users
      cy.get('[data-testid="user-card"]').should('have.length', 2);
      cy.contains('John Doe').should('be.visible');
      cy.contains('Bob Johnson').should('be.visible');
      
      // Should not show non-matching users
      cy.contains('Jane Smith').should('not.exist');
      cy.contains('Alice Williams').should('not.exist');
    });

    it('should search users by email', () => {
      cy.visit('http://localhost:3000/users');
      
      cy.get('[data-testid="search-input"]').type('smith');
      cy.get('[data-testid="search-button"]').click();
      
      cy.get('[data-testid="user-card"]').should('have.length', 1);
      cy.contains('Jane Smith').should('be.visible');
    });

    it('should paginate user list', () => {
      // Create additional users for pagination
      for (let i = 1; i <= 20; i++) {
        cy.request('POST', 'http://localhost:3000/api/users', {
          email: `user${i}@example.com`,
          name: `User ${i}`
        });
      }
      
      cy.visit('http://localhost:3000/users');
      
      // Check pagination controls
      cy.get('[data-testid="pagination"]').should('be.visible');
      cy.get('[data-testid="page-1"]').should('have.class', 'active');
      
      // Navigate to second page
      cy.get('[data-testid="page-2"]').click();
      cy.get('[data-testid="page-2"]').should('have.class', 'active');
      
      // Navigate using next/previous buttons
      cy.get('[data-testid="prev-page"]').click();
      cy.get('[data-testid="page-1"]').should('have.class', 'active');
      
      cy.get('[data-testid="next-page"]').click();
      cy.get('[data-testid="page-2"]').should('have.class', 'active');
    });
  });

  describe('User Deletion Flow', () => {
    beforeEach(() => {
      // Create a test user
      cy.request('POST', 'http://localhost:3000/api/users', {
        email: 'delete.me@example.com',
        name: 'Delete Me'
      });
      
      // Login as admin
      cy.request('POST', 'http://localhost:3000/api/auth/login', {
        email: 'admin@example.com',
        password: 'admin123'
      }).then((response) => {
        window.localStorage.setItem('authToken', response.body.token);
      });
    });

    it('should delete user with confirmation', () => {
      cy.visit('http://localhost:3000/users');
      
      // Find and click delete button for specific user
      cy.contains('Delete Me')
        .parent('[data-testid="user-card"]')
        .find('[data-testid="delete-user-button"]')
        .click();
      
      // Confirm deletion in modal
      cy.get('[data-testid="confirm-modal"]').should('be.visible');
      cy.contains('Are you sure you want to delete this user?').should('be.visible');
      cy.get('[data-testid="confirm-delete-button"]').click();
      
      // Verify deletion
      cy.contains('User deleted successfully').should('be.visible');
      cy.contains('Delete Me').should('not.exist');
    });

    it('should cancel user deletion', () => {
      cy.visit('http://localhost:3000/users');
      
      cy.contains('Delete Me')
        .parent('[data-testid="user-card"]')
        .find('[data-testid="delete-user-button"]')
        .click();
      
      // Cancel deletion
      cy.get('[data-testid="cancel-delete-button"]').click();
      
      // User should still exist
      cy.contains('Delete Me').should('be.visible');
    });
  });

  describe('Navigation and Routing', () => {
    it('should navigate between pages using menu', () => {
      cy.visit('http://localhost:3000');
      
      // Navigate to different pages
      cy.get('[data-testid="nav-home"]').click();
      cy.url().should('eq', 'http://localhost:3000/');
      
      cy.get('[data-testid="nav-about"]').click();
      cy.url().should('include', '/about');
      
      cy.get('[data-testid="nav-contact"]').click();
      cy.url().should('include', '/contact');
    });

    it('should handle browser back/forward navigation', () => {
      cy.visit('http://localhost:3000');
      cy.get('[data-testid="nav-about"]').click();
      cy.get('[data-testid="nav-contact"]').click();
      
      // Go back
      cy.go('back');
      cy.url().should('include', '/about');
      
      // Go forward
      cy.go('forward');
      cy.url().should('include', '/contact');
    });

    it('should show 404 page for invalid routes', () => {
      cy.visit('http://localhost:3000/invalid-route', { failOnStatusCode: false });
      
      cy.contains('404').should('be.visible');
      cy.contains('Page not found').should('be.visible');
      cy.get('[data-testid="home-link"]').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });

  describe('Responsive Design', () => {
    it('should work on mobile devices', () => {
      // Set viewport to mobile size
      cy.viewport('iphone-x');
      
      cy.visit('http://localhost:3000');
      
      // Check mobile menu
      cy.get('[data-testid="mobile-menu-button"]').should('be.visible');
      cy.get('[data-testid="desktop-menu"]').should('not.be.visible');
      
      // Open mobile menu
      cy.get('[data-testid="mobile-menu-button"]').click();
      cy.get('[data-testid="mobile-menu"]').should('be.visible');
      
      // Navigate using mobile menu
      cy.get('[data-testid="mobile-nav-about"]').click();
      cy.url().should('include', '/about');
    });

    it('should work on tablet devices', () => {
      cy.viewport('ipad-2');
      
      cy.visit('http://localhost:3000');
      
      // Check layout adjustments
      cy.get('[data-testid="content-container"]').should('have.css', 'padding');
      cy.get('[data-testid="sidebar"]').should('be.visible');
    });

    it('should work on desktop', () => {
      cy.viewport(1920, 1080);
      
      cy.visit('http://localhost:3000');
      
      cy.get('[data-testid="desktop-menu"]').should('be.visible');
      cy.get('[data-testid="mobile-menu-button"]').should('not.exist');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.visit('http://localhost:3000');
      
      // Tab through interactive elements
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid', 'skip-to-content');
      
      cy.focused().tab();
      cy.focused().should('have.attr', 'data-testid', 'nav-home');
      
      // Activate link with Enter key
      cy.focused().tab().tab().type('{enter}');
      cy.url().should('include', '/about');
    });

    it('should have proper ARIA labels', () => {
      cy.visit('http://localhost:3000');
      
      cy.get('[data-testid="main-navigation"]').should('have.attr', 'aria-label', 'Main navigation');
      cy.get('[data-testid="search-input"]').should('have.attr', 'aria-label', 'Search users');
      cy.get('[data-testid="user-menu"]').should('have.attr', 'aria-label', 'User menu');
    });

    it('should announce form errors to screen readers', () => {
      cy.visit('http://localhost:3000/login');
      
      cy.get('[data-testid="login-button"]').click();
      
      cy.get('[data-testid="email-error"]')
        .should('have.attr', 'role', 'alert')
        .and('have.attr', 'aria-live', 'polite');
    });
  });
});