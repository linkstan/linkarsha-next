"use client";

import { supabase } from "./supabase";

export async function saveAppearance(section,data){

const {data:{session}} = await supabase.auth.getSession();
if(!session) return;

const userId=session.user.id;

/* GET CURRENT SETTINGS */

const {data:profile}=await supabase
.from("profiles")
.select("profile_settings")
.eq("id",userId)
.single();

let settings = profile?.profile_settings || {};

/* MERGE SECTION */

settings[section] = {
...(settings[section] || {}),
...data
};

/* SAVE */

await supabase
.from("profiles")
.update({profile_settings:settings})
.eq("id",userId);

/* LIVE PREVIEW EVENT */

window.dispatchEvent(
new CustomEvent("appearance-update",{detail:settings})
);

}
