import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zuraphrosoohgzxexmnz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cmFwaHJvc29vaGd6eGV4bW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2OTcyNzcsImV4cCI6MjA3MzI3MzI3N30.xPT9-gG733Xv8lS8UeN9xrLrLR8k1HoKYOJVOIywNWQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;