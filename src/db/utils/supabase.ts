"use server";

import { createClient } from "@supabase/supabase-js";
import env from "@/env";
import * as tfjs from "@tensorflow/tfjs";

const supabase = createClient(env.SUPABASE_PUBLIC_URL, env.DB_PUBLIC_KEY);

const publicModelUrl = supabase.storage.from("model").getPublicUrl("model.json").data.publicUrl;

const modelFromBucket = tfjs.loadLayersModel(publicModelUrl);

async function getModelFromBucket(){
  return tfjs.loadLayersModel(publicModelUrl);
}

export { getModelFromBucket };