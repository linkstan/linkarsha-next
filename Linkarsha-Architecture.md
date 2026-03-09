# Linkarsha Architecture

## Core Concept

Linkarsha is a **Link-in-Bio Operating System** designed for:

• Creators  
• Businesses  
• Personal users  

All users share the **same backend architecture**, but their **public profile layouts and dashboards differ**.

The platform is built around a **block-based system**.

Everything shown on a profile is a **block**.

---

# User Types

## Creator

Focus: **audience growth and content distribution**

Public profile layout:

Vertical buttons with platform icons.

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

Focus: **customers and services**

Public profile layout:

Avatar  
Social icons row  
Products  
Location  
Bookings  

Example:

IG • FB • WhatsApp • Website

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

Minimal version of Creator layout.

Example:

Instagram  
Website  
YouTube  

---

# Database Structure

Primary tables:

profiles  
blocks  
events  
themes  

Legacy tables (being phased out):

links  
clicks  

---

# profiles table

Stores **user accounts and public profile data**

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

This is the **core engine of Linkarsha**.

Every piece of content on a profile is stored as a block.

Columns:

id  
user_id  
type  
data_json  
position  
created_at  

Example block:

type: link

data_json:
{
“title”:“Instagram”,
“url”:“https://instagram.com/pradeep”
}

Block ordering uses:

position column

Blocks are rendered on:

/[username]

---

# Block Types

Supported blocks:

link  
video  
music  
image  
text  
product  

Future block types:

menu  
booking  
map  
gallery  

---

# Smart Block Engine

Linkarsha automatically converts pasted URLs into smart blocks.

Example:

YouTube link → video block
Spotify link → music block
Instagram link → profile link block
Website → preview card
Twitter/X → tweet embed

This system uses:

detectPlatform()

from:

app/lib/detectPlatform.js

---

# Smart Link Detection

When a user pastes a link, Linkarsha detects the platform automatically.

Example input:

instagram.com/pradeep

Detected platform:

Instagram

Supported platforms:

Instagram  
YouTube  
TikTok  
Facebook  
VK  
Twitter / X  
Snapchat  
Spotify  
SoundCloud  
Pinterest  
Twitch  

Unknown links default to:

Website

---

# Universal Embed System

Some platforms are rendered as **rich embeds instead of buttons**.

Examples:

YouTube → video player  
Spotify → music player  
Twitter/X → tweet card  
Website → preview card  

These are implemented inside:

components/BlockRenderer.js

---

# Events Table

Stores **analytics and activity events**.

Columns:

id  
user_id  
block_id  
event  
referrer  
device  
browser  
os  
country  
created_at  

Example event:

event: view
user_id: uuid

Event types:

view  
click  

---

# Click Tracking System

All link clicks go through:

/api/click/[id]

Flow:

User clicks link  
→ API records event  
→ user redirected to destination  

Data stored in:

events table

Example event:

event: click
block_id: uuid

---

# Storage

Supabase storage buckets:

avatars  
media  

avatars → profile images  
media → uploaded images / future media

---

# Public Profile System

Route:

/[username]

Loads:

profile  
blocks  

Profile view tracking:

events table
event = view

Click tracking:

/api/click/[blockId]

---

# Dashboard System

Route:

/dashboard

Dashboard modules:

/dashboard/links
/dashboard/appearance
/dashboard/analytics
/dashboard/settings

Creator dashboard features:

Link manager  
Drag-drop ordering  
Live preview  
Analytics charts  
Theme editor  

---

# Dashboard Links Module

Route:

/dashboard/links

Features:

Add link  
Delete link  
Edit link  
Drag-drop ordering  
Auto platform detection  

Ordering uses:

blocks.position

---

# Analytics System

Route:

/dashboard/analytics

Analytics features:

Total clicks  
Top links  
Traffic sources  
Hourly activity  
Heatmap  
AI insights  
Funnel analysis  
Geo map  

Data sources:

events table

---

# Appearance System

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

# Onboarding System

Route:

/setup

User selects role:

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

1️⃣ Theme selection  

2️⃣ Platform selection  

3️⃣ Platform links  

4️⃣ Profile information  

5️⃣ Preview screen  

After completion:

/dashboard

---

# Future Modules

Business Products System  
Restaurant Menu Blocks  
Booking System  
Advanced Analytics  
AI Creator Tools  

---

# Long-Term Vision

Linkarsha becomes a **Creator + Business operating system**.

Combining:

Profile links  
Commerce  
Analytics  
Audience tools  
Automation  

Beyond a traditional **link-in-bio tool**.
