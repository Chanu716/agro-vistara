export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          phone: string | null
          village: string | null
          district: string | null
          state: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          phone?: string | null
          village?: string | null
          district?: string | null
          state?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          phone?: string | null
          village?: string | null
          district?: string | null
          state?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      farms: {
        Row: {
          id: string
          user_id: string
          name: string
          location: string
          total_area_acres: number
          soil_type: string | null
          water_source: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          location: string
          total_area_acres: number
          soil_type?: string | null
          water_source?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          location?: string
          total_area_acres?: number
          soil_type?: string | null
          water_source?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      crop_records: {
        Row: {
          id: string
          farm_id: string
          user_id: string
          crop_name: string
          crop_type: string
          area_acres: number
          planting_date: string
          expected_harvest_date: string | null
          actual_harvest_date: string | null
          expected_yield_kg: number | null
          actual_yield_kg: number | null
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          farm_id: string
          user_id: string
          crop_name: string
          crop_type: string
          area_acres: number
          planting_date: string
          expected_harvest_date?: string | null
          actual_harvest_date?: string | null
          expected_yield_kg?: number | null
          actual_yield_kg?: number | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          farm_id?: string
          user_id?: string
          crop_name?: string
          crop_type?: string
          area_acres?: number
          planting_date?: string
          expected_harvest_date?: string | null
          actual_harvest_date?: string | null
          expected_yield_kg?: number | null
          actual_yield_kg?: number | null
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          farm_id: string
          crop_record_id: string | null
          user_id: string
          expense_type: string
          amount: number
          description: string | null
          expense_date: string
          created_at: string
        }
        Insert: {
          id?: string
          farm_id: string
          crop_record_id?: string | null
          user_id: string
          expense_type: string
          amount: number
          description?: string | null
          expense_date: string
          created_at?: string
        }
        Update: {
          id?: string
          farm_id?: string
          crop_record_id?: string | null
          user_id?: string
          expense_type?: string
          amount?: number
          description?: string | null
          expense_date?: string
          created_at?: string
        }
      }
      storage_facilities: {
        Row: {
          id: string
          name: string
          type: string
          location: string
          district: string
          capacity_tonnes: number | null
          contact_phone: string | null
          facilities: string[] | null
          latitude: number | null
          longitude: number | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          location: string
          district: string
          capacity_tonnes?: number | null
          contact_phone?: string | null
          facilities?: string[] | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          location?: string
          district?: string
          capacity_tonnes?: number | null
          contact_phone?: string | null
          facilities?: string[] | null
          latitude?: number | null
          longitude?: number | null
          created_at?: string
        }
      }
      crop_recommendations: {
        Row: {
          id: string
          crop_name: string
          best_season: string
          suitable_soils: string[] | null
          companion_crops: string[] | null
          rotation_crops: string[] | null
          planting_tips: string | null
          care_instructions: string | null
          avg_yield_per_acre: number | null
          market_price_range: string | null
          created_at: string
        }
        Insert: {
          id?: string
          crop_name: string
          best_season: string
          suitable_soils?: string[] | null
          companion_crops?: string[] | null
          rotation_crops?: string[] | null
          planting_tips?: string | null
          care_instructions?: string | null
          avg_yield_per_acre?: number | null
          market_price_range?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          crop_name?: string
          best_season?: string
          suitable_soils?: string[] | null
          companion_crops?: string[] | null
          rotation_crops?: string[] | null
          planting_tips?: string | null
          care_instructions?: string | null
          avg_yield_per_acre?: number | null
          market_price_range?: string | null
          created_at?: string
        }
      }
      success_stories: {
        Row: {
          id: string
          farmer_name: string
          village: string
          district: string
          state: string
          age: number | null
          photo_url: string | null
          story_title: string
          story_content: string
          crops_grown: string[]
          land_size_acres: number | null
          previous_yield_kg: number | null
          current_yield_kg: number | null
          yield_improvement_percentage: number | null
          income_before: number | null
          income_after: number | null
          techniques_used: string[]
          challenges_faced: string | null
          solutions_implemented: string | null
          advice_to_farmers: string | null
          testimonial: string | null
          is_featured: boolean
          published_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          farmer_name: string
          village: string
          district: string
          state?: string
          age?: number | null
          photo_url?: string | null
          story_title: string
          story_content: string
          crops_grown: string[]
          land_size_acres?: number | null
          previous_yield_kg?: number | null
          current_yield_kg?: number | null
          yield_improvement_percentage?: number | null
          income_before?: number | null
          income_after?: number | null
          techniques_used: string[]
          challenges_faced?: string | null
          solutions_implemented?: string | null
          advice_to_farmers?: string | null
          testimonial?: string | null
          is_featured?: boolean
          published_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          farmer_name?: string
          village?: string
          district?: string
          state?: string
          age?: number | null
          photo_url?: string | null
          story_title?: string
          story_content?: string
          crops_grown?: string[]
          land_size_acres?: number | null
          previous_yield_kg?: number | null
          current_yield_kg?: number | null
          yield_improvement_percentage?: number | null
          income_before?: number | null
          income_after?: number | null
          techniques_used?: string[]
          challenges_faced?: string | null
          solutions_implemented?: string | null
          advice_to_farmers?: string | null
          testimonial?: string | null
          is_featured?: boolean
          published_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      farming_guides: {
        Row: {
          id: string
          guide_title: string
          guide_description: string
          crop_name: string
          category: string
          difficulty_level: string
          duration_days: number | null
          best_season: string | null
          thumbnail_url: string | null
          video_url: string | null
          steps: Json
          tools_required: string[]
          estimated_cost: number | null
          expected_outcome: string | null
          common_mistakes: string[]
          expert_tips: string[]
          is_featured: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          guide_title: string
          guide_description: string
          crop_name: string
          category: string
          difficulty_level?: string
          duration_days?: number | null
          best_season?: string | null
          thumbnail_url?: string | null
          video_url?: string | null
          steps: Json
          tools_required: string[]
          estimated_cost?: number | null
          expected_outcome?: string | null
          common_mistakes: string[]
          expert_tips: string[]
          is_featured?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          guide_title?: string
          guide_description?: string
          crop_name?: string
          category?: string
          difficulty_level?: string
          duration_days?: number | null
          best_season?: string | null
          thumbnail_url?: string | null
          video_url?: string | null
          steps?: Json
          tools_required?: string[]
          estimated_cost?: number | null
          expected_outcome?: string | null
          common_mistakes?: string[]
          expert_tips?: string[]
          is_featured?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
