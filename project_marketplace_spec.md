# Project Marketplace Platform – Technical Specification  
Version: 1.0  
Format: Markdown  

---

# 1. System Overview

A platform where students can **upload, host, buy, and sell projects**.  
This document includes:

- API endpoints  
- Request/response formats  
- User flows  
- Feature specifications  
- Roles: User, Seller, Buyer, Admin  

---

# 2. Feature Breakdown

## 2.1 Authentication
- Signup (email/password or Google OAuth)
- Login & logout
- Refresh tokens
- Password reset

## 2.2 User Profile
Users can:
- Update profile  
- View purchased projects  
- View sales (for sellers)  
- View earnings  

## 2.3 Project Management (Seller)
- Upload project details
- Upload project files (ZIP) / GitHub link
- Add demo link
- Edit project
- Delete or unpublish project

## 2.4 Marketplace (Buyer)
- Search projects (title, tech, price range)
- Filter by category, level, rating
- View project details
- Buy & pay
- Download project

## 2.5 Ratings & Reviews
- Buyers can rate & review after purchase  
- Sellers see feedback  

## 2.6 Wishlist
- Add to wishlist  
- Remove from wishlist  
- View wishlist  

## 2.7 Admin Panel
- Approve / reject projects  
- Manage users  
- Handle reports  
- Refund management  

---

# 3. API Structure

All responses follow:

```json
{
  "success": true,
  "data": {},
  "message": "Optional message"
}
```

Errors:

```json
{
  "success": false,
  "error": "Description"
}
```

---

# 4. AUTH ENDPOINTS

## POST /auth/signup
**Request**
```json
{
  "name": "Sagar",
  "username": "sagar",
  "email": "sagar@example.com",
  "password": "12345678"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "user_id": "123",
    "token": "jwt_token"
  }
}
```

---

## POST /auth/login
**Request**
```json
{
  "username": "sagar",
  "password": "12345678"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "user_id": "123",
    "token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

---

## POST /auth/refresh
**Request**
```json
{
  "refresh_token": "string"
}
```

## POST /auth/logout
Clears the active token.

---

# 5. USER ROUTES

## GET /users/me
**Response**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Sagar",
    "email": "sagar@example.com",
    "bio": "CS student",
    "skills": ["Python", "React"],
    "purchased_projects": 5,
    "sold_projects": 3
  }
}
```

---

## PATCH /users/me
**Request**
```json
{
  "name": "Sagar Newpane",
  "bio": "Love coding",
  "skills": ["Python", "Django"]
}
```

---

# 6. PROJECT ROUTES

## POST /projects/
Upload project.

**Request (multipart fields)**  
```
title: string  
description: string  
category: string  
tech_stack: ["React", "Node"]  
level: Beginner|Intermediate|Advanced  
price: number  
github_link: string (optional)  
demo_link: string (optional)  
file: ZIP (optional)  
thumbnail: image  
```

**Response**
```json
{
  "success": true,
  "data": {
    "project_id": "p123",
    "status": "pending_review"
  }
}
```

---

## GET /projects
Search + filters.

**Query params**
```
q, category, tech, rating, 
price_min, price_max,
sort=latest | price_low | price_high | top_rated
```

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": "p1",
      "title": "ML Classifier",
      "price": 499,
      "rating": 4.7,
      "thumbnail": "url"
    }
  ]
}
```

---

## GET /projects/:id
**Response**
```json
{
  "success": true,
  "data": {
    "id": "p1",
    "title": "ML Classifier",
    "description": "...",
    "price": 499,
    "demo_link": "url",
    "seller": {
      "id": "u1",
      "name": "John Doe"
    },
    "reviews": []
  }
}
```

---

## PATCH /projects/:id  
Edit project.

## DELETE /projects/:id  
Soft delete/unpublish.

---

# 7. PURCHASE & PAYMENT ROUTES

## POST /orders/create
**Request**
```json
{
  "project_id": "p1",
  "payment_method": "khalti"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "order_id": "o1",
    "payment_url": "gateway_url"
  }
}
```

---

## POST /orders/verify  
Payment verification.

---

## GET /orders/my-purchases
**Response**
```json
{
  "success": true,
  "data": [
    {
      "project_id": "p1",
      "title": "ML Classifier",
      "download_url": "file_url"
    }
  ]
}
```

---

# 8. DOWNLOAD ROUTES

## GET /projects/:id/download  
Only accessible to buyers.

---

# 9. REVIEW ROUTES - Done

## POST /projects/:id/reviews
**Request**
```json
{
  "rating": 5,
  "review": "Excellent project!"
}
```

## GET /projects/:id/reviews  
Paginated reviews.

---

# 10. WISHLIST ROUTES

## POST /wishlist/:project_id  
Add.

## DELETE /wishlist/:project_id  
Remove.

## GET /wishlist/  
List.

---

# 11. SELLER DASHBOARD ROUTES

## GET /seller/projects  
List seller uploads.

## GET /seller/earnings
**Response**
```json
{
  "success": true,
  "data": {
    "total_earnings": 8400,
    "withdrawable": 6000
  }
}
```

## POST /seller/payout
**Request**
```json
{
  "amount": 3000,
  "method": "bank"
}
```

---

# 12. ADMIN ROUTES

## GET /admin/projects/pending  
List unapproved.

## PATCH /admin/projects/approve/:id  
Approve.

## PATCH /admin/projects/reject/:id  
Reject.

## GET /admin/users  
List users.

## PATCH /admin/users/ban/:id  
Ban.

---

# 13. DATABASE STRUCTURE

```
Users
- id
- name
- email
- password
- bio
- skills[]
- role (user/admin)
- created_at

Projects
- id
- title
- description
- category
- tech_stack[]
- price
- seller_id
- github_link
- demo_link
- file_url
- thumbnail
- status (pending, approved, rejected)
- created_at

Orders
- id
- project_id
- buyer_id
- amount
- status (paid, pending, failed)
- created_at

Reviews
- id
- project_id
- user_id
- rating
- review
- created_at

Wishlist
- id
- user_id
- project_id

Earnings
- id
- seller_id
- amount
- status (available, withdrawn)
```

---

# 14. FRONTEND PAGES

## Public
- Home  
- Project list  
- Project details  
- Login  
- Signup  

## Buyer
- Dashboard  
- Purchases  
- Wishlist  
- Download page  

## Seller
- Upload project  
- My projects  
- Edit project  
- Sales & earnings  

## Admin
- Pending approvals  
- User management  
- Reported projects
