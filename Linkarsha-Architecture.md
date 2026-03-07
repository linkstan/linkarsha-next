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
