prd.md — Non-Veg Food Ordering Website (Fast + No Clutter)
1) App Overview
A focused online ordering website for cooked non-veg food items where users can quickly browse, add items to cart, and place an order with minimal steps.
Core promise:
✅ Only non-veg items → no clutter
📍 Local experience → works well for a specific city/area
________________________________________
2) Problem Statement
Hungry customers struggle to quickly find and order trusted non-veg cooked food items online because local options are scattered and ordering feels confusing, causing wasted time and missed purchases.
________________________________________
3) Objectives & Success Metrics
Primary Objective
Make non-veg food ordering fast, simple, and reliable.
Demo Success Definition
A user can:
•	Browse items
•	Add to cart
•	Checkout
•	Place order
•	See confirmation
✅ in under 2 minutes
Non-Goals (Out of Scope for v1)
•	Real payment gateway integration
•	Real-time delivery tracking
•	Vendor onboarding / admin dashboard
•	Large-scale inventory management
________________________________________
4) Target Audience (v1)
Primary Users
Online food buyers who want non-veg ordering without distractions.
Focus Segments
1.	Students / hostel users → fast budget-friendly ordering
2.	Working professionals → quick dinner ordering
3.	Hyperlocal city users → want nearby trusted options
Key User Traits
•	Low patience
•	Wants minimal steps
•	Comfortable with basic smartphone/web usage
•	Prefers clarity over too many choices
________________________________________
5) Product Positioning (USP)
Key Differentiator
Only Non-Veg Focus (No Clutter)
Value Proposition
“Order non-veg dishes instantly — no veg items, no confusion, just quick checkout.”
________________________________________
6) Core Features & Functional Requirements
ID	Feature	Description
F1	Product Catalog	Show name, image, price, category
F2	Category Browsing	Restaurant-style categories (ex: Biryani, Starters, Gravy, Rolls)
F3	Search	Search items quickly from homepage
F4	Product Details Page	Description, price, add-to-cart CTA
F5	Add to Cart	Cart updates instantly + feedback message
F6	Edit Cart	Increase/decrease qty, remove items
F7	Checkout Form	Required: name, phone, address
F8	Optional Landmark Field	Helps delivery reach users easily
F9	Place Order	Confirm order + show order summary + order ID
F10	Order Success Page	Show confirmation, clear cart, allow “Order Again”
________________________________________
7) User Experience (UX) & Key Screens
7.1 Entry Point: Homepage
Must show immediately:
•	Logo / brand identity
•	Search bar (prominent)
•	Categories (prominent)
•	Popular / featured items (secondary)
Goal: User starts ordering in seconds.
________________________________________
7.2 Core User Flow (Happy Path)
1.	User lands on Homepage
2.	User searches or browses by category
3.	User clicks an item → Product Details
4.	User taps Add to Cart
5.	User opens Cart
6.	User adjusts quantity (optional)
7.	User taps Checkout
8.	User enters delivery details:
o	Name (required)
o	Phone (required)
o	Address (required)
o	Landmark (optional)
9.	User taps Place Order
10.	User sees Order Success page with:
•	Order ID
•	Items summary
•	Total amount
•	Delivery address preview
✅ Cart clears after confirmation
________________________________________
8) UI Concepts (Simple + Fast)
Design Principles
•	Non-veg only → avoid distractions
•	Big “Add to Cart” buttons
•	Clear pricing and totals
•	Minimal steps from browse → order
•	Mobile-first layout (even if web app)
Suggested Categories (Restaurant-style)
•	Biryani
•	Starters
•	Gravy / Curry
•	Fried / Roast
•	Rolls / Wraps
•	Combos
________________________________________
9) Feedback, States & Error Handling
Success Feedback
•	“Added to cart ✅”
•	“Order placed successfully 🎉”
Loading States
•	“Loading items…”
•	Spinner while browsing products
Empty States
•	Category has no items → “No items found”
•	Cart empty → “Your cart is empty” + “Continue Shopping”
Form Validation Errors
•	Missing name/phone/address → highlight field + show message
Example: “Phone number is required.”
System Failures
•	“Something went wrong. Try again.”
•	Retry button shown
________________________________________
10) Data & Logic (High-Level)
Inputs
•	Static / mocked product list (demo)
•	User checkout details:
o	name
o	phone
o	address
o	landmark (optional)
Processing
•	Add items → cart state updates
•	Cart total = sum(price × qty)
•	Checkout validation → required fields
•	Create order summary + order ID
Outputs
•	Order confirmation UI screen
•	Order summary shown to user
•	Stored temporarily (session/local storage) for demo use
________________________________________
11) Security & Privacy Considerations (Conceptual)
Even in a demo, user trust matters.
Basic Security Expectations
•	Validate inputs (phone/address cannot be empty)
•	Don’t expose personal data in public views
•	If storing in local storage/session:
o	Keep it minimal (only order summary)
o	Clear data after order confirmation (or on logout)
Privacy Notes
•	Phone + address are sensitive → show only to the user in confirmation
•	Avoid collecting unnecessary details in v1
________________________________________
12) Potential Challenges & Suggested Solutions
Challenge 1: Users want fast ordering but menu is large
✅ Solution:
•	Search-first homepage
•	Category browsing
•	Featured “Top Picks”
Challenge 2: Users get confused if too many steps exist
✅ Solution:
•	One restaurant per order
•	Minimal checkout fields
•	Sticky cart icon always visible
Challenge 3: Trust issues (“Will food be good?”)
✅ Solution (conceptual):
•	Simple “Popular items” list
•	Ratings badge (even if static for demo)
•	Clear item photos + descriptions
________________________________________
13) Future Expansion (Post v1)
Once v1 flow is stable, you can add:
Phase 2 Enhancements
•	Online payment integration (UPI/cards)
•	User login + saved addresses
•	Order history + reorder button
•	Real delivery tracking
•	Offers / coupons
•	Ratings & reviews
•	Restaurant onboarding/admin panel
•	Multiple restaurant support (advanced)
________________________________________
14) MVP Checklist (Demo Readiness)
To meet the 2-minute demo goal, ensure:
•	Homepage loads fast
•	Search works smoothly
•	Cart updates instantly
•	Checkout form is minimal
•	Order success page is clear and satisfying
15) Admin Panel (Minimal v1 — Add Restaurant + Food)
15.1 Goal (Why Admin Panel?)
To allow the owner/admin to quickly add and manage:
•	Restaurant details (basic)
•	Non-veg food items (menu)
So the app is not fully static and feels like a real product.
________________________________________
15.2 Admin Access (Simple Login)
Admin Entry
•	Admin Login Page: /admin/login
Authentication (Demo level)
•	Username + Password
•	Hardcoded credentials (for demo)
•	After login → redirect to /admin/dashboard
✅ No OTP / no real auth integration in v1
________________________________________
15.3 Admin Features & Functional Requirements
ID	Feature	Description
A1	Admin Login	Admin enters username + password
A2	Admin Dashboard	Shows shortcuts: Add Restaurant, Add Food
A3	Add Restaurant	Admin can post restaurant name, location, contact
A4	View Restaurant Details	Admin can view saved restaurant info
A5	Add Food Item	Admin adds non-veg items with price + category
A6	Food List (Basic)	View added items (edit/delete optional)
________________________________________
15.4 Restaurant Details (Fields)
Required
•	Restaurant Name
•	City / Area
•	Phone Number
Optional
•	Restaurant Logo/Image
•	Address
•	Open Time / Close Time
________________________________________
15.5 Food Item Details (Fields)
Required
•	Food Name
•	Category (Dropdown)
•	Price
•	Image
•	Availability (In Stock / Out of Stock)
Optional
•	Description
•	Spice Level (Mild/Medium/Spicy)
•	Bestseller Tag (Yes/No)
✅ Only allow non-veg categories in dropdown
________________________________________
15.6 Admin Flow (Happy Path)
1.	Admin opens /admin/login
2.	Login success → /admin/dashboard
3.	Admin adds restaurant details
4.	Admin adds food items
5.	Website homepage instantly shows updated food list
________________________________________
15.7 Data Storage (Demo)
For MVP demo, store admin-added data in:
•	LocalStorage / SessionStorage (fast)
OR
•	Simple JSON / Mock API
✅ No real database required for v1
________________________________________
15.8 Admin UX Rules (Fast + No Clutter)
•	Minimal form fields
•	Big Save buttons
•	Toast messages:
o	“Restaurant saved ✅”
o	“Food item added ✅”
•	Simple food list table/cards

