/**
 * Types mirroring the EXISTING Supabase schema exactly.
 * Do not add columns here that do not exist in the real database —
 * this file must always describe the backend as it actually is.
 */

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'

/** `services` — active rows are presented in the UI as bookable room / accommodation types. */
export interface ServiceRow {
  id: string
  name: string
  description: string | null
  duration_minutes: number
  price: number | null
  is_active: boolean
  created_at: string
}

/** `appointments` — the only booking table that exists. Used for hotel reservations. */
export interface AppointmentRow {
  id: string
  full_name: string
  email: string
  phone: string
  service_id: string
  appointment_date: string // YYYY-MM-DD, used as the reservation's check-in date
  start_time: string // HH:MM:SS
  end_time: string // HH:MM:SS
  status: AppointmentStatus
  notes: string | null
  created_at: string
}

export type AppointmentInsert = Omit<AppointmentRow, 'id' | 'created_at'>

/** `business_hours` */
export interface BusinessHoursRow {
  id: string
  weekday: number // 0 (Sunday) - 6 (Saturday)
  is_open: boolean
  start_time: string | null
  end_time: string | null
}

/** `blocked_dates` */
export interface BlockedDateRow {
  id: string
  blocked_date: string // YYYY-MM-DD
  reason: string | null
  created_at: string
}

/** `business_settings` */
export interface BusinessSettingsRow {
  id: string
  business_name: string
  business_email: string | null
  business_phone: string | null
  business_address: string | null
  slot_interval_minutes: number | null
  booking_notice_hours: number | null
  created_at: string
}

/** `admin_users` */
export interface AdminUserRow {
  id: string
  user_id: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      services: {
        Row: ServiceRow
        Insert: Partial<ServiceRow>
        Update: Partial<ServiceRow>
        Relationships: []
      }
      appointments: {
        Row: AppointmentRow
        Insert: AppointmentInsert
        Update: Partial<AppointmentRow>
        Relationships: []
      }
      business_hours: {
        Row: BusinessHoursRow
        Insert: Partial<BusinessHoursRow>
        Update: Partial<BusinessHoursRow>
        Relationships: []
      }
      blocked_dates: {
        Row: BlockedDateRow
        Insert: Partial<BlockedDateRow>
        Update: Partial<BlockedDateRow>
        Relationships: []
      }
      business_settings: {
        Row: BusinessSettingsRow
        Insert: Partial<BusinessSettingsRow>
        Update: Partial<BusinessSettingsRow>
        Relationships: []
      }
      admin_users: {
        Row: AdminUserRow
        Insert: Partial<AdminUserRow>
        Update: Partial<AdminUserRow>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
