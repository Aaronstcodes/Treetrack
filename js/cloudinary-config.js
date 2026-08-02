// ==========================================================
// TreeTrack — Cloudinary configuration (free photo storage)
// ==========================================================
// Firebase Storage now requires a billing account (Blaze plan) even to
// stay on the free quota, which needs a card on file. Cloudinary gives
// 25GB storage + 25GB bandwidth/month free, with NO card required — so
// TreeTrack uses Cloudinary for tree photos instead, and keeps Firebase
// for everything else (Auth + Firestore), which are still fully free
// with no billing account needed.
//
// SETUP (~3 minutes):
// 1. Go to https://cloudinary.com/users/register/free and make a free
//    account (no card asked for).
// 2. On your Cloudinary dashboard, copy your "Cloud name" (top of page).
// 3. Go to Settings (gear icon) → Upload → scroll to "Upload presets"
//    → click "Add upload preset".
// 4. Set "Signing Mode" to UNSIGNED (important — this lets the browser
//    upload directly without a secret key). Give it a name, e.g.
//    "treetrack_unsigned". Save.
// 5. Paste your cloud name and preset name below.
// ==========================================================

export const cloudinaryConfig = {
  cloudName: "g5h46mhy",
  uploadPreset: "treetrack_web",
};

// Uploads a single image file to Cloudinary and returns its public URL.
// Used by tree.html when a student submits a weekly care log photo.
export async function uploadPhotoToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryConfig.uploadPreset);

  const response = await fetch(url, { method: "POST", body: formData });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errText}`);
  }
  const data = await response.json();
  return data.secure_url;
}
