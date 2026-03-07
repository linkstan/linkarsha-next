# Linkarsha Architecture

## Core Concept

Linkarsha is a **Link-in-Bio Operating System** for:

• Creators  
• Businesses  
• Personal users  

Each user type has **different public layouts and dashboards** but shares the same backend system.

---

# User Types

## Creator

Focus: **audience & content**

Public profile layout:

Vertical social buttons.

Example:

Instagram  
YouTube  
VK  
TikTok  

Dashboard modules:

Links  
Blocks  
Analytics  
Appearance  

---

## Business

Focus: **customers & services**

Public profile layout:

Avatar  
Social icons row  
Products  
Location  
Bookings  

Example icons:

IG • FB • WA • Website

Dashboard modules:

Products  
Menu  
Bookings  
Analytics  
Appearance  

---

## Personal

Focus: **simple link sharing**

Public profile layout:

Similar to Creator but simpler.

Example:

Instagram  
Website  
YouTube  

---

# Database Structure

Tables:

profiles  
blocks  
links  
clicks  
events  
themes  

---

# profiles table

Stores user account and public profile data.

Columns:

id  
username  
avatar  
display_name  
bio  
user_type  
industry  
theme  

Example:

username: pradeep
user_type: creator
theme: dark

---

# blocks table

Stores **all public profile blocks**.

Block types:

link  
video  
music  
image  
text  
product  

Example block:

type: link

data_json:
{
“title”:“Instagram”,
“url”:“https://instagram.com/pradeep”
}

Blocks are displayed on:

/[username]

Blocks support **drag-drop ordering** using:

position column

---

# links table

Legacy link system used in older modules.

Stores:

title  
url  
position  

Links are gradually migrating into **blocks**.

---

# clicks table

Stores **detailed link click analytics**.

Columns:

link_id  
referrer  
device  
browser  
os  
created_at  

Used by:

Dashboard analytics charts.

---

# events table

Stores **general analytics events**.

Used for:

profile views  
future activity tracking  

Columns:

id  
user_id  
link_id  
event  
referrer  
country  
device  
created_at  

Example event:

event: view
user_id: uuid

---

# Storage

Supabase storage buckets:

avatars  
media  

avatars → profile pictures  
media → images / future uploads

---

# Public Profile System

Route:

/[username]

Loads:

profile  
blocks  
links (legacy)

Profile view tracking:

events table
event = view

Link click tracking:

/api/click/[id]

Which stores click data in:

clicks table

Then redirects user to destination URL.

---

# Dashboard System

Route:

/dashboard

Dashboard modules:

/dashboard/links
/dashboard/appearance
/dashboard/analytics

Creator dashboard includes:

Link manager  
Drag-drop ordering  
Analytics charts  
Theme editor  

Business dashboards will later include:

Products  
Menu  
Location  
Bookings  

---

# Onboarding System

Route:

/setup

User chooses role:

Creator  
Business  
Personal  

Redirects to:

/setup/creator
/setup/business
/setup/personal

---

# Creator Onboarding Flow

Route:

/setup/creator

Steps:

### 1 Theme Selection

User chooses theme:

Minimal  
Dark Creator  
Gradient  

Saved in:

profiles.theme

---

### 2 Platform Selection

User selects where their audience is.

Examples:

Instagram  
VK  
Facebook  
YouTube  
TikTok  
Multiple Platforms  

Saved in:

profiles.industry

---

### 3 Platform Links

If **single platform selected**:

User enters:

username OR profile URL

Example:

@username
instagram.com/username

System converts into:

https://instagram.com/username

---

If **Multiple Platforms selected**:

User gets 3 input fields.

Example:

reddit.com/user/name
twitter.com/name
github.com/name

System auto detects platform name.

---

### 4 Profile Information

User enters:

Avatar  
Display Name  
Bio (max 160 characters)

Stored in:

profiles.avatar
profiles.display_name
profiles.bio

---

### 5 Preview Screen

Mobile preview shows:

Avatar  
Display name  
Bio  
Link buttons

User clicks:

Finish Setup

Then redirected to:

/dashboard

---

# Dashboard Links Module

Route:

/dashboard/links

Features:

Add link  
Delete link  
Edit link  
Live mobile preview  

Ordering system:

drag-drop
position column

---

# Analytics System

Route:

/dashboard/analytics

Analytics features:

Total clicks  
Top link  
Traffic sources  
Hourly click activity  
Heatmap  
AI insights  
Funnel analysis  
Geo map  

Data sources:

clicks table
events table

---

# Appearance / Themes System

Route:

/dashboard/appearance

Users can change:

Background  
Button color  
Font style  
Profile layout  

Theme stored in:

profiles.theme

---

# Future Modules

Smart Social Link Detection  
Business Products System  
Restaurant Menu Blocks  
Booking System  
Advanced Analytics  

---

# Long-Term Vision

Linkarsha becomes a **Creator + Business operating system** rather than a simple link-in-bio tool.

It combines:

Profile links  
Commerce  
Analytics  
Audience tools


⸻

