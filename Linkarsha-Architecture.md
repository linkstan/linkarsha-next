# Linkarsha Architecture

## Core Concept
Linkarsha is a link-in-bio operating system for:

Creators
Businesses
Personal users

Each user type has different layouts and dashboards.

---

## User Types

### Creator
Focus: audience & content

Public profile layout:
Vertical buttons

Example:

Instagram
YouTube
VK
TikTok

Dashboard tools:
Links
Blocks
Analytics
Themes

---

### Business
Focus: customers & services

Public profile layout:

Avatar
Social icons row
Products
Location
Booking

Example icons:

[IG] [FB] [WA] [Website]

Dashboard tools:
Products
Menu
Location
Bookings
Analytics

---

### Personal
Focus: sharing links

Public profile layout:

Same as Creator but simpler.

---

## Database

Tables:

profiles
blocks
links
events
themes

---

### profiles

Stores:

id
username
avatar
bio
display_name
user_type
industry
theme

---

### blocks

Stores all profile blocks:

link
video
music
image
text
product

---

### events

Used for analytics:

clicks
views
referrer
country
device

---

## Storage

Supabase buckets:

avatars
media

---

## Public Profile

Route:

/[username]

Renders blocks from database.

Different layout based on:

profiles.user_type

---

## Dashboard

Route:

/dashboard

Different UI based on:

profiles.user_type

Creator dashboard
Business dashboard
Personal dashboard

---

## Onboarding

Route:

/setup

Flow:

choose role
creator onboarding
business onboarding
personal onboarding

---

## Analytics

Tracks:

clicks
referrer
device
country
time

## Creator Onboarding Flow

Route:
/setup/creator

Steps:

1️⃣ Theme Selection

User selects visual style for public profile.

Example:
Minimal  
Dark Creator  
Gradient  

Theme saved in:

profiles.theme

---

2️⃣ Platform Selection

User chooses primary platform.

Options:

Instagram  
VK  
Facebook  
YouTube  
TikTok  
Multiple Platforms

Saved in:

profiles.industry

---

3️⃣ Username / Profile URL

If user selected a single platform:

Input:
username OR profile URL

Example:

@username
instagram.com/username

System converts to full URL.

---

If user selected "Multiple Platforms":

User gets 3 URL inputs.

System auto detects platform.

Example:

reddit.com/user/name  
twitter.com/name  
github.com/name

---

4️⃣ Profile Info

User uploads avatar.

Fields:

Display Name (required)

Bio (max 160 characters)

Stored in:

profiles.display_name
profiles.bio
profiles.avatar

---

5️⃣ Preview Screen

Shows mobile preview of profile.

User sees:

Avatar
Display name
Bio
Links

Button:

Finish Setup

---

After finish:

User redirected to:

/
