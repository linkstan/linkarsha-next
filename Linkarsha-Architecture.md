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

/dashboard




}
## Creator Setup Flow

Route:
/setup/creator

Steps:

1. Theme Selection  
User selects a theme for their public profile.

Themes examples:
Minimal Dark  
Gradient Creator  
Clean Light  

Saved in:
profiles.theme

---

2. Platform Selection

User chooses where their audience is.

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

3. Username / Profile URL

If single platform:

User enters:

username OR full profile URL

Example:
@username
instagram.com/username

System converts it into full URL.

---

If Multiple Platforms selected:

User gets 3 URL boxes.

System auto detects platform from URL.

Example:

reddit.com/user/name  
twitter.com/name  
github.com/name

---

4. Profile Info

User adds:

Avatar  
Display Name (required)  
Bio (max 160 characters)

Saved in:

profiles.avatar  
profiles.display_name  
profiles.bio

---

5. Preview

Mobile preview of public profile.

Shows:

Avatar  
Display name  
Bio  
Links

Then user clicks:

Finish Setup

Redirect to:

/dashboard






## Creator Platform Handling

When user selects a platform during creator onboarding, the system creates link blocks automatically.

### Single Platform Mode

If user selects one platform:

Instagram  
VK  
Facebook  
YouTube  
TikTok  

User enters:

username OR profile URL

Example:

@username  
instagram.com/username  

System converts into full URL.

Example stored:

https://instagram.com/username

Then a block is created automatically in:

blocks table

Example block:

type: link

data_json:
{
"title": "Instagram",
"url": "https://instagram.com/username"
}

---

### Multiple Platform Mode

User receives 3 input fields.

Example:

https://reddit.com/user/name  
https://twitter.com/name  
https://github.com/name  

System auto detects platform name.

Example detection rules:

instagram → Instagram  
vk → VK  
youtube → YouTube  
tiktok → TikTok  
facebook → Facebook  

If unknown:

Platform name becomes:

Website

---

### Block Creation

For every valid link entered:

A block is inserted into database.

Example:

user_id: uuid  
type: link  

data_json:
{
"title": "Instagram",
"url": "https://instagram.com/username"
}







  ### Creator Step 3 — Platform Input

If single platform selected:

Input field:
username OR profile URL

Example:
@username
instagram.com/username

System converts it into full URL.

---

If Multiple Platforms selected:

User receives 3 input fields.

User can add more links with "+ Add link".

Maximum allowed:

7 links

At least 1 link required.

---

Links are stored temporarily during onboarding.

Later these links are converted into blocks in the database.
