# Internship Test Task for Frontend Intern (Fall 2025 Wave)
![mockup](mockup.jpg)

## **Advertisement Management System for Moderation**

### **Task Description**
It is necessary to develop a web application for moderating advertisements on the Avito platform. This is a simplified version of the internal system used by moderators to review and manage user advertisements.

### **Business Context**
Thousands of advertisements are published daily on Avito, which must undergo moderation before publication. Moderators need a convenient tool for quickly reviewing advertisements, making decisions, and tracking their effectiveness.

### **Technical Requirements**

#### **Mandatory:**
- Node.js v20
- React v18+
- react-router-dom for routing
- Use of the ready API located in the server folder of this repository
- The source code of the solution must have a readme file containing instructions for launching the project and justification for the choice of optional technologies

#### **Optional:**
- Use of any UI component library is permitted
- TypeScript usage is desirable
- Use of any external libraries is permitted, including:
  - Design system/UI-kit (Material-UI, Ant Design)
  - State management (Redux, MobX, Effector)
  - Linter (ESLint)
  - Prettier
  - Build system (Webpack, Vite)
  - Library for working with asynchronous HTTP requests (React Query, Axios)
- Ability to run the project in a containerized docker environment, even better - server and client launched using docker compose
- Interruption (cancellation/termination) of requests when navigating from page to page
- Code coverage with unit tests
- Code comments and documentation

### **Functional Requirements**

#### **1. Main Page — Advertisement List (/list)**
- Display of advertisement list as cards
- Each card contains:
  - Product image (placeholder images can be used)
  - Advertisement title
  - Price
  - Category
  - Creation date
  - Status (under moderation / approved / rejected)
  - Priority indicator (normal / urgent)

**Filtering and Search:**
- Filter by status (multiple selection)
- Filter by category
- Filter by price range
- Search by advertisement title
- Reset all filters

**Sorting:**
- By creation date (new/old)
- By price (ascending/descending)
- By priority

**Pagination:**
- 10 advertisements per page
- Navigation between pages
- Display of total advertisement count

#### **2. Advertisement Detail Page (/item/:id)**
When clicking on a card, the detailed advertisement page opens.

**Advertisement Information:**
- Image gallery (minimum 3 images)
- Full description
- Product specifications (as key-value table)
- Seller information:
  - Name
  - Rating
  - Number of advertisements
  - Registration date

**Moderation History:**
- List of all actions with the advertisement
- Who checked (moderator name)
- When (date and time)
- What decision was made
- Comment (if any)

**Moderator Action Panel:**
- "Approve" button (green)
- "Reject" button (red)
- "Return for revision" button (yellow)

**When rejecting:**
- Mandatory field for specifying reason
- Quick reason templates:
  - Prohibited item
  - Incorrect category
  - Invalid description
  - Photo issues
  - Suspicion of fraud
  - Other (with input field)

**Navigation:**
- "Back to list" button
- "Previous" / "Next" advertisement buttons (for quick moderation)

#### **3. Moderator Statistics Page (/stats)**

**General Statistics:**
- Cards with metrics:
  - Total checked advertisements (for today/week/month)
  - Percentage approved
  - Percentage rejected
  - Average time for checking one advertisement

**Charts:**
- Activity chart by days for the last week (bar chart)
- Pie chart of decision distribution (approved/rejected/for revision)
- Chart by categories of checked advertisements

### **Additional Functional Capabilities (optional) Implement these when done with the rest**

**1. Hotkeys:**
- `A` - approve advertisement
- `D` - reject advertisement
- `→` - next advertisement
- `←` - previous advertisement
- `/` - focus on search

**2. Bulk Operations:**
- Checkboxes for selecting multiple advertisements
- Mass approval/rejection
- Selected advertisements counter

**3. Advanced Filtering:**
- Saving filter sets
- URL filter synchronization (can share link)

**4. Dark Theme:**
- Theme switcher
- Saving choice in localStorage

**5. Data Export:**
- Export statistics to CSV
- PDF report generation

**6. Real-time Updates:**
- Auto-update of new advertisements list
- New advertisements counter
- Advertisement status

**7. Animations:**
- Smooth transitions between pages
- Card appearance animation
- Progress bar for loading

**8. Period Filter on Moderator Statistics Page /stats:**
- Today
- Last 7 days
- Last 30 days

### **What NOT to Do**
- Implement authorization/registration (assume user is already authorized)
- Implement real image uploads
- Do integration with external services