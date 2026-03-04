import { supabase } from '@/supabase/client';
import { NoSubstitutionTemplateLiteral } from 'typescript';


export async function getAllPosts(): Promise<Post[]> {
	const { data,error } = await supabase.from('Posts').select('*');
	
  if (error) throw error
	
	return data;
} 