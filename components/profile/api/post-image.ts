import { supabase } from "@/lib/supabase-client";
import { createId } from "@paralleldrive/cuid2";

export const postImage = async (file: File, bucket: string) => { 
  if (!supabase) {
    console.warn("⚠️ Supabase is not configured. Cannot upload image.");
    console.warn("⚠️ Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env file.");
    throw new Error("Supabase is not configured. Please configure environment variables.");
  }

  try {
    const imagePath = createId(); 

    const { error, data } = await supabase.storage
      .from(bucket)
      .upload(`${bucket}-${imagePath}`, file);
 

    if (error) {
      throw new Error(error.message);
    } else {
      const { data: mediaUrl } = await supabase.storage
        .from(bucket)
        .getPublicUrl(`${bucket}-${imagePath}`);

      return mediaUrl?.publicUrl;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
